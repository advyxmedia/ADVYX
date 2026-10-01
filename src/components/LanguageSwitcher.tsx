import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Globe, Check, ChevronDown, Sparkles, RotateCcw } from 'lucide-react';
import { Language } from '../data/translations';

interface LanguageSwitcherProps {
  className?: string;
  isMobile?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className = '',
  isMobile = false,
}) => {
  const { language, setLanguage, isAutoDetected, browserLanguage, resetToBrowserDefault } = useLanguage();
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when tapping anywhere outside
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown, true);
    document.addEventListener('touchstart', handlePointerDown, true);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown, true);
      document.removeEventListener('touchstart', handlePointerDown, true);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const languages: { code: Language; label: string; nativeName: string; flag: string }[] = [
    { code: 'en', label: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'es', label: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
    { code: 'th', label: 'Thai', nativeName: 'ภาษาไทย', flag: '🇹🇭' },
  ];

  const currentObj = languages.find((l) => l.code === language) || languages[0];

  const handleSelect = (code: Language) => {
    setLanguage(code, true);
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-[#2374B8]" />
            Language / Idioma / ภาษา
          </span>
          {isAutoDetected && (
            <span className="text-[10px] text-[#2374B8] bg-sky-50 dark:bg-sky-950/60 px-2 py-0.5 rounded-full border border-sky-200 dark:border-sky-800">
              Auto ({browserLanguage.slice(0, 2).toUpperCase()})
            </span>
          )}
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {languages.map((item) => (
            <button
              key={item.code}
              type="button"
              onClick={() => handleSelect(item.code)}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold border transition-all ${
                language === item.code
                  ? 'bg-[#2374B8] text-white border-[#2374B8] shadow-sm shadow-[#2374B8]/30'
                  : isDark
                  ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span className="text-sm">{item.flag}</span>
              <span className="truncate">{item.nativeName}</span>
            </button>
          ))}
        </div>
        {!isAutoDetected && (
          <button
            type="button"
            onClick={resetToBrowserDefault}
            className="inline-flex items-center justify-center gap-1.5 text-[11px] font-medium text-slate-400 hover:text-[#2374B8] transition-colors py-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Auto ({browserLanguage.slice(0, 2).toUpperCase()})</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Trigger Button */}
      <button
        id="language-switcher-btn"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
          isDark
            ? 'bg-slate-800/70 hover:bg-slate-800 border-slate-700 text-slate-200 shadow-sm'
            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-sm'
        } ${isOpen ? 'ring-2 ring-[#2374B8]/40 border-[#2374B8]' : ''}`}
        aria-label="Change site language"
        aria-expanded={isOpen}
      >
        <span className="text-sm leading-none">{currentObj.flag}</span>
        <span className="font-bold">{currentObj.code.toUpperCase()}</span>
        <ChevronDown
          className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#2374B8]' : ''
          }`}
        />
      </button>

      {/* Dropdown Floating Panel */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-transparent cursor-default"
            onClick={() => setIsOpen(false)}
            onTouchStart={() => setIsOpen(false)}
            aria-hidden="true"
          />

          <div
            id="language-switcher-dropdown"
            className={`absolute right-0 mt-2 w-64 rounded-2xl border p-2 z-50 shadow-xl transition-all animate-in fade-in zoom-in-95 duration-150 ${
              isDark
                ? 'bg-[#0E1729] border-slate-700/80 text-white shadow-black/60'
                : 'bg-white border-slate-200 text-slate-900 shadow-lg'
            }`}
            role="menu"
            aria-orientation="vertical"
          >
            {/* Header info */}
            <div className="px-3 py-2 border-b border-slate-200/70 dark:border-slate-800 flex items-center justify-between mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Language / Idioma / ภาษา
              </span>
              {isAutoDetected && (
                <span className="text-[10px] font-semibold text-[#2374B8] bg-sky-50 dark:bg-sky-950/60 px-1.5 py-0.5 rounded-full border border-sky-200 dark:border-sky-800 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  Auto
                </span>
              )}
            </div>

            {/* Language list */}
            <div className="flex flex-col gap-1">
              {languages.map((item) => {
                const isSelected = language === item.code;
                return (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => handleSelect(item.code)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all text-left ${
                      isSelected
                        ? 'bg-[#2374B8] text-white shadow-sm'
                        : isDark
                        ? 'hover:bg-slate-800/80 text-slate-200'
                        : 'hover:bg-slate-100 text-slate-700'
                    }`}
                    role="menuitem"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{item.flag}</span>
                      <div>
                        <div className="font-bold">{item.nativeName}</div>
                        <div
                          className={`text-[10px] font-normal ${
                            isSelected ? 'text-sky-100' : 'text-slate-400'
                          }`}
                        >
                          {item.label}
                        </div>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-white" />}
                  </button>
                );
              })}
            </div>

            {/* Browser language detection note & reset */}
            <div className="mt-2 pt-2 border-t border-slate-200/70 dark:border-slate-800 px-3 pb-1">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Browser: {browserLanguage}</span>
                {!isAutoDetected ? (
                  <button
                    type="button"
                    onClick={resetToBrowserDefault}
                    className="inline-flex items-center gap-1 text-[#2374B8] hover:underline font-semibold"
                    title="Auto-detect based on Edge/Chrome browser language"
                  >
                    <RotateCcw className="w-2.5 h-2.5" />
                    <span>Auto-detect</span>
                  </button>
                ) : (
                  <span className="text-[10px] text-emerald-500 font-medium">Synced</span>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
