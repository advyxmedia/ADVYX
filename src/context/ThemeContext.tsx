import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeMode, DayPeriod } from '../types';

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  isDark: boolean;
  dayPeriod: DayPeriod;
  currentHour: number;
  setSimulatedHour: (hour: number | null) => void;
  isSimulating: boolean;
  localTimeFormatted: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('advyx_theme_mode');
    return (saved as ThemeMode) || 'auto';
  });

  const [simulatedHour, setSimulatedHour] = useState<number | null>(null);
  const [currentRealHour, setCurrentRealHour] = useState<number>(new Date().getHours());
  const [realTime, setRealTime] = useState<Date>(new Date());

  // Clock tick
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setRealTime(now);
      setCurrentRealHour(now.getHours() + now.getMinutes() / 60);
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  const activeHour = simulatedHour !== null ? simulatedHour : currentRealHour;
  const isSimulating = simulatedHour !== null;

  // Determine DayPeriod based on 24h clock
  const getPeriod = (hour: number): DayPeriod => {
    if (hour >= 5 && hour < 8) return 'dawn';
    if (hour >= 8 && hour < 17.5) return 'day';
    if (hour >= 17.5 && hour < 20) return 'golden';
    return 'night';
  };

  const dayPeriod = getPeriod(activeHour);

  // Determine effective isDark
  const isDark =
    mode === 'dark'
      ? true
      : mode === 'light'
      ? false
      : dayPeriod === 'golden' || dayPeriod === 'night';

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    localStorage.setItem('advyx_theme_mode', newMode);
  };

  // Sync class on document
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      document.body.style.backgroundColor = '#0A0F1D';
      document.body.style.color = '#F1F5F9';
    } else {
      root.classList.remove('dark');
      document.body.style.backgroundColor = '#F8FAFC';
      document.body.style.color = '#0F172A';
    }
  }, [isDark]);

  // Format active time for display
  const activeHoursInt = Math.floor(activeHour);
  const activeMinutesInt = Math.floor((activeHour % 1) * 60);
  const displayHour = activeHoursInt % 12 || 12;
  const ampm = activeHoursInt >= 12 ? 'PM' : 'AM';
  const padMin = activeMinutesInt < 10 ? `0${activeMinutesInt}` : `${activeMinutesInt}`;
  const localTimeFormatted = `${displayHour}:${padMin} ${ampm}`;

  return (
    <ThemeContext.Provider
      value={{
        mode,
        setMode,
        isDark,
        dayPeriod,
        currentHour: activeHour,
        setSimulatedHour,
        isSimulating,
        localTimeFormatted,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
