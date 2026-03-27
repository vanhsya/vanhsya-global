'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Globe, Star, Award } from 'lucide-react';
import Link from 'next/link';
import { GlassStatCard } from './GlassCard';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-600 via-blue-600 to-pink-500 animate-gradient">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-xl"
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-96 h-96 bg-pink-400/20 rounded-full blur-xl"
          animate={{ 
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 w-64 h-64 bg-cyan-400/15 rounded-full blur-xl"
          animate={{ 
            x: [0, 50, 0],
            y: [0, -40, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
      </div>

      {/* Main Content */}
      <div className="container-max relative z-10">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white font-medium text-sm">
              <Star className="w-4 h-4 text-yellow-300" fill="currentColor" />
              #1 Global Migration Platform
              <Award className="w-4 h-4 text-yellow-300" />
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="heading-xl text-white mb-6 text-shadow"
          >
            Your Gateway to{' '}
            <span className="text-gradient-cyan block">Global Migration</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Expert immigration services with 99% success rate. From visa consultation 
            to settlement support - we make your migration journey seamless and stress-free.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link 
              href="/consultation" 
              className="btn-primary group"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link 
              href="/services" 
              className="btn-secondary"
            >
              <Globe className="w-5 h-5" />
              Explore Services
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            <GlassStatCard>
              <div className="stats-number">15K+</div>
              <div className="stats-label">Successful Cases</div>
            </GlassStatCard>
            
            <GlassStatCard>
              <div className="stats-number">50+</div>
              <div className="stats-label">Countries</div>
            </GlassStatCard>
            
            <GlassStatCard>
              <div className="stats-number">99%</div>
              <div className="stats-label">Success Rate</div>
            </GlassStatCard>
            
            <GlassStatCard>
              <div className="stats-number">24/7</div>
              <div className="stats-label">Support</div>
            </GlassStatCard>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-white rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
