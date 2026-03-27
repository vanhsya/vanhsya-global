"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiZap, FiShield, FiFileText, FiUser, FiAlertTriangle, FiArrowRight, FiTrendingUp, FiMapPin, FiCompass } from 'react-icons/fi';
import { FaRobot, FaBrain } from 'react-icons/fa';
import GlassCard from './GlassCard';

interface AITool {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  href: string;
  color: string;
  isNew?: boolean;
}

export default function AIToolsShowcase() {
  const [mounted, setMounted] = React.useState(false);
  const [circuitElements, setCircuitElements] = React.useState<
    Array<{ left: string; top: string; duration: number; delay: number }>
  >([]);

  React.useEffect(() => {
    setMounted(true);
    const elements = Array.from({ length: 20 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
    setCircuitElements(elements);
  }, []);

  const aiTools: AITool[] = [
    {
      icon: <FaRobot className="w-8 h-8" />,
      title: "Eligibility Checker",
      description: "AI-powered visa eligibility assessment with 95% accuracy",
      features: [
        "Instant eligibility analysis",
        "Multiple pathway suggestions", 
        "Requirements checklist",
        "Score optimization tips"
      ],
      href: "/ai-tools/eligibility",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: "Scam Detector",
      description: "200+ fraud pattern detection to protect your migration journey",
      features: [
        "Fake job offer detection",
        "Agency verification",
        "Document authenticity",
        "Real-time scam alerts"
      ],
      href: "/ai-tools/scam-detector",
      color: "from-red-500 to-orange-500",
      isNew: true
    },
    {
      icon: <FiFileText className="w-8 h-8" />,
      title: "SOP/LOI Generator",
      description: "AI-crafted statements that match embassy requirements",
      features: [
        "Country-specific templates",
        "Personalized content",
        "Grammar & tone check",
        "Success rate tracking"
      ],
      href: "/ai-tools/sop-generator",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <FiUser className="w-8 h-8" />,
      title: "CV Builder",
      description: "Migration-optimized resumes that pass ATS and visa officers",
      features: [
        "ATS-friendly format",
        "Industry-specific keywords",
        "Skill gap analysis",
        "Achievement optimization"
      ],
      href: "/ai-tools/cv-builder",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <FiAlertTriangle className="w-8 h-8" />,
      title: "Embassy Alerts",
      description: "Real-time updates on visa policies and embassy changes",
      features: [
        "Policy change notifications",
        "Processing time updates",
        "Document requirement alerts",
        "Country-specific news"
      ],
      href: "/ai-tools/embassy-alerts",
      color: "from-amber-500 to-yellow-500",
      isNew: true
    },
    {
      icon: <FiTrendingUp className="w-8 h-8" />,
      title: "Visa Timeline Predictor",
      description: "Risk-aware approval window forecasting for better travel planning",
      features: [
        "Decision band prediction",
        "Milestone timeline",
        "Buffer planning mode",
        "Seasonality risk flags"
      ],
      href: "/ai-tools/visa-timeline-predictor",
      color: "from-yellow-500 to-amber-500",
      isNew: true
    },
    {
      icon: <FiMapPin className="w-8 h-8" />,
      title: "Entry Requirements Radar",
      description: "Border-ready document packs tailored to route and purpose",
      features: [
        "Nationality-to-country rules",
        "Document pack generator",
        "Risk band scoring",
        "Purpose letter checklist"
      ],
      href: "/ai-tools/entry-requirements-radar",
      color: "from-purple-500 to-pink-500",
      isNew: true
    },
    {
      icon: <FiCompass className="w-8 h-8" />,
      title: "Travel Itinerary AI",
      description: "Visa-smart tourism itineraries with consistent documentation",
      features: [
        "Day-by-day routing",
        "Budget style presets",
        "Visa narrative alignment",
        "Refundable plan guidance"
      ],
      href: "/ai-tools/travel-itinerary-ai",
      color: "from-indigo-500 to-purple-500",
      isNew: true
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5" />
        {/* Animated AI Circuit Pattern */}
        <div className="absolute inset-0 opacity-10">
          {mounted && circuitElements.map((el, i) => (
            <motion.div
              key={i}
              className="absolute w-px h-8 bg-gradient-to-t from-transparent via-blue-400 to-transparent"
              style={{
                left: el.left,
                top: el.top,
              }}
              animate={{
                scaleY: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: el.duration,
                repeat: Infinity,
                delay: el.delay,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-medium mb-6">
            <FaBrain className="w-4 h-4" />
            <span>AI-Powered Migration Tools</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              Advanced AI Tools
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              For Your Success
            </span>
          </h2>
          
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
            Harness the power of artificial intelligence to streamline your migration process. 
            All tools are free, instant, and designed by migration experts.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link
              href="/ai-tools"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl text-white font-semibold transition-all duration-300 shadow-lg shadow-blue-500/25"
            >
              <FiZap className="w-5 h-5" />
              <span>Try AI Tools Now</span>
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>

        {/* AI Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {aiTools.map((tool, index) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100 
              }}
            >
              <Link href={tool.href} className="flex flex-col h-full">
                <GlassCard className="h-full flex flex-col group hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden">
                  {/* New Badge */}
                  {tool.isNew && (
                    <div className="absolute top-4 right-4 px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded-full">
                      NEW
                    </div>
                  )}

                  {/* Tool Icon */}
                  <div className="flex justify-center mb-6">
                    <div className={`p-4 bg-gradient-to-r ${tool.color} rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {tool.icon}
                    </div>
                  </div>

                  {/* Tool Content */}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      {tool.description}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2 mb-6">
                    {tool.features.map((feature, featureIndex) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 0.4, 
                          delay: (index * 0.1) + (featureIndex * 0.05) + 0.3 
                        }}
                        className="flex items-center space-x-3 p-2 bg-white/5 rounded-lg border border-white/10"
                      >
                        <div className={`w-2 h-2 bg-gradient-to-r ${tool.color} rounded-full`} />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Try Now Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-auto"
                  >
                    <div className={`w-full py-3 bg-gradient-to-r ${tool.color} hover:shadow-lg hover:shadow-blue-500/25 rounded-xl text-white font-semibold text-center transition-all duration-300 group-hover:from-white group-hover:to-white group-hover:text-gray-900`}>
                      Try Now - Free
                    </div>
                  </motion.div>

                  {/* Hover Glow Effect */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${tool.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`} />
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">50,000+</div>
            <div className="text-gray-400">AI Assessments Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">95%</div>
            <div className="text-gray-400">Accuracy Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">24/7</div>
            <div className="text-gray-400">Available Instantly</div>
          </div>
        </motion.div>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-500/10 border border-green-400/20 rounded-xl text-green-300 text-sm">
            <FiShield className="w-4 h-4" />
            <span>All data is encrypted and never shared with third parties</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
