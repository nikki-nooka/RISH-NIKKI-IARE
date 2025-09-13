
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { getBotCommand } from '../services/geminiService';
import type { ChatMessage, Page } from '../types';
import { BotIcon, SendIcon, CloseIcon, ChevronDownIcon, MicrophoneIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from './icons';

interface ChatBotProps {
    onNavigate: (page: Page) => void;
}

// Manually defining SpeechRecognition for browsers that support it to resolve TypeScript error.
interface SpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (event: any) => void;
  onerror: (event: any) => void;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

// For cross-browser compatibility
const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

const supportedLanguages = [
    { code: 'en-US', name: 'English' },
    { code: 'es-ES', name: 'Español' },
    { code: 'fr-FR', name: 'Français' },
    { code: 'de-DE', name: 'Deutsch' },
    { code: 'it-IT', name: 'Italiano' },
    { code: 'pt-BR', name: 'Português' },
    { code: 'ru-RU', name: 'Русский' },
    { code: 'ja-JP', name: '日本語' },
    { code: 'ko-KR', name: '한국어' },
    { code: 'zh-CN', name: '中文' },
    { code: 'ar-SA', name: 'العربية' },
    { code: 'hi-IN', name: 'हिन्दी' },
    { code: 'te-IN', name: 'తెలుగు' },
    { code: 'bn-IN', name: 'বাংলা' },
];


export const ChatBot: React.FC<ChatBotProps> = ({ onNavigate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const isSpeechSupported = !!SpeechRecognitionAPI;

    const [isMuted, setIsMuted] = useState(false);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedLanguage, setSelectedLanguage] = useState(supportedLanguages[0].code);
    const [selectedVoiceURI, setSelectedVoiceURI] = useState<string | null>(null);
    const [isVoiceAvailable, setIsVoiceAvailable] = useState(true);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([
                { id: 'initial', role: 'bot', text: 'Hello! I am your voice assistant. You can ask me questions or tell me where to go, like "go to the symptom checker".' }
            ]);
        }
    }, [isOpen, messages]);
    
    useEffect(() => {
        // This effect is for loading voices for TTS
        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();

            if (availableVoices.length === 0) {
                // Voices might be loading asynchronously.
                // The onvoiceschanged event will trigger this function again.
                // For now, assume unavailability.
                setVoices([]);
                setSelectedVoiceURI(null);
                setIsVoiceAvailable(false);
                return;
            }

            const langPrefix = selectedLanguage.split('-')[0];
            const filteredVoices = availableVoices.filter(v => v.lang.startsWith(langPrefix));
            setVoices(filteredVoices);

            if (filteredVoices.length > 0) {
                const defaultVoice = filteredVoices.find(v => v.name.includes('Google')) || filteredVoices.find(v => v.default) || filteredVoices[0];
                setSelectedVoiceURI(defaultVoice.voiceURI);
                setIsVoiceAvailable(true);
            } else {
                setSelectedVoiceURI(null);
                // If no voice is found for the language, TTS will likely fail silently.
                // We update the UI to inform the user.
                setIsVoiceAvailable(false);
            }
        };

        // The 'voiceschanged' event is crucial for ensuring the voice list is populated.
        window.speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices(); // Initial attempt to load voices

        return () => {
            // Cleanup: remove event listener and stop any speech.
            window.speechSynthesis.onvoiceschanged = null;
            window.speechSynthesis.cancel();
        };
    }, [selectedLanguage]);

    const speak = (text: string) => {
        if (isMuted || !isVoiceAvailable || !('speechSynthesis' in window) || !text) return;
        window.speechSynthesis.cancel();
        
        const cleanedText = text.replace(/[*#_`]/g, '');
        const utterance = new SpeechSynthesisUtterance(cleanedText);
        
        const selectedVoice = voices.find(v => v.voiceURI === selectedVoiceURI);
        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }
        utterance.lang = selectedLanguage;
        utterance.rate = 1;
        utterance.pitch = 1;

        // A small delay can help prevent issues on some browsers.
        setTimeout(() => window.speechSynthesis.speak(utterance), 100);
    };

    useEffect(() => {
        if (!isSpeechSupported) return;

        if (recognitionRef.current) {
            recognitionRef.current.onresult = null;
            recognitionRef.current.onend = null;
            recognitionRef.current.onerror = null;
            recognitionRef.current.stop();
        }

        const recognition = new SpeechRecognitionAPI();
        recognition.continuous = true; // Listen until manually stopped.
        recognition.interimResults = true; // Show results as they come in
        recognition.lang = selectedLanguage;

        recognition.onresult = (event: any) => {
            // Combine all transcript parts received so far for live feedback.
            // This ensures that if the user pauses, the transcript remains.
            let fullTranscript = '';
            for (let i = 0; i < event.results.length; i++) {
                fullTranscript += event.results[i][0].transcript;
            }
            setInput(fullTranscript);
        };

        recognition.onerror = (event: any) => {
            console.error("Speech recognition error:", event.error);
            setIsListening(false);
        };
        
        recognition.onend = () => setIsListening(false);
        
        recognitionRef.current = recognition;

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.onend = null;
                recognitionRef.current.stop();
            }
            if ('speechSynthesis' in window) window.speechSynthesis.cancel();
        };
    }, [isSpeechSupported, selectedLanguage]);

    useLayoutEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (input.trim() === '' || isLoading) return;
        
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();

        if (isListening && recognitionRef.current) {
            recognitionRef.current.stop();
        }

        const userMessageText = input;
        const userMessage: ChatMessage = { id: Date.now().toString(), role: 'user', text: userMessageText };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const botMessageId = (Date.now() + 1).toString();
        setMessages(prev => [...prev, { id: botMessageId, role: 'bot', text: '...' }]);

        try {
            const availablePages: Page[] = ['welcome', 'image-analysis', 'prescription-analysis', 'mental-health', 'symptom-checker', 'activity-history', 'profile', 'about', 'contact', 'explore'];
            const languageName = supportedLanguages.find(l => l.code === selectedLanguage)?.name || 'English';
            
            const commandResponse = await getBotCommand(userMessageText, languageName, availablePages);
            
            setMessages(prev => prev.map(msg => msg.id === botMessageId ? { ...msg, text: commandResponse.responseText } : msg));
            speak(commandResponse.responseText);
            
            if (commandResponse.action === 'navigate' && commandResponse.page) {
                setTimeout(() => {
                    onNavigate(commandResponse.page!);
                    setIsOpen(false);
                }, 1200);
            }
        } catch (error) {
            console.error('Chatbot error:', error);
            const errorText = 'Sorry, I encountered an error. Please try again.';
            setMessages(prev => prev.map(msg => msg.id === botMessageId ? { ...msg, text: errorText } : msg));
            speak(errorText);
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleListening = () => {
        if (!recognitionRef.current) return;
        if (isListening) {
            recognitionRef.current.stop();
        } else {
            setInput('');
            try {
                recognitionRef.current.start();
                setIsListening(true);
            } catch (e) {
                console.error("Could not start recognition:", e);
                // This can happen if it's already started or another error occurs
                setIsListening(false);
            }
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 bg-blue-500 text-white rounded-full p-3 shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-110 z-50 animate-pulse"
                aria-label="Toggle Chatbot"
            >
                {isOpen ? <CloseIcon className="w-7 h-7"/> : <BotIcon className="w-7 h-7" />}
            </button>

            {isOpen && (
                <div className="fixed bottom-24 right-6 w-[90vw] max-w-sm h-[70vh] max-h-[550px] bg-white border border-slate-200 rounded-lg shadow-xl flex flex-col z-40 animate-fade-in-up">
                    <header className="p-3 flex justify-between items-center rounded-t-lg border-b border-slate-200">
                        <div className="relative">
                            <select
                                value={selectedLanguage}
                                onChange={(e) => setSelectedLanguage(e.target.value)}
                                className="appearance-none bg-slate-100 border border-slate-200 text-slate-700 text-xs rounded-md py-1.5 pl-2 pr-7 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                                aria-label="Select language"
                            >
                                {supportedLanguages.map(lang => (
                                    <option key={lang.code} value={lang.code}>{lang.name}</option>
                                ))}
                            </select>
                            <ChevronDownIcon className="w-4 h-4 absolute top-1/2 right-1.5 -translate-y-1/2 text-slate-500 pointer-events-none" />
                        </div>
                         <div className="flex items-center gap-3">
                            {voices.length > 0 && !isMuted && (
                                <div className="relative">
                                    <select
                                        value={selectedVoiceURI || ''}
                                        onChange={(e) => setSelectedVoiceURI(e.target.value)}
                                        className="appearance-none bg-slate-100 border border-slate-200 text-slate-700 text-xs rounded-md py-1.5 pl-2 pr-7 focus:ring-blue-500 focus:border-blue-500 cursor-pointer max-w-[100px]"
                                        aria-label="Select voice"
                                    >
                                        {voices.map(voice => (
                                            <option key={voice.voiceURI} value={voice.voiceURI}>
                                                {voice.name.split(/[\(\[]/)[0].trim()}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDownIcon className="w-4 h-4 absolute top-1/2 right-1.5 -translate-y-1/2 text-slate-500 pointer-events-none" />
                                </div>
                            )}
                            <button 
                                onClick={() => setIsMuted(!isMuted)} 
                                className="text-slate-400 hover:text-slate-600 disabled:text-slate-300 disabled:cursor-not-allowed"
                                aria-label={isMuted ? "Unmute assistant" : "Mute assistant"}
                                disabled={!isVoiceAvailable}
                                title={!isVoiceAvailable ? "Voice output is not available for this language on your device" : (isMuted ? "Unmute" : "Mute")}
                            >
                                {isMuted || !isVoiceAvailable ? <SpeakerXMarkIcon className="w-6 h-6" /> : <SpeakerWaveIcon className="w-6 h-6" />}
                            </button>
                            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <ChevronDownIcon className="w-6 h-6" />
                            </button>
                        </div>
                    </header>

                    <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.role === 'bot' && <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0"><BotIcon className="w-5 h-5 text-slate-500" /></div>}
                                <div className={`max-w-[80%] p-3 rounded-2xl ${msg.role === 'user' ? 'bg-blue-500 text-white rounded-br-lg' : 'bg-slate-200 text-slate-800 rounded-bl-lg'}`}>
                                    <p className="whitespace-pre-wrap text-sm">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                         {isLoading && messages[messages.length - 1]?.role !== 'bot' && (
                             <div className="flex items-end gap-2 justify-start">
                                 <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0"><BotIcon className="w-5 h-5 text-slate-500" /></div>
                                 <div className="max-w-[80%] p-3 rounded-2xl bg-slate-200 text-slate-800 rounded-bl-lg">...</div>
                             </div>
                         )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-3 border-t border-slate-200 bg-white">
                        <div className="flex items-center bg-slate-100 rounded-lg">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder={isListening ? "Listening..." : "Ask or give a command..."}
                                className="flex-1 bg-transparent py-2 px-3 text-slate-800 placeholder-slate-400 focus:outline-none"
                                disabled={isLoading}
                            />
                            {isSpeechSupported ? (
                                <button
                                    onClick={handleToggleListening}
                                    disabled={isLoading}
                                    className={`p-2 transition-colors ${
                                        isListening ? 'text-red-500 animate-pulse' : 'text-slate-500 hover:text-slate-700'
                                    }`}
                                    aria-label={isListening ? 'Stop listening' : 'Start listening'}
                                >
                                    <MicrophoneIcon className="w-6 h-6" />
                                </button>
                            ) : (
                                 <button
                                    className="p-2 text-slate-400 cursor-not-allowed"
                                    title="Voice input is not supported by your browser."
                                    disabled
                                >
                                    <MicrophoneIcon className="w-6 h-6" />
                                </button>
                            )}
                            <button onClick={handleSend} disabled={isLoading || !input} className="p-2 text-blue-500 disabled:text-slate-400 hover:text-blue-600 transition-colors">
                                <SendIcon className="w-6 h-6"/>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
