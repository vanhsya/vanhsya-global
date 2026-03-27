"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiFileText, 
  FiUser, 
  FiCalendar, 
  FiClock, 
  FiCheckCircle, 
  FiAlertCircle,
  FiDownload,
  FiUpload,
  FiMessageCircle,
  FiEye,
  FiX
} from 'react-icons/fi';
import GlassCard from './GlassCard';

interface CaseUpdate {
  id: string;
  date: string;
  status: 'progress' | 'completed' | 'pending';
  title: string;
  description: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  status: 'verified' | 'pending' | 'rejected';
  uploadDate: string;
  size: string;
}

interface Appointment {
  id: string;
  date: string;
  time: string;
  type: string;
  consultant: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export function ClientPortal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const mockData = {
    case: {
      id: "CASE-2024-001",
      status: "In Progress",
      progress: 65,
      country: "Canada",
      program: "Express Entry - Federal Skilled Worker"
    },
    updates: [
      {
        id: "1",
        date: "2024-01-15",
        status: "completed" as const,
        title: "Documents Verified",
        description: "All primary documents have been verified and approved"
      },
      {
        id: "2",
        date: "2024-01-10",
        status: "progress" as const,
        title: "IELTS Score Submitted",
        description: "IELTS score of 8.5 overall has been added to your profile"
      },
      {
        id: "3",
        date: "2024-01-05",
        status: "pending" as const,
        title: "Medical Examination",
        description: "Schedule your medical examination within 30 days"
      }
    ] as CaseUpdate[],
    documents: [
      {
        id: "1",
        name: "Passport",
        type: "ID Document",
        status: "verified" as const,
        uploadDate: "2024-01-01",
        size: "2.4 MB"
      },
      {
        id: "2",
        name: "IELTS Certificate",
        type: "Language Test",
        status: "verified" as const,
        uploadDate: "2024-01-05",
        size: "1.8 MB"
      },
      {
        id: "3",
        name: "Work Experience Letter",
        type: "Employment",
        status: "pending" as const,
        uploadDate: "2024-01-10",
        size: "1.2 MB"
      }
    ] as Document[],
    appointments: [
      {
        id: "1",
        date: "2024-01-20",
        time: "10:00 AM",
        type: "Consultation",
        consultant: "Sarah Johnson",
        status: "scheduled" as const
      },
      {
        id: "2",
        date: "2024-01-12",
        time: "2:00 PM",
        type: "Document Review",
        consultant: "Mike Chen",
        status: "completed" as const
      }
    ] as Appointment[]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': case 'verified': return 'text-green-400';
      case 'progress': case 'scheduled': return 'text-blue-400';
      case 'pending': case 'rejected': case 'cancelled': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': case 'verified': return <FiCheckCircle className="w-4 h-4" />;
      case 'progress': case 'scheduled': return <FiClock className="w-4 h-4" />;
      case 'pending': case 'rejected': case 'cancelled': return <FiAlertCircle className="w-4 h-4" />;
      default: return <FiClock className="w-4 h-4" />;
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Case Overview */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">Case Overview</h3>
          <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
            {mockData.case.status}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-gray-400 text-sm">Case ID</p>
            <p className="text-white font-mono">{mockData.case.id}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Destination</p>
            <p className="text-white">{mockData.case.country}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-gray-400 text-sm">Program</p>
            <p className="text-white">{mockData.case.program}</p>
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400 text-sm">Progress</span>
            <span className="text-white text-sm">{mockData.case.progress}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <motion.div 
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${mockData.case.progress}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </GlassCard>

      {/* Quick Actions */}
      <GlassCard className="p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-3 p-4 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all"
          >
            <FiUpload className="w-5 h-5 text-indigo-400" />
            <span className="text-white">Upload Document</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-3 p-4 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all"
          >
            <FiCalendar className="w-5 h-5 text-green-400" />
            <span className="text-white">Book Appointment</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-3 p-4 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all"
          >
            <FiMessageCircle className="w-5 h-5 text-blue-400" />
            <span className="text-white">Contact Support</span>
          </motion.button>
        </div>
      </GlassCard>

      {/* Recent Updates */}
      <GlassCard className="p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Recent Updates</h3>
        <div className="space-y-4">
          {mockData.updates.slice(0, 3).map((update) => (
            <div key={update.id} className="flex items-start space-x-4 p-4 bg-white/5 rounded-lg">
              <div className={`${getStatusColor(update.status)} mt-1`}>
                {getStatusIcon(update.status)}
              </div>
              <div className="flex-1">
                <h4 className="text-white font-medium">{update.title}</h4>
                <p className="text-gray-400 text-sm mt-1">{update.description}</p>
                <p className="text-gray-500 text-xs mt-2">{update.date}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-6">
      <GlassCard className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-white">Documents</h3>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            <FiUpload className="w-4 h-4" />
            <span>Upload New</span>
          </motion.button>
        </div>
        <div className="space-y-4">
          {mockData.documents.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-center space-x-4">
                <FiFileText className="w-6 h-6 text-indigo-400" />
                <div>
                  <h4 className="text-white font-medium">{doc.name}</h4>
                  <p className="text-gray-400 text-sm">{doc.type} • {doc.size}</p>
                  <p className="text-gray-500 text-xs">Uploaded {doc.uploadDate}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`flex items-center space-x-1 ${getStatusColor(doc.status)}`}>
                  {getStatusIcon(doc.status)}
                  <span className="text-sm capitalize">{doc.status}</span>
                </span>
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <FiEye className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <FiDownload className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );

  const renderAppointments = () => (
    <div className="space-y-6">
      <GlassCard className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-white">Appointments</h3>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <FiCalendar className="w-4 h-4" />
            <span>Book New</span>
          </motion.button>
        </div>
        <div className="space-y-4">
          {mockData.appointments.map((appointment) => (
            <div key={appointment.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-medium">{appointment.type}</h4>
                <span className={`flex items-center space-x-1 ${getStatusColor(appointment.status)}`}>
                  {getStatusIcon(appointment.status)}
                  <span className="text-sm capitalize">{appointment.status}</span>
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Date</p>
                  <p className="text-white">{appointment.date}</p>
                </div>
                <div>
                  <p className="text-gray-400">Time</p>
                  <p className="text-white">{appointment.time}</p>
                </div>
                <div>
                  <p className="text-gray-400">Consultant</p>
                  <p className="text-white">{appointment.consultant}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <FiUser className="w-4 h-4" /> },
    { id: 'documents', label: 'Documents', icon: <FiFileText className="w-4 h-4" /> },
    { id: 'appointments', label: 'Appointments', icon: <FiCalendar className="w-4 h-4" /> }
  ];

  return (
    <>
      {/* Portal Access Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed top-4 right-4 z-40 flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
      >
        <FiUser className="w-4 h-4" />
        <span>Client Portal</span>
      </motion.button>

      {/* Portal Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-6xl max-h-[90vh] overflow-hidden bg-slate-900/90 backdrop-blur-md border border-white/20 rounded-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div>
                  <h2 className="text-2xl font-bold text-white">Client Portal</h2>
                  <p className="text-gray-400">Manage your migration journey</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <FiX className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-white/10">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-4 transition-all ${
                      activeTab === tab.id
                        ? 'text-indigo-400 border-b-2 border-indigo-400'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* Content */}
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                {activeTab === 'dashboard' && renderDashboard()}
                {activeTab === 'documents' && renderDocuments()}
                {activeTab === 'appointments' && renderAppointments()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
