
import React, { useState, useEffect } from 'react';
import type { ActivityLogItem } from '../types';
import { ArrowLeftIcon, LockClosedIcon, ListBulletIcon, ScanIcon, ClipboardListIcon, BrainCircuitIcon, StethoscopeIcon } from './icons';

const GLOBAL_ACTIVITY_HISTORY_KEY = 'geosick_global_activity_history';

interface AdminDashboardPageProps {
  onBack: () => void;
}

const ActivityIcon: React.FC<{ type: ActivityLogItem['type'] }> = ({ type }) => {
    switch (type) {
        case 'image-analysis': return <ScanIcon className="w-5 h-5 text-blue-500" />;
        case 'prescription-analysis': return <ClipboardListIcon className="w-5 h-5 text-green-500" />;
        case 'mental-health': return <BrainCircuitIcon className="w-5 h-5 text-indigo-500" />;
        case 'symptom-checker': return <StethoscopeIcon className="w-5 h-5 text-teal-500" />;
        case 'login': return <LockClosedIcon className="w-5 h-5 text-slate-500" />;
        default: return <ListBulletIcon className="w-5 h-5 text-slate-500" />;
    }
};

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onBack }) => {
    const [activities, setActivities] = useState<ActivityLogItem[]>([]);

    useEffect(() => {
        try {
            const storedActivities = JSON.parse(localStorage.getItem(GLOBAL_ACTIVITY_HISTORY_KEY) || '[]');
            setActivities(storedActivities);
        } catch (e) {
            console.error("Failed to load global activities from localStorage", e);
        }
    }, []);

    return (
        <div className="w-full min-h-screen p-4 sm:p-6 lg:p-8 flex flex-col items-center animate-fade-in bg-slate-100">
            <header className="w-full max-w-4xl mx-auto flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                    <LockClosedIcon className="w-10 h-10 text-slate-600" />
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
                            Admin Dashboard
                        </h1>
                        <p className="text-slate-600">Global Application Activity</p>
                    </div>
                </div>
                <button 
                    onClick={onBack}
                    className="bg-white/80 backdrop-blur-md text-slate-700 font-semibold py-2 px-4 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-white"
                    aria-label="Back to Welcome Page"
                >
                    <ArrowLeftIcon className="w-5 h-5 mr-2" />
                    Back
                </button>
            </header>

            <main className="w-full max-w-4xl mx-auto">
                {/* Activity Feed */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200/80">
                    <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                       <ListBulletIcon className="w-6 h-6 text-slate-500" />
                       Global Activity Feed
                    </h2>
                    <div className="max-h-[65vh] overflow-y-auto pr-2">
                        {activities.length > 0 ? (
                             <div className="space-y-4">
                                {activities.map(item => (
                                     <div key={item.id} className="flex items-start gap-3 p-3 bg-slate-50 rounded-md border border-slate-200/80">
                                         <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white flex items-center justify-center mt-1 border">
                                            <ActivityIcon type={item.type} />
                                         </div>
                                         <div className="flex-grow">
                                            <p className="font-semibold text-sm text-slate-800">{item.title}</p>
                                            <p className="text-xs text-slate-500 mt-0.5">by <span className="font-medium">{item.userPhone}</span></p>
                                            <p className="text-xs text-slate-400 mt-1">
                                                {new Date(item.timestamp).toLocaleString(undefined, {
                                                    dateStyle: 'medium',
                                                    timeStyle: 'short',
                                                })}
                                            </p>
                                         </div>
                                     </div>
                                ))}
                             </div>
                        ) : (
                            <p className="text-center text-slate-500 py-8">No user activity has been recorded yet.</p>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};
