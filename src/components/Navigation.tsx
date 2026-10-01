import React, { useState, useEffect } from 'react';
import { AdvyxLogo } from './AdvyxLogo';
import { ThemeController } from './ThemeController';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Lock, Menu, X, ArrowUpRight, PhoneCall } from 'lucide-react';

interface NavigationProps {
  onOpenDashboard: () => void;
  pendingInquiriesCount?: number;
  isAdminAuthenticated?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
  onOpenDashboard,
  pendingInquiriesCount = 3,
  isAdminAuthenticated = false,
}) => {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.services, href: '#services' },
    { name: t.nav.caseStudies, href: '#case-studies' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.testimonials, href: '#testimonials' },
    { name: t.nav.contact, href: '#contact' },
  ];

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? isDark
            ? 'bg-[#0A0F1D]/85 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-lg shadow-black/20'
            : 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 py-3 shadow-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          className="flex items-center gap-2 group focus:outline-none"
          aria-label="ADVYX Home"
        >
          <AdvyxLogo variant="badge" size="sm" isDark={isDark} />
        </a>

        {/* Desktop Nav Links (Shown on Desktop/PC >= 1024px) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-200 ${
                isDark
                  ? 'text-slate-300 hover:text-white'
                  : 'text-slate-600 hover:text-[#2374B8]'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 shrink-0">
          {/* Language Switcher (Visible on both mobile & desktop) */}
          <div className="shrink-0">
            <LanguageSwitcher />
          </div>

          {/* Mobile View Only: Book Call button (< sm) */}
          <a
            href="#discovery-calendar"
            id="mobile-nav-book-call"
            className="sm:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white bg-[#2374B8] hover:bg-[#1C5F97] active:scale-95 shadow-sm shadow-[#2374B8]/30 transition-all shrink-0"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{t.nav.bookCall}</span>
          </a>

          {/* Tablet & Laptop / Desktop: Google Maps Time Theme Switcher (>= sm) */}
          <div className="hidden sm:block shrink-0">
            <ThemeController />
          </div>

          {/* Agency Dashboard Portal Trigger (Restricted Admin Access) */}
          <button
            id="agency-dashboard-btn"
            onClick={onOpenDashboard}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold border transition-all shrink-0 ${
              isDark
                ? 'bg-slate-800/70 hover:bg-slate-800 border-slate-700 text-slate-200'
                : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
            }`}
            title="ADVYX Operations Portal (Admin Restricted)"
          >
            <Lock className="w-3.5 h-3.5 text-[#2374B8]" />
            <span>{t.nav.admin}</span>
            {isAdminAuthenticated && pendingInquiriesCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#2374B8] text-white text-[10px] flex items-center justify-center font-bold">
                {pendingInquiriesCount}
              </span>
            )}
          </button>

          {/* Book Call CTA (Visible on Tablet & Laptop / Desktop >= sm) */}
          <a
            href="#discovery-calendar"
            id="nav-cta-discovery"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold text-white bg-[#2374B8] hover:bg-[#1C5F97] shadow-sm shadow-[#2374B8]/30 transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{t.nav.bookCall}</span>
          </a>

          {/* Mobile & Tablet menu hamburger (< lg: 1024px) */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-xl transition-colors shrink-0 ${
              isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-100'
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Drawer */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden border-b px-6 py-5 transition-all ${
            isDark ? 'bg-[#0E1729] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold py-1 hover:text-[#2374B8] transition-colors"
              >
                {link.name}
              </a>
            ))}

            {/* Mobile language selector embedded in drawer */}
            <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
              <LanguageSwitcher isMobile={true} />
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3">
              <a
                href="#discovery-calendar"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold bg-[#2374B8] text-white shadow-md shadow-[#2374B8]/20"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{t.nav.bookCall}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDashboard();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Lock className="w-3.5 h-3.5 text-[#2374B8]" />
                <span>{t.nav.operationsPortal}</span>
                {isAdminAuthenticated && pendingInquiriesCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-[#2374B8] text-white text-[10px] flex items-center justify-center font-bold">
                    {pendingInquiriesCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};


