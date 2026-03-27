"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiActivity,
  FiTrendingUp,
  FiUsers,
  FiGlobe,
  FiShield,
  FiZap,
  FiX,
  FiClock,
  FiDatabase
} from 'react-icons/fi';
import GlassCard from './GlassCard';

interface MetricData {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  icon: React.ReactNode;
  color: string;
}

interface SystemStatus {
  service: string;
  status: 'operational' | 'degraded' | 'outage';
  uptime: string;
  responseTime: string;
}

export function PerformanceDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [realTimeData, setRealTimeData] = useState<MetricData[]>([]);

  // Simulate real-time data updates
  useEffect(() => {
    const updateMetrics = () => {
      const metrics: MetricData[] = [
        {
          label: "Active Users",
          value: Math.floor(Math.random() * 1000 + 2500).toLocaleString(),
          change: `+${Math.floor(Math.random() * 10 + 5)}%`,
          trend: 'up',
          icon: <FiUsers className="w-5 h-5" />,
          color: 'text-blue-400'
        },
        {
          label: "Cases Processed",
          value: Math.floor(Math.random() * 100 + 450).toLocaleString(),
          change: `+${Math.floor(Math.random() * 8 + 3)}%`,
          trend: 'up',
          icon: <FiActivity className="w-5 h-5" />,
          color: 'text-green-400'
        },
        {
          label: "AI Assessments",
          value: Math.floor(Math.random() * 200 + 850).toLocaleString(),
          change: `+${Math.floor(Math.random() * 15 + 8)}%`,
          trend: 'up',
          icon: <FiZap className="w-5 h-5" />,
          color: 'text-purple-400'
        },
        {
          label: "Success Rate",
          value: `${(Math.random() * 5 + 92).toFixed(1)}%`,
          change: `+${(Math.random() * 2 + 1).toFixed(1)}%`,
          trend: 'up',
          icon: <FiTrendingUp className="w-5 h-5" />,
          color: 'text-amber-400'
        },
        {
          label: "Global Reach",
          value: `${Math.floor(Math.random() * 10 + 45)} Countries`,
          change: `+${Math.floor(Math.random() * 3 + 1)}`,
          trend: 'up',
          icon: <FiGlobe className="w-5 h-5" />,
          color: 'text-indigo-400'
        },
        {
          label: "Security Score",
          value: `${(Math.random() * 2 + 98).toFixed(1)}%`,
          change: "Excellent",
          trend: 'stable',
          icon: <FiShield className="w-5 h-5" />,
          color: 'text-green-400'
        }
      ];
      setRealTimeData(metrics);
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const systemStatus: SystemStatus[] = [
    {
      service: "AI Services",
      status: "operational",
      uptime: "99.98%",
      responseTime: "45ms"
    },
    {
      service: "Document Processing",
      status: "operational",
      uptime: "99.95%",
      responseTime: "120ms"
    },
    {
      service: "Client Portal",
      status: "operational",
      uptime: "99.99%",
      responseTime: "85ms"
    },
    {
      service: "Job Board",
      status: "operational",
      uptime: "99.97%",
      responseTime: "65ms"
    },
    {
      service: "Payment Gateway",
      status: "operational",
      uptime: "99.96%",
      responseTime: "200ms"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'text-green-400';
      case 'degraded': return 'text-yellow-400';
      case 'outage': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <div className="w-2 h-2 bg-green-400 rounded-full" />;
      case 'degraded': return <div className="w-2 h-2 bg-yellow-400 rounded-full" />;
      case 'outage': return <div className="w-2 h-2 bg-red-400 rounded-full" />;
      default: return <div className="w-2 h-2 bg-gray-400 rounded-full" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <FiTrendingUp className="w-3 h-3 text-green-400" />;
      case 'down': return <FiTrendingUp className="w-3 h-3 text-red-400 rotate-180" />;
      case 'stable': return <div className="w-3 h-1 bg-gray-400 rounded" />;
      default: return null;
    }
  };

  return (
    <>
      {/* Performance Dashboard Access Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-4 right-4 z-40 flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
      >
        <FiActivity className="w-4 h-4" />
        <span>Performance</span>
      </motion.button>

      {/* Dashboard Modal */}
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
              className="w-full max-w-7xl max-h-[95vh] overflow-hidden bg-slate-900/90 backdrop-blur-md border border-white/20 rounded-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div>
                  <h2 className="text-2xl font-bold text-white">Performance Dashboard</h2>
                  <p className="text-gray-400">Real-time system monitoring and analytics</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-green-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-sm">Live Data</span>
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
              </div>

              {/* Content */}
              <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
                {/* Real-time Metrics */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Real-time Metrics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {realTimeData.map((metric, index) => (
                      <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <GlassCard className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className={metric.color}>
                              {metric.icon}
                            </div>
                            {getTrendIcon(metric.trend)}
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-white mb-1">{metric.value}</p>
                            <p className="text-gray-400 text-sm mb-1">{metric.label}</p>
                            <p className="text-green-400 text-xs">{metric.change}</p>
                          </div>
                        </GlassCard>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* System Status */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">System Status</h3>
                  <GlassCard className="p-6">
                    <div className="space-y-4">
                      {systemStatus.map((system, index) => (
                        <motion.div
                          key={system.service}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
                        >
                          <div className="flex items-center space-x-4">
                            {getStatusIcon(system.status)}
                            <div>
                              <h4 className="text-white font-medium">{system.service}</h4>
                              <p className={`text-sm capitalize ${getStatusColor(system.status)}`}>
                                {system.status}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-8 text-sm text-gray-300">
                            <div className="text-center">
                              <p className="text-gray-400">Uptime</p>
                              <p className="text-white font-mono">{system.uptime}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-gray-400">Response</p>
                              <p className="text-white font-mono">{system.responseTime}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </GlassCard>
                </div>

                {/* Performance Insights */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Traffic Overview */}
                  <GlassCard className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                      <FiUsers className="w-5 h-5 text-blue-400" />
                      <span>Traffic Overview</span>
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Page Views (24h)</span>
                        <span className="text-white font-mono">15,432</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Unique Visitors</span>
                        <span className="text-white font-mono">8,721</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Avg. Session Duration</span>
                        <span className="text-white font-mono">4m 32s</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Bounce Rate</span>
                        <span className="text-white font-mono">23.4%</span>
                      </div>
                    </div>
                  </GlassCard>

                  {/* Resource Usage */}
                  <GlassCard className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                      <FiDatabase className="w-5 h-5 text-purple-400" />
                      <span>Resource Usage</span>
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-400">CPU Usage</span>
                          <span className="text-white font-mono">34%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <motion.div 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: "34%" }}
                            transition={{ duration: 1 }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-400">Memory</span>
                          <span className="text-white font-mono">67%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <motion.div 
                            className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: "67%" }}
                            transition={{ duration: 1.2 }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-400">Storage</span>
                          <span className="text-white font-mono">45%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <motion.div 
                            className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: "45%" }}
                            transition={{ duration: 1.4 }}
                          />
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </div>

                {/* Recent Activity */}
                <GlassCard className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                    <FiClock className="w-5 h-5 text-amber-400" />
                    <span>Recent Activity</span>
                  </h3>
                  <div className="space-y-3">
                    {[
                      { time: "2 min ago", event: "AI Assessment completed for user #4521", type: "success" },
                      { time: "5 min ago", event: "New job posting added by TechCorp Canada", type: "info" },
                      { time: "8 min ago", event: "Document verification completed", type: "success" },
                      { time: "12 min ago", event: "Referral bonus credited to user #3847", type: "success" },
                      { time: "15 min ago", event: "System backup completed successfully", type: "info" }
                    ].map((activity, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg"
                      >
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'success' ? 'bg-green-400' : 'bg-blue-400'
                        }`} />
                        <div className="flex-1">
                          <p className="text-white text-sm">{activity.event}</p>
                          <p className="text-gray-400 text-xs">{activity.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </GlassCard>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
