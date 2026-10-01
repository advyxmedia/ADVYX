import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, TranslationDictionary, TRANSLATIONS } from '../data/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language, isManual?: boolean) => void;
  isAutoDetected: boolean;
  browserLanguage: string;
  resetToBrowserDefault: () => void;
  t: TranslationDictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Helper to detect if browser preference is Spanish, Thai, or English
  const detectPreferredLanguage = (): Language => {
    try {
      const navLangs = navigator.languages || [navigator.language || ''];
      for (const rawLang of navLangs) {
        if (!rawLang) continue;
        const l = rawLang.toLowerCase();
        if (l.startsWith('es') || l.includes('spanish') || l.includes('español')) {
          return 'es';
        }
        if (l.startsWith('th') || l.includes('thai')) {
          return 'th';
        }
      }
      return 'en';
    } catch {
      return 'en';
    }
  };

  const [browserLang, setBrowserLang] = useState<string>(() => {
    try {
      return navigator.language || 'en';
    } catch {
      return 'en';
    }
  });

  const [isManual, setIsManual] = useState<boolean>(() => {
    try {
      return localStorage.getItem('advyx_lang_manual') === 'true';
    } catch {
      return false;
    }
  });

  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('advyx_lang_preference') as Language;
      const wasManual = localStorage.getItem('advyx_lang_manual') === 'true';
      if (wasManual && (saved === 'en' || saved === 'es' || saved === 'th')) {
        return saved;
      }
      // Auto-detect from visitor's browser (e.g., Spanish for Spain, Thai for Thailand, English default)
      return detectPreferredLanguage();
    } catch {
      return 'en';
    }
  });

  // Keep <html lang="..."> in sync with the current language
  useEffect(() => {
    try {
      document.documentElement.lang = language;
    } catch {
      // ignore
    }
  }, [language]);

  // Listen to browser language changes (e.g. user changes Edge/Chrome settings)
  useEffect(() => {
    const handleLanguageChange = () => {
      const currentNavLang = navigator.language || 'en';
      setBrowserLang(currentNavLang);

      // Only auto-switch if user hasn't explicitly locked a manual choice
      const manualSetting = localStorage.getItem('advyx_lang_manual') === 'true';
      if (!manualSetting) {
        const nextLang = detectPreferredLanguage();
        setLanguageState(nextLang);
        localStorage.setItem('advyx_lang_preference', nextLang);
      }
    };

    window.addEventListener('languagechange', handleLanguageChange);
    return () => window.removeEventListener('languagechange', handleLanguageChange);
  }, []);

  const setLanguage = (lang: Language, manual: boolean = true) => {
    setLanguageState(lang);
    if (manual) {
      setIsManual(true);
      try {
        localStorage.setItem('advyx_lang_preference', lang);
        localStorage.setItem('advyx_lang_manual', 'true');
      } catch {
        // ignore
      }
    }
  };

  const resetToBrowserDefault = () => {
    setIsManual(false);
    try {
      localStorage.removeItem('advyx_lang_manual');
      const detected = detectPreferredLanguage();
      setLanguageState(detected);
      localStorage.setItem('advyx_lang_preference', detected);
    } catch {
      // ignore
    }
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    isAutoDetected: !isManual,
    browserLanguage: browserLang,
    resetToBrowserDefault,
    t: TRANSLATIONS[language] || TRANSLATIONS.en,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: 'en',
      setLanguage: () => {},
      isAutoDetected: false,
      browserLanguage: 'en',
      resetToBrowserDefault: () => {},
      t: TRANSLATIONS.en,
    };
  }
  return context;
};
