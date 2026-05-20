'use client';

import { motion } from 'framer-motion';
import { 
  User, FileText, Clock, CheckCircle, AlertCircle, 
  Upload, Download, MessageCircle, Settings, LogOut, Bell,
  BarChart3, TrendingUp, Globe
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { tryGetSupabaseBrowserClient } from '@/lib/supabaseClient';

const applicationData = {
  profile: {
    name: "John Smith",
    email: "john.smith@email.com",
    applicationId: "VAN2024001",
    country: "Canada",
    visaType: "Express Entry",
    consultant: "Sarah Johnson"
  },
  progress: {
    currentStage: 3,
    stages: [
      { id: 1, name: "Initial Consultation", status: "completed", date: "2024-01-15" },
      { id: 2, name: "Document Collection", status: "completed", date: "2024-01-22" },
      { id: 3, name: "Application Review", status: "in-progress", date: null },
      { id: 4, name: "Submission", status: "pending", date: null },
      { id: 5, name: "Processing", status: "pending", date: null },
      { id: 6, name: "Decision", status: "pending", date: null }
    ]
  },
  documents: [
    { name: "Passport Copy", status: "approved", uploadDate: "2024-01-20", type: "identity" },
    { name: "Educational Certificates", status: "approved", uploadDate: "2024-01-21", type: "education" },
    { name: "IELTS Results", status: "approved", uploadDate: "2024-01-22", type: "language" },
    { name: "Work Experience Letters", status: "pending-review", uploadDate: "2024-01-23", type: "experience" },
    { name: "Medical Examination", status: "required", uploadDate: null, type: "medical" }
  ],
  notifications: [
    { id: 1, message: "Your work experience letter is under review", date: "2024-01-23", type: "info" },
    { id: 2, message: "Medical examination required by Feb 15", date: "2024-01-22", type: "warning" },
    { id: 3, message: "IELTS results approved", date: "2024-01-21", type: "success" }
  ]
};

export default function ClientDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [sessionChecked, setSessionChecked] = useState(false);
  const [profile, setProfile] = useState(applicationData.profile);
  const supabaseReady = Boolean(tryGetSupabaseBrowserClient());

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        const supabase = tryGetSupabaseBrowserClient();
        if (!supabase) {
          if (!cancelled) router.replace('/portal');
          return;
        }
        const { data } = await supabase.auth.getSession();
        const session = data.session;
        if (!session?.user) {
          if (!cancelled) router.replace('/portal');
          return;
        }
        const email = typeof session.user.email === 'string' ? session.user.email : profile.email;
        const md = (session.user.user_metadata ?? {}) as Record<string, unknown>;
        const name =
          (typeof md.full_name === 'string' && md.full_name.trim()) ||
          (typeof md.name === 'string' && md.name.trim()) ||
          profile.name;
        if (!cancelled) setProfile((p) => ({ ...p, name, email }));
      } catch {
        if (!cancelled) router.replace('/portal');
        return;
      } finally {
        if (!cancelled) setSessionChecked(true);
      }
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [router, profile.email, profile.name]);

  const signOut = async () => {
    try {
      const supabase = tryGetSupabaseBrowserClient();
      if (supabase) await supabase.auth.signOut();
    } catch {
    } finally {
      router.replace('/portal');
    }
  };

  const viewProfile = useMemo(() => profile, [profile]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getDocumentStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 bg-green-100';
      case 'pending-review':
        return 'text-yellow-600 bg-yellow-100';
      case 'required':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-pink-500">
      {/* Header */}
      <header className="nav-glass border-b border-white/20">
        <div className="container-max">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">VANHSYA • Client Portal</span>
              </Link>
              <span className="text-white/70">Secure | 24/7 Assistance</span>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 text-white/70 hover:text-white transition-colors" aria-label="Notifications">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">3</span>
              </button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-medium">{viewProfile.name}</span>
              </div>
              <button
                type="button"
                onClick={signOut}
                className="p-2 text-white/70 hover:text-white transition-colors"
                aria-label="Sign out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {!sessionChecked ? (
        <div className="container-max py-8">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 text-white/80 font-bold">
            Loading portal session…
          </div>
        </div>
      ) : (
      <div className="container-max py-8">
        {!supabaseReady ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5 text-amber-900 font-bold">
            Portal auth is not configured on this deployment. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel.
          </div>
        ) : null}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="modern-card">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800">{viewProfile.name}</h3>
                <p className="text-gray-600 text-sm">{viewProfile.email}</p>
                <div className="mt-2 px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-xs">
                  {viewProfile.applicationId}
                </div>
              </div>

              <nav className="space-y-2">
                {[
                  { id: 'overview', label: 'Overview', icon: BarChart3 },
                  { id: 'progress', label: 'Application Progress', icon: TrendingUp },
                  { id: 'documents', label: 'Documents', icon: FileText },
                  { id: 'messages', label: 'Messages', icon: MessageCircle },
                  { id: 'settings', label: 'Settings', icon: Settings }
                ].map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                        activeTab === item.id
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                {/* Welcome Card */}
                <div className="modern-card card-purple">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Welcome back, {applicationData.profile.name}!
                  </h2>
                  <p className="text-white/90 mb-4">
                    Your {applicationData.profile.visaType} application for {applicationData.profile.country} is progressing well.
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="text-white/80">Consultant: {applicationData.profile.consultant}</span>
                    <button className="btn-secondary">
                      <MessageCircle className="w-4 h-4" />
                      Message
                    </button>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="modern-card text-center">
                    <div className="text-3xl font-bold text-gradient mb-2">
                      {Math.round((applicationData.progress.currentStage / applicationData.progress.stages.length) * 100)}%
                    </div>
                    <p className="text-gray-600">Application Progress</p>
                  </div>
                  <div className="modern-card text-center">
                    <div className="text-3xl font-bold text-gradient mb-2">
                      {applicationData.documents.filter(doc => doc.status === 'approved').length}
                    </div>
                    <p className="text-gray-600">Documents Approved</p>
                  </div>
                  <div className="modern-card text-center">
                    <div className="text-3xl font-bold text-gradient mb-2">
                      {applicationData.notifications.length}
                    </div>
                    <p className="text-gray-600">Pending Notifications</p>
                  </div>
                </div>

                {/* Recent Notifications */}
                <div className="modern-card">
                  <h3 className="text-xl font-semibold mb-6 text-gray-800">Recent Updates</h3>
                  <div className="space-y-4">
                    {applicationData.notifications.map((notification) => (
                      <div key={notification.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.type === 'success' ? 'bg-green-500' :
                          notification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                        }`} />
                        <div className="flex-1">
                          <p className="text-gray-800">{notification.message}</p>
                          <p className="text-gray-500 text-sm">{notification.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'progress' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="modern-card"
              >
                <h3 className="text-xl font-semibold mb-6 text-gray-800">Application Progress</h3>
                <div className="space-y-6">
                  {applicationData.progress.stages.map((stage, index) => (
                    <div key={stage.id} className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        stage.status === 'completed' ? 'bg-green-100' :
                        stage.status === 'in-progress' ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        {getStatusIcon(stage.status)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{stage.name}</h4>
                        {stage.date && (
                          <p className="text-gray-500 text-sm">Completed on {stage.date}</p>
                        )}
                        {stage.status === 'in-progress' && (
                          <p className="text-blue-600 text-sm">Currently in progress</p>
                        )}
                      </div>
                      {index < applicationData.progress.stages.length - 1 && (
                        <div className={`w-px h-8 ${
                          stage.status === 'completed' ? 'bg-green-300' : 'bg-gray-300'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'documents' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="modern-card"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">Document Management</h3>
                  <button className="btn-primary">
                    <Upload className="w-4 h-4" />
                    Upload Document
                  </button>
                </div>
                
                <div className="space-y-4">
                  {applicationData.documents.map((document, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-4">
                        <FileText className="w-6 h-6 text-gray-400" />
                        <div>
                          <h4 className="font-medium text-gray-800">{document.name}</h4>
                          {document.uploadDate && (
                            <p className="text-gray-500 text-sm">Uploaded on {document.uploadDate}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDocumentStatusColor(document.status)}`}>
                          {document.status.replace('-', ' ').toUpperCase()}
                        </span>
                        {document.uploadDate && (
                          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors" aria-label={`Download ${document.name}`}>
                            <Download className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'messages' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="modern-card"
              >
                <h3 className="text-xl font-semibold mb-6 text-gray-800">Messages</h3>
                <div className="text-center py-12">
                  <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-600 mb-2">No messages yet</h4>
                  <p className="text-gray-500 mb-6">Start a conversation with your consultant</p>
                  <button className="btn-primary">
                    Send Message
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="modern-card"
              >
                <h3 className="text-xl font-semibold mb-6 text-gray-800">Account Settings</h3>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="settings-email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      id="settings-email"
                      type="email"
                      value={viewProfile.email}
                      aria-label="Email address"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="Enter your phone number"
                      aria-label="Phone number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notification Preferences</label>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-gray-700">Email notifications</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-gray-700">SMS notifications</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input type="checkbox" className="rounded" />
                        <span className="text-gray-700">WhatsApp notifications</span>
                      </label>
                    </div>
                  </div>
                  <button className="btn-primary">
                    Save Changes
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
