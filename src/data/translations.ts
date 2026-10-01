export type Language = 'en' | 'es' | 'th';

export interface TranslationDictionary {
  nav: {
    services: string;
    caseStudies: string;
    about: string;
    testimonials: string;
    contact: string;
    bookCall: string;
    admin: string;
    operationsPortal: string;
    language: string;
  };
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    bookCta: string;
    exploreCta: string;
    roasStat: string;
    roasLabel: string;
    brandsStat: string;
    brandsLabel: string;
    engagementStat: string;
    engagementLabel: string;
    experienceStat: string;
    experienceLabel: string;
    partnersTitle: string;
    partnersSubtitle: string;
  };
  services: {
    sectionTag: string;
    title: string;
    subtitle: string;
    pillarsTitle: string;
    packagesTitle: string;
    retainerSubtitle: string;
    bookPackage: string;
    popularBadge: string;
    perMonth: string;
  };
  caseStudies: {
    sectionTag: string;
    title: string;
    subtitle: string;
    deliverables: string;
    growthMetrics: string;
    founderQuote: string;
    bookCallForWork: string;
  };
  about: {
    sectionTag: string;
    title: string;
    subtitle: string;
    badge1Title: string;
    badge1Desc: string;
    badge2Title: string;
    badge2Desc: string;
    badge3Title: string;
    badge3Desc: string;
    philosophyTitle: string;
    valuesTitle: string;
  };
  testimonials: {
    sectionTag: string;
    title: string;
    subtitle: string;
    addReview: string;
    verifiedClient: string;
    stars: string;
  };
  calendar: {
    sectionTag: string;
    title: string;
    subtitle: string;
    duration: string;
    selectService: string;
    selectDate: string;
    openCalendar: string;
    quickPresets: string;
    tomorrow: string;
    nextMon: string;
    nextWeek: string;
    inTwoWeeks: string;
    selectTime: string;
    yourDetails: string;
    fullName: string;
    email: string;
    brandName: string;
    notes: string;
    confirmButton: string;
    confirmedTitle: string;
    confirmedDesc: string;
    chosenDate: string;
    changeDate: string;
    resetDate: string;
    closeCalendar: string;
    confirmDate: string;
    cancel: string;
  };
  contact: {
    sectionTag: string;
    title: string;
    subtitle: string;
    formTitle: string;
    nameLabel: string;
    brandLabel: string;
    emailLabel: string;
    phoneLabel: string;
    budgetLabel: string;
    challengesLabel: string;
    submitButton: string;
    submitting: string;
    successMessage: string;
    directContact: string;
    officialChannels: string;
    directTitle: string;
    officialTitle: string;
  };
  footer: {
    tagline: string;
    quickLinks: string;
    coreServices: string;
    directContact: string;
    officialChannels: string;
    copyright: string;
    rights: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  en: {
    nav: {
      services: 'Services',
      caseStudies: 'Case Studies',
      about: 'About',
      testimonials: 'Testimonials',
      contact: 'Contact',
      bookCall: 'Book Call',
      admin: 'Admin',
      operationsPortal: 'ADVYX Operations Portal',
      language: 'Language',
    },
    hero: {
      badge: 'Creative Marketing & Brand Strategy • High-Impact Content & Execution',
      headline: 'Transforming Brands Into Market Leaders',
      subheadline:
        'We scale DTC & lifestyle brands through creative storytelling, high-converting social media marketing, and data-backed performance advertising.',
      bookCta: 'Schedule 1-on-1 Growth Call',
      exploreCta: 'Explore Client Portfolio',
      roasStat: '4.8x',
      roasLabel: 'Average Client ROAS',
      brandsStat: '45+',
      brandsLabel: 'Active Brands Scaled',
      engagementStat: '320%',
      engagementLabel: 'Engagement Uplift',
      experienceStat: '6+ Yrs',
      experienceLabel: 'Industry Leadership',
      partnersTitle: 'Client Partners & Brands We Scale',
      partnersSubtitle: 'Click any client logo to visit their store or official Instagram page',
    },
    services: {
      sectionTag: 'OUR SERVICES',
      title: 'Full-Funnel Growth Architecture',
      subtitle:
        'Four core pillars engineered to elevate your brand prestige and drive measurable, compounding revenue.',
      pillarsTitle: 'Core Capabilities',
      packagesTitle: 'Growth Retainer Packages',
      retainerSubtitle:
        'Predictable, end-to-end execution partnerships tailored to your brand stage.',
      bookPackage: 'Book This Package',
      popularBadge: 'MOST POPULAR',
      perMonth: '/month',
    },
    caseStudies: {
      sectionTag: 'CASE STUDIES & IMPACT',
      title: 'Proven Track Record With Distinctive Brands',
      subtitle:
        'Deep dive into how we generated compounding organic reach, lowered customer acquisition costs, and elevated founder visions.',
      deliverables: 'Scope & Deliverables',
      growthMetrics: 'Verified Growth Metrics',
      founderQuote: 'Founder Perspective',
      bookCallForWork: 'Book Call For Work Like This',
    },
    about: {
      sectionTag: 'ABOUT ADVYX',
      title: 'Creative Muscle Meets Data-Driven Precision',
      subtitle:
        'We are a boutique growth agency combining modern aesthetics with aggressive performance marketing to build resilient market leaders.',
      badge1Title: '6+ Years Social Mastery',
      badge1Desc: 'Mastering algorithm shifts, viral reels, and authentic community engagement since 2018.',
      badge2Title: '4+ Years Performance Ads',
      badge2Desc: 'Managing multi-figure Meta & Google budgets with disciplined, ROAS-obsessed efficiency.',
      badge3Title: 'Full-Stack Execution',
      badge3Desc: 'In-house strategy, video production, design systems, copywriting, and ad buying.',
      philosophyTitle: 'The ADVYX Philosophy',
      valuesTitle: 'Our Operating Principles',
    },
    testimonials: {
      sectionTag: 'FOUNDER TESTIMONIALS',
      title: 'Trusted By Visionary Brand Creators',
      subtitle:
        'Real feedback from founders who trusted ADVYX to scale their digital presence and revenue.',
      addReview: 'Add Testimonial',
      verifiedClient: 'Verified Client',
      stars: 'Rating',
    },
    calendar: {
      sectionTag: 'DISCOVERY CALENDAR',
      title: 'Schedule 1-on-1 Growth Consultation',
      subtitle:
        'Book a complimentary 30-minute strategic deep-dive into your brand growth bottlenecks with our senior strategists.',
      duration: '30 Min Strategy Call • Google Meet / Zoom',
      selectService: '1. Select Consultation Focus',
      selectDate: '2. Select Date',
      openCalendar: 'Open Calendar',
      quickPresets: 'Quick:',
      tomorrow: 'Tomorrow',
      nextMon: 'Next Mon',
      nextWeek: 'In 1 Week',
      inTwoWeeks: 'In 2 Weeks',
      selectTime: '3. Select Time Slot (IST)',
      yourDetails: '4. Your Contact Details',
      fullName: 'Full Name',
      email: 'Work Email Address',
      brandName: 'Brand / Website',
      notes: 'Growth Goals or Notes (Optional)',
      confirmButton: 'Confirm & Schedule Call',
      confirmedTitle: 'Consultation Confirmed!',
      confirmedDesc:
        'Your 1-on-1 growth audit has been reserved. A calendar invite with meeting link has been prepared.',
      chosenDate: 'Chosen Date:',
      changeDate: 'Change',
      resetDate: 'Reset',
      closeCalendar: 'Close Calendar',
      confirmDate: 'Confirm Date',
      cancel: 'Cancel',
    },
    contact: {
      sectionTag: "LET'S TALK",
      title: 'Ready to Scale Your Brand?',
      subtitle:
        'Share your current challenges or vision. Our team responds with actionable next steps within 24 hours.',
      formTitle: 'Send Direct Growth Inquiry',
      nameLabel: 'Your Full Name',
      brandLabel: 'Brand / Company Name',
      emailLabel: 'Work Email Address',
      phoneLabel: 'WhatsApp / Phone Number',
      budgetLabel: 'Estimated Monthly Marketing Budget',
      challengesLabel: 'Current Bottlenecks & Vision',
      submitButton: 'Submit Project Inquiry',
      submitting: 'Submitting Inquiry...',
      successMessage: 'Thank you! Your inquiry has been submitted. We will connect within 24 hours.',
      directContact: 'Direct Contact',
      officialChannels: 'Official Channels',
      directTitle: 'Direct Contact',
      officialTitle: 'Official Channels',
    },
    footer: {
      tagline:
        'ADVYX is a modern creative marketing & brand growth agency engineering market leadership through content and performance.',
      quickLinks: 'Quick Links',
      coreServices: 'Core Services',
      directContact: 'Direct Contact',
      officialChannels: 'Official Channels',
      copyright: 'ADVYX Digital Agency. All rights reserved.',
      rights: 'All rights reserved.',
    },
  },
  th: {
    nav: {
      services: 'บริการของเรา',
      caseStudies: 'ผลงานจริง',
      about: 'เกี่ยวกับเรา',
      testimonials: 'รีวิวผู้ก่อตั้ง',
      contact: 'ติดต่อเรา',
      bookCall: 'จองเวลาคุยงาน',
      admin: 'ผู้ดูแลระบบ',
      operationsPortal: 'พอร์ทัลปฏิบัติการ ADVYX',
      language: 'ภาษา',
    },
    hero: {
      badge: 'กลยุทธ์การตลาดและสร้างสรรค์แบรนด์ • คอนเทนต์ผลลัพธ์สูงและการลงมือทำครบวงจร',
      headline: 'ยกระดับแบรนด์ของคุณสู่ผู้นำตลาดที่โดดเด่น',
      subheadline:
        'เราช่วยขยายการเติบโตของแบรนด์ DTC และไลฟ์สไตล์ ด้วยการเล่าเรื่องที่สร้างสรรค์ การตลาดโซเชียลมีเดียที่เปลี่ยนเป็นยอดขาย และโฆษณาที่ขับเคลื่อนด้วยข้อมูลจริง',
      bookCta: 'นัดคุยกลยุทธ์การเติบโตแบบ 1 ต่อ 1 ฟรี',
      exploreCta: 'ดูผลงานจริงของลูกค้า',
      roasStat: '4.8x',
      roasLabel: 'ผลตอบแทนค่าโฆษณาเฉลี่ย (ROAS)',
      brandsStat: '45+',
      brandsLabel: 'แบรนด์ที่เติบโตอย่างต่อเนื่อง',
      engagementStat: '320%',
      engagementLabel: 'การมีส่วนร่วมเพิ่มขึ้นเฉลี่ย',
      experienceStat: '6+ ปี',
      experienceLabel: 'ประสบการณ์และความเชี่ยวชาญ',
      partnersTitle: 'แบรนด์พันธมิตรที่ร่วมงานกับเรา',
      partnersSubtitle: 'คลิกที่โลโก้ลูกค้าเพื่อเข้าชมเว็บไซต์หรือหน้า Instagram อย่างเป็นทางการ',
    },
    services: {
      sectionTag: 'บริการของเรา',
      title: 'โครงสร้างการเติบโตแบบครบวงจร (Full-Funnel)',
      subtitle:
        '4 เสาหลักกลยุทธ์ที่ออกแบบมาเพื่อยกระดับคุณค่าแบรนด์และสร้างรายได้ที่วัดผลได้จริงอย่างยั่งยืน',
      pillarsTitle: 'ขีดความสามารถหลัก',
      packagesTitle: 'แพ็กเกจการเติบโตแบบรายเดือน',
      retainerSubtitle:
        'การเป็นพันธมิตรลงมือทำแบบครบวงจร ออกแบบมาให้เหมาะกับระยะการเติบโตของแบรนด์คุณ',
      bookPackage: 'เลือกแพ็กเกจนี้',
      popularBadge: 'ยอดนิยมที่สุด',
      perMonth: '/เดือน',
    },
    caseStudies: {
      sectionTag: 'กรณีศึกษาและผลลัพธ์จริง',
      title: 'ผลลัพธ์ที่พิสูจน์แล้วกับแบรนด์ชั้นนำ',
      subtitle:
        'เจาะลึกวิธีที่เราสร้างการเข้าถึงแบบออร์แกนิก ลดต้นทุนการหาลูกค้าใหม่ (CAC) และสานต่อวิสัยทัศน์ของผู้ก่อตั้ง',
      deliverables: 'ขอบเขตงานและสิ่งที่ส่งมอบ',
      growthMetrics: 'ตัวชี้วัดการเติบโตที่ตรวจสอบแล้ว',
      founderQuote: 'มุมมองจากผู้ก่อตั้งแบรนด์',
      bookCallForWork: 'นัดคุยงานเพื่อสร้างผลลัพธ์แบบนี้',
    },
    about: {
      sectionTag: 'เกี่ยวกับ ADVYX',
      title: 'ความคิดสร้างสรรค์อันทรงพลังผสานความแม่นยำของข้อมูล',
      subtitle:
        'เราคือเอเจนซี่การเติบโตบูทีคที่ผสมผสานความสวยงามระดับพรีเมียมเข้ากับการตลาดเน้นผลลัพธ์ เพื่อสร้างแบรนด์ที่เป็นผู้นำในตลาด',
      badge1Title: 'ความเชี่ยวชาญโซเชียลมีเดีย 6+ ปี',
      badge1Desc: 'เข้าใจอัลกอริทึม ผลิตคลิปไวรัล Reels และสร้างคอมมูนิตี้ที่เหนียวแน่นตั้งแต่ปี 2018',
      badge2Title: 'ผู้เชี่ยวชาญยิงแอดเน้นผลลัพธ์ 4+ ปี',
      badge2Desc: 'บริหารงบประมาณโฆษณา Meta และ Google ด้วยระเบียบวินัยและมุ่งเน้น ROAS สูงสุด',
      badge3Title: 'ลงมือทำครบวงจร (Full-Stack)',
      badge3Desc: 'ทีมงานภายในดูแลทั้งกลยุทธ์ ถ่ายวิดีโอ ออกแบบระบบแบรนด์ เขียนแคปชัน และยิงแอด',
      philosophyTitle: 'ปรัชญาของ ADVYX',
      valuesTitle: 'หลักการทำงานของเรา',
    },
    testimonials: {
      sectionTag: 'เสียงตอบรับจากผู้ก่อตั้ง',
      title: 'ได้รับความไว้วางใจจากผู้ก่อตั้งแบรนด์รุ่นใหม่',
      subtitle:
        'ข้อคิดเห็นจริงจากผู้ก่อตั้งที่ไว้วางใจให้ ADVYX ช่วยขยายการเติบโตของยอดขายและชื่อเสียงทางดิจิทัล',
      addReview: 'เพิ่มคำรีวิว',
      verifiedClient: 'ลูกค้าที่ตรวจสอบแล้ว',
      stars: 'คะแนนรีวิว',
    },
    calendar: {
      sectionTag: 'ปฏิทินนัดหมายกลยุทธ์',
      title: 'จองเวลาปรึกษากลยุทธ์การเติบโตแบบ 1 ต่อ 1',
      subtitle:
        'นัดหมายพูดคุยวางแผนกลยุทธ์ 30 นาทีฟรี เพื่อเจาะลึกจุดติดขัดและวางแผนขยายแบรนด์ของคุณร่วมกับทีมผู้เชี่ยวชาญ',
      duration: 'ปรึกษากลยุทธ์ 30 นาที • Google Meet / Zoom',
      selectService: '1. เลือกหัวข้อที่ต้องการปรึกษา',
      selectDate: '2. เลือกวันที่ต้องการนัดหมาย',
      openCalendar: 'เปิดปฏิทิน',
      quickPresets: 'ทางลัด:',
      tomorrow: 'พรุ่งนี้',
      nextMon: 'จันทร์หน้า',
      nextWeek: 'อีก 1 สัปดาห์',
      inTwoWeeks: 'อีก 2 สัปดาห์',
      selectTime: '3. เลือกช่วงเวลาที่สะดวก (IST)',
      yourDetails: '4. ข้อมูลสำหรับติดต่อกลับ',
      fullName: 'ชื่อ-นามสกุล',
      email: 'อีเมลสำหรับการทำงาน',
      brandName: 'ชื่อแบรนด์ / เว็บไซต์',
      notes: 'เป้าหมายการเติบโตหรือข้อความเพิ่มเติม (ไม่บังคับ)',
      confirmButton: 'ยืนยันและนัดหมายการประชุม',
      confirmedTitle: 'ยืนยันการนัดหมายเรียบร้อยแล้ว!',
      confirmedDesc:
        'การจองเวลาปรึกษากลยุทธ์ของคุณได้รับการยืนยันแล้ว ระบบได้เตรียมลิงก์การประชุมไว้ให้คุณเรียบร้อย',
      chosenDate: 'วันที่เลือก:',
      changeDate: 'เปลี่ยน',
      resetDate: 'รีเซ็ต',
      closeCalendar: 'ปิดปฏิทิน',
      confirmDate: 'ยืนยันวันที่',
      cancel: 'ยกเลิก',
    },
    contact: {
      sectionTag: 'เริ่มต้นพูดคุย',
      title: 'พร้อมขยายการเติบโตของแบรนด์คุณหรือยัง?',
      subtitle:
        'บอกเล่าโจทย์หรือวิสัยทัศน์ของคุณ ทีมงานของเราจะติดต่อกลับพร้อมแนวทางกลยุทธ์ที่ลงมือทำได้จริงภายใน 24 ชั่วโมง',
      formTitle: 'ส่งรายละเอียดโครงการของคุณ',
      nameLabel: 'ชื่อ-นามสกุลของคุณ',
      brandLabel: 'ชื่อแบรนด์ / บริษัท',
      emailLabel: 'อีเมลสำหรับการทำงาน',
      phoneLabel: 'เบอร์ติดต่อ / WhatsApp',
      budgetLabel: 'งบประมาณการตลาดรายเดือนโดยประมาณ',
      challengesLabel: 'จุดติดขัดในปัจจุบันและเป้าหมายที่ต้องการ',
      submitButton: 'ส่งข้อมูลโครงการ',
      submitting: 'กำลังส่งข้อมูล...',
      successMessage: 'ขอบคุณครับ! ได้รับข้อมูลเรียบร้อยแล้ว ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง',
      directContact: 'ช่องทางติดต่อโดยตรง',
      officialChannels: 'ช่องทางทางการ',
      directTitle: 'ช่องทางติดต่อโดยตรง',
      officialTitle: 'ช่องทางทางการ',
    },
    footer: {
      tagline:
        'ADVYX คือเอเจนซี่การตลาดสร้างสรรค์และสร้างการเติบโตของแบรนด์ มุ่งมั่นสร้างความเป็นผู้นำในตลาดด้วยพลังของคอนเทนต์และผลลัพธ์จริง',
      quickLinks: 'ลิงก์ด่วน',
      coreServices: 'บริการหลัก',
      directContact: 'ช่องทางติดต่อโดยตรง',
      officialChannels: 'ช่องทางทางการ',
      copyright: 'ADVYX Digital Agency. สงวนลิขสิทธิ์ทั้งหมด',
      rights: 'สงวนลิขสิทธิ์ทั้งหมด',
    },
  },
  es: {
    nav: {
      services: 'Servicios',
      caseStudies: 'Casos de Éxito',
      about: 'Nosotros',
      testimonials: 'Testimonios',
      contact: 'Contacto',
      bookCall: 'Agendar Llamada',
      admin: 'Admin',
      operationsPortal: 'Portal de Operaciones ADVYX',
      language: 'Idioma',
    },
    hero: {
      badge: 'Estrategia de Marca y Marketing Creativo • Contenido y Ejecución de Alto Impacto',
      headline: 'Transformamos Marcas en Líderes de Mercado',
      subheadline:
        'Escalamos marcas directas al consumidor y de estilo de vida mediante narrativa creativa, gestión de redes sociales y publicidad de rendimiento respaldada por datos.',
      bookCta: 'Agendar Llamada 1 a 1',
      exploreCta: 'Ver Casos de Éxito',
      roasStat: '4.8x',
      roasLabel: 'ROAS Promedio Clientes',
      brandsStat: '45+',
      brandsLabel: 'Marcas Escaladas',
      engagementStat: '320%',
      engagementLabel: 'Aumento de Engagement',
      experienceStat: '6+ Años',
      experienceLabel: 'Liderazgo en la Industria',
      partnersTitle: 'Marcas y Clientes que Escalamos',
      partnersSubtitle: 'Haz clic en el logo de un cliente para visitar su tienda o perfil oficial de Instagram',
    },
    services: {
      sectionTag: 'NUESTROS SERVICIOS',
      title: 'Arquitectura de Crecimiento Integral',
      subtitle:
        'Cuatro pilares estratégicos diseñados para elevar el prestigio de tu marca y generar ingresos constantes y medibles.',
      pillarsTitle: 'Capacidades Clave',
      packagesTitle: 'Planes Mensuales de Crecimiento',
      retainerSubtitle:
        'Asociaciones de ejecución integral predecibles adaptadas a la etapa de tu marca.',
      bookPackage: 'Elegir Este Plan',
      popularBadge: 'MÁS POPULAR',
      perMonth: '/mes',
    },
    caseStudies: {
      sectionTag: 'CASOS DE ÉXITO E IMPACTO',
      title: 'Trayectoria Comprobada con Marcas Distintivas',
      subtitle:
        'Conoce en profundidad cómo generamos alcance orgánico compuesto, reducimos el costo de adquisición de clientes y potenciamos la visión de los fundadores.',
      deliverables: 'Alcance y Entregables',
      growthMetrics: 'Métricas de Crecimiento Verificadas',
      founderQuote: 'Perspectiva del Fundador',
      bookCallForWork: 'Agendar Llamada Para Resultados Similares',
    },
    about: {
      sectionTag: 'SOBRE ADVYX',
      title: 'Músculo Creativo Impulsado por la Precisión de Datos',
      subtitle:
        'Somos una agencia boutique de crecimiento que combina estética contemporánea con marketing de rendimiento para construir marcas sólidas y líderes de mercado.',
      badge1Title: '6+ Años de Dominio en Redes Sociales',
      badge1Desc: 'Dominando cambios de algoritmo, Reels virales y construcción de comunidades leales desde 2018.',
      badge2Title: '4+ Años en Anuncios de Rendimiento',
      badge2Desc: 'Gestionando presupuestos publicitarios en Meta y Google con disciplina estricta y obsesión por el ROAS.',
      badge3Title: 'Ejecución Integral (Full-Stack)',
      badge3Desc: 'Estrategia interna, producción de video, diseño de identidad, redacción y compra de medios.',
      philosophyTitle: 'La Filosofía ADVYX',
      valuesTitle: 'Nuestros Principios Operativos',
    },
    testimonials: {
      sectionTag: 'TESTIMONIOS DE FUNDADORES',
      title: 'La Confianza de Creadores y Fundadores Visionarios',
      subtitle:
        'Comentarios reales de fundadores que confiaron en ADVYX para acelerar su presencia digital y facturación.',
      addReview: 'Añadir Testimonio',
      verifiedClient: 'Cliente Verificado',
      stars: 'Calificación',
    },
    calendar: {
      sectionTag: 'CALENDARIO DE ESTRATEGIA',
      title: 'Agenda una Sesión Estratégica 1 a 1',
      subtitle:
        'Reserva una sesión estratégica gratuita de 30 minutos para analizar los cuellos de botella de crecimiento de tu marca con nuestros especialistas.',
      duration: 'Llamada Estratégica de 30 Min • Google Meet / Zoom',
      selectService: '1. Selecciona el Enfoque',
      selectDate: '2. Selecciona la Fecha',
      openCalendar: 'Abrir Calendario',
      quickPresets: 'Atajos:',
      tomorrow: 'Mañana',
      nextMon: 'Próx. Lunes',
      nextWeek: 'En 1 Semana',
      inTwoWeeks: 'En 2 Semanas',
      selectTime: '3. Selecciona la Hora (IST)',
      yourDetails: '4. Tus Datos de Contacto',
      fullName: 'Nombre y Apellido',
      email: 'Correo Electrónico de Trabajo',
      brandName: 'Marca o Sitio Web',
      notes: 'Metas de Crecimiento o Notas (Opcional)',
      confirmButton: 'Confirmar y Agendar Llamada',
      confirmedTitle: '¡Consulta Estratégica Confirmada!',
      confirmedDesc:
        'Tu sesión de crecimiento 1 a 1 ha sido reservada con éxito. Hemos preparado la invitación con el enlace de reunión.',
      chosenDate: 'Fecha Seleccionada:',
      changeDate: 'Cambiar',
      resetDate: 'Restablecer',
      closeCalendar: 'Cerrar Calendario',
      confirmDate: 'Confirmar Fecha',
      cancel: 'Cancelar',
    },
    contact: {
      sectionTag: 'HABLEMOS',
      title: '¿Listo Para Escalar Tu Marca?',
      subtitle:
        'Comparte tus desafíos o visión actuales. Nuestro equipo te responderá con próximos pasos concretos en menos de 24 horas.',
      formTitle: 'Enviar Solicitud de Crecimiento',
      nameLabel: 'Tu Nombre y Apellido',
      brandLabel: 'Nombre de la Marca o Empresa',
      emailLabel: 'Correo Electrónico de Trabajo',
      phoneLabel: 'Número de WhatsApp / Teléfono',
      budgetLabel: 'Presupuesto Mensual Estimado de Marketing',
      challengesLabel: 'Desafíos Actuales y Objetivos',
      submitButton: 'Enviar Proyecto',
      submitting: 'Enviando Solicitud...',
      successMessage: '¡Muchas gracias! Hemos recibido tu solicitud y te contactaremos en menos de 24 horas.',
      directContact: 'Contacto Directo',
      officialChannels: 'Canales Oficiales',
      directTitle: 'Contacto Directo',
      officialTitle: 'Canales Oficiales',
    },
    footer: {
      tagline:
        'ADVYX es una agencia boutique de marketing creativo y crecimiento de marca que construye liderazgo en el mercado a través del contenido y los resultados.',
      quickLinks: 'Enlaces Rápidos',
      coreServices: 'Servicios Clave',
      directContact: 'Contacto Directo',
      officialChannels: 'Canales Oficiales',
      copyright: 'ADVYX Digital Agency. Todos los derechos reservados.',
      rights: 'Todos los derechos reservados.',
    },
  },
};
