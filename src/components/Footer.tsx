import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { AdvyxLogo } from './AdvyxLogo';
import { ArrowUp, Mail, Instagram, Compass, Lock } from 'lucide-react';
import { XLogoIcon, ThreadsLogoIcon } from './SocialIcons';

interface FooterProps {
  onOpenDashboard: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDashboard }) => {
  const { isDark, localTimeFormatted } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className={`border-t py-16 transition-colors duration-300 ${
        isDark ? 'bg-[#080C17] border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-slate-200/80 dark:border-slate-800/80">
          {/* Brand Info */}
          <div className="md:col-span-5">
            <div className="mb-4">
              <AdvyxLogo variant="badge" size="md" isDark={isDark} />
            </div>
            <p className="text-xs sm:text-sm max-w-sm leading-relaxed mb-6">
              Boutique digital marketing, social media management, performance advertising, and visual brand identity for visionary founders.
            </p>

            {/* Social & Email Channels with Authentic Brand Colors */}
            <div className="flex items-center gap-3">
              {/* Instagram */}
              <a
                href="https://instagram.com/advyxmedia"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl text-[#E1306C] bg-[#E1306C]/10 hover:bg-[#E1306C]/20 border border-[#E1306C]/25 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-sm"
                aria-label="Instagram (@advyxmedia)"
                title="Instagram (@advyxmedia)"
              >
                <Instagram className="w-4 h-4" />
              </a>

              {/* Modern X (formerly Twitter) */}
              <a
                href="https://x.com/advyx81998"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl text-[#1DA1F2] bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 border border-[#1DA1F2]/25 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-sm"
                aria-label="X (@advyx81998)"
                title="X (@advyx81998)"
              >
                <XLogoIcon className="w-4 h-4" />
              </a>

              {/* Modern Threads - Authentic Meta Monochrome Brand Color */}
              <a
                href="https://www.threads.net/@advyxmedia"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-sm ${
                  isDark
                    ? 'text-white bg-white/10 hover:bg-white/20 border border-white/20'
                    : 'text-black bg-black/5 hover:bg-black/10 border border-black/15'
                }`}
                aria-label="Threads (@advyxmedia)"
                title="Threads (@advyxmedia)"
              >
                <ThreadsLogoIcon className="w-4 h-4" />
              </a>

              {/* Email */}
              <a
                href="mailto:advyxmedia@gmail.com"
                className="w-9 h-9 rounded-xl text-[#EA4335] bg-[#EA4335]/10 hover:bg-[#EA4335]/20 border border-[#EA4335]/25 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-sm"
                aria-label="Email (advyxmedia@gmail.com)"
                title="Direct Inquiries (advyxmedia@gmail.com)"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3">
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Sitemap
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#services" className={`transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-black'}`}>
                  Services & Retainers
                </a>
              </li>
              <li>
                <a href="#case-studies" className={`transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-black'}`}>
                  Case Studies & Work
                </a>
              </li>
              <li>
                <a href="#about" className={`transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-black'}`}>
                  Agency Background
                </a>
              </li>
              <li>
                <a href="#discovery-calendar" className={`transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-black'}`}>
                  Discovery Calendar
                </a>
              </li>
              <li>
                <a href="#testimonials" className={`transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-black'}`}>
                  Client Reviews
                </a>
              </li>
              <li>
                <a href="#contact" className={`transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-black'}`}>
                  Inquiries & Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Agency Operations & Hours - High Contrast in Both Day (Black) & Night (White) */}
          <div className="md:col-span-4">
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-4 ${isDark ? 'text-white' : 'text-slate-950'}`}>
              Agency Operations
            </h4>
            <div className="space-y-4 text-xs">
              <div>
                <span className={`block text-[11px] font-semibold uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Direct Contact
                </span>
                <a
                  href="mailto:advyxmedia@gmail.com"
                  className={`font-mono font-bold text-xs hover:underline block ${isDark ? 'text-white' : 'text-slate-950'}`}
                >
                  advyxmedia@gmail.com
                </a>
              </div>

              <div>
                <span className={`block text-[11px] font-semibold uppercase tracking-wider mb-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Official Channels
                </span>
                <div className="flex flex-col gap-2 font-medium text-xs">
                  <a
                    href="https://instagram.com/advyxmedia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`hover:underline flex items-center gap-2 ${isDark ? 'text-white hover:text-slate-200' : 'text-slate-950 hover:text-black'}`}
                  >
                    <Instagram className={`w-3.5 h-3.5 shrink-0 ${isDark ? 'text-white' : 'text-slate-950'}`} />
                    <span>@advyxmedia (Instagram)</span>
                  </a>
                  <a
                    href="https://x.com/advyx81998"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`hover:underline flex items-center gap-2 ${isDark ? 'text-white hover:text-slate-200' : 'text-slate-950 hover:text-black'}`}
                  >
                    <XLogoIcon className={`w-3.5 h-3.5 shrink-0 ${isDark ? 'text-white' : 'text-slate-950'}`} />
                    <span>@advyx81998 (X)</span>
                  </a>
                  <a
                    href="https://www.threads.net/@advyxmedia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`hover:underline flex items-center gap-2 ${isDark ? 'text-white hover:text-slate-200' : 'text-slate-950 hover:text-black'}`}
                  >
                    <ThreadsLogoIcon className={`w-3.5 h-3.5 shrink-0 ${isDark ? 'text-white' : 'text-slate-950'}`} />
                    <span>@advyxmedia (Threads)</span>
                  </a>
                </div>
              </div>

              <div>
                <span className={`block text-[11px] font-semibold uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Client Response Window
                </span>
                <span className={`font-semibold text-xs ${isDark ? 'text-white' : 'text-slate-950'}`}>
                  &lt; 12 Business Hours
                </span>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenDashboard}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold hover:opacity-80 transition-opacity ${
                    isDark ? 'text-white' : 'text-slate-950'
                  }`}
                  title="Admin Operations Portal (Authorized Access Only)"
                >
                  <Lock className={`w-3.5 h-3.5 ${isDark ? 'text-white' : 'text-slate-950'}`} />
                  <span>Admin Operations Portal</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            © {new Date().getFullYear()} ADVYX. All rights reserved. Precision digital marketing.
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <Compass className="w-3.5 h-3.5 text-[#2374B8]" />
              Time-synced: {localTimeFormatted}
            </span>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:text-[#2374B8] transition-colors"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
