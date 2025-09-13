

import React, { useState } from 'react';
import type { User } from '../types';
import { ScanIcon, ClipboardListIcon, NewspaperIcon, BrainCircuitIcon, StethoscopeIcon } from './icons';
import { HealthForecast } from './HealthForecast';

interface WelcomePageProps {
  user: User;
  onAnalyze: () => void;
  onAnalyzePrescription: () => void;
  onAnalyzeMentalHealth: () => void;
  onCheckSymptoms: () => void;
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string; onClick: () => void; color: 'blue' | 'green' | 'indigo' | 'teal' | 'purple' | 'slate' }> = ({ icon, title, description, onClick, color }) => {
    const colorClasses = {
        blue: 'bg-blue-500 hover:bg-blue-600 focus-visible:ring-blue-400',
        green: 'bg-green-500 hover:bg-green-600 focus-visible:ring-green-400',
        indigo: 'bg-indigo-500 hover:bg-indigo-600 focus-visible:ring-indigo-400',
        teal: 'bg-teal-500 hover:bg-teal-600 focus-visible:ring-teal-400',
        purple: 'bg-purple-500 hover:bg-purple-600 focus-visible:ring-purple-400',
        slate: 'bg-slate-500 hover:bg-slate-600 focus-visible:ring-slate-400',
    };

    return (
        <button
            onClick={onClick}
            className={`group relative p-6 text-left bg-white rounded-xl shadow-lg border border-slate-200/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden`}
        >
            <div className={`absolute top-0 right-0 h-24 w-24 ${colorClasses[color]} opacity-10 blur-2xl transition-all duration-500 group-hover:opacity-20 group-hover:scale-150`}></div>
            <div className="relative z-10">
                <div className={`mb-4 w-12 h-12 rounded-lg flex items-center justify-center text-white ${colorClasses[color]}`}>
                    {icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800">{title}</h3>
                <p className="mt-1 text-slate-600 text-sm">{description}</p>
                <span className={`absolute bottom-4 right-4 text-xs font-bold text-white py-1 px-2 rounded-full opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ${colorClasses[color]}`}>
                    Start Now &rarr;
                </span>
            </div>
        </button>
    );
};


export const WelcomePage: React.FC<WelcomePageProps> = ({ user, onAnalyze, onAnalyzePrescription, onAnalyzeMentalHealth, onCheckSymptoms }) => {
  const [view, setView] = useState<'actions' | 'briefing'>('actions');

  if (view === 'briefing') {
      return <HealthForecast onBack={() => setView('actions')} />;
  }

  return (
    <div className="w-full min-h-full flex flex-col p-4 sm:p-6 lg:p-8 animate-fade-in bg-slate-100/50">
        <div className="absolute inset-0 z-0 opacity-50 bg-grid-slate-200 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>

        <main className="w-full max-w-5xl mx-auto z-10">
            <header className="mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Welcome, {user.name}!</h1>
                    <p className="text-slate-600">What would you like to do today?</p>
                </div>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
                 <div className="lg:col-span-2">
                    <FeatureCard 
                        icon={<ScanIcon className="w-6 h-6"/>}
                        title="Analyze Environmental Image"
                        description="Upload a photo of a location to identify potential health hazards and receive a detailed safety report."
                        onClick={onAnalyze}
                        color="blue"
                    />
                 </div>
                 <FeatureCard 
                    icon={<NewspaperIcon className="w-6 h-6"/>}
                    title="Daily Health Briefing"
                    description="Get a personalized health forecast for your location, including air quality, UV index, and more."
                    onClick={() => setView('briefing')}
                    color="purple"
                />
                 <FeatureCard 
                    icon={<ClipboardListIcon className="w-6 h-6"/>}
                    title="Analyze Prescription"
                    description="Take a picture of a prescription to get a clear, easy-to-read summary of your medication."
                    onClick={onAnalyzePrescription}
                    color="green"
                />
                 <FeatureCard 
                    icon={<StethoscopeIcon className="w-6 h-6"/>}
                    title="Symptom Checker"
                    description="Describe your symptoms to an AI for a cautious, informational analysis and suggested next steps."
                    onClick={onCheckSymptoms}
                    color="teal"
                />
                 <FeatureCard 
                    icon={<BrainCircuitIcon className="w-6 h-6"/>}
                    title="Mental Wellness Check"
                    description="Take a brief, confidential questionnaire for a supportive reflection on your mental well-being."
                    onClick={onAnalyzeMentalHealth}
                    color="indigo"
                />
            </div>
        </main>
    </div>
  );
};