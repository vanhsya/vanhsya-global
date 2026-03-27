"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiPlay, FiTrendingUp, FiX } from 'react-icons/fi';
import { FaRobot, FaLaptopCode, FaPalette, FaLeaf } from 'react-icons/fa';
import type { IconType } from 'react-icons';

const TrendCard = ({ 
  title, 
  subtitle, 
  icon: Icon, 
  color, 
  image,
  delay,
  onClick 
}: { 
  title: string, 
  subtitle: string, 
  icon: IconType, 
  color: string, 
  image: string,
  delay: number,
  onClick: () => void
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    whileHover={{ scale: 1.05 }}
    className="relative group cursor-pointer h-96 rounded-2xl overflow-hidden border border-white/10 shadow-2xl transition-all duration-500"
    onClick={onClick}
  >
    {/* Background Image */}
    <div className="absolute inset-0">
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-40 group-hover:opacity-30 transition-all duration-500`} />
      <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-all duration-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />
    </div>
    
    {/* Animated Particles/Overlay */}
    <motion.div 
      className="absolute inset-0 opacity-20 pointer-events-none"
      animate={{ 
        backgroundPosition: ['0% 0%', '100% 100%'],
        opacity: [0.1, 0.3, 0.1] 
      }}
      transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }}
    />

    {/* Content */}
    <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
      <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
        <FiPlay className="w-5 h-5 text-white fill-current" />
      </div>
      
      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-blue-500/80 backdrop-blur-sm rounded-full text-[10px] font-bold text-white mb-4 uppercase tracking-widest border border-blue-400/50">
          <Icon className="w-3 h-3" />
          <span>Trending Now</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-black text-white mb-3 leading-tight group-hover:text-blue-200 transition-colors">
          {title}
        </h3>
        <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 line-clamp-2">
          {subtitle}
        </p>
      </div>
    </div>
  </motion.div>
);

export default function MigrationTrendsVideoSection() {
  const [selectedTrend, setSelectedTrend] = useState<number | null>(null);

  const trends = [
    {
      id: 1,
      title: "The AI Nomad Visa",
      subtitle: "Specialized pathways for AI researchers and developers in Canada & UK. Fast-track your career in global tech hubs.",
      icon: FaRobot,
      color: "from-blue-600 to-cyan-600",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
      videoUrl: "#"
    },
    {
      id: 2,
      title: "Green Tech Founders",
      subtitle: "Exclusive startup visas for sustainable technology entrepreneurs. Get funded and settled in Europe's greenest cities.",
      icon: FaLeaf,
      color: "from-green-600 to-emerald-600",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800",
      videoUrl: "#"
    },
    {
      id: 3,
      title: "Digital Creator Access",
      subtitle: "New visa categories for YouTubers, influencers, and digital artists. Turn your content creation into global residency.",
      icon: FaPalette,
      color: "from-purple-600 to-pink-600",
      image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800",
      videoUrl: "#"
    },
    {
      id: 4,
      title: "Quantum Leap Program",
      subtitle: "High-priority processing for STEM experts in Quantum Computing and Biotech. The fastest route to permanent residency.",
      icon: FaLaptopCode,
      color: "from-indigo-600 to-violet-600",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800",
      videoUrl: "#"
    }
  ];

  return (
    <section id="trends-video-section" className="py-24 relative overflow-hidden bg-slate-950">
      {/* Ambient Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="flex items-center space-x-2 text-blue-400 font-medium mb-4">
              <FiTrendingUp className="w-5 h-5" />
              <span>Future of Migration</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Unique Pathways</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Explore specialized migration opportunities designed for the modern world. 
              Watch our deep-dive guides on these emerging visa categories.
            </p>
          </motion.div>

          <Link
            href="/blog"
            className="hidden md:flex items-center space-x-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/10 transition-colors mt-6 md:mt-0"
          >
            <FiPlay className="w-4 h-4" />
            <span>View All Guides</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trends.map((trend, index) => (
            <TrendCard
              key={trend.id}
              {...trend}
              delay={index * 0.1}
              onClick={() => setSelectedTrend(trend.id)}
            />
          ))}
        </div>
      </div>

      {/* Video Modal (Simulated) */}
      <AnimatePresence>
        {selectedTrend && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedTrend(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 rounded-2xl overflow-hidden w-full max-w-4xl border border-white/10 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-video bg-slate-800 relative flex items-center justify-center group">
                {/* Simulated Video Player UI */}
                <div className={`absolute inset-0 bg-gradient-to-br ${trends.find(t => t.id === selectedTrend)?.color} opacity-20`} />
                <button 
                  className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 z-10"
                  aria-label="Play video"
                >
                  <FiPlay className="w-8 h-8 text-white ml-1" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="h-1 bg-white/20 rounded-full mb-4 overflow-hidden">
                    <div className="h-full w-1/3 bg-blue-500 rounded-full" />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-white font-medium">
                      Inside: {trends.find(t => t.id === selectedTrend)?.title}
                    </div>
                    <div className="text-white/60 text-sm">02:14 / 08:45</div>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {trends.find(t => t.id === selectedTrend)?.title}
                    </h3>
                    <p className="text-gray-400">
                      {trends.find(t => t.id === selectedTrend)?.subtitle}
                    </p>
                  </div>
                  <button 
                    onClick={() => setSelectedTrend(null)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
                    aria-label="Close modal"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                </div>
                <div className="flex gap-4 mt-6">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition-colors">
                    Check Eligibility
                  </button>
                  <button className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-medium transition-colors">
                    Download Guide
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
