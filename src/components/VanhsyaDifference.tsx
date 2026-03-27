"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FiEye, FiDollarSign, FiShield, FiUsers, FiCheckCircle, FiTrendingUp } from 'react-icons/fi';
import { FaLightbulb, FaHandshake } from 'react-icons/fa';
import GlassCard from './GlassCard';

interface DifferencePoint {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight: string;
  color: string;
}

export default function VanhsyaDifference() {
  const differences: DifferencePoint[] = [
    {
      icon: <FiEye className="w-8 h-8" />,
      title: "100% Transparent Process",
      description: "Every client sees real applications, officer responses, and actual progress - no manipulation or false updates.",
      highlight: "Live application tracking with officer communication logs",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: <FiDollarSign className="w-8 h-8" />,
      title: "Migration Wallet System", 
      description: "Every rupee is tracked in a secure wallet with milestone-based release - no upfront payments, no hidden costs.",
      highlight: "Pay only when milestones are achieved",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: "AI Scam Shield Protection",
      description: "Only platform with real-time AI fraud detection protecting you from fake agencies, documents, and job offers.",
      highlight: "200+ AI fraud patterns detected daily",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: <FiCheckCircle className="w-8 h-8" />,
      title: "Verified Testimonials Only",
      description: "Every review is video-recorded, LinkedIn verified, and location-authenticated - no paid actors or fake reviews.",
      highlight: "100% traceable and verifiable success stories",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: "Zero-Agent Guarantee",
      description: "Direct access to licensed consultants and government channels - no middlemen or commission-driven agents.",
      highlight: "MARA/ICCRC certified experts only",
      color: "from-amber-500 to-yellow-500"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5" />
        {/* Innovation Pattern */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"
              style={{
                left: `${15 + (i % 4) * 20}%`,
                top: `${20 + Math.floor(i / 4) * 25}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 4 + (((i * 73) % 20) / 10),
                repeat: Infinity,
                delay: i * 0.3,
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
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-400/30 rounded-full text-indigo-300 text-sm font-medium mb-6">
            <FaLightbulb className="w-4 h-4" />
            <span>Revolutionary Approach</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-indigo-100 to-purple-200 bg-clip-text text-transparent">
              The VANHSYA
            </span>
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Difference
            </span>
          </h2>
          
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            We've eliminated every problem that plagues the migration industry. 
            Here's how we're revolutionizing migration services for good.
          </p>
        </motion.div>

        {/* Main Differences Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {differences.map((diff, index) => (
            <motion.div
              key={diff.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                type: "spring",
                stiffness: 100 
              }}
            >
              <GlassCard className="h-full group hover:scale-102 transition-all duration-300 relative overflow-hidden">
                {/* Gradient Border Effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${diff.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none`} />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className={`p-4 bg-gradient-to-r ${diff.color} rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {diff.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-4 text-center group-hover:text-indigo-300 transition-colors">
                    {diff.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed mb-6 text-center">
                    {diff.description}
                  </p>

                  {/* Highlight */}
                  <div className={`p-4 bg-gradient-to-r ${diff.color}/20 border border-white/20 rounded-xl`}>
                    <div className="flex items-center space-x-2 text-center justify-center">
                      <FiTrendingUp className="w-4 h-4 text-white" />
                      <span className="text-white font-medium text-sm">{diff.highlight}</span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Comparison Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16"
        >
          <GlassCard className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold text-white text-center mb-8">
              Traditional Agencies vs VANHSYA
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Traditional Agencies */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-red-400 mb-4 flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <span>Traditional Agencies</span>
                </h4>
                
                <div className="space-y-3">
                  {[
                    "Hidden fees and surprise charges",
                    "Fake testimonials and paid reviews", 
                    "Agent commissions drive decisions",
                    "No real-time progress tracking",
                    "Limited scam protection",
                    "Upfront payment required"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                      <span className="text-gray-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* VANHSYA */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-green-400 mb-4 flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span>VANHSYA Platform</span>
                </h4>
                
                <div className="space-y-3">
                  {[
                    "100% transparent pricing, no hidden costs",
                    "Video-verified, LinkedIn-authenticated reviews",
                    "Zero agents, only certified experts",
                    "Live tracking with officer communication",
                    "AI Scam Shield with 200+ fraud patterns",
                    "Milestone-based payment system"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <FiCheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Bottom Commitment */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
          <GlassCard className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <FaHandshake className="w-8 h-8 text-indigo-400" />
              <h3 className="text-2xl font-bold text-white">Our Commitment to Change</h3>
            </div>
            
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              We're not just another migration agency. We're building the future of migration services - 
              one where transparency, technology, and trust replace the outdated practices that have 
              harmed clients for decades.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-400/30 rounded-xl">
                <div className="text-2xl font-bold text-blue-400 mb-2">Zero</div>
                <div className="text-white font-medium mb-1">Manipulation</div>
                <div className="text-gray-400 text-sm">Every process is transparent and traceable</div>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-xl">
                <div className="text-2xl font-bold text-green-400 mb-2">100%</div>
                <div className="text-white font-medium mb-1">Accountability</div>
                <div className="text-gray-400 text-sm">Every rupee and step is tracked and justified</div>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-xl">
                <div className="text-2xl font-bold text-purple-400 mb-2">24/7</div>
                <div className="text-white font-medium mb-1">Protection</div>
                <div className="text-gray-400 text-sm">AI-powered fraud detection never sleeps</div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
