import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Inquiry, Appointment } from '../types';
import {
  COUNTRY_BUDGET_CONFIGS,
  getCountryBudgetConfig,
  CountryBudgetConfig,
  DEFAULT_COUNTRY_CODE,
} from '../data/budgetConfig';
import {
  X,
  LayoutDashboard,
  Inbox,
  Calendar,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Mail,
  User,
  Building,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  Download,
  AlertCircle,
  Globe2,
  ShieldCheck,
  Lock,
  Unlock,
  RotateCcw,
} from 'lucide-react';

interface AgencyDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  inquiries: Inquiry[];
  appointments: Appointment[];
  onUpdateInquiryStatus: (id: string, newStatus: Inquiry['status']) => void;
  onUpdateInquiryNotes: (id: string, notes: string) => void;
  onDeleteInquiry: (id: string) => void;
  onUpdateAppointmentStatus: (id: string, newStatus: Appointment['status']) => void;
  onAddManualInquiry: (inquiry: Inquiry) => void;
  onSignOut?: () => void;
}

export const AgencyDashboardModal: React.FC<AgencyDashboardModalProps> = ({
  isOpen,
  onClose,
  inquiries = [],
  appointments = [],
  onUpdateInquiryStatus,
  onUpdateInquiryNotes,
  onDeleteInquiry,
  onUpdateAppointmentStatus,
  onAddManualInquiry,
  onSignOut,
}) => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<'inquiries' | 'appointments' | 'pricing'>('inquiries');
  const [searchQuery, setSearchQuery] = useState('');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState<string>('All');
  const [appointmentStatusFilter, setAppointmentStatusFilter] = useState<string>('All');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [editingNotes, setEditingNotes] = useState('');
  const [showAddInquiryModal, setShowAddInquiryModal] = useState(false);

  // Creator Country Override State
  const [creatorCountry, setCreatorCountry] = useState<string>(() => {
    return localStorage.getItem('advyx_creator_country') || DEFAULT_COUNTRY_CODE;
  });
  const [creatorModeEnabled, setCreatorModeEnabled] = useState<boolean>(() => {
    return localStorage.getItem('advyx_creator_mode') === 'true';
  });

  const handleSetCreatorCountry = (code: string) => {
    setCreatorCountry(code);
    localStorage.setItem('advyx_creator_country', code);
    localStorage.setItem('advyx_creator_mode', 'true');
    setCreatorModeEnabled(true);
  };

  const handleResetToAutoLocation = () => {
    localStorage.removeItem('advyx_creator_country');
    localStorage.removeItem('advyx_creator_mode');
    setCreatorModeEnabled(false);
    setCreatorCountry(DEFAULT_COUNTRY_CODE);
  };

  // Manual Add Inquiry form state
  const [manualClientName, setManualClientName] = useState('');
  const [manualBusinessName, setManualBusinessName] = useState('');
  const [manualEmail, setManualEmail] = useState('');
  const [manualService, setManualService] = useState('Social Media Management');
  const [manualBudget, setManualBudget] = useState('$2,500 - $5,000 / mo');
  const [manualMessage, setManualMessage] = useState('');

  if (!isOpen) return null;

  const safeInquiries = Array.isArray(inquiries) ? inquiries : [];
  const safeAppointments = Array.isArray(appointments) ? appointments : [];
  const term = (searchQuery || '').toLowerCase().trim();

  // Filtered inquiries (Safe from undefined properties)
  const filteredInquiries = safeInquiries.filter((inq) => {
    const client = (inq?.clientName || '').toLowerCase();
    const business = (inq?.businessName || '').toLowerCase();
    const email = (inq?.email || '').toLowerCase();
    const service = (inq?.service || '').toLowerCase();

    const matchesSearch =
      !term ||
      client.includes(term) ||
      business.includes(term) ||
      email.includes(term) ||
      service.includes(term);

    const matchesFilter =
      inquiryStatusFilter === 'All' || inq?.status === inquiryStatusFilter;

    return matchesSearch && matchesFilter;
  });

  // Filtered appointments (Safe from undefined properties)
  const filteredAppointments = safeAppointments.filter((appt) => {
    const name = (appt?.name || '').toLowerCase();
    const business = (appt?.businessName || '').toLowerCase();
    const email = (appt?.email || '').toLowerCase();
    const service = (appt?.service || '').toLowerCase();

    const matchesSearch =
      !term ||
      name.includes(term) ||
      business.includes(term) ||
      email.includes(term) ||
      service.includes(term);

    const matchesFilter =
      appointmentStatusFilter === 'All' || appt?.status === appointmentStatusFilter;

    return matchesSearch && matchesFilter;
  });

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualClientName.trim() || !manualBusinessName.trim() || !manualEmail.trim())
      return;

    const newInq: Inquiry = {
      id: `inq-${Date.now()}`,
      clientName: manualClientName.trim(),
      businessName: manualBusinessName.trim(),
      email: manualEmail.trim(),
      service: manualService,
      budget: manualBudget,
      message: manualMessage.trim() || 'Manual inquiry created from dashboard.',
      status: 'New',
      createdAt: new Date().toISOString(),
    };

    onAddManualInquiry(newInq);
    setShowAddInquiryModal(false);
    setManualClientName('');
    setManualBusinessName('');
    setManualEmail('');
    setManualMessage('');
  };

  const exportData = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify({ inquiries: safeInquiries, appointments: safeAppointments }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `advyx_pipeline_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const getStatusBadge = (status: Inquiry['status']) => {
    switch (status) {
      case 'New':
        return 'bg-sky-500/10 text-sky-500 border-sky-500/20';
      case 'In Review':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'Contacted':
        return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'Proposal Sent':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Closed Won':
        return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'Archived':
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  const getApptStatusBadge = (status: Appointment['status']) => {
    switch (status) {
      case 'Upcoming':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Completed':
        return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'Rescheduled':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'Cancelled':
        return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 backdrop-blur-lg bg-black/70 animate-in fade-in duration-200">
      <div
        className={`w-full max-w-6xl h-[92vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden ${
          isDark
            ? 'bg-[#0A0F1D] border-slate-800 text-white shadow-black/80'
            : 'bg-white border-slate-200 text-slate-900 shadow-slate-400/30'
        }`}
      >
        {/* Top Bar */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#2374B8] text-white flex items-center justify-center shadow-sm">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold font-display leading-none">
                  ADVYX Agency Operations Hub
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#2374B8]/10 text-[#2374B8] font-bold">
                  LIVE PIPELINE
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Track incoming client inquiries and scheduled discovery calls efficiently.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onSignOut && (
              <button
                onClick={onSignOut}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-rose-500/30 text-rose-500 hover:bg-rose-500/10 transition-colors"
                title="Sign out & Lock Agency Hub"
              >
                <Lock className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Lock Portal</span>
              </button>
            )}

            <button
              onClick={exportData}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
              title="Export all records as JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>

            <button
              id="close-agency-dashboard"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Metric Quick Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-slate-200 dark:border-slate-800 divide-x divide-slate-200 dark:divide-slate-800 bg-slate-50/50 dark:bg-slate-900/40 text-xs">
          <div className="p-3.5 px-6">
            <span className="text-slate-400 block text-[11px]">Active Inquiries</span>
            <span className="text-xl font-extrabold font-display text-[#2374B8]">
              {safeInquiries.length}
            </span>
          </div>
          <div className="p-3.5 px-6">
            <span className="text-slate-400 block text-[11px]">New / Action Required</span>
            <span className="text-xl font-extrabold font-display text-sky-500">
              {safeInquiries.filter((i) => i.status === 'New').length}
            </span>
          </div>
          <div className="p-3.5 px-6">
            <span className="text-slate-400 block text-[11px]">Discovery Calls Booked</span>
            <span className="text-xl font-extrabold font-display text-emerald-500">
              {safeAppointments.filter((a) => a.status === 'Upcoming').length}
            </span>
          </div>
          <div className="p-3.5 px-6">
            <span className="text-slate-400 block text-[11px]">Client Conversion Rate</span>
            <span className="text-xl font-extrabold font-display text-purple-500">
              {safeInquiries.length > 0
                ? `${Math.round(
                    (safeInquiries.filter((i) => i.status === 'Closed Won').length /
                      safeInquiries.length) *
                      100
                  )}%`
                : '0%'}
            </span>
          </div>
        </div>

        {/* Tab Selector & Search Filter Bar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              id="dashboard-tab-inquiries"
              onClick={() => setActiveTab('inquiries')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'inquiries'
                  ? 'bg-[#2374B8] text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900'
              }`}
            >
              <Inbox className="w-3.5 h-3.5" />
              <span>Inquiries ({safeInquiries.length})</span>
            </button>

            <button
              id="dashboard-tab-appointments"
              onClick={() => setActiveTab('appointments')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'appointments'
                  ? 'bg-[#2374B8] text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Appointments ({safeAppointments.length})</span>
            </button>

            <button
              id="dashboard-tab-pricing"
              onClick={() => setActiveTab('pricing')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'pricing'
                  ? 'bg-[#2374B8] text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900'
              }`}
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span>Pricing & Geolocation</span>
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-60">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search brand, name, or service..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-[#2374B8]"
              />
            </div>

            {/* Status Filter */}
            {activeTab === 'inquiries' ? (
              <select
                value={inquiryStatusFilter}
                onChange={(e) => setInquiryStatusFilter(e.target.value)}
                className="px-2.5 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="New">New</option>
                <option value="In Review">In Review</option>
                <option value="Contacted">Contacted</option>
                <option value="Proposal Sent">Proposal Sent</option>
                <option value="Closed Won">Closed Won</option>
                <option value="Archived">Archived</option>
              </select>
            ) : (
              <select
                value={appointmentStatusFilter}
                onChange={(e) => setAppointmentStatusFilter(e.target.value)}
                className="px-2.5 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Completed">Completed</option>
                <option value="Rescheduled">Rescheduled</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            )}

            {activeTab === 'inquiries' && (
              <button
                onClick={() => setShowAddInquiryModal(true)}
                className="p-1.5 rounded-xl bg-[#2374B8] text-white hover:bg-[#18598F] transition-colors"
                title="Manually log new client lead"
              >
                <Plus className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'inquiries' ? (
            /* INQUIRIES LIST */
            filteredInquiries.length > 0 ? (
              <div className="space-y-3">
                {filteredInquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      isDark
                        ? 'bg-slate-900/50 hover:bg-slate-900 border-slate-800'
                        : 'bg-white hover:bg-slate-50 border-slate-200 shadow-sm'
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadge(
                            inq.status
                          )}`}
                        >
                          {inq.status}
                        </span>
                        <h4 className="text-sm font-bold font-display">{inq.businessName || 'Unnamed Business'}</h4>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                          {inq.clientName || 'Unnamed Contact'}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono ml-auto sm:ml-0">
                          {inq.createdAt
                            ? new Date(inq.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                              })
                            : ''}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-2">
                        <span className="text-[#2374B8] font-semibold">{inq.service || 'General Inquiry'}</span>
                        <span>{inq.country ? `🌍 ${inq.country} • ` : ''}Budget: {inq.budget || 'N/A'}</span>
                        <span className="font-mono">{inq.email}</span>
                      </div>

                      {inq.message && (
                        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-1 italic">
                          "{inq.message}"
                        </p>
                      )}

                      {inq.notes && (
                        <div className="mt-2 text-[11px] px-2.5 py-1 rounded-lg bg-[#2374B8]/10 text-[#2374B8] dark:text-sky-300 font-medium inline-block">
                          Internal Note: {inq.notes}
                        </div>
                      )}
                    </div>

                    {/* Quick status dropdown & Actions */}
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <select
                        value={inq.status}
                        onChange={(e) =>
                          onUpdateInquiryStatus(
                            inq.id,
                            e.target.value as Inquiry['status']
                          )
                        }
                        className="text-xs px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold focus:outline-none"
                      >
                        <option value="New">New</option>
                        <option value="In Review">In Review</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Proposal Sent">Proposal Sent</option>
                        <option value="Closed Won">Closed Won</option>
                        <option value="Archived">Archived</option>
                      </select>

                      <button
                        onClick={() => {
                          setSelectedInquiry(inq);
                          setEditingNotes(inq.notes || '');
                        }}
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                        title="View Details & Notes"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <a
                        href={`mailto:${inq.email}?subject=ADVYX%20Media%20Growth%20Inquiry%20-%20${encodeURIComponent(
                          inq.businessName || ''
                        )}`}
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-[#2374B8]"
                        title="Email Prospect"
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </a>

                      <button
                        onClick={() => onDeleteInquiry(inq.id)}
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-rose-500/10 text-rose-500"
                        title="Delete record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm font-semibold">No inquiries found</p>
                <p className="text-xs text-slate-400 mt-1">
                  Adjust your search or status filter.
                </p>
              </div>
            )
          ) : activeTab === 'appointments' ? (
            /* APPOINTMENTS LIST */
            filteredAppointments.length > 0 ? (
              <div className="space-y-3">
                {filteredAppointments.map((appt) => (
                  <div
                    key={appt.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      isDark
                        ? 'bg-slate-900/50 hover:bg-slate-900 border-slate-800'
                        : 'bg-white hover:bg-slate-50 border-slate-200 shadow-sm'
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getApptStatusBadge(
                            appt.status
                          )}`}
                        >
                          {appt.status}
                        </span>
                        <h4 className="text-sm font-bold font-display">{appt.businessName || 'Unnamed Business'}</h4>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                          </span>
                           {appt.name || 'Unnamed Contact'}                      
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                        <span className="text-[#2374B8] font-bold">{appt.callType || 'Discovery Call'}</span>
                        <span className="font-semibold text-slate-700 dark:text-slate-200">
                          📅 {appt.date} at {appt.time} {appt.timezone ? `(${appt.timezone})` : ''}
                        </span>
                        <span className="font-mono">{appt.email}</span>
                      </div>

                      <div className="text-[11px] text-slate-400 mt-1">
                    Topic: {appt.service || 'General Strategy'}                      
                    </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <select
                        value={appt.status}
                        onChange={(e) =>
                          onUpdateAppointmentStatus(
                            appt.id,
                            e.target.value as Appointment['status']
                          )
                        }
                        className="text-xs px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold focus:outline-none"
                      >
                        <option value="Upcoming">Upcoming</option>
                        <option value="Completed">Completed</option>
                        <option value="Rescheduled">Rescheduled</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>

                      <a
                        href={`mailto:${appt.email}?subject=ADVYX%20Discovery%20Call%20Preparation%20-%20${encodeURIComponent(
                          appt.businessName || ''
                        )}`}
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-[#2374B8]"
                        title="Send Meeting Prep Email"
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Calendar className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm font-semibold">No appointments found</p>
                <p className="text-xs text-slate-400 mt-1">
                  Bookings via the Discovery Calendar will populate here automatically.
                </p>
              </div>
            )
          ) : (
            /* Tab: Pricing & Geolocation Control (Creator-Only) */
            <div className="p-6 max-w-4xl mx-auto space-y-6">
              {/* Status Header */}
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                    <ShieldCheck className="w-4 h-4 text-[#2374B8]" />
                    <span>Visitor Pricing Restriction Status: <strong className="text-emerald-500">Active & Enforced</strong></span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl leading-relaxed">
                    Regular visitors cannot select or compare different countries. The website automatically calibrates to their local currency based on IP and browser locale, preventing visitors from seeing differing regional pricing gaps.
                  </p>
                </div>
                {creatorModeEnabled && (
                  <button
                    onClick={handleResetToAutoLocation}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-rose-500/40 text-rose-500 hover:bg-rose-500/10 flex items-center gap-1.5 transition-colors shrink-0"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Override</span>
                  </button>
                )}
              </div>

              {/* Creator Live Override Tool */}
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E1729] space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Lock className="w-4 h-4 text-[#2374B8]" />
                      <span>Creator Country Override & Testing Console</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Select any global region below to inspect how localized pricing tiers appear on the live contact form.
                    </p>
                  </div>
                  {creatorModeEnabled ? (
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
                      Testing Mode Active
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      Natural Geolocation Mode
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                      Select Region to Test:
                    </label>
                    <select
                      value={creatorCountry}
                      onChange={(e) => handleSetCreatorCountry(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl text-xs font-medium border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2374B8]"
                    >
                      {COUNTRY_BUDGET_CONFIGS.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.flag} {country.name} ({country.currency} — {country.currencySymbol})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                      Active Currency & Symbol:
                    </label>
                    <div className="px-3 py-2.5 rounded-xl text-xs font-mono font-semibold bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[#2374B8]">
                      {getCountryBudgetConfig(creatorCountry).currency} ({getCountryBudgetConfig(creatorCountry).currencySymbol}) — {getCountryBudgetConfig(creatorCountry).name}
                    </div>
                  </div>
                </div>

                {/* Live Tiers for Selected Country */}
                <div className="pt-3">
                  <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2">
                    Active Brackets for {getCountryBudgetConfig(creatorCountry).name}:
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {getCountryBudgetConfig(creatorCountry).tiers.map((tier) => (
                      <div
                        key={tier.id}
                        className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-center"
                      >
                        <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">
                          {tier.id}
                        </span>
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block mt-0.5">
                          {tier.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between text-xs text-slate-400">
          <span>Synced with local state & persistent client inquiries</span>
          <span>Official Inbox: <strong className="text-slate-600 dark:text-slate-300">advyxmedia@gmail.com</strong></span>
        </div>
      </div>

      {/* Inquiry Detail & Note Editor Drawer Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 backdrop-blur-md bg-black/60">
          <div
            className={`w-full max-w-lg rounded-3xl p-6 border shadow-2xl relative ${
              isDark
                ? 'bg-[#0E1729] border-slate-700 text-white'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <button
              onClick={() => setSelectedInquiry(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-bold uppercase tracking-wider text-[#2374B8]">
              Inquiry Dossier
            </span>
            <h3 className="text-2xl font-bold font-display mt-1">
              {selectedInquiry.businessName || 'Unnamed Business'}
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Contact: {selectedInquiry.clientName || 'N/A'} • {selectedInquiry.email}
            </p>

            <div className="space-y-3 text-xs mb-6">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <span className="text-slate-400 block mb-1">Service & Investment:</span>
                <span className="font-semibold text-[#2374B8]">{selectedInquiry.service || 'N/A'}</span>
                {selectedInquiry.country && (
                  <span className="text-slate-500"> • Country: <strong className="text-slate-700 dark:text-slate-200">{selectedInquiry.country}</strong></span>
                )}
                <span> • Budget: <strong className="text-slate-700 dark:text-slate-200">{selectedInquiry.budget || 'N/A'}</strong></span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <span className="text-slate-400 block mb-1">Full Inquiry Message:</span>
                <p className="italic leading-relaxed">{selectedInquiry.message || 'No message provided.'}</p>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">
                  Internal Agency Notes:
                </label>
                <textarea
                  rows={3}
                  value={editingNotes}
                  onChange={(e) => setEditingNotes(e.target.value)}
                  placeholder="Add notes from strategy call, action items, or proposal targets..."
                  className="w-full p-2.5 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-1 focus:ring-[#2374B8]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-500"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onUpdateInquiryNotes(selectedInquiry.id, editingNotes);
                  setSelectedInquiry(null);
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#2374B8] hover:bg-[#18598F]"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manual Add Lead Modal */}
      {showAddInquiryModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 backdrop-blur-md bg-black/60">
          <div
            className={`w-full max-w-md rounded-3xl p-6 border shadow-2xl relative ${
              isDark
                ? 'bg-[#0E1729] border-slate-700 text-white'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <button
              onClick={() => setShowAddInquiryModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold font-display mb-1">
              Log Offline / Inbound Lead
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Add a lead received from Instagram DM, WhatsApp, or referral.
            </p>

            <form onSubmit={handleManualSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Contact Name *</label>
                <input
                  type="text"
                  required
                  value={manualClientName}
                  onChange={(e) => setManualClientName(e.target.value)}
                  placeholder="e.g. David Ross"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Brand Name *</label>
                <input
                  type="text"
                  required
                  value={manualBusinessName}
                  onChange={(e) => setManualBusinessName(e.target.value)}
                  placeholder="e.g. Apex Athletics"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={manualEmail}
                  onChange={(e) => setManualEmail(e.target.value)}
                  placeholder="david@apex.com"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Service Focus</label>
                <select
                  value={manualService}
                  onChange={(e) => setManualService(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                >
                  <option value="Social Media Management">Social Media Management</option>
                  <option value="Performance & Paid Ads">Performance & Paid Ads</option>
                  <option value="Content Creation & Video">Content Creation & Video</option>
                  <option value="Brand Identity & Design">Brand Identity & Design</option>
                  <option value="Full Agency Retainer">Full Agency Retainer</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Notes / Summary</label>
                <textarea
                  rows={2}
                  value={manualMessage}
                  onChange={(e) => setManualMessage(e.target.value)}
                  placeholder="Context, referral source..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddInquiryModal(false)}
                  className="px-4 py-2 text-slate-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold text-white bg-[#2374B8] hover:bg-[#18598F]"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};