import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { CASE_STUDIES } from '../data/agencyData';
import { CaseStudy } from '../types';
import { ArrowUpRight, X, TrendingUp, CheckCircle2, Quote } from 'lucide-react';

interface CaseStudiesSectionProps {
  onBookCallForWork: (clientName: string) => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ onBookCallForWork }) => {
  const { isDark } = useTheme();
  const { language, t } = useLanguage();
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

  return (
    <section id="case-studies" className="py-20 sm:py-24 relative w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with descender safety */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#2374B8] mb-3">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{t.caseStudies.sectionTag}</span>
          </div>
          <h2
            className={`text-3xl sm:text-5xl font-extrabold tracking-tight font-display mb-4 leading-[1.2] pb-1.5 overflow-visible ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            {t.caseStudies.title}
          </h2>
          <p
            className={`text-base sm:text-lg ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            {t.caseStudies.subtitle}
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {CASE_STUDIES.map((study) => (
            <div
              key={study.id}
              onClick={() => setSelectedStudy(study)}
              className={`group cursor-pointer rounded-3xl p-6 sm:p-8 border transition-all duration-300 flex flex-col justify-between ${
                isDark
                  ? 'bg-[#0E1729]/70 hover:bg-[#121E36] border-slate-800/80 hover:border-[#2374B8]/50'
                  : 'bg-white hover:bg-slate-50 border-slate-200/90 hover:border-[#2374B8]/40 shadow-sm'
              }`}
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2374B8]">
                    {study.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {study.period}
                  </span>
                </div>

                <h3
                  className={`text-2xl sm:text-3xl font-bold mb-2 font-display group-hover:text-[#2374B8] transition-colors leading-snug pb-1 overflow-visible ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {study.client}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mb-6">
                  {study.tagline}
                </p>

                {/* Metrics Highlight Pill Bar */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 p-3 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                  {study.metrics.map((m, idx) => (
                    <div key={idx} className="text-center min-w-0">
                      <div className="text-base sm:text-xl font-black text-[#2374B8] font-display truncate">
                        {m.value}
                      </div>
                      <div className="text-[9px] sm:text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Deliverables snippet */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {study.deliverables.slice(0, 3).map((d, i) => (
                    <span
                      key={i}
                      className={`text-[11px] px-2.5 py-1 rounded-lg font-medium border ${
                        isDark
                          ? 'bg-slate-800/60 border-slate-700/60 text-slate-300'
                          : 'bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      {d}
                    </span>
                  ))}
                  {study.deliverables.length > 3 && (
                    <span className="text-[11px] px-2 py-1 text-slate-400 font-medium">
                      +{study.deliverables.length - 3}{' '}
                      {language === 'th' ? 'เพิ่มเติม' : language === 'es' ? 'más' : 'more'}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {language === 'th'
                    ? 'ดูเคสศึกษานี้'
                    : language === 'es'
                    ? 'Explorar caso completo'
                    : 'Explore full case study'}
                </span>
                <div className="w-8 h-8 rounded-full bg-[#2374B8]/10 text-[#2374B8] flex items-center justify-center group-hover:bg-[#2374B8] group-hover:text-white transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Detail Modal */}
      {selectedStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 backdrop-blur-md bg-black/60 animate-in fade-in duration-200">
          <div
            className={`w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl p-5 sm:p-8 border shadow-2xl relative ${
              isDark
                ? 'bg-[#0E1729] border-slate-700 text-white'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            {/* Close button */}
            <button
              id="close-case-study-modal"
              onClick={() => setSelectedStudy(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2374B8]">
                {selectedStudy.category} • {selectedStudy.period}
              </span>

              <h3 className="text-2xl sm:text-3xl font-extrabold font-display leading-tight pb-1 overflow-visible mt-2">
                {selectedStudy.client}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {selectedStudy.title}
              </p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 p-3 sm:p-4 rounded-2xl bg-[#2374B8]/10 border border-[#2374B8]/20 mb-6">
              {selectedStudy.metrics.map((m, idx) => (
                <div key={idx} className="text-center min-w-0">
                  <div className="text-lg sm:text-2xl font-black text-[#2374B8] font-display truncate">
                    {m.value}
                  </div>
                  <div className="text-[10px] sm:text-xs font-medium text-slate-600 dark:text-slate-300 truncate">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Challenge & Solution */}
            <div className="space-y-4 mb-6 text-xs sm:text-sm leading-relaxed">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  {language === 'th'
                    ? 'โจทย์และความท้าทาย'
                    : language === 'es'
                    ? 'El Desafío'
                    : 'The Challenge'}
                </h4>
                <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                  {selectedStudy.challenge}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  {language === 'th'
                    ? 'กลยุทธ์จาก ADVYX'
                    : language === 'es'
                    ? 'La Solución de ADVYX'
                    : 'The ADVYX Solution'}
                </h4>
                <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                  {selectedStudy.solution}
                </p>
              </div>
            </div>

            {/* Key Deliverables */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                {language === 'th'
                  ? 'ชิ้นงานที่ส่งมอบ'
                  : language === 'es'
                  ? 'Entregables Ejecutados'
                  : 'Executed Deliverables'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedStudy.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2374B8] shrink-0" />
                    <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Client Quote */}
            {selectedStudy.clientQuote && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-100 dark:border-slate-800 mb-8 flex gap-3 items-start">
                <Quote className="w-5 h-5 text-[#2374B8] shrink-0 mt-0.5 opacity-60" />
                <p className="text-xs italic text-slate-600 dark:text-slate-300 leading-relaxed">
                  "{selectedStudy.clientQuote}"
                </p>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setSelectedStudy(null)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white"
              >
                {language === 'th' ? 'ปิด' : language === 'es' ? 'Cerrar' : 'Close'}
              </button>
              <button
                onClick={() => {
                  const client = selectedStudy.client;
                  setSelectedStudy(null);
                  onBookCallForWork(client);
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#2374B8] hover:bg-[#18598F] shadow-md shadow-[#2374B8]/30 transition-all"
              >
                {language === 'th'
                  ? 'จองการปรึกษาเพื่อรับผลลัพธ์เช่นนี้'
                  : language === 'es'
                  ? 'Lograr Resultados Similares'
                  : 'Achieve Similar Results'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
