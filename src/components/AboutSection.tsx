import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { AdvyxLogo } from './AdvyxLogo';
import { Check, ShieldCheck, Zap, Compass } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { isDark } = useTheme();
  const { language, t } = useLanguage();

  return (
    <section id="about" className="py-20 sm:py-24 relative border-t border-slate-200/80 dark:border-slate-800/80 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-center">
          {/* Left Column - Core Manifesto */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#2374B8] mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>{t.about.sectionTag}</span>
            </div>
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display mb-6 leading-[1.2] pb-1 overflow-visible ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              {language === 'th'
                ? 'เน้นผลลัพธ์จริง ไร้สิ่งฟุ่มเฟือย ขับเคลื่อนด้วยความคิดสร้างสรรค์'
                : language === 'es'
                ? 'Alto Impacto. Cero Relleno. Pura Inercia Creativa.'
                : 'High Signal. Zero Fluff. Pure Creative Momentum.'}
            </h2>

            <div
              className={`space-y-4 text-base sm:text-lg leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              <p>
                {language === 'th'
                  ? 'ก่อตั้งขึ้นด้วยประสบการณ์กว่า 3 ปีในการบริหารโซเชียลมีเดีย และ 2 ปีในการยิงแอดผลตอบแทนสูง ADVYX ผสานความคิดสร้างสรรค์เข้ากับผลกำไรที่วัดผลได้จริง'
                  : language === 'es'
                  ? 'Fundada sobre más de 3 años de dominio en redes sociales y más de 2 años en publicidad pagada de alto rendimiento, ADVYX une la resonancia cultural con la rentabilidad matemática de los anuncios.'
                  : 'Founded on 3+ years of social media mastery and 2+ years of performance paid advertising experience, ADVYX bridges the gap between cultural resonance and mathematical ad profitability.'}
              </p>
              <p>
                {language === 'th'
                  ? <>ตั้งแต่การสร้างอัตลักษณ์แบรนด์ให้ <span className="font-semibold text-[#2374B8]">Yaki Home & Objects</span> และผลิตคอนเทนต์อาหารให้ <span className="font-semibold text-[#2374B8]">Stuff The Food Up</span> ไปจนถึงการยิงแอดให้ <span className="font-semibold text-[#2374B8]">House of Dorii</span> และ <span className="font-semibold text-[#2374B8]">LokoBoko Store</span> เราไม่ได้แค่โพสต์คอนเทนต์ แต่เราสร้างระบบนิเวศของแบรนด์</>
                  : language === 'es'
                  ? <>Desde el lanzamiento de identidades de marca integrales como <span className="font-semibold text-[#2374B8]">Yaki Home & Objects</span> y contenido gastronómico dinámico para <span className="font-semibold text-[#2374B8]">Stuff The Food Up</span>, hasta publicidad pagada para <span className="font-semibold text-[#2374B8]">House of Dorii</span> y <span className="font-semibold text-[#2374B8]">LokoBoko Store</span>, no solo publicamos contenido: arquitecturamos ecosistemas de marca.</>
                  : <>From launching comprehensive brand identities like <span className="font-semibold text-[#2374B8]">Yaki Home & Objects</span> and dynamic food content for <span className="font-semibold text-[#2374B8]">Stuff The Food Up</span>, to running full-funnel paid advertising for <span className="font-semibold text-[#2374B8]">House of Dorii</span> and <span className="font-semibold text-[#2374B8]">LokoBoko Store</span>, we don’t just post content—we architect brand ecosystems.</>}
              </p>
            </div>

            {/* Quick Principles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#2374B8]/10 text-[#2374B8] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold font-display">{t.about.badge1Title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {t.about.badge1Desc}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#2374B8]/10 text-[#2374B8] flex items-center justify-center shrink-0 mt-0.5">
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold font-display">{t.about.badge2Title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {t.about.badge2Desc}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sleek Minimalist Badge & Credential Card */}
          <div className="lg:col-span-6 w-full">
            <div
              className={`p-6 sm:p-10 rounded-3xl border relative overflow-hidden ${
                isDark
                  ? 'bg-[#0E1729]/90 border-slate-800 text-white'
                  : 'bg-white border-slate-200 text-slate-900 shadow-xl shadow-slate-200/50'
              }`}
            >
              {/* Background watermark */}
              <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none">
                <AdvyxLogo variant="minimal" size="xl" isDark={isDark} />
              </div>

              <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100 dark:border-slate-800">
                <AdvyxLogo variant="badge" size="md" isDark={isDark} />
                <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-[#2374B8]/10 text-[#2374B8]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>
                    {language === 'th'
                      ? 'เอเจนซี่ที่ได้รับการรับรอง'
                      : language === 'es'
                      ? 'Práctica de Agencia Verificada'
                      : 'Verified Agency Practice'}
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800/60 gap-1 sm:gap-0">
                  <span className="text-slate-400 font-medium">
                    {language === 'th' ? 'ประสบการณ์ในสายงาน' : language === 'es' ? 'Experiencia en el Sector' : 'Domain Experience'}
                  </span>
                  <span className="font-semibold text-[#2374B8]">
                    {language === 'th' ? '3+ ปี (โซเชียล) • 2+ ปี (โฆษณา)' : language === 'es' ? '3+ Años (Redes) • 2+ Años (Ads)' : '3+ Yrs (Socials) • 2+ Yrs (Paid Ads)'}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800/60 gap-1 sm:gap-0">
                  <span className="text-slate-400 font-medium">
                    {language === 'th' ? 'เกณฑ์มาตรฐาน ROAS' : language === 'es' ? 'Estándar Objetivo de ROAS' : 'Target ROAS Standard'}
                  </span>
                  <span className="font-semibold">3.2x Campaign Benchmark</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800/60 gap-1 sm:gap-0">
                  <span className="text-slate-400 font-medium">
                    {language === 'th' ? 'ความเชี่ยวชาญหลัก' : language === 'es' ? 'Capacidades Principales' : 'Core Capabilities'}
                  </span>
                  <span className="font-semibold sm:text-right">Brand Identity, UGC Reels, Paid Social, Funnels</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800/60 gap-1 sm:gap-0">
                  <span className="text-slate-400 font-medium">
                    {language === 'th' ? 'พาร์ทเนอร์แบรนด์' : language === 'es' ? 'Clientes y Marcas' : 'Client Partners'}
                  </span>
                  <span className="font-semibold sm:text-right">House of Dorii, LokoBoko Store, Stuff The Food Up, Yaki Home & Objects</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 gap-1 sm:gap-0">
                  <span className="text-slate-400 font-medium">
                    {language === 'th' ? 'ติดต่ออย่างเป็นทางการ' : language === 'es' ? 'Contacto Oficial' : 'Official Contact'}
                  </span>
                  <span className="font-mono text-[#2374B8] font-bold">advyxmedia@gmail.com</span>
                </div>
              </div>

              {/* Minimalist quote badge */}
              <div className="mt-8 p-4 rounded-2xl bg-[#2374B8]/10 border border-[#2374B8]/20">
                <p className="text-xs italic text-[#2374B8] leading-relaxed">
                  {language === 'th'
                    ? '"เราสร้างแบรนด์ที่สื่อสารอย่างชัดเจน และระบบโฆษณาที่สร้างมูลค่าให้องค์กรอย่างยั่งยืน"'
                    : language === 'es'
                    ? '"Diseñamos marcas que se comunican con claridad y sistemas publicitarios que generan valor empresarial sostenido."'
                    : '"We craft brands that speak with clarity and ad systems that generate sustained enterprise value."'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
