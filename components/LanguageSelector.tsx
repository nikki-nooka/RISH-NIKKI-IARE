import React from 'react';
import { useI18n } from './I18n';
import { supportedLanguages } from '../data/translations';
import { GlobeAltIcon } from './icons';

interface LanguageSelectorProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className, variant = 'light' }) => {
  const { language, setLanguage } = useI18n();

  const baseClasses = "w-full appearance-none text-sm font-medium rounded-md py-2 pl-10 pr-4 focus:ring-blue-500 focus:border-blue-500 cursor-pointer";
  const lightClasses = "bg-white border border-slate-300 text-slate-700";
  const darkClasses = "bg-slate-700/50 border border-slate-600 text-slate-200";

  return (
    <div className={`relative ${className || ''}`}>
      <GlobeAltIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className={`${baseClasses} ${variant === 'light' ? lightClasses : darkClasses}`}
        aria-label="Select language"
      >
        {supportedLanguages.map(lang => (
          <option key={lang.code} value={lang.code}>{lang.name}</option>
        ))}
      </select>
    </div>
  );
};
