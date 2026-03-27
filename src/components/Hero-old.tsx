'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGlobe, FaPassport, FaUsers, FaStar, FaArrowRight, FaPlay, FaGraduationCap, FaHome } from 'react-icons/fa';
import { GiAirplane } from 'react-icons/gi';
import { MdBusinessCenter } from 'react-icons/md';

interface HeroProps {
  onGetStarted?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const stats = [
    { icon: FaUsers, value: '50K+', label: 'Happy Clients' },
    { icon: FaGlobe, value: '100+', label: 'Countries' },
    { icon: FaPassport, value: '98%', label: 'Success Rate' },
    { icon: FaStar, value: '4.9', label: 'Rating' },
  ];

  const visaTypes = [
    { icon: GiAirplane, name: 'Tourist Visa', color: 'text-blue-500' },
    { icon: MdBusinessCenter, name: 'Work Visa', color: 'text-green-500' },
    { icon: FaGraduationCap, name: 'Study Visa', color: 'text-purple-500' },
    { icon: FaHome, name: 'Family Visa', color: 'text-pink-500' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-yellow-600"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-20 w-32 h-32 border-2 border-white/30 rounded-full animate-glow"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-20 w-24 h-24 border-2 border-yellow-300/40 rounded-full"
        />
        <motion.div
          animate={{ y: [-30, 30, -30] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/4 w-16 h-16 bg-white/10 rounded-full blur-sm"
        />
        <motion.div
          animate={{ y: [30, -30, 30] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/3 left-1/4 w-20 h-20 bg-yellow-400/10 rounded-full blur-sm"
        />
      </div>

      <div className="relative z-10 container-max section-padding text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Main Heading */}
          <motion.h1 
            className="heading-xl mb-6 text-shadow"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Your Gateway to
            <span className="block gradient-text text-white">
              Global Opportunities
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Navigate the complex world of immigration with VANHSYA. From visa applications to permanent residency, we make your journey seamless and successful.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button 
              onClick={onGetStarted}
              className="btn-secondary group inline-flex items-center justify-center gap-2 text-lg px-8 py-4"
            >
              Start Your Journey
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button 
              onClick={() => setIsVideoModalOpen(true)}
              className="btn-outline bg-white/10 border-white/30 text-white hover:bg-white hover:text-blue-600 group inline-flex items-center justify-center gap-2 text-lg px-8 py-4"
            >
              <FaPlay className="group-hover:scale-110 transition-transform" />
              Watch Demo
            </button>
          </motion.div>

          {/* Visa Types */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {visaTypes.map((visa, index) => (
              <motion.div
                key={visa.name}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <visa.icon className={`text-3xl ${visa.color} mx-auto mb-2`} />
                <p className="text-sm font-medium">{visa.name}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0 + index * 0.1 }}
              >
                <stat.icon className="text-3xl text-amber-300 mx-auto mb-2" />
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-blue-200 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 hidden lg:block"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <FaPassport className="text-6xl text-white/20" />
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-10 hidden lg:block"
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <FaGlobe className="text-8xl text-amber-300/20" />
      </motion.div>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="bg-white rounded-xl p-6 max-w-4xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-600">Demo video would play here</p>
            </div>
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="mt-4 btn-primary"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Hero;
