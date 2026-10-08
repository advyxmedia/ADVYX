import React, { useState, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Testimonial } from '../types';
import {
  Star,
  StarHalf,
  PlusCircle,
  CheckCircle,
  MessageSquare,
  X,
  Quote,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { ClientLogo } from './ClientLogo';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  onAddTestimonial: (testimonial: Testimonial) => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials = [],
  onAddTestimonial,
}) => {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Form State
  const [clientName, setClientName] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [projectType, setProjectType] = useState('Social Media Management');
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');

  // Only display testimonials that have been verified/approved by you
  const approvedTestimonials = testimonials.filter(
    (item) => item.isVerified !== false
  );

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !company.trim() || !content.trim()) return;

    // isVerified: false holds the review pending your check/approval
    const newTestimonial: Testimonial = {
      id: `test-${Date.now()}`,
      clientName: clientName.trim(),
      role: role.trim() || 'Founder',
      company: company.trim(),
      projectType,
      rating,
      content: content.trim(),
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      }),
      isVerified: false,
    };

    onAddTestimonial(newTestimonial);
    setIsModalOpen(false);

    // Reset Form
    setClientName('');
    setRole('');
    setCompany('');
    setContent('');
    setRating(5);

    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 5000);
  };

  return (
    <section id="testimonials" className="py-20 sm:py-24 relative w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title and Scroll Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#2374B8] mb-3">
              <Quote className="w-3.5 h-3.5" />
              <span>{t.testimonials.sectionTag}</span>
            </div>
            <h2
              className={`text-3xl sm:text-5xl font-extrabold tracking-tight font-display leading-[1.2] pb-1.5 overflow-visible ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              {t.testimonials.title}
            </h2>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            {/* Scroll Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleScroll('left')}
                aria-label="Scroll testimonials left"
                className={`p-2.5 rounded-full border transition-all ${
                  isDark
                    ? 'border-slate-800 bg-slate-900/80 text-white hover:bg-slate-800 hover:border-[#2374B8]'
                    : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-100 hover:border-[#2374B8] shadow-sm'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleScroll('right')}
                aria-label="Scroll testimonials right"
                className={`p-2.5 rounded-full border transition-all ${
                  isDark
                    ? 'border-slate-800 bg-slate-900/80 text-white hover:bg-slate-800 hover:border-[#2374B8]'
                    : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-100 hover:border-[#2374B8] shadow-sm'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              id="open-add-testimonial-btn"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold border border-[#2374B8]/40 bg-[#2374B8]/10 text-[#2374B8] dark:text-sky-300 hover:bg-[#2374B8] hover:text-white transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t.testimonials.addReview}</span>
            </button>
          </div>
        </div>

        {/* Success Toast */}
        {showSuccessToast && (
          <div className="mb-8 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>Thank you for your testimonial! It has been submitted for review and will be published once approved.</span>
          </div>
        )}

        {/* Testimonials Horizontal Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {approvedTestimonials.map((item) => (
            <div
              key={item.id}
              className={`w-[85vw] sm:w-[360px] md:w-[380px] shrink-0 snap-start p-6 rounded-3xl border flex flex-col justify-between transition-all duration-300 ${
                isDark
                  ? 'bg-[#0E1729]/70 border-slate-800/80 hover:border-[#2374B8]/40'
                  : 'bg-white border-slate-200/90 hover:border-[#2374B8]/40 shadow-sm'
              }`}
            >
              <div>
                {/* Brand Logo Header if matching known client */}
                <div className="mb-4">
                  <ClientLogo client={item.company} size="sm" isDark={isDark} />
                </div>

                {/* Star rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[0, 1, 2, 3, 4].map((i) => {
                    const isFull = i + 1 <= item.rating;
                    const isHalf = !isFull && i < item.rating;
                    if (isFull) {
                      return (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 text-amber-400 fill-amber-400"
                        />
                      );
                    }
                    if (isHalf) {
                      return (
                        <StarHalf
                          key={i}
                          className="w-3.5 h-3.5 text-amber-400 fill-amber-400"
                        />
                      );
                    }
                    return (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 text-slate-300 dark:text-slate-700"
                      />
                    );
                  })}
                  <span className="text-[10px] text-slate-400 ml-1 font-mono">
                    {item.rating.toFixed(1)}
                  </span>
                </div>

                <p
                  className={`text-xs sm:text-sm leading-relaxed italic ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  "{item.content}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block font-display">
                    {item.clientName}
                  </span>
                  <span className="text-slate-400 text-[11px]">
                    {item.role ? `${item.role}, ` : ''}{item.company}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">
                  {item.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Testimonial Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 backdrop-blur-md bg-black/60 animate-in fade-in duration-200">
          <div
            className={`w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl p-5 sm:p-8 border shadow-2xl relative ${
              isDark
                ? 'bg-[#0E1729] border-slate-700 text-white'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <button
              id="close-add-testimonial-modal"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2374B8] mb-1">
              <MessageSquare className="w-4 h-4" />
              <span>Client Review Portal</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display mb-1 leading-snug pb-0.5 overflow-visible">
              Share Your Experience With ADVYX
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Your feedback helps other ambitious founders discover our marketing and branding capabilities.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2374B8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Your Role / Title
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Founder"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2374B8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Company / Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Acme Studio"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2374B8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Service Rendered
                  </label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2374B8]"
                  >
                    <option value="Social Media Management">Social Media Management</option>
                    <option value="Performance & Paid Ads">Performance & Paid Ads</option>
                    <option value="Content Creation & Video">Content Creation & Video</option>
                    <option value="Brand Identity & Design">Brand Identity & Design</option>
                    <option value="Full Agency Retainer">Full Agency Retainer</option>
                  </select>
                </div>
              </div>

              {/* Rating stars */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 text-amber-400 hover:scale-125 transition-transform"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300 dark:text-slate-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold ml-2 text-slate-600 dark:text-slate-400">
                    {rating} out of 5 stars
                  </span>
                </div>
              </div>

              {/* Review content */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Your Testimonial *
                </label>
                <textarea
                  required
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="How did ADVYX help your brand? Mention creative execution, communication, or marketing results..."
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2374B8]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="submit-testimonial-btn"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#2374B8] hover:bg-[#18598F] shadow-sm shadow-[#2374B8]/30 transition-all"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};