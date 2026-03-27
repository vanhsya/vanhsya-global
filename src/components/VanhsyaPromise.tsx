"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiEye, FiGlobe, FiGift, FiTarget, FiCheck } from 'react-icons/fi';
import { FaAward, FaHandshake } from 'react-icons/fa';
import GlassCard from './GlassCard';

interface TrustBadge {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Promise {
  icon: React.ReactNode;
  title: string;
  description: string;
  guarantee: string;
}

export default function VanhsyaPromise() {
  const trustBadges: TrustBadge[] = [
    {
      icon: <FiShield className="w-6 h-6" />,
      title: "ISO 27001 Certified",
      description: "International security standards compliance"
    },
    {
      icon: <FiGlobe className="w-6 h-6" />,
      title: "GDPR Compliant",
      description: "European data protection standards"
    },
    {
      icon: <FaAward className="w-6 h-6" />,
      title: "100% Refund Guarantee",
      description: "Money-back if we fail to deliver"
    },
    {
      icon: <FiCheck className="w-6 h-6" />,
      title: "MARA/ICCRC Licensed",
      description: "Certified migration consultants only"
    }
  ];

  const promises: Promise[] = [
    {
      icon: <FiEye className="w-8 h-8" />,
      title: "No Hidden Fees",
      description: "Complete transparency in all costs and charges. Every rupee is tracked and justified.",
      guarantee: "Written contract with itemized costs"
    },
    {
      icon: <FiTarget className="w-8 h-8" />,
      title: "All Steps One Platform",
      description: "From initial assessment to final settlement - everything managed in one secure platform.",
      guarantee: "Single dashboard for entire journey"
    },
    {
      icon: <FiGlobe className="w-8 h-8" />,
      title: "Global Compliance",
      description: "Adhering to international standards and regulations across all countries we serve.",
      guarantee: "ISO 27001 & GDPR certification"
    },
    {
      icon: <FiGift className="w-8 h-8" />,
      title: "Referral Rewards",
      description: "Earn rewards and get your migration free by referring friends and family.",
      guarantee: "Up to 100% fee recovery through referrals"
    }
  ];

  const stats = [
    { number: "10,000", label: "Safe Migrations by 2025", color: "text-green-400" },
    { number: "Zero", label: "Agent Intermediaries", color: "text-blue-400" },
    { number: "100%", label: "Process Transparency", color: "text-purple-400" },
    { number: "24/7", label: "Expert Support", color: "text-amber-400" }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-blue-500/5 to-purple-500/5" />
        {/* Trust Pattern Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-blue-400 to-purple-400" />
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
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-500/20 border border-green-400/30 rounded-full text-green-300 text-sm font-medium mb-6">
            <FaHandshake className="w-4 h-4" />
            <span>Our Commitment to You</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-green-100 to-blue-200 bg-clip-text text-transparent">
              The VANHSYA
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Promise
            </span>
          </h2>
          
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            We're revolutionizing migration services with unprecedented transparency, 
            security, and client protection. Here's our commitment to you.
          </p>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {trustBadges.map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: 0.4 + (index * 0.1),
                type: "spring",
                stiffness: 100 
              }}
            >
              <GlassCard className="text-center group hover:scale-105 transition-all duration-300">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl text-white group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300">
                    {badge.icon}
                  </div>
                </div>
                <h3 className="text-white font-bold text-sm mb-2">{badge.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{badge.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Promises */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {promises.map((promise, index) => (
            <motion.div
              key={promise.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2,
                type: "spring",
                stiffness: 100 
              }}
            >
              <GlassCard className="h-full group hover:scale-102 transition-all duration-300">
                {/* Promise Icon */}
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {promise.icon}
                  </div>
                </div>

                {/* Promise Content */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                    {promise.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    {promise.description}
                  </p>
                </div>

                {/* Guarantee Badge */}
                <div className="p-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-400/30 rounded-xl">
                  <div className="flex items-center space-x-2 text-green-300">
                    <FiShield className="w-4 h-4" />
                    <span className="text-sm font-medium">Guarantee:</span>
                  </div>
                  <p className="text-white text-sm mt-1">{promise.guarantee}</p>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* 2025 Goal Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mb-16"
        >
          <GlassCard className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.5 + (index * 0.1),
                    type: "spring",
                    stiffness: 100 
                  }}
                  className="text-center"
                >
                  <div className={`text-2xl md:text-3xl font-bold ${stat.color} mb-2`}>
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
            
            <div className="border-t border-white/10 pt-8">
              <h3 className="text-2xl font-bold text-white mb-4">Our 2025 Mission</h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                Enable <span className="text-green-400 font-semibold">10,000 safe, transparent migrations</span> through 
                our AI-powered platform, eliminating fraud and ensuring every client reaches their destination safely 
                and legally.
              </p>
            </div>
          </GlassCard>
        </motion.div>

        {/* Legal Compliance Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center space-x-4 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-2xl max-w-4xl mx-auto">
            <FiShield className="w-8 h-8 text-blue-400" />
            <div className="text-left">
              <h4 className="text-lg font-semibold text-white mb-2">
                ISO 27001 & GDPR Compliant Platform
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                No agent intermediaries. All data secure and encrypted. Every process is audited and compliant 
                with international standards. Your migration journey is protected at every step.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
