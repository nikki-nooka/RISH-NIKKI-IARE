import React, { useState, useEffect } from 'react';
import { getLiveHealthAlerts } from '../services/geminiService';
import type { Alert, AlertCategory } from '../types';
import { BiohazardIcon, WindIcon, SunIcon, GlobeIcon, MegaphoneIcon } from './icons';
import { LoadingSpinner } from './LoadingSpinner';
import { AlertDetailModal } from './AlertDetailModal';

const getIconForCategory = (category: AlertCategory, className: string = "w-5 h-5") => {
    switch (category) {
        case 'disease': return <BiohazardIcon className={`${className} text-red-500`} />;
        case 'air': return <WindIcon className={`${className} text-slate-500`} />;
        case 'heat': return <SunIcon className={`${className} text-orange-500`} />;
        case 'environmental': return <GlobeIcon className={`${className} text-green-500`} />;
        case 'other': return <MegaphoneIcon className={`${className} text-purple-500`} />;
        default: return <GlobeIcon className={`${className} text-blue-500`} />;
    }
};

export const LiveHealthAlerts: React.FC = () => {
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [currentAlertIndex, setCurrentAlertIndex] = useState(0);
    const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAlerts = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const fetchedAlerts = await getLiveHealthAlerts();
            if (fetchedAlerts.length > 0) {
                setAlerts(fetchedAlerts);
                setCurrentAlertIndex(0);
            } else {
                 setError("No new health alerts found at this time.");
            }
        } catch (err) {
            console.error(err);
            setError("Failed to fetch live health alerts. The service may be temporarily unavailable.");
            setAlerts([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch alerts on mount and then every 5 minutes
    useEffect(() => {
        fetchAlerts();
        const fetchInterval = setInterval(fetchAlerts, 300000); // 5 minutes
        return () => clearInterval(fetchInterval);
    }, []);

    // Cycle through alerts every 30 seconds
    useEffect(() => {
        if (alerts.length > 1) {
            const cycleInterval = setInterval(() => {
                setCurrentAlertIndex(prevIndex => (prevIndex + 1) % alerts.length);
            }, 30000); // 30 seconds
            return () => clearInterval(cycleInterval);
        }
    }, [alerts]);

    const currentAlert = alerts[currentAlertIndex];

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex flex-col items-center justify-center h-48 text-center text-slate-500">
                    <LoadingSpinner />
                    <p className="mt-3 font-medium">Fetching Latest Global Alerts...</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="flex flex-col items-center justify-center h-48 text-center text-red-600 bg-red-50 rounded-lg p-4">
                    <p className="font-bold">Error</p>
                    <p>{error}</p>
                </div>
            );
        }

        if (!currentAlert) {
             return (
                <div className="flex flex-col items-center justify-center h-48 text-center text-slate-500">
                    <p>No health alerts to display currently.</p>
                </div>
            );
        }

        return (
            <div key={currentAlert.id} className="animate-fade-in w-full">
                <button
                    onClick={() => setSelectedAlert(currentAlert)}
                    className="w-full text-left p-4 bg-slate-50/80 rounded-lg hover:bg-slate-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center mt-1">
                            {getIconForCategory(currentAlert.category, "w-6 h-6")}
                        </div>
                        <div className="flex-grow min-w-0">
                            <p className="text-base text-slate-800 font-semibold truncate">{currentAlert.title}</p>
                            <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                                <span>{currentAlert.location}</span>
                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                                <span>Live</span>
                            </div>
                        </div>
                         <span className="text-xs font-bold text-blue-500 self-center hidden sm:block">View Details &rarr;</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1 mt-4 overflow-hidden">
                         <div className="bg-blue-500 h-1 rounded-full animate-[progress-bar_30s_linear_infinite]"></div>
                    </div>
                </button>
                 <style>{`
                    @keyframes progress-bar {
                        from { width: 0%; }
                        to { width: 100%; }
                    }
                `}</style>
            </div>
        );
    };

    return (
        <section className="w-full max-w-4xl mx-auto py-8 mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-center text-slate-700 mb-2">Live Global Health Alerts</h2>
            <div className="relative flex justify-center items-center">
                 <div className="h-0.5 w-16 bg-blue-500"></div>
            </div>
            <div className="mt-6 bg-white border border-slate-200/80 rounded-lg shadow-sm p-4 min-h-[10rem] flex items-center justify-center">
                {renderContent()}
            </div>
            {selectedAlert && <AlertDetailModal alert={selectedAlert} onClose={() => setSelectedAlert(null)} />}
        </section>
    );
};