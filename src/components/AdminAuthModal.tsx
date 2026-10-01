import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Lock, KeyRound, ShieldAlert, X, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (rememberMe: boolean) => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { isDark } = useTheme();
  const [passkey, setPasskey] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanKey = passkey.trim();
    const customPass = localStorage.getItem('advyx_admin_password');

    // Valid passkeys: 'advyx', 'admin', 'creator', or custom password if configured
    if (
      cleanKey.toLowerCase() === 'advyx' ||
      cleanKey.toLowerCase() === 'admin' ||
      cleanKey.toLowerCase() === 'creator' ||
      (customPass && cleanKey === customPass)
    ) {
      setError('');
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setPasskey('');
        onSuccess(rememberMe);
      }, 350);
    } else {
      setError('Access denied. Invalid administrator passkey.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/75 animate-in fade-in duration-200">
      <div
        className={`w-full max-w-md rounded-3xl border shadow-2xl p-6 sm:p-8 relative ${
          isDark
            ? 'bg-[#0E1729] border-slate-800 text-white shadow-black/80'
            : 'bg-white border-slate-200 text-slate-900 shadow-slate-400/30'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close Admin Login"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Lock Graphic Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#2374B8]/15 border border-[#2374B8]/30 text-[#2374B8] flex items-center justify-center mb-3 shadow-inner">
            {isSuccess ? (
              <CheckCircle2 className="w-7 h-7 text-emerald-500 animate-in zoom-in duration-200" />
            ) : (
              <Lock className="w-7 h-7 text-[#2374B8]" />
            )}
          </div>
          <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-semibold mb-1.5">
            Restricted Access
          </span>
          <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
            ADVYX Operations Portal
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs leading-relaxed">
            This section is restricted to agency founders and administrators. Visitors and clients cannot view internal inquiries or appointment records.
          </p>
        </div>

        {/* Error Notice */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Administrator Passkey:
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={passkey}
                onChange={(e) => {
                  setPasskey(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter passkey (e.g. advyx)"
                autoFocus
                className="w-full pl-10 pr-11 py-2.5 rounded-xl text-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2374B8] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="flex items-center justify-between mt-2">
              <label className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-[#2374B8] focus:ring-[#2374B8]"
                />
                <span>Remember this device</span>
              </label>
              <span className="text-[11px] text-slate-400">
                Default key: <strong className="text-slate-600 dark:text-slate-300 font-mono">advyx</strong>
              </span>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-2.5 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 py-2.5 rounded-xl text-xs font-semibold bg-[#2374B8] hover:bg-[#1C5F97] text-white shadow-sm shadow-[#2374B8]/30 transition-all flex items-center justify-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Unlock Hub</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
