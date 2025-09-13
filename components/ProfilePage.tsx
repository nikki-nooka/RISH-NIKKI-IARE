

import React from 'react';
import type { User } from '../types';
import { ArrowLeftIcon, UserIcon, CheckCircleIcon, AtSymbolIcon, PhoneIcon, GlobeIcon, CalendarIcon, IdentificationIcon } from './icons';

interface ProfilePageProps {
  user: User;
  onBack: () => void;
}

const InfoRow: React.FC<{ icon: React.ReactNode; label: string; value?: string | null }> = ({ icon, label, value }) => (
    <div className="flex items-start gap-4 p-4 transition-colors duration-200 rounded-lg hover:bg-slate-100/80">
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-slate-500">{icon}</div>
        <div className="flex-grow">
            <p className="text-sm font-medium text-slate-500">{label}</p>
            <p className="text-base font-semibold text-slate-800">{value || 'Not provided'}</p>
        </div>
    </div>
);

const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'Not provided';
    try {
        return new Date(dateString).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    } catch (e) {
        return 'Invalid date';
    }
};

export const ProfilePage: React.FC<ProfilePageProps> = ({ user, onBack }) => {
  return (
    <div className="w-full min-h-screen p-4 sm:p-6 lg:p-8 flex flex-col items-center animate-fade-in bg-slate-100">
        <div className="absolute inset-0 z-0 opacity-50 bg-grid-slate-200 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
        <main className="w-full max-w-2xl mx-auto z-10">
            <header className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                    <UserIcon className="w-12 h-12 text-slate-500"/>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">My Profile</h1>
                        <p className="text-slate-600">Your personal and account information.</p>
                    </div>
                </div>
                <button
                    onClick={onBack}
                    className="bg-white hover:bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border border-slate-200"
                    aria-label="Back to dashboard"
                >
                    <ArrowLeftIcon className="w-5 h-5 mr-2" />
                    Back
                </button>
            </header>

            <div className="bg-white rounded-xl shadow-lg border border-slate-200/80 divide-y divide-slate-200/80">
                <div className="p-6">
                    <h2 className="text-xl font-bold text-slate-800">Personal Details</h2>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2">
                        <InfoRow icon={<UserIcon className="w-6 h-6"/>} label="Full Name" value={user.name} />
                        <InfoRow icon={<PhoneIcon className="w-6 h-6"/>} label="Phone Number" value={user.phone} />
                        <InfoRow icon={<AtSymbolIcon className="w-6 h-6"/>} label="Email Address" value={user.email} />
                        <InfoRow icon={<CalendarIcon className="w-6 h-6"/>} label="Date of Birth" value={formatDate(user.date_of_birth)} />
                        <InfoRow icon={<IdentificationIcon className="w-6 h-6"/>} label="Gender" value={user.gender} />
                        <InfoRow icon={<GlobeIcon className="w-6 h-6"/>} label="Place" value={user.place} />
                    </div>
                </div>
                <div className="p-6">
                    <h2 className="text-xl font-bold text-slate-800">Account Information</h2>
                     <div className="mt-4 grid grid-cols-1 sm:grid-cols-2">
                        <InfoRow icon={<CalendarIcon className="w-6 h-6"/>} label="Member Since" value={formatDate(user.created_at)} />
                        <InfoRow icon={<CalendarIcon className="w-6 h-6"/>} label="Last Login" value={formatDate(user.last_login_at)} />
                    </div>
                </div>
            </div>
        </main>
    </div>
  );
};