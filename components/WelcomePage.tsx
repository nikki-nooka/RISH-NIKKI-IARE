import React, { useState } from 'react';
import type { User } from '../types';
import { ScanIcon, NewspaperIcon, StethoscopeIcon, DocumentChartBarIcon, GlassWaterIcon, SparklesIcon } from './icons';
import { HealthForecast } from './HealthForecast';

interface ActionItemCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    onClick: () => void;
    disabled?: boolean;
}

const ActionItemCard: React.FC<ActionItemCardProps> = ({ icon, title, description, onClick, disabled }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="group w-full text-left p-6 bg-white rounded-2xl shadow-md border border-slate-200/80 transition-all duration-300 
                       disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-md 
                       breathing-border"
            style={{ animationPlayState: disabled ? 'paused' : 'running' }}
        >
            <div className="flex items-center gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-slate-100 transition-colors duration-300 group-hover:bg-slate-200">
                    {icon}
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-800">{title}</h3>
                    <p className="mt-1 text-slate-600 text-sm">{description}</p>
                </div>
            </div>
        </button>
    );
};

interface WelcomePageProps {
  user: User;
  onAnalyze: () => void;
  onAnalyzePrescription: () => void;
  onAnalyzeMentalHealth: () => void;
  onCheckSymptoms: () => void;
  onWaterLog: () => void;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({ user, onAnalyze, onAnalyzePrescription, onAnalyzeMentalHealth, onCheckSymptoms, onWaterLog }) => {
  const [view, setView] = useState<'actions' | 'briefing'>('actions');

  const actions = [
    {
      icon: <NewspaperIcon className="w-7 h-7 text-purple-500" />,
      title: 'HealthCast',
      description: 'Your daily health forecast',
      onClick: () => setView('briefing'),
    },
    {
      icon: <ScanIcon className="w-7 h-7 text-blue-500" />,
      title: 'Area Scan',
      description: 'Analyze surroundings for risks',
      onClick: onAnalyze,
    },
    {
      icon: <StethoscopeIcon className="w-7 h-7 text-teal-500" />,
      title: 'Symptom Checker',
      description: 'Get AI-driven insights',
      onClick: onCheckSymptoms,
    },
    {
      icon: <DocumentChartBarIcon className="w-7 h-7 text-orange-500" />,
      title: 'Script Reader',
      description: 'Interpret prescriptions easily',
      onClick: onAnalyzePrescription,
    },
    {
      icon: <GlassWaterIcon className="w-7 h-7 text-cyan-500" />,
      title: 'Water Log',
      description: 'Track your daily intake',
      onClick: onWaterLog,
      disabled: false,
    },
    {
      icon: <SparklesIcon className="w-7 h-7 text-indigo-500" />,
      title: 'Mind Check',
      description: 'Reflect on your well-being',
      onClick: onAnalyzeMentalHealth,
    },
  ];

  if (view === 'briefing') {
      return <HealthForecast onBack={() => setView('actions')} />;
  }

  return (
    <div className="w-full min-h-full flex flex-col items-center p-4 sm:p-6 lg:p-8 animate-fade-in bg-slate-100/50">
        <div className="absolute inset-0 z-0 opacity-50 bg-grid-slate-200 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
        <div className="w-full max-w-2xl z-10">
            <header className="mb-8 text-center sm:text-left">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Welcome, {user.name}!</h1>
                    <p className="text-slate-600">What would you like to do today?</p>
                </div>
            </header>
            
            <div className="space-y-4">
                {actions.map((action, index) => (
                    <div
                      key={action.title}
                      className="animate-slide-in-left"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <ActionItemCard {...action} />
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};