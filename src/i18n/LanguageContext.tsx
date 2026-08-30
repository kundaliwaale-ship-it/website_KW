'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import en from './locales/en.json';
import hi from './locales/hi.json';

type Locale = 'en' | 'hi';
type Dictionary = typeof en;

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dict: Dictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    // Load preference from local storage on initial mount
    const saved = localStorage.getItem('site_locale') as Locale;
    if (saved === 'hi' || saved === 'en') {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('site_locale', newLocale);
  };

  const dict = locale === 'hi' ? hi : en;

  return (
    <LanguageContext.Provider value={{ locale, setLocale, dict }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
