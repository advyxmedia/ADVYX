import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Clock, Compass, ChevronDown, RotateCcw } from 'lucide-react';

export const ThemeController: React.FC = () => {
  const {
    mode,
    setMode,
    isDark,
    dayPeriod,
    currentHour,
    setSimulatedHour,
    isSimulating,
    localTimeFormatted,
  } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when tapping or clicking anywhere on the screen outside of the controller
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    // Use capture phase so clicks anywhere on the page dismiss the panel immediately
    document.addEventListener('mousedown', handlePointerDown, true);
    document.addEventListener('touchstart', handlePointerDown, true);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown, true);
      document.removeEventListener('touchstart', handlePointerDown, true);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const getPeriodLabel = () => {
    switch (dayPeriod) {
      case 'dawn':
        return 'Dawn / Sunrise';
      case 'day':
        return 'Daylight';
      case 'golden':
        return 'Golden Hour / Dusk';
      case 'night':
        return 'Night Mode';
    }
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger Button */}
      <button
        id="theme-controller-toggle"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border ${
          isDark
            ? 'bg-[#152033] hover:bg-[#1E2E48] text-slate-200 border-slate-700/60 shadow-sm shadow-blue-950/40'
            : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-sm'
        }`}
        title="Google Maps-style Time of Day Theme"
      >
        <span className="relative flex h-2 w-2">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              isDark ? 'bg-sky-400' : 'bg-amber-400'
            }`}
          />
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${
              isDark ? 'bg-[#2374B8]' : 'bg-amber-500'
            }`}
          />
        </span>

        {mode === 'auto' ? (
          <span className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#2374B8]" />
            <span className="hidden sm:inline">Auto:</span>
            <span>{localTimeFormatted}</span>
          </span>
        ) : mode === 'light' ? (
          <span className="flex items-center gap-1.5">
            <Sun className="w-3.5 h-3.5 text-amber-500" />
            <span>Day</span>
          </span>
        ) : (
          <span className="flex items-center gap-1.5">
            <Moon className="w-3.5 h-3.5 text-sky-400" />
            <span>Night</span>
          </span>
        )}

        <ChevronDown className={`w-3 h-3 opacity-60 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Floating Panel (Google Maps Style) */}
      {isOpen && (
        <>
          {/* Full-screen backdrop to catch taps anywhere on screen */}
          <div
            className="fixed inset-0 z-40 bg-transparent cursor-default"
            onClick={() => setIsOpen(false)}
            onTouchStart={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div
            id="theme-controller-panel"
            className={`absolute right-0 mt-2 w-80 p-4 rounded-2xl shadow-2xl z-50 border backdrop-blur-xl transition-all ${
              isDark
                ? 'bg-[#0E1729]/95 border-slate-700/80 text-white shadow-black/60'
                : 'bg-white/95 border-slate-200 text-slate-800 shadow-slate-300/50'
            }`}
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#2374B8]" />
                <span className="font-semibold text-xs tracking-wider uppercase">
                  Google Maps Lighting Engine
                </span>
              </div>
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                isDark ? 'bg-[#2374B8]/20 text-sky-300' : 'bg-sky-50 text-[#2374B8]'
              }`}>
                {getPeriodLabel()}
              </span>
            </div>

            {/* Mode Selectors */}
            <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900/80 mb-3 text-xs">
              <button
                id="theme-mode-auto"
                onClick={() => setMode('auto')}
                className={`py-1.5 px-2 rounded-lg font-medium transition-all flex items-center justify-center gap-1 ${
                  mode === 'auto'
                    ? 'bg-[#2374B8] text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Compass className="w-3 h-3" />
                Auto
              </button>
              <button
                id="theme-mode-light"
                onClick={() => setMode('light')}
                className={`py-1.5 px-2 rounded-lg font-medium transition-all flex items-center justify-center gap-1 ${
                  mode === 'light'
                    ? 'bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Sun className="w-3 h-3 text-amber-500" />
                Day
              </button>
              <button
                id="theme-mode-dark"
                onClick={() => setMode('dark')}
                className={`py-1.5 px-2 rounded-lg font-medium transition-all flex items-center justify-center gap-1 ${
                  mode === 'dark'
                    ? 'bg-white dark:bg-slate-800 text-sky-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Moon className="w-3 h-3 text-sky-400" />
                Night
              </button>
            </div>

            {/* Time Scrubber (Simulation) */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Time-of-Day Slider:
                </span>
                <span className="font-semibold text-[#2374B8] font-mono">
                  {localTimeFormatted}
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="23.75"
                step="0.25"
                value={currentHour}
                onChange={(e) => setSimulatedHour(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#2374B8]"
              />

              <div className="flex justify-between text-[10px] text-slate-400 px-0.5">
                <span>00:00 (Night)</span>
                <span>06:00 (Dawn)</span>
                <span>12:00 (Noon)</span>
                <span>18:00 (Dusk)</span>
                <span>23:00</span>
              </div>

              {isSimulating && (
                <button
                  id="reset-simulation-btn"
                  onClick={() => setSimulatedHour(null)}
                  className="w-full mt-2 py-1.5 px-3 rounded-lg text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset to Live System Clock
                </button>
              )}
            </div>

            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-3 border-t border-slate-200 dark:border-slate-800/80 pt-2 leading-tight">
              Like Google Maps, lighting automatically shifts from bright daytime to dark navigation mode based on time of day.
            </p>
          </div>
        </>
      )}
    </div>
  );
};
