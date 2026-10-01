import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Inquiry } from '../types';
import {
  COUNTRY_BUDGET_CONFIGS,
  DEFAULT_COUNTRY_CODE,
  CountryBudgetConfig,
  BudgetTier,
  getCountryBudgetConfig,
} from '../data/budgetConfig';
import {
  Mail,
  Instagram,
  Send,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  MessageSquare,
  Globe2,
  HelpCircle,
  Lock,
  Unlock,
  ShieldCheck,
  X,
} from 'lucide-react';

interface ContactSectionProps {
  onInquirySubmitted: (inquiry: Inquiry) => void;
  prefilledService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onInquirySubmitted,
  prefilledService = 'Social Media Management',
}) => {
  const { isDark } = useTheme();

  // Basic Form State
  const [clientName, setClientName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(prefilledService);
  const [message, setMessage] = useState('');

  // Creator Mode State (only site creator can test or change countries)
  const [isCreatorMode, setIsCreatorMode] = useState<boolean>(() => {
    return localStorage.getItem('advyx_creator_mode') === 'true';
  });
  const [showCreatorModal, setShowCreatorModal] = useState(false);
  const [creatorPinInput, setCreatorPinInput] = useState('');
  const [creatorPinError, setCreatorPinError] = useState('');

  // Country & Localized Budget State
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>(() => {
    // 1. Check if creator previously saved an override
    const savedCreatorOverride = localStorage.getItem('advyx_creator_country');
    if (savedCreatorOverride) {
      return savedCreatorOverride;
    }

    // 2. Strict automatic location detection for visitors
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone.toLowerCase();
      if (tz.includes('calcutta') || tz.includes('kolkata') || tz.includes('india')) return 'IN';
      if (tz.includes('bangkok')) return 'TH';
      if (tz.includes('london')) return 'GB';
      if (tz.includes('dubai')) return 'AE';
      if (tz.includes('singapore')) return 'SG';
      if (tz.includes('sydney') || tz.includes('melbourne')) return 'AU';
      if (tz.includes('toronto') || tz.includes('vancouver')) return 'CA';
      if (tz.includes('berlin')) return 'DE';
      if (tz.includes('paris')) return 'FR';
      if (tz.includes('amsterdam')) return 'NL';
      if (tz.includes('madrid')) return 'ES';
      if (tz.includes('rome')) return 'IT';
      if (tz.includes('riyadh')) return 'SA';
      if (tz.includes('kuala_lumpur')) return 'MY';
      if (tz.includes('jakarta')) return 'ID';
      if (tz.includes('manila')) return 'PH';
      if (tz.includes('ho_chi_minh') || tz.includes('saigon') || tz.includes('vietnam')) return 'VN';
      if (tz.includes('new_york') || tz.includes('los_angeles') || tz.includes('chicago')) return 'US';
    } catch {
      // fallback cleanly
    }
    return DEFAULT_COUNTRY_CODE;
  });

  const activeCountryConfig: CountryBudgetConfig = getCountryBudgetConfig(selectedCountryCode);

  // Default to the second tier (Growth) of selected country
  const [selectedTierId, setSelectedTierId] = useState<string>(() => {
    return activeCountryConfig.tiers[1]?.id || activeCountryConfig.tiers[0].id;
  });

  // When country changes (creator only), automatically synchronize selected tier
  const handleCountryChange = (newCode: string) => {
    setSelectedCountryCode(newCode);
    localStorage.setItem('advyx_creator_country', newCode);
    const newConfig = getCountryBudgetConfig(newCode);
    const currentTierIndex = activeCountryConfig.tiers.findIndex((t) => t.id === selectedTierId);
    const safeIndex = currentTierIndex >= 0 ? currentTierIndex : 1;
    const nextTier = newConfig.tiers[safeIndex] || newConfig.tiers[0];
    setSelectedTierId(nextTier.id);
  };

  const handleUnlockCreatorMode = (e: React.FormEvent) => {
    e.preventDefault();
    const pin = creatorPinInput.trim().toLowerCase();
    if (pin === 'advyx' || pin === 'admin' || pin === 'creator') {
      setIsCreatorMode(true);
      localStorage.setItem('advyx_creator_mode', 'true');
      setShowCreatorModal(false);
      setCreatorPinInput('');
      setCreatorPinError('');
    } else {
      setCreatorPinError('Incorrect creator PIN. (Hint: advyx)');
    }
  };

  const handleExitCreatorMode = () => {
    setIsCreatorMode(false);
    localStorage.removeItem('advyx_creator_mode');
    localStorage.removeItem('advyx_creator_country');
    // Re-detect visitor's natural location
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone.toLowerCase();
      if (tz.includes('calcutta') || tz.includes('kolkata') || tz.includes('india')) {
        setSelectedCountryCode('IN');
        return;
      }
    } catch {
      // fallback
    }
    setSelectedCountryCode(DEFAULT_COUNTRY_CODE);
  };

  const currentSelectedTier: BudgetTier =
    activeCountryConfig.tiers.find((t) => t.id === selectedTierId) ||
    activeCountryConfig.tiers[0];

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const agencyEmail = 'advyxmedia@gmail.com';
  const instagramHandle = '@advyxmedia';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(agencyEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !businessName.trim() || !email.trim()) return;

    const newInquiry: Inquiry = {
      id: `inq-${Date.now()}`,
      clientName: clientName.trim(),
      businessName: businessName.trim(),
      email: email.trim(),
      service,
      country: activeCountryConfig.name,
      countryCode: activeCountryConfig.code,
      currency: activeCountryConfig.currency,
      currencySymbol: activeCountryConfig.currencySymbol,
      budget: currentSelectedTier.label,
      budgetMin: currentSelectedTier.min,
      budgetMax: currentSelectedTier.max,
      message: message.trim() || 'No additional note provided.',
      status: 'New',
      createdAt: new Date().toISOString(),
    };

    onInquirySubmitted(newInquiry);
    setIsSubmitted(true);

    // Reset Form
    setClientName('');
    setBusinessName('');
    setEmail('');
    setMessage('');
  };

  return (
    <section id="contact" className="py-20 sm:py-24 relative border-t border-slate-200/80 dark:border-slate-800/80 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12">
          {/* Left Column: Direct Contact Details & Agency Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#2374B8] mb-3">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Get In Touch</span>
              </div>
              <h2
                className={`text-3xl sm:text-5xl font-extrabold tracking-tight font-display mb-6 leading-[1.2] pb-1 overflow-visible ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                Let’s Scale Your Brand Together
              </h2>
              <p
                className={`text-base sm:text-lg leading-relaxed mb-8 ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                Whether you need full social media management, targeted paid ad campaigns, or a distinctive brand identity system, we respond within 12 business hours.
              </p>

              {/* Direct Channels */}
              <div className="space-y-4">
                {/* Official Email Card with Natural Brand Color */}
                <div
                  className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
                    isDark
                      ? 'bg-[#0E1729]/80 border-slate-800'
                      : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#EA4335]/10 text-[#EA4335] flex items-center justify-center">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className={`text-[11px] font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Direct Inquiries
                      </div>
                      <a
                        href={`mailto:${agencyEmail}`}
                        className={`text-sm font-bold font-mono hover:text-[#EA4335] transition-colors block ${
                          isDark ? 'text-white' : 'text-slate-950'
                        }`}
                      >
                        {agencyEmail}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Copy Email"
                  >
                    {copiedEmail ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Official Instagram Card with Follow Button */}
                <div
                  className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
                    isDark
                      ? 'bg-[#0E1729]/80 border-slate-800'
                      : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#E1306C]/10 text-[#E1306C] flex items-center justify-center">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div>
                      <div className={`text-[11px] font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Official Instagram
                      </div>
                      <a
                        href="https://instagram.com/advyxmedia"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-sm font-bold hover:text-[#E1306C] transition-colors block ${
                          isDark ? 'text-white' : 'text-slate-950'
                        }`}
                      >
                        {instagramHandle}
                      </a>
                    </div>
                  </div>

                  <a
                    href="https://instagram.com/advyxmedia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-[#E1306C] hover:bg-[#C13584] transition-all hover:scale-105 active:scale-95 shadow-sm"
                  >
                    Follow
                  </a>
                </div>
              </div>
            </div>

            {/* Quick reassurance badge */}
            <div className={`mt-8 pt-6 border-t text-xs ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
              ⚡ Confidential & direct: All inquiries are reviewed directly by ADVYX agency leadership.
            </div>
          </div>

          {/* Right Column: Prominent Contact Form with International Budget Selector */}
          <div className="lg:col-span-7">
            <div
              className={`p-6 sm:p-10 rounded-3xl border shadow-xl ${
                isDark
                  ? 'bg-[#0E1729]/95 border-slate-800 shadow-black/40'
                  : 'bg-white border-slate-200/90 shadow-slate-200/50'
              }`}
            >
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="e.g. John Doe"
                        className={`w-full px-4 py-3 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-[#2374B8] transition-colors ${
                          isDark
                            ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500'
                            : 'bg-white border-slate-300 text-slate-950 placeholder-slate-400'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Brand or Business Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="e.g. Acme Studio"
                        className={`w-full px-4 py-3 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-[#2374B8] transition-colors ${
                          isDark
                            ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500'
                            : 'bg-white border-slate-300 text-slate-950 placeholder-slate-400'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className={`w-full px-4 py-3 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-[#2374B8] transition-colors ${
                          isDark
                            ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500'
                            : 'bg-white border-slate-300 text-slate-950 placeholder-slate-400'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Service Required *
                      </label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-[#2374B8] transition-colors ${
                          isDark
                            ? 'bg-slate-900 border-slate-700 text-white'
                            : 'bg-white border-slate-300 text-slate-950'
                        }`}
                      >
                        <option value="Social Media Management" className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-950'}>Social Media Management (Retainer)</option>
                        <option value="Performance & Paid Ads" className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-950'}>Performance Marketing & Paid Ads</option>
                        <option value="Content Creation & Video" className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-950'}>Content Creation & Short-form UGC</option>
                        <option value="Brand Identity & Design" className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-950'}>Brand Identity & 0-to-1 Launch</option>
                        <option value="Full Agency Retainer" className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-950'}>Full Omnichannel Agency Retainer</option>
                      </select>
                    </div>
                  </div>

                  {/* Business Operating Region & Currency (Visitors cannot change; strictly location-based) */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300">
                        Operating Region & Localized Currency
                      </label>
                      <div className="flex items-center gap-2">
                        {isCreatorMode ? (
                          <button
                            type="button"
                            onClick={handleExitCreatorMode}
                            className="text-[10px] text-amber-500 hover:underline flex items-center gap-1 font-semibold"
                            title="Exit Creator Mode and reset to natural location"
                          >
                            <Unlock className="w-3 h-3" />
                            <span>Exit Creator Mode</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setShowCreatorModal(true)}
                            className="text-[10px] text-slate-400 hover:text-[#2374B8] flex items-center gap-1 transition-colors"
                            title="Site Creator Controls"
                          >
                            <Lock className="w-3 h-3" />
                            <span className="hidden sm:inline">Creator Access</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* If in Creator Mode: Creator can switch countries freely to preview and configure pricing */}
                    {isCreatorMode ? (
                      <div className="space-y-2 p-3.5 rounded-2xl border border-amber-500/30 bg-amber-500/5">
                        <div className="flex items-center justify-between text-xs text-amber-600 dark:text-amber-400 font-semibold">
                          <span className="flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-amber-500" />
                            Creator Pricing Preview Active
                          </span>
                          <span className="text-[10px] uppercase tracking-wider font-mono">
                            Admin Only
                          </span>
                        </div>
                        <select
                          value={selectedCountryCode}
                          onChange={(e) => handleCountryChange(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl text-xs font-medium border border-amber-500/40 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2374B8]"
                        >
                          {COUNTRY_BUDGET_CONFIGS.map((country) => (
                            <option key={country.code} value={country.code}>
                              {country.flag} {country.name} ({country.currency} — {country.currencySymbol})
                            </option>
                          ))}
                        </select>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">
                          Regular visitors only see their own local currency brackets and cannot open this dropdown.
                        </p>
                      </div>
                    ) : (
                      /* For normal public visitors: Locked location badge (No country dropdown) */
                      <div className="p-3.5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl sm:text-2xl">{activeCountryConfig.flag}</span>
                          <div>
                            <div className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                              <span>{activeCountryConfig.name}</span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#2374B8]/10 text-[#2374B8] font-bold">
                                {activeCountryConfig.currency} ({activeCountryConfig.currencySymbol})
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400">
                              Location-based investment brackets calibrated for your regional market.
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono hidden sm:inline shrink-0">
                          Auto-detected
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Estimated Monthly Marketing Budget (Symmetrical 4-tier grid) */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                      Estimated Monthly Marketing Budget ({activeCountryConfig.currency})
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 items-stretch">
                      {activeCountryConfig.tiers.map((tier) => {
                        const isSelected = selectedTierId === tier.id;
                        return (
                          <button
                            key={tier.id}
                            type="button"
                            onClick={() => setSelectedTierId(tier.id)}
                            className={`py-3 px-3 text-xs font-semibold rounded-2xl border transition-all text-center flex flex-col items-center justify-center gap-0.5 min-h-[48px] ${
                              isSelected
                                ? 'bg-[#2374B8] text-white border-[#2374B8] shadow-md shadow-[#2374B8]/30 font-bold scale-[1.02]'
                                : isDark
                                ? 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                            }`}
                          >
                            <span className="truncate w-full">{tier.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                      Project Goals & Context
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about your brand vision, target audience, and primary growth goals..."
                      className={`w-full px-4 py-3 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-[#2374B8] transition-colors ${
                        isDark
                          ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500'
                          : 'bg-white border-slate-300 text-slate-950 placeholder-slate-400'
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    id="submit-inquiry-btn"
                    className="w-full py-4 rounded-2xl text-sm font-bold text-white bg-[#2374B8] hover:bg-[#18598F] shadow-lg shadow-[#2374B8]/30 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Agency Inquiry</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                /* Submission Confirmation */
                <div className="py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-display mb-2">
                    Inquiry Received!
                  </h3>
                  <p
                    className={`text-sm max-w-md mx-auto mb-8 ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    Thank you for reaching out. We have logged your project brief into our agency pipeline and will get back to you with next steps within 12 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2.5 rounded-full text-xs font-semibold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Site Creator Authentication Dialog */}
      {showCreatorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/60 animate-in fade-in duration-200">
          <div
            className={`w-full max-w-sm rounded-3xl p-6 border shadow-2xl relative ${
              isDark ? 'bg-[#0E1729] border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <button
              onClick={() => {
                setShowCreatorModal(false);
                setCreatorPinError('');
              }}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-3 text-[#2374B8]">
              <Lock className="w-5 h-5" />
              <h4 className="text-base font-bold font-display">Creator Pricing Mode</h4>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Enter your site creator access key to unlock multi-country pricing controls and testing.
            </p>

            <form onSubmit={handleUnlockCreatorMode} className="space-y-3">
              <div>
                <input
                  type="password"
                  autoFocus
                  value={creatorPinInput}
                  onChange={(e) => {
                    setCreatorPinInput(e.target.value);
                    setCreatorPinError('');
                  }}
                  placeholder="Creator PIN (e.g. advyx)"
                  className="w-full px-4 py-2.5 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2374B8]"
                />
                {creatorPinError && (
                  <p className="text-[11px] text-rose-500 mt-1">{creatorPinError}</p>
                )}
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowCreatorModal(false)}
                  className="flex-1 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl text-xs font-bold text-white bg-[#2374B8] hover:bg-[#18598F] transition-colors"
                >
                  Unlock Controls
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
