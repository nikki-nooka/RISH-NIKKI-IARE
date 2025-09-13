import React, { useState, useEffect } from 'react';
import { getLiveHealthAlerts } from '../services/geminiService';
import type { Alert, AlertCategory } from '../types';
import { BiohazardIcon, WindIcon, SunIcon, GlobeIcon, MapPinIcon, MegaphoneIcon, BellIcon } from './icons';
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

const AlertSkeleton: React.FC = () => (
    <div className="w-full flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-slate-200/80 animate-pulse">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-200"></div>
        <div className="flex-grow space-y-2">
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            <div className="h-3 bg-slate-200 rounded w-1/2"></div>
        </div>
    </div>
);


export const AlertsPage: React.FC = () => {
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    const fetchAlerts = async (isManualRefresh = false) => {
        if (!isManualRefresh) {
            setIsLoading(true);
        }
        setError(null);
        try {
            const fetchedAlerts = await getLiveHealthAlerts();
            if (fetchedAlerts.length > 0) {
                setAlerts(fetchedAlerts);
                setLastUpdated(new Date());
            } else {
                 setError("No new health alerts found at this time.");
                 setAlerts([]);
            }
        } catch (err) {
            console.error(err);
            setError("Failed to fetch live health alerts. The service may be temporarily unavailable.");
            setAlerts([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // fetchAlerts();
        // const interval = setInterval(() => fetchAlerts(true), 300000); // 5 minutes
        // return () => clearInterval(interval);
        setIsLoading(false);
        setError("Live health alerts are temporarily disabled to conserve resources.");
    }, []);

    return (
        <div className="w-full min-h-full flex flex-col p-4 sm:p-6 lg:p-8 animate-fade-in">
            <header className="w-full max-w-5xl mx-auto mb-8">
                 <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                           <BellIcon className="w-8 h-8 text-blue-500" /> Live Global Health Alerts
                        </h1>
                        <p className="text-slate-600">The latest health intelligence from around the world.</p>
                    </div>
                     <button
                        onClick={() => fetchAlerts(true)}
                        disabled={true}
                        className="bg-white hover:bg-slate-100 text-blue-500 font-semibold py-2 px-4 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border border-blue-200 disabled:opacity-50"
                     >
                         <svg className={`w-5 h-5 mr-2 ${isLoading ? 'animate-spin' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 11.664 0l3.181-3.183m-4.991-2.691V5.25a3.75 3.75 0 0 0-3.75-3.75H8.25a3.75 3.75 0 0 0-3.75 3.75v5.25m0 0h4.992" />
                         </svg>
                        {isLoading ? 'Refreshing...' : 'Refresh'}
                     </button>
                 </div>
                 {lastUpdated && !isLoading && <p className="text-xs text-slate-500 mt-2">Last updated: {lastUpdated.toLocaleTimeString()}</p>}
            </header>

            <main className="w-full max-w-3xl mx-auto">
                {isLoading && (
                    <div className="space-y-4">
                        {Array.from({ length: 5 }).map((_, i) => <AlertSkeleton key={i} />)}
                    </div>
                )}
                {error && !isLoading && (
                    <div className="text-center p-8 bg-red-50 rounded-lg">
                        <p className="font-bold text-red-700">An Error Occurred</p>
                        <p className="text-red-600 mt-2">{error}</p>
                    </div>
                )}
                {!isLoading && !error && (
                    <div className="space-y-4">
                        {alerts.map(alert => (
                             <button
                                key={alert.id}
                                onClick={() => setSelectedAlert(alert)}
                                className="w-full flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-slate-200/80 hover:shadow-md hover:border-blue-300 transition-all text-left animate-fade-in-up group"
                            >
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                                    {getIconForCategory(alert.category, "w-7 h-7")}
                                </div>
                                <div className="flex-grow min-w-0">
                                    <p className="font-semibold text-slate-800">{alert.title}</p>
                                    <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                                        <MapPinIcon className="w-4 h-4"/>
                                        <span>{alert.location}</span>
                                    </div>
                                </div>
                                <span className="text-xs font-bold text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">View Details &rarr;</span>
                            </button>
                        ))}
                    </div>
                )}
                 {selectedAlert && <AlertDetailModal alert={selectedAlert} onClose={() => setSelectedAlert(null)} />}
            </main>
        </div>
    );
};
