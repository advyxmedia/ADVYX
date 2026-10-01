import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Appointment } from '../types';
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  CheckCircle2,
  CalendarPlus,
  ArrowRight,
  User,
  Building,
  Mail,
  Sparkles,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  X,
  CalendarDays,
} from 'lucide-react';

interface DiscoveryCalendarProps {
  onAppointmentBooked: (appointment: Appointment) => void;
  preselectedService?: string;
}

export const DiscoveryCalendar: React.FC<DiscoveryCalendarProps> = ({
  onAppointmentBooked,
  preselectedService = 'Social Media & Growth Strategy',
}) => {
  const { isDark } = useTheme();
  const { language, t } = useLanguage();
  const dateInputRef = useRef<HTMLInputElement>(null);

  // Generate exactly 5 bookable dates for the first row (excluding Sundays)
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    let current = new Date(today);
    // start from tomorrow
    current.setDate(current.getDate() + 1);

    while (dates.length < 5) {
      if (current.getDay() !== 0) {
        // Skip Sundays
        dates.push(new Date(current));
      }
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  const availableDates = generateDates();

  // State
  const [selectedCallType, setSelectedCallType] = useState<
    '15-min Intro' | '30-min Strategy Session' | '45-min Growth Audit'
  >('30-min Strategy Session');

  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [customDate, setCustomDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('11:00 AM');

  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [serviceFocus, setServiceFocus] = useState(preselectedService);
  const [isBooked, setIsBooked] = useState(false);
  const [confirmedAppt, setConfirmedAppt] = useState<Appointment | null>(null);

  // In-App Interactive Calendar Modal State
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [viewingMonth, setViewingMonth] = useState(new Date().getMonth());
  const [viewingYear, setViewingYear] = useState(new Date().getFullYear());
  const [tempSelectedDate, setTempSelectedDate] = useState<Date>(() => {
    const t = new Date();
    t.setDate(t.getDate() + 1);
    return t;
  });

  // Min and Max dates for calendar picker (tomorrow up to 1 year later)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  const minDateString = tomorrow.toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  const maxDateString = maxDate.toISOString().split('T')[0];

  // Close calendar modal on Escape key
  useEffect(() => {
    if (!isCalendarModalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsCalendarModalOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isCalendarModalOpen]);

  const handleOpenCalendar = () => {
    const base = customDate || availableDates[selectedDateIndex] || tomorrow;
    setViewingMonth(base.getMonth());
    setViewingYear(base.getFullYear());
    setTempSelectedDate(new Date(base));
    setIsCalendarModalOpen(true);
  };

  const handleCustomDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    const [year, month, day] = e.target.value.split('-').map(Number);
    const picked = new Date(year, month - 1, day);
    setCustomDate(picked);
    setTempSelectedDate(picked);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const handlePrevMonth = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const isAtCurrentMonth = viewingYear === currentYear && viewingMonth === currentMonth;
    if (isAtCurrentMonth) return;

    if (viewingMonth === 0) {
      setViewingMonth(11);
      setViewingYear(viewingYear - 1);
    } else {
      setViewingMonth(viewingMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewingMonth === 11) {
      setViewingMonth(0);
      setViewingYear(viewingYear + 1);
    } else {
      setViewingMonth(viewingMonth + 1);
    }
  };

  const handleSelectDay = (day: number) => {
    const target = new Date(viewingYear, viewingMonth, day);
    setTempSelectedDate(target);
  };

  const handleConfirmModalDate = () => {
    setCustomDate(new Date(tempSelectedDate));
    setIsCalendarModalOpen(false);
  };

  const handleQuickPreset = (preset: 'tomorrow' | 'nextMonday' | 'nextWeek' | 'inTwoWeeks') => {
    const target = new Date();
    if (preset === 'tomorrow') {
      target.setDate(target.getDate() + 1);
      if (target.getDay() === 0) target.setDate(target.getDate() + 1); // skip Sunday
    } else if (preset === 'nextMonday') {
      const day = target.getDay();
      const diff = (8 - day) % 7 || 7;
      target.setDate(target.getDate() + diff);
    } else if (preset === 'nextWeek') {
      target.setDate(target.getDate() + 7);
      if (target.getDay() === 0) target.setDate(target.getDate() + 1);
    } else if (preset === 'inTwoWeeks') {
      target.setDate(target.getDate() + 14);
      if (target.getDay() === 0) target.setDate(target.getDate() + 1);
    }
    setViewingMonth(target.getMonth());
    setViewingYear(target.getFullYear());
    setTempSelectedDate(target);
  };

  const timeSlots = [
    '09:30 AM',
    '11:00 AM',
    '01:30 PM',
    '03:00 PM',
    '04:30 PM',
    '06:00 PM',
  ];

  const activeDate = customDate || availableDates[selectedDateIndex];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !businessName.trim()) return;

    const chosenDate = activeDate;
    const dateFormatted = chosenDate.toISOString().split('T')[0];

    const newAppt: Appointment = {
      id: `apt-${Date.now()}`,
      name: name.trim(),
      businessName: businessName.trim(),
      email: email.trim(),
      service: serviceFocus,
      callType: selectedCallType,
      date: dateFormatted,
      time: selectedTimeSlot,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'EST',
      status: 'Upcoming',
      createdAt: new Date().toISOString(),
    };

    onAppointmentBooked(newAppt);
    setConfirmedAppt(newAppt);
    setIsBooked(true);
  };

  // Google Calendar URL generator
  const getGoogleCalendarUrl = (appt: Appointment) => {
    const title = encodeURIComponent(`ADVYX Discovery Call: ${appt.businessName} x ADVYX`);
    const details = encodeURIComponent(
      `Discovery Strategy Call with ADVYX.\nFocus: ${appt.service}\nType: ${appt.callType}\nAgency Email: advyxmedia@gmail.com\nVideo link will be sent via Google Meet.`
    );
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=Google+Meet`;
  };

  return (
    <section id="discovery-calendar" className="py-20 sm:py-24 relative w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#2374B8] mb-3">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>{t.calendar.sectionTag}</span>
          </div>
          <h2
            className={`text-3xl sm:text-5xl font-extrabold tracking-tight font-display mb-4 leading-[1.2] pb-1.5 overflow-visible ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            {t.calendar.title}
          </h2>
          <p
            className={`text-base sm:text-lg ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            {t.calendar.subtitle}
          </p>
        </div>

        {/* Booking Container with Balanced Two-Column PC Symmetry */}
        <div
          className={`max-w-5xl mx-auto rounded-3xl border shadow-xl overflow-hidden transition-all ${
            isDark
              ? 'bg-[#0E1729]/95 border-slate-800 shadow-black/40'
              : 'bg-white border-slate-200/90 shadow-slate-200/50'
          }`}
        >
          {!isBooked ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-800">
              {/* Left Column: Call Type & Date Selection */}
              <div className="lg:col-span-6 p-6 sm:p-8 lg:p-9 flex flex-col justify-between">
                <div>
                  <div className="mb-6">
                    <h3 className="text-base font-bold font-display flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-[#2374B8]" />
                      <span>1. Session Format & Timing</span>
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Pick your consultation depth, calendar date, and preferred time slot.
                    </p>
                  </div>

                  {/* Call Type Cards */}
                  <div className="space-y-2.5 mb-6">
                    {[
                      {
                        type: '15-min Intro',
                        desc: 'Quick fit & chemistry evaluation for immediate needs.',
                      },
                      {
                        type: '30-min Strategy Session',
                        desc: 'Comprehensive breakdown of your social channels & ad roadmap.',
                        popular: true,
                      },
                      {
                        type: '45-min Growth Audit',
                        desc: 'Full-funnel deep dive into CAC, branding & creative assets.',
                      },
                    ].map((item) => (
                      <button
                        key={item.type}
                        type="button"
                        onClick={() =>
                          setSelectedCallType(
                            item.type as
                              | '15-min Intro'
                              | '30-min Strategy Session'
                              | '45-min Growth Audit'
                          )
                        }
                        className={`w-full text-left p-3.5 rounded-2xl border transition-all ${
                          selectedCallType === item.type
                            ? isDark
                              ? 'bg-[#152442] border-[#2374B8] text-white ring-1 ring-[#2374B8]'
                              : 'bg-sky-50/70 border-[#2374B8] text-slate-900 ring-1 ring-[#2374B8]'
                            : isDark
                            ? 'bg-slate-900/50 border-slate-800 hover:border-slate-700 text-slate-300'
                            : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold font-display">{item.type}</span>
                          {item.popular && (
                            <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#2374B8] text-white">
                              Recommended
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                          {item.desc}
                        </p>
                      </button>
                    ))}
                  </div>

                  {/* Date Selection Header & Interactive Calendar Picker */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2.5">
                      <div className={`text-xs font-bold font-display flex items-center gap-1.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        <button
                          type="button"
                          onClick={handleOpenCalendar}
                          className="p-1 -ml-1 rounded-lg hover:bg-[#2374B8]/10 text-[#2374B8] transition-colors flex items-center gap-1.5 cursor-pointer"
                          title="Open Calendar Picker"
                        >
                          <CalendarIcon className="w-4 h-4 text-[#2374B8]" />
                        </button>
                        <span>Select Date</span>
                      </div>

                      {/* Accessible Full Calendar Date Picker Trigger */}
                      <div className="relative">
                        <button
                          id="open-calendar-picker-btn"
                          type="button"
                          onClick={handleOpenCalendar}
                          className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                            isDark
                              ? 'bg-slate-800/80 border-slate-700 text-sky-400 hover:bg-[#2374B8] hover:text-white hover:border-[#2374B8]'
                              : 'bg-sky-50 border-sky-200 text-[#2374B8] hover:bg-[#2374B8] hover:text-white hover:border-[#2374B8]'
                          }`}
                          title="Choose any future date from interactive calendar"
                        >
                          <CalendarPlus className="w-3.5 h-3.5" />
                          <span>Open Calendar</span>
                        </button>
                      </div>
                    </div>

                    {/* Active Custom Date Banner (if chosen via calendar picker) */}
                    {customDate && (
                      <div className={`p-3 mb-3 rounded-xl border flex items-center justify-between text-xs transition-all ${
                        isDark
                          ? 'bg-[#152442] border-[#2374B8] text-white shadow-md shadow-[#2374B8]/20'
                          : 'bg-sky-50 border-[#2374B8] text-slate-900 shadow-sm'
                      }`}>
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4 text-[#2374B8] shrink-0" />
                          <div>
                            <span className="font-bold text-[#2374B8]">Calendar Date Selected: </span>
                            <span className="font-semibold">
                              {customDate.toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={handleOpenCalendar}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2374B8] hover:underline px-2 py-1 rounded-lg hover:bg-[#2374B8]/10 transition-colors"
                            title="Change date via calendar"
                          >
                            <CalendarPlus className="w-3 h-3" />
                            <span>Change</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setCustomDate(null)}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-red-500 transition-colors ml-1"
                            title="Clear custom date and return to quick days"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Reset</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* 5 Quick Date Buttons (First Row Only) */}
                    <div className="grid grid-cols-5 gap-2">
                      {availableDates.map((date, idx) => {
                        const isSelected = !customDate && selectedDateIndex === idx;
                        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                        const dayNum = date.getDate();
                        const monthName = date.toLocaleDateString('en-US', { month: 'short' });

                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setCustomDate(null);
                              setSelectedDateIndex(idx);
                            }}
                            className={`p-2 rounded-xl text-center border transition-all ${
                              isSelected
                                ? 'bg-[#2374B8] text-white border-[#2374B8] shadow-md shadow-[#2374B8]/30 font-bold'
                                : isDark
                                ? 'bg-slate-900/60 border-slate-800 hover:bg-slate-800 text-slate-300'
                                : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                            }`}
                          >
                            <div className="text-[10px] uppercase opacity-75">{dayName}</div>
                            <div className="text-base font-extrabold font-display my-0.5">{dayNum}</div>
                            <div className="text-[9px] opacity-75">{monthName}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div>
                    <div className={`text-xs font-bold font-display mb-2.5 flex items-center gap-1.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                      <Clock className="w-3.5 h-3.5 text-[#2374B8]" />
                      <span>Select Time Slot (EST)</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`py-2 px-2 rounded-xl text-xs font-semibold border text-center transition-all ${
                            selectedTimeSlot === slot
                              ? 'bg-[#2374B8] text-white border-[#2374B8]'
                              : isDark
                              ? 'bg-slate-900/60 border-slate-800 hover:bg-slate-800 text-slate-300'
                              : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Founder & Brand Details (Explicit Day & Night Mode Text Visibility) */}
              <div className="lg:col-span-6 p-6 sm:p-8 lg:p-9 flex flex-col justify-between">
                <div>
                  <div className="mb-6">
                    <h3 className={`text-base font-bold font-display flex items-center gap-2 mb-1 ${isDark ? 'text-white' : 'text-slate-950'}`}>
                      <User className="w-4 h-4 text-[#2374B8]" />
                      <span>2. Founder & Brand Details</span>
                    </h3>
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Direct Google Meet consultation with ADVYX senior leadership.
                    </p>
                  </div>

                  <form onSubmit={handleBooking} className="space-y-4">
                    <div>
                      <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Alex Morgan"
                          className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-[#2374B8] transition-colors ${
                            isDark
                              ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500'
                              : 'bg-white border-slate-300 text-slate-950 placeholder-slate-400'
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Brand / Business Name *
                      </label>
                      <div className="relative">
                        <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          required
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          placeholder="e.g. Lumina Goods"
                          className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-[#2374B8] transition-colors ${
                            isDark
                              ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500'
                              : 'bg-white border-slate-300 text-slate-950 placeholder-slate-400'
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Work Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="alex@company.com"
                          className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-[#2374B8] transition-colors ${
                            isDark
                              ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500'
                              : 'bg-white border-slate-300 text-slate-950 placeholder-slate-400'
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Primary Service Focus
                      </label>
                      <select
                        value={serviceFocus}
                        onChange={(e) => setServiceFocus(e.target.value)}
                        className={`w-full px-3.5 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-[#2374B8] transition-colors ${
                          isDark
                            ? 'bg-slate-900 border-slate-700 text-white'
                            : 'bg-white border-slate-300 text-slate-950'
                        }`}
                      >
                        <option value="Social Media Retainer" className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-950'}>Social Media Retainer (Full Management)</option>
                        <option value="Performance & Paid Ads" className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-950'}>Performance Marketing & Paid Ads</option>
                        <option value="Content Creation & Video" className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-950'}>Content Creation & Short-form Video</option>
                        <option value="Brand Identity & Design" className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-950'}>Brand Identity & Design (0-to-1 Launch)</option>
                        <option value="Full Agency Omnichannel" className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-950'}>Full Agency Omnichannel Retainer</option>
                      </select>
                    </div>

                    {/* Booking summary box */}
                    <div className={`p-3.5 rounded-2xl border text-xs ${
                      isDark
                        ? 'bg-slate-900/90 border-slate-800'
                        : 'bg-slate-100 border-slate-200'
                    }`}>
                      <div className={`mb-1 font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Appointment Summary:</div>
                      <div className="font-semibold text-[#2374B8]">
                        {selectedCallType} •{' '}
                        {activeDate.toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          year: activeDate.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
                        })}{' '}
                        at {selectedTimeSlot}
                      </div>
                    </div>

                    <button
                      id="confirm-booking-btn"
                      type="submit"
                      className="w-full py-3.5 rounded-2xl text-xs font-bold text-white bg-[#2374B8] hover:bg-[#18598F] shadow-lg shadow-[#2374B8]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Video className="w-4 h-4" />
                      <span>Confirm Discovery Call</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            /* Confirmation Screen */
            <div className="p-8 sm:p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <span className="text-xs font-bold uppercase tracking-widest text-[#2374B8] mb-2 block">
                Booking Confirmed
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display mb-3">
                We’re Ready For You, {confirmedAppt?.name}!
              </h3>
              <p
                className={`text-sm max-w-lg mx-auto mb-8 ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                Your <span className="font-semibold">{confirmedAppt?.callType}</span> for{' '}
                <span className="font-semibold text-[#2374B8]">{confirmedAppt?.businessName}</span> has been confirmed for{' '}
                <span className="font-semibold">{confirmedAppt?.date} at {confirmedAppt?.time}</span>. A calendar invite has been queued for {confirmedAppt?.email}.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                {confirmedAppt && (
                  <a
                    href={getGoogleCalendarUrl(confirmedAppt)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white bg-[#2374B8] hover:bg-[#18598F] shadow-md shadow-[#2374B8]/30"
                  >
                    <CalendarPlus className="w-4 h-4" />
                    <span>Add to Google Calendar</span>
                  </a>
                )}

                <button
                  onClick={() => setIsBooked(false)}
                  className="px-6 py-3 rounded-full text-xs font-semibold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Book Another Call
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interactive In-App Calendar Modal */}
      {isCalendarModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md transition-all">
          {/* Backdrop click to dismiss */}
          <div
            className="absolute inset-0"
            onClick={() => setIsCalendarModalOpen(false)}
            aria-hidden="true"
          />

          <div
            className={`relative w-full max-w-md rounded-3xl border shadow-2xl p-5 sm:p-6 z-10 transition-all ${
              isDark
                ? 'bg-[#0E1729] border-slate-700/80 text-white shadow-black/80'
                : 'bg-white border-slate-200 text-slate-900 shadow-xl'
            }`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="calendar-modal-title"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#2374B8]/15 text-[#2374B8] flex items-center justify-center">
                  <CalendarDays className="w-5 h-5" />
                </div>
                <div>
                  <h3 id="calendar-modal-title" className="text-sm font-bold font-display">
                    Select Consultation Date
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Choose any available date for your strategy session
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCalendarModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                title="Close Calendar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Preset Buttons */}
            <div className="flex items-center gap-1.5 py-3 overflow-x-auto no-scrollbar border-b border-slate-200/60 dark:border-slate-800/60">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
                Quick:
              </span>
              <button
                type="button"
                onClick={() => handleQuickPreset('tomorrow')}
                className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border whitespace-nowrap transition-colors ${
                  isDark
                    ? 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-800'
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Tomorrow
              </button>
              <button
                type="button"
                onClick={() => handleQuickPreset('nextMonday')}
                className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border whitespace-nowrap transition-colors ${
                  isDark
                    ? 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-800'
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Next Mon
              </button>
              <button
                type="button"
                onClick={() => handleQuickPreset('nextWeek')}
                className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border whitespace-nowrap transition-colors ${
                  isDark
                    ? 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-800'
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                }`}
              >
                In 1 Week
              </button>
              <button
                type="button"
                onClick={() => handleQuickPreset('inTwoWeeks')}
                className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border whitespace-nowrap transition-colors ${
                  isDark
                    ? 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-800'
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                }`}
              >
                In 2 Weeks
              </button>
            </div>

            {/* Month & Year Navigation */}
            <div className="flex items-center justify-between py-3">
              <button
                type="button"
                onClick={handlePrevMonth}
                disabled={viewingYear === new Date().getFullYear() && viewingMonth === new Date().getMonth()}
                className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-slate-600 dark:text-slate-300 transition-colors"
                title="Previous Month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="text-xs font-extrabold font-display">
                {monthNames[viewingMonth]} {viewingYear}
              </div>
              <button
                type="button"
                onClick={handleNextMonth}
                className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                title="Next Month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Calendar Days Headers */}
            <div className="grid grid-cols-7 gap-1 text-center mb-1">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                <div key={d} className="text-[10px] font-bold text-slate-400 uppercase py-1">
                  {d}
                </div>
              ))}
            </div>

            {/* Calendar Days Grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty offset before the 1st of month */}
              {Array.from({ length: new Date(viewingYear, viewingMonth, 1).getDay() }).map((_, i) => (
                <div key={`empty-${i}`} className="h-8 sm:h-9" />
              ))}

              {/* Month Day Cells */}
              {Array.from({
                length: new Date(viewingYear, viewingMonth + 1, 0).getDate(),
              }).map((_, i) => {
                const dayNumber = i + 1;
                const cellDate = new Date(viewingYear, viewingMonth, dayNumber);
                cellDate.setHours(0, 0, 0, 0);

                const isPast = cellDate < tomorrow;
                const isSunday = cellDate.getDay() === 0;
                const isDisabled = isPast || isSunday;

                const isSelected =
                  tempSelectedDate &&
                  tempSelectedDate.getFullYear() === viewingYear &&
                  tempSelectedDate.getMonth() === viewingMonth &&
                  tempSelectedDate.getDate() === dayNumber;

                return (
                  <button
                    key={dayNumber}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => handleSelectDay(dayNumber)}
                    onDoubleClick={() => {
                      if (!isDisabled) {
                        handleSelectDay(dayNumber);
                        setCustomDate(new Date(viewingYear, viewingMonth, dayNumber));
                        setIsCalendarModalOpen(false);
                      }
                    }}
                    className={`h-8 sm:h-9 rounded-xl text-xs font-semibold flex flex-col items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-[#2374B8] text-white font-bold ring-2 ring-[#2374B8] shadow-md shadow-[#2374B8]/40 scale-105'
                        : isDisabled
                        ? 'opacity-25 cursor-not-allowed text-slate-400'
                        : isDark
                        ? 'hover:bg-[#1E2E48] hover:text-[#2374B8] text-slate-200'
                        : 'hover:bg-sky-50 hover:text-[#2374B8] text-slate-700'
                    }`}
                    title={
                      isSunday
                        ? 'Sundays closed for strategy audits'
                        : isPast
                        ? 'Past date unavailable'
                        : `Select ${monthNames[viewingMonth]} ${dayNumber}, ${viewingYear} (Double click to confirm)`
                    }
                  >
                    <span>{dayNumber}</span>
                  </button>
                );
              })}
            </div>

            {/* Direct date picker fallback / device picker */}
            <div className="mt-3.5 pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-2">
              <span className="text-[11px] text-slate-400 font-medium">Or type/pick date:</span>
              <input
                type="date"
                min={minDateString}
                max={maxDateString}
                value={tempSelectedDate ? tempSelectedDate.toISOString().split('T')[0] : ''}
                onChange={handleCustomDateChange}
                className={`text-xs px-2.5 py-1.5 rounded-xl border focus:outline-none focus:ring-1 focus:ring-[#2374B8] ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-white'
                    : 'bg-slate-50 border-slate-300 text-slate-800'
                }`}
              />
            </div>

            {/* Footer with Selected Date & Confirm Button */}
            <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-left w-full sm:w-auto">
                <span className="text-[10px] uppercase font-bold text-[#2374B8] block">
                  Chosen Date:
                </span>
                <span className="text-xs font-semibold">
                  {tempSelectedDate.toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setIsCalendarModalOpen(false)}
                  className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                    isDark
                      ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                      : 'border-slate-300 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmModalDate}
                  className="flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#2374B8] hover:bg-[#1B5D94] shadow-md shadow-[#2374B8]/30 transition-all cursor-pointer"
                >
                  Confirm Date
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
