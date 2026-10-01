import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { SERVICE_TIERS } from '../data/agencyData';
import { ServiceTier } from '../types';
import {
  Share2,
  TrendingUp,
  Video,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Target,
  Layers,
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const { isDark } = useTheme();
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'capabilities' | 'packages'>('capabilities');

  const capabilities = [
    {
      id: 'social-media',
      title:
        language === 'th'
          ? 'การบริหารจัดการโซเชียลมีเดีย'
          : language === 'es'
          ? 'Gestión de Redes Sociales'
          : 'Social Media Management',
      icon: Share2,
      tagline:
        language === 'th'
          ? 'วิเคราะห์อัลกอริทึม ผลิตคลิปไวรัล Reels และสร้างคอมมูนิตี้ที่เหนียวแน่น'
          : language === 'es'
          ? 'Estrategia algorítmica, Reels de alto impacto y cultivo activo de comunidad.'
          : 'Algorithmic curation, high-reach reels, and active community cultivation.',
      description:
        language === 'th'
          ? 'เราดูแลช่องทางโซเชียลของคุณอย่างครบวงจร ตั้งแต่การวางแผน Story ประจำวันไปจนถึงการผลิตคลิป Reels ไวรัลที่ทำให้แบรนด์ของคุณเป็นที่พูดถึงในวงการ'
          : language === 'es'
          ? 'Asumimos el control total de tus canales sociales. Desde historias diarias hasta Reels virales de alta retención, posicionamos tu marca en el centro de la conversación de tu industria.'
          : 'We take full ownership of your social channels. From daily story pacing to high-engagement viral reels, we position your brand at the center of your industry conversation.',
      deliverables:
        language === 'th'
          ? [
              'ปฏิทินคอนเทนต์และกลยุทธ์รายเดือนแบบครบวงจร',
              'ลำดับ Story ประจำวันและคลิป Reels/Shorts การมีส่วนร่วมสูง',
              'การตอบคอมเมนต์และข้อความ DM เพื่อสร้างความสัมพันธ์กับลูกค้า',
              'การจับกระแสแฮชแท็ก เพลง และเทรนด์ยอดนิยม',
              'รายงานผลการดำเนินงานรายเดือนอย่างโปร่งใส',
            ]
          : language === 'es'
          ? [
              'Calendario editorial integral y estrategia mensual',
              'Secuencias diarias de Stories y Reels/Shorts de alta retención',
              'Gestión activa de comentarios y mensajes directos (DM)',
              'Sincronización con audios en tendencia, hashtags y cultura digital',
              'Informes mensuales transparentes de rendimiento',
            ]
          : [
              'End-to-end content calendar & monthly strategy',
              'Daily story sequences & high-retention Reels/Shorts',
              'Active community comment & DM engagement',
              'Hashtag, audio & cultural trend synchronization',
              'Transparent monthly performance reports',
            ],
      idealFor:
        language === 'th'
          ? 'แบรนด์ที่ต้องการโซเชียลมีเดียที่สวยงาม พรีเมียม และมีประสิทธิภาพสม่ำเสมอ'
          : language === 'es'
          ? 'Marcas que buscan una presencia impecable, constante y de alta estética sin esfuerzo.'
          : 'Brands wanting a consistent, high-aesthetic social media presence without lifting a finger.',
    },
    {
      id: 'performance-ads',
      title:
        language === 'th'
          ? 'การตลาดเน้นผลลัพธ์และโฆษณาเจาะกลุ่ม'
          : language === 'es'
          ? 'Marketing de Rendimiento y Anuncios'
          : 'Performance Marketing & Paid Ads',
      icon: TrendingUp,
      tagline:
        language === 'th'
          ? 'ดึงดูดลูกค้าใหม่ที่เปลี่ยนเป็นยอดขายได้จริงบน Meta, TikTok และ Google'
          : language === 'es'
          ? 'Adquisición de clientes de alta conversión en Meta, TikTok y Google.'
          : 'High-converting customer acquisition across Meta, TikTok, and Google.',
      description:
        language === 'th'
          ? 'ยิงแอดอย่างแม่นยำด้วยการทดสอบชิ้นงานสร้างสรรค์ วางแผน Retargeting และปรับปรุงแคมเปญเพื่อผลตอบแทนค่าโฆษณา (ROAS) สูงสุด'
          : language === 'es'
          ? 'Medios pagados con base analítica y cero improvisación. Diseñamos, probamos y escalamos anuncios optimizados para flujo de caja positivo y retorno sostenido (ROAS).'
          : 'Paid media with zero guesswork. We build, test, and scale ad creatives engineered for positive cash-flow and sustained return on ad spend (ROAS).',
      deliverables:
        language === 'th'
          ? [
              'การบริหารแคมเปญโฆษณา Full-funnel Meta (IG/FB) และ TikTok',
              'การทดสอบ Hook และข้อความโฆษณาอย่างเข้มข้น',
              'การติดตั้ง Conversion Tracking, Pixel และ CAPI อย่างแม่นยำ',
              'ระบบ Retargeting ติดตามลูกค้าเก่าเพื่อเพิ่มการซื้อซ้ำ',
              'การตรวจสอบและปรับปรุง CPA & ROAS รายสัปดาห์',
            ]
          : language === 'es'
          ? [
              'Gestión integral de anuncios en Meta (Instagram/FB) y TikTok',
              'Iteración rigurosa de ganchos creativos y textos persuasivos',
              'Configuración de Pixel, seguimiento de conversiones y CAPI',
              'Embudos de retargeting y reactivación de clientes potenciales',
              'Auditorías semanales de optimización de CPA y ROAS',
            ]
          : [
              'Full-funnel Meta (Instagram/FB) & TikTok ad management',
              'Rigorous creative hook & copy iteration',
              'Conversion tracking, Pixel & server CAPI integration',
              'Retargeting & warm audience win-back funnels',
              'Weekly CPA & ROAS optimization audits',
            ],
      idealFor:
        language === 'th'
          ? 'ธุรกิจอีคอมเมิร์ซและบริการที่พร้อมเปลี่ยนค่าแอดทุก 1 บาทเป็นกำไรคืนมา'
          : language === 'es'
          ? 'E-commerce y empresas de servicios listas para convertir cada dólar en $4+ de retorno.'
          : 'E-commerce and service businesses ready to turn $1 of ad spend into $4+ in return.',
    },
    {
      id: 'content-creation',
      title:
        language === 'th'
          ? 'ผลิตคอนเทนต์และโปรดักชันวิดีโอ'
          : language === 'es'
          ? 'Creación de Contenido y Dirección de Video'
          : 'Content Creation & Video Direction',
      icon: Video,
      tagline:
        language === 'th'
          ? 'ภาพและวิดีโอที่หยุดนิ้วโป้งคนดูภายใน 2 วินาทีแรก'
          : language === 'es'
          ? 'Activos visuales que capturan la atención en los primeros 2 segundos.'
          : 'Scroll-stopping visual assets that capture attention in the first 2 seconds.',
      description:
        language === 'th'
          ? 'เราเขียนบท ถ่ายทำ และตัดต่อวิดีโอสั้นที่มีความเป็นธรรมชาติ ดึงดูด และยกระดับภาพลักษณ์ของแบรนด์ให้ดูน่าเชื่อถือทันที'
          : language === 'es'
          ? 'El público actual exige video dinámico y auténtico. Guionizamos, producimos y editamos contenido vertical que se siente nativo pero con una calidad indiscutible.'
          : 'Modern audiences crave dynamic, organic video. We script, produce, and edit short-form content that feels native to the feed yet undeniably elevated.',
      deliverables:
        language === 'th'
          ? [
              'วิดีโอเล่าเรื่องสไตล์ UGC และภาพจำระดับพรีเมียม',
              'ถ่ายภาพสินค้าและภาพจำลองไลฟ์สไตล์ที่เปลี่ยนเป็นยอดขาย',
              'การจัดจังหวะคลิป ใส่แคปชันสวยงาม และเลือกเสียงประกอบ',
              'ส่งมอบไฟล์หลายอัตราส่วน รองรับ Reels, TikTok และ Shorts',
              'ระบบถ่ายทำเป็นรอบ (Batch production) เพื่อประสิทธิภาพสูงสุด',
            ]
          : language === 'es'
          ? [
              'Videos estilo UGC cinematográfico y storytelling de fundadores',
              'Fotografía de producto y estilo de vida de alta conversión',
              'Edición con ritmo dinámico, subtítulos estéticos y diseño sonoro',
              'Entrega multiformato optimizada para Reels, TikTok y YouTube Shorts',
              'Sesiones de producción por lotes (Batch) para máxima eficiencia',
            ]
          : [
              'Cinematic UGC & founder-led storytelling video',
              'High-converting product styling & lifestyle imagery',
              'Viral pacing, typography captions & sound design',
              'Multi-format delivery tailored for Reels, TikTok & Shorts',
              'Batch production sessions for maximum efficiency',
            ],
      idealFor:
        language === 'th'
          ? 'แบรนด์อาหาร เครื่องดื่ม สินค้าไลฟ์สไตล์ ที่ต้องการภาพลักษณ์ที่น่าประทับใจ'
          : language === 'es'
          ? 'Marcas de alimentos, bebidas, moda y estilo de vida que necesitan contenido visual irresistible.'
          : 'Food & beverage, lifestyle, and consumer products needing mouth-watering visual assets.',
    },
    {
      id: 'branding-identity',
      title:
        language === 'th'
          ? 'อัตลักษณ์แบรนด์และระบบดีไซน์'
          : language === 'es'
          ? 'Branding y Sistemas Visuales'
          : 'Branding & Visual Systems',
      icon: Sparkles,
      tagline:
        language === 'th'
          ? 'สร้างระบบภาพลักษณ์ที่อยู่เหนือกาลเวลาและสร้างความน่าเชื่อถือในทันที'
          : language === 'es'
          ? 'Sistemas de identidad atemporales diseñados para generar autoridad inmediata.'
          : 'Timeless visual identity systems designed to build instant authority.',
      description:
        language === 'th'
          ? 'การตลาดที่ยอดเยี่ยมต้องมีแบรนด์ที่น่าจดจำ เรารังสรรค์ชุดโลโก้ ดีไซน์แพ็กเกจจิ้ง และคู่มืออัตลักษณ์ที่ทำให้ธุรกิจของคุณโดดเด่น'
          : language === 'es'
          ? 'Una gran estrategia de marketing fracasa con una identidad mediocre. Diseñamos logotipos distintivos, empaques memorables y sistemas visuales coherentes.'
          : 'Great marketing fails with mediocre branding. We craft distinctive logo suites, tactile packaging, and cohesive design systems that make your business memorable.',
      deliverables:
        language === 'th'
          ? [
              'ออกแบบชุดโลโก้ Wordmark และ Submark ครบทุกขนาด',
              'การจับคู่สี คู่มือฟอนต์ และ Brand Guidelines ประจำแบรนด์',
              'การออกแบบแพ็กเกจจิ้ง กล่องบรรจุภัณฑ์ และสื่อสิ่งพิมพ์',
              'ทิศทางศิลป์ของเว็บไซต์และร้านค้าดิจิทัล',
              'เทมเพลตสำหรับโพสต์บนโซเชียลมีเดีย',
            ]
          : language === 'es'
          ? [
              'Logotipo principal, símbolo tipográfico y submarcas adaptables',
              'Teoría del color, jerarquía tipográfica y manual de marca',
              'Diseño de empaques, packaging y papelería corporativa',
              'Dirección visual para sitio web y tiendas digitales',
              'Plantillas personalizadas para el feed de redes sociales',
            ]
          : [
              'Comprehensive logomark, wordmark & responsive submarks',
              'Color theory, font hierarchy & brand rules book',
              'Packaging, product boxes & print collateral design',
              'Website & digital storefront visual direction',
              'Social media grid templates and design system kits',
            ],
      idealFor:
        language === 'th'
          ? 'ธุรกิจใหม่ที่ต้องการเริ่มต้นอย่างมืออาชีพ หรือแบรนด์เดิมที่ต้องการรีแบรนด์'
          : language === 'es'
          ? 'Nuevos proyectos que nacen desde cero o marcas consolidadas que modernizan su imagen.'
          : 'New ventures launching 0-to-1 or established brands modernizing their legacy look.',
    },
  ];

  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#2374B8] mb-3">
              <Target className="w-3.5 h-3.5" />
              <span>
                {language === 'th'
                  ? 'ความเชี่ยวชาญหลัก'
                  : language === 'es'
                  ? 'Especialización Central'
                  : 'Core Specialization'}
              </span>
            </div>
            <h2
              className={`text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.25] pb-2 font-display overflow-visible ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              {language === 'th'
                ? 'บริการที่ออกแบบมาเพื่อการเติบโต'
                : language === 'es'
                ? 'Servicios Diseñados Para el Crecimiento'
                : 'Services Engineered For Growth'}
            </h2>
          </div>

          {/* Toggle between Capabilities & Packages */}
          <div
            className={`inline-flex p-1 rounded-full border self-start md:self-auto ${
              isDark
                ? 'bg-[#0E1729] border-slate-800'
                : 'bg-slate-100 border-slate-200'
            }`}
          >
            <button
              id="services-tab-capabilities"
              onClick={() => setActiveTab('capabilities')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                activeTab === 'capabilities'
                  ? 'bg-[#2374B8] text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {language === 'th'
                ? '4 เสาหลักกลยุทธ์'
                : language === 'es'
                ? '4 Pilares'
                : 'Four Pillars'}
            </button>
            <button
              id="services-tab-packages"
              onClick={() => setActiveTab('packages')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                activeTab === 'packages'
                  ? 'bg-[#2374B8] text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {language === 'th'
                ? 'แพ็กเกจการเติบโต'
                : language === 'es'
                ? 'Planes Mensuales'
                : 'Retainer Packages'}
            </button>
          </div>
        </div>

        {/* VIEW 1: Four Pillars (Capabilities) */}
        {activeTab === 'capabilities' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.id}
                  className={`group p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                    isDark
                      ? 'bg-[#0E1729]/70 hover:bg-[#111C33] border-slate-800/90 hover:border-[#2374B8]/40'
                      : 'bg-white hover:bg-slate-50/80 border-slate-200/90 hover:border-[#2374B8]/40 shadow-sm'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-[#2374B8]/10 text-[#2374B8] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-semibold text-slate-400">
                        {language === 'th'
                          ? 'ขีดความสามารถ'
                          : language === 'es'
                          ? 'Capacidad'
                          : 'Capability'}
                      </span>
                    </div>

                    <h3
                      className={`text-2xl font-bold mb-2 font-display ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {cap.title}
                    </h3>
                    <p className="text-sm font-medium text-[#2374B8] mb-4">
                      {cap.tagline}
                    </p>
                    <p
                      className={`text-sm leading-relaxed mb-6 ${
                        isDark ? 'text-slate-300' : 'text-slate-600'
                      }`}
                    >
                      {cap.description}
                    </p>

                    <div className="space-y-2.5 mb-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                      {cap.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs">
                          <CheckCircle2 className="w-4 h-4 text-[#2374B8] shrink-0 mt-0.5" />
                          <span
                            className={
                              isDark ? 'text-slate-300' : 'text-slate-700'
                            }
                          >
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 max-w-[65%] truncate">
                      {language === 'th'
                        ? 'เหมาะสำหรับ:'
                        : language === 'es'
                        ? 'Ideal para:'
                        : 'Best for:'}{' '}
                      {cap.idealFor}
                    </span>
                    <button
                      id={`inquire-cap-${cap.id}`}
                      onClick={() => onSelectService(cap.title)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2374B8] hover:text-[#18598F] transition-colors cursor-pointer"
                    >
                      <span>
                        {language === 'th'
                          ? 'สอบถามข้อมูล'
                          : language === 'es'
                          ? 'Consultar'
                          : 'Inquire'}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* VIEW 2: Retainer Packages & Tiers */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICE_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`relative p-6 rounded-3xl border flex flex-col justify-between transition-all duration-300 ${
                  tier.popular
                    ? isDark
                      ? 'bg-[#111D36] border-[#2374B8] shadow-lg shadow-[#2374B8]/20 ring-1 ring-[#2374B8]'
                      : 'bg-white border-[#2374B8] shadow-md shadow-[#2374B8]/10 ring-1 ring-[#2374B8]'
                    : isDark
                    ? 'bg-[#0E1729]/80 border-slate-800'
                    : 'bg-white border-slate-200'
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-6 px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#2374B8] text-white">
                    {language === 'th'
                      ? 'ยอดนิยมที่สุด'
                      : language === 'es'
                      ? 'MÁS POPULAR'
                      : tier.badge}
                  </span>
                )}

                <div>
                  {!tier.popular && tier.badge && (
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#2374B8] mb-2">
                      {tier.badge}
                    </span>
                  )}
                  <h3
                    className={`text-xl font-bold mb-2 font-display ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {tier.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 min-h-[36px]">
                    {tier.tagline}
                  </p>

                  <div className="space-y-2.5 mb-8">
                    {tier.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2374B8] shrink-0 mt-0.5" />
                        <span
                          className={
                            isDark ? 'text-slate-300' : 'text-slate-700'
                          }
                        >
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="text-[11px] text-slate-400 mb-3">
                    {language === 'th'
                      ? 'รอบการส่งมอบ:'
                      : language === 'es'
                      ? 'Frecuencia:'
                      : 'Cadence:'}{' '}
                    <span className="font-semibold text-slate-600 dark:text-slate-300">
                      {tier.turnaround}
                    </span>
                  </div>
                  <button
                    id={`select-tier-${tier.id}`}
                    onClick={() => onSelectService(tier.name)}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      tier.popular
                        ? 'bg-[#2374B8] text-white hover:bg-[#18598F] shadow-sm'
                        : isDark
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    <span>{t.services.bookPackage}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
