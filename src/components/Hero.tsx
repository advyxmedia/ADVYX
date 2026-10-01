import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { ClientLogo } from './ClientLogo';

interface HeroProps {
  onExploreWork: () => void;
  onBookCall: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onBookCall }) => {
  const { isDark, localTimeFormatted } = useTheme();
  const { language, t } = useLanguage();

  return (
    <section
      id="hero"
      className="relative min-h-[88vh] flex items-center justify-center pt-24 sm:pt-28 pb-14 sm:pb-16 overflow-hidden w-full max-w-full"
    >
      {/* Subtle Background Glows matching brand palette */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] h-[340px] sm:h-[600px] rounded-full blur-3xl opacity-20 transition-all duration-1000 ${
            isDark ? 'bg-[#2374B8]' : 'bg-[#2374B8]/40'
          }`}
        />
        {/* Subtle grid pattern */}
        <div
          className={`absolute inset-0 opacity-[0.03] ${
            isDark ? 'invert' : ''
          }`}
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center w-full">
        {/* Sleek Minimal Status Tag */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wide uppercase border mb-6 sm:mb-8 backdrop-blur-sm transition-colors max-w-full"
          style={{
            borderColor: isDark ? 'rgba(35, 116, 184, 0.35)' : 'rgba(35, 116, 184, 0.25)',
            backgroundColor: isDark ? 'rgba(14, 23, 41, 0.7)' : 'rgba(235, 243, 250, 0.8)',
            color: isDark ? '#7DD3FC' : '#155592',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#2374B8] animate-pulse shrink-0" />
          <span className="truncate">
            {language === 'th'
              ? 'เอเจนซี่การตลาดสร้างสรรค์และการเติบโต'
              : language === 'es'
              ? 'Agencia Boutique Creativa y de Crecimiento'
              : 'Boutique Creative & Growth Agency'}
          </span>
          <span className="opacity-40">•</span>
          <span className="font-mono text-[10px] sm:text-[11px] opacity-75 shrink-0">{localTimeFormatted}</span>
        </motion.div>

        {/* Minimalist, High-Impact Headline with safe descender padding */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`text-3xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.18] pb-2 mb-4 sm:mb-6 font-display overflow-visible ${
            isDark ? 'text-white' : 'text-slate-950'
          }`}
        >
          {language === 'th' ? (
            <>
              เปลี่ยนความสนใจของผู้คนให้กลายเป็น{' '}
              <span className="relative inline-block text-[#2374B8]">
                รายได้ที่เติบโตจริง
                <svg
                  className="absolute -bottom-1.5 left-0 w-full text-[#2374B8] opacity-30 h-2"
                  viewBox="0 0 300 12"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M1 9C50 3 150 1 299 9"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </>
          ) : language === 'es' ? (
            <>
              Transformamos la atención en{' '}
              <span className="relative inline-block text-[#2374B8]">
                ingresos medibles.
                <svg
                  className="absolute -bottom-1.5 left-0 w-full text-[#2374B8] opacity-30 h-2"
                  viewBox="0 0 300 12"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M1 9C50 3 150 1 299 9"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </>
          ) : (
            <>
              We engineer attention into{' '}
              <span className="relative inline-block text-[#2374B8]">
                measurable revenue.
                <svg
                  className="absolute -bottom-1.5 left-0 w-full text-[#2374B8] opacity-30 h-2"
                  viewBox="0 0 300 12"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M1 9C50 3 150 1 299 9"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </>
          )}
        </motion.h1>

        {/* Concise, Elegant Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`max-w-2xl mx-auto text-base sm:text-xl font-normal leading-relaxed mb-8 sm:mb-10 ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}
        >
          {language === 'th'
            ? 'การบริหารจัดการโซเชียลมีเดีย โฆษณาที่เปลี่ยนเป็นยอดขาย และอัตลักษณ์แบรนด์ที่โดดเด่นเพื่อผู้ก่อตั้งที่มีวิสัยทัศน์'
            : language === 'es'
            ? 'Gestión de redes sociales, anuncios pagados de alta conversión e identidad de marca icónica para fundadores ambiciosos.'
            : 'Social media management, high-converting paid ads, and iconic brand identity for ambitious founders.'}
        </motion.p>

        {/* Primary Call To Actions */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 w-full max-w-md sm:max-w-none mx-auto"
        >
          <a
            href="#discovery-calendar"
            id="hero-cta-schedule"
            onClick={onBookCall}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-bold text-white bg-[#2374B8] hover:bg-[#18598F] shadow-lg shadow-[#2374B8]/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Calendar className="w-4 h-4" />
            <span>{t.hero.bookCta}</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>

          <a
            href="#case-studies"
            id="hero-cta-work"
            onClick={onExploreWork}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-semibold border transition-all ${
              isDark
                ? 'border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200'
                : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-800 shadow-sm'
            }`}
          >
            <span>{t.hero.exploreCta}</span>
          </a>
        </motion.div>

        {/* Minimalist Metric Strip with Verified Authentic Figures */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 max-w-4xl mx-auto p-3 sm:p-6 rounded-2xl border backdrop-blur-md ${
            isDark
              ? 'bg-[#0E1729]/80 border-slate-800/80'
              : 'bg-white/80 border-slate-200/90 shadow-sm'
          }`}
        >
          <div className="p-2.5 sm:p-3 text-center rounded-xl bg-slate-500/5 sm:bg-transparent">
            <div className="text-xl sm:text-3xl font-extrabold text-[#2374B8] font-display pb-0.5">
              3+ Yrs
            </div>
            <div className="text-[11px] sm:text-xs font-medium text-slate-500 dark:text-slate-400">
              {language === 'th'
                ? 'เชี่ยวชาญโซเชียลมีเดีย'
                : language === 'es'
                ? 'Especialistas en Redes'
                : 'Social Media Mastery'}
            </div>
          </div>

          <div className="p-2.5 sm:p-3 text-center rounded-xl bg-slate-500/5 sm:bg-transparent">
            <div className="text-xl sm:text-3xl font-extrabold text-[#2374B8] font-display pb-0.5">
              2+ Yrs
            </div>
            <div className="text-[11px] sm:text-xs font-medium text-slate-500 dark:text-slate-400">
              {language === 'th'
                ? 'โฆษณาเน้นผลลัพธ์'
                : language === 'es'
                ? 'Anuncios de Rendimiento'
                : 'Performance Paid Ads'}
            </div>
          </div>

          <div className="p-2.5 sm:p-3 text-center rounded-xl bg-slate-500/5 sm:bg-transparent">
            <div className="text-xl sm:text-3xl font-extrabold text-[#2374B8] font-display pb-0.5">
              3.2x
            </div>
            <div className="text-[11px] sm:text-xs font-medium text-slate-500 dark:text-slate-400">
              {t.hero.roasLabel}
            </div>
          </div>

          <div className="p-2.5 sm:p-3 text-center rounded-xl bg-slate-500/5 sm:bg-transparent">
            <div className="text-xl sm:text-3xl font-extrabold text-[#2374B8] font-display pb-0.5">
              100%
            </div>
            <div className="text-[11px] sm:text-xs font-medium text-slate-500 dark:text-slate-400">
              {language === 'th'
                ? 'ดูแลโดยตรงจากผู้ก่อตั้ง'
                : language === 'es'
                ? 'Atención de Fundador'
                : 'Founder-Led Care'}
            </div>
          </div>
        </motion.div>

        {/* Client Showcase in Symmetrical Linearity (Pure Authentic Logos in Perfect Proportion, Tappable to Client Store/Instagram) */}
        <div className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-slate-200/80 dark:border-slate-800/80">
          <div className="text-center mb-5">
            <p className="text-[11px] sm:text-xs uppercase tracking-widest font-semibold text-slate-400 dark:text-slate-500 mb-1">
              {t.hero.partnersTitle}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              {t.hero.partnersSubtitle}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto items-stretch">
            <div className="flex items-center justify-center">
              <ClientLogo
                client="house-of-dorii"
                size="md"
                isDark={isDark}
                showLabels={false}
                asLink={true}
                className="w-full h-16 sm:h-20 flex items-center justify-center"
              />
            </div>
            <div className="flex items-center justify-center">
              <ClientLogo
                client="lokoboko"
                size="md"
                isDark={isDark}
                showLabels={false}
                asLink={true}
                className="w-full h-16 sm:h-20 flex items-center justify-center"
              />
            </div>
            <div className="flex items-center justify-center">
              <ClientLogo
                client="stuff-the-food-up"
                size="md"
                isDark={isDark}
                showLabels={false}
                asLink={true}
                className="w-full h-16 sm:h-20 flex items-center justify-center"
              />
            </div>
            <div className="flex items-center justify-center">
              <ClientLogo
                client="yaki-home-objects"
                size="md"
                isDark={isDark}
                showLabels={false}
                asLink={true}
                className="w-full h-16 sm:h-20 flex items-center justify-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
