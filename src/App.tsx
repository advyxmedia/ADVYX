import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { AboutSection } from './components/AboutSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { DiscoveryCalendar } from './components/DiscoveryCalendar';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AgencyDashboardModal } from './components/AgencyDashboardModal';
import { AdminAuthModal } from './components/AdminAuthModal';
import {
  SEEDED_INQUIRIES,
  SEEDED_APPOINTMENTS,
  INITIAL_TESTIMONIALS,
} from './data/agencyData';
import { Inquiry, Appointment, Testimonial } from './types';

function MainApp() {
  const { isDark } = useTheme();

  // Admin Authentication State (Protects operations dashboard from public visitors)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return (
        localStorage.getItem('advyx_admin_auth') === 'true' ||
        sessionStorage.getItem('advyx_admin_auth') === 'true'
      );
    } catch {
      return false;
    }
  });
  const [showAdminAuthModal, setShowAdminAuthModal] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  // Inquiries State with LocalStorage Persistence
  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    const saved = localStorage.getItem('advyx_inquiries');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse inquiries', e);
      }
    }
    return SEEDED_INQUIRIES;
  });

  // Appointments State with LocalStorage Persistence
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('advyx_appointments');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse appointments', e);
      }
    }
    return SEEDED_APPOINTMENTS;
  });

  // Testimonials State with LocalStorage Persistence
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('advyx_testimonials_v5');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((t) =>
            t.company === 'House of Dorii' || t.id === 'test-dorii'
              ? { ...t, rating: 4.5 }
              : t
          );
        }
      } catch (e) {
        console.error('Failed to parse testimonials', e);
      }
    }
    // Clean up older generic reviews so visitor immediately sees authentic founder reviews
    try {
      localStorage.removeItem('advyx_testimonials');
      localStorage.removeItem('advyx_testimonials_v2');
      localStorage.removeItem('advyx_testimonials_v3');
      localStorage.removeItem('advyx_testimonials_v4');
    } catch {
      // ignore
    }
    return INITIAL_TESTIMONIALS.map((t) =>
      t.company === 'House of Dorii' || t.id === 'test-dorii'
        ? { ...t, rating: 4.5 }
        : t
    );
  });

  const [selectedServiceFocus, setSelectedServiceFocus] = useState<string>(
    'Social Media Management'
  );

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('advyx_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('advyx_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('advyx_testimonials_v5', JSON.stringify(testimonials));
  }, [testimonials]);

  // Handlers
  const handleOpenDashboardRequest = () => {
    if (isAdminAuthenticated) {
      setIsDashboardOpen(true);
    } else {
      setShowAdminAuthModal(true);
    }
  };

  const handleAdminAuthSuccess = (rememberMe: boolean) => {
    setIsAdminAuthenticated(true);
    if (rememberMe) {
      localStorage.setItem('advyx_admin_auth', 'true');
    } else {
      sessionStorage.setItem('advyx_admin_auth', 'true');
    }
    // Also unlock creator mode on contact form for the admin
    localStorage.setItem('advyx_creator_mode', 'true');
    setShowAdminAuthModal(false);
    setIsDashboardOpen(true);
  };

  const handleAdminSignOut = () => {
    setIsAdminAuthenticated(false);
    try {
      localStorage.removeItem('advyx_admin_auth');
      sessionStorage.removeItem('advyx_admin_auth');
    } catch {
      // ignore
    }
    setIsDashboardOpen(false);
  };

  const handleInquirySubmitted = (newInquiry: Inquiry) => {
    setInquiries((prev) => [newInquiry, ...prev]);
  };

  const handleAppointmentBooked = (newAppointment: Appointment) => {
    setAppointments((prev) => [newAppointment, ...prev]);
  };

  const handleAddTestimonial = (newTestimonial: Testimonial) => {
    setTestimonials((prev) => [newTestimonial, ...prev]);
  };

  const handleUpdateInquiryStatus = (id: string, newStatus: Inquiry['status']) => {
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const handleUpdateInquiryNotes = (id: string, notes: string) => {
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, notes } : item))
    );
  };

  const handleDeleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateAppointmentStatus = (
    id: string,
    newStatus: Appointment['status']
  ) => {
    setAppointments((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const handleAddManualInquiry = (inquiry: Inquiry) => {
    setInquiries((prev) => [inquiry, ...prev]);
  };

  const handleSelectService = (serviceName: string) => {
    setSelectedServiceFocus(serviceName);
    // Smooth scroll to contact or calendar
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookCallForWork = (clientName: string) => {
    setSelectedServiceFocus(`Scale like ${clientName}`);
    const el = document.getElementById('discovery-calendar');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const pendingInquiriesCount = inquiries.filter(
    (i) => i.status === 'New' || i.status === 'In Review'
  ).length;

  return (
    <div
      className={`min-h-screen transition-colors duration-500 font-sans w-full max-w-full overflow-x-hidden ${
        isDark ? 'bg-[#0A0F1D] text-slate-100' : 'bg-[#F8FAFC] text-slate-900'
      }`}
    >
      {/* Navigation Header */}
      <Navigation
        onOpenDashboard={handleOpenDashboardRequest}
        pendingInquiriesCount={pendingInquiriesCount}
        isAdminAuthenticated={isAdminAuthenticated}
      />

      {/* Hero Section */}
      <Hero
        onExploreWork={() => {
          const el = document.getElementById('case-studies');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onBookCall={() => {
          const el = document.getElementById('discovery-calendar');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Services Focus Area (Four Pillars & Retainer Packages) */}
      <ServicesSection onSelectService={handleSelectService} />

      {/* Case Studies & Portfolio (House of Dorii, Lokoboko, Stuff The Food Up, Yaki Objects) */}
      <CaseStudiesSection onBookCallForWork={handleBookCallForWork} />

      {/* About Us (6+ yrs social, 4+ yrs marketing, full-stack brand execution) */}
      <AboutSection />

      {/* Testimonials & Social Proof + Add Testimonial modal */}
      <TestimonialsSection
        testimonials={testimonials}
        onAddTestimonial={handleAddTestimonial}
      />

      {/* Discovery Calendar Scheduler with instant booking */}
      <DiscoveryCalendar
        onAppointmentBooked={handleAppointmentBooked}
        preselectedService={selectedServiceFocus}
      />

      {/* Prominent Contact Form & Direct Channels */}
      <ContactSection
        onInquirySubmitted={handleInquirySubmitted}
        prefilledService={selectedServiceFocus}
      />

      {/* Footer */}
      <Footer onOpenDashboard={handleOpenDashboardRequest} />

      {/* Operations & Pipeline Tracking Dashboard Modal (Restricted Admin Access) */}
      <AgencyDashboardModal
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        inquiries={inquiries}
        appointments={appointments}
        onUpdateInquiryStatus={handleUpdateInquiryStatus}
        onUpdateInquiryNotes={handleUpdateInquiryNotes}
        onDeleteInquiry={handleDeleteInquiry}
        onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
        onAddManualInquiry={handleAddManualInquiry}
        onSignOut={handleAdminSignOut}
      />

      {/* Administrator Authentication Lock Modal */}
      <AdminAuthModal
        isOpen={showAdminAuthModal}
        onClose={() => setShowAdminAuthModal(false)}
        onSuccess={handleAdminAuthSuccess}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <MainApp />
      </ThemeProvider>
    </LanguageProvider>
  );
}
