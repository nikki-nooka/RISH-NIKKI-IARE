import React from 'react';
import type { User, Page } from '../types';
import { GlobeIcon, HomeIcon, BellIcon, HistoryIcon, UserIcon, LogoutIcon } from './icons';

interface SidebarProps {
  user: User;
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

const NavItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                isActive
                    ? 'bg-slate-700 text-white'
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
            }`}
        >
            {icon}
            <span className="ml-3">{label}</span>
        </button>
    );
};


export const Sidebar: React.FC<SidebarProps> = ({ user, currentPage, onNavigate, onLogout }) => {
    const navItems: { page: Page; label: string; icon: React.ReactNode }[] = [
        { page: 'welcome', label: 'Dashboard', icon: <HomeIcon className="w-5 h-5" /> },
        { page: 'live-alerts', label: 'Live Alerts', icon: <BellIcon className="w-5 h-5" /> },
        { page: 'activity-history', label: 'Activity History', icon: <HistoryIcon className="w-5 h-5" /> },
        { page: 'profile', label: 'My Profile', icon: <UserIcon className="w-5 h-5" /> },
    ];

    return (
        <aside className="hidden md:flex w-64 bg-slate-800 text-white flex-col flex-shrink-0 h-screen p-4">
            {/* Header */}
            <div className="flex items-center gap-2 px-2 pb-4 border-b border-slate-700">
                <GlobeIcon className="w-8 h-8 text-blue-400" />
                <h1 className="text-xl font-bold tracking-tight">GeoSick</h1>
            </div>

            {/* Navigation */}
            <nav className="flex-grow mt-6 space-y-2">
                {navItems.map(item => (
                    <NavItem
                        key={item.page}
                        icon={item.icon}
                        label={item.label}
                        isActive={currentPage === item.page}
                        onClick={() => onNavigate(item.page)}
                    />
                ))}
            </nav>

            {/* Footer / User Profile */}
            <div className="mt-6 pt-4 border-t border-slate-700">
                 <div className="flex items-center gap-3 p-2 rounded-lg">
                     <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-bold">
                        {user.name.charAt(0)}
                     </div>
                     <div className="flex-grow min-w-0">
                         <p className="font-semibold text-sm truncate">{user.name}</p>
                         <p className="text-xs text-slate-400 truncate">{user.phone}</p>
                     </div>
                 </div>
                 <button
                    onClick={onLogout}
                    className="flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 text-slate-300 hover:bg-red-500/20 hover:text-red-300 mt-2"
                >
                    <LogoutIcon className="w-5 h-5" />
                    <span className="ml-3">Logout</span>
                </button>
            </div>
        </aside>
    );
};