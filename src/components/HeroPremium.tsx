"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight, FiPlay, FiCheck, FiStar, FiGlobe, FiShield } from 'react-icons/fi';
import { FaRocket } from 'react-icons/fa';
import GlassCard from './GlassCard';
import BrandLogo from '@/components/BrandLogo';

export default function HeroPremium() {
  const [mounted, setMounted] = React.useState(false);
  const [backgroundElements, setBackgroundElements] = React.useState<any[]>([]);

  React.useEffect(() => {
    setMounted(true);
    const elements = [...Array(50)].map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
    setBackgroundElements(elements);
  }, []);

  const stats = [
    { number: "15,000+", label: "Clients Migrated", icon: <FiGlobe className="w-5 h-5" /> },
    { number: "99%", label: "Approval Rate", icon: <FiCheck className="w-5 h-5" /> },
    { number: "50+", label: "Countries", icon: <FiStar className="w-5 h-5" /> },
    { number: "24/7", label: "Support", icon: <FiShield className="w-5 h-5" /> }
  ];

  const features = [
    "AI-Verified Pathways",
    "Immersive Experience", 
    "Creator & Tech Visas",
    "Zero-Risk Guarantee"
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Cosmic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {mounted && backgroundElements.map((el, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: el.left,
                top: el.top,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: el.duration,
                repeat: Infinity,
                delay: el.delay,
              }}
            />
          ))}
        </div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <BrandLogo
            href="/"
            lockup="stacked"
            priority
            enableParallax
            experimentKey="logoHero.v1"
            className="mx-auto"
          />
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-green-500/20 border border-green-400/30 rounded-full text-green-300 text-sm font-medium mb-8"
        >
          <FiShield className="w-4 h-4" />
          <span>#1 Trusted AI-Powered Migration Platform</span>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
            The Future of
          </span>
          <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Global Mobility
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center items-center gap-4 mb-8"
        >
          {features.map((feature) => (
            <div key={feature} className="flex items-center space-x-2 text-green-300">
              <FiCheck className="w-4 h-4" />
              <span className="text-sm font-medium">{feature}</span>
            </div>
          ))}
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed"
        >
          VANHSYA Global Migration is the world's most transparent, secure, and trusted migration platform. 
          From eligibility check to settlement—every step is handled by certified experts and next-gen AI. 
          <span className="text-white font-semibold"> No fake promises, no hidden fees, no agent shortcuts.</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
        >
          {/* Primary CTA */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/ai-tools/eligibility"
              className="group flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 rounded-2xl text-white font-semibold text-lg shadow-2xl shadow-purple-500/25 transition-all duration-300"
            >
              <FaRocket className="w-5 h-5 group-hover:animate-pulse" />
              <span>Start Your Journey</span>
              <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Secondary CTA */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="#trends-video-section"
              className="group flex items-center space-x-3 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-2xl text-white font-semibold text-lg transition-all duration-300"
            >
              <FiPlay className="w-5 h-5" />
              <span>Watch Experience</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Animated Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: 1.2 + (index * 0.1),
                type: "spring",
                stiffness: 100
              }}
            >
              <GlassCard className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl text-white group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-300">
                    {stat.icon}
                  </div>
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 + (index * 0.1) }}
                  className="text-2xl md:text-3xl font-bold text-white mb-2"
                >
                  {stat.number}
                </motion.div>
                <div className="text-gray-300 text-sm font-medium">
                  {stat.label}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="mt-16 flex flex-wrap justify-center items-center gap-8 text-gray-400 text-sm"
        >
          <div className="flex items-center space-x-2">
            <FiShield className="w-4 h-4 text-green-400" />
            <span>ISO 27001 Certified</span>
          </div>
          <div className="flex items-center space-x-2">
            <FiCheck className="w-4 h-4 text-green-400" />
            <span>GDPR Compliant</span>
          </div>
          <div className="flex items-center space-x-2">
            <FiStar className="w-4 h-4 text-yellow-400" />
            <span>4.9/5 Client Rating</span>
          </div>
          <div className="flex items-center space-x-2">
            <FiGlobe className="w-4 h-4 text-blue-400" />
            <span>Global Recognition</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
