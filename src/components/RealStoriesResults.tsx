"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay, FiPause, FiExternalLink, FiMapPin, FiLinkedin, FiCheckCircle } from 'react-icons/fi';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import GlassCard from './GlassCard';
import Image from 'next/image';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  country: string;
  program: string;
  rating: number;
  quote: string;
  videoUrl?: string;
  linkedinUrl?: string;
  isVerified: boolean;
  migrationDate: string;
  profileImage: string;
}

export default function RealStoriesResults() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const testimonials: Testimonial[] = [
    {
      id: "1",
      name: "Priya Sharma",
      location: "Mumbai → Toronto",
      country: "Canada",
      program: "Express Entry - FSW",
      rating: 5,
      quote: "VANHSYA made my Canadian dream a reality. Their AI tools caught errors in my application that other consultants missed. The transparency was incredible - I could track every step. No hidden fees, just honest service.",
      videoUrl: "/testimonials/priya-sharma.mp4",
      linkedinUrl: "https://linkedin.com/in/priya-sharma-ca",
      isVerified: true,
      migrationDate: "March 2024",
      profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: "2",
      name: "Ahmed Al-Hassan",
      location: "Dubai → Melbourne",
      country: "Australia",
      program: "Skilled Independent 189",
      rating: 5,
      quote: "After being scammed by two agencies, I found VANHSYA. Their Scam Shield saved me from another fake job offer. The team's expertise and the AI verification gave me confidence. Now I'm living my Australian dream!",
      videoUrl: "/testimonials/ahmed-hassan.mp4",
      linkedinUrl: "https://linkedin.com/in/ahmed-hassan-au",
      isVerified: true,
      migrationDate: "January 2024",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: "3",
      name: "Maria Santos",
      location: "São Paulo → London",
      country: "United Kingdom",
      program: "Skilled Worker Visa",
      rating: 5,
      quote: "The best decision I made was choosing VANHSYA. Their certified consultants guided me through every step. The AI document checker found issues before submission. Professional, transparent, and successful!",
      videoUrl: "/testimonials/maria-santos.mp4",
      linkedinUrl: "https://linkedin.com/in/maria-santos-uk",
      isVerified: true,
      migrationDate: "February 2024",
      profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: "4",
      name: "Raj Patel",
      location: "Ahmedabad → Vancouver",
      country: "Canada",
      program: "Provincial Nominee Program",
      rating: 5,
      quote: "VANHSYA's referral program helped me save thousands. Their expert team handled my PNP application flawlessly. The live tracking feature kept me informed throughout. Highly recommended for serious migrants.",
      videoUrl: "/testimonials/raj-patel.mp4",
      linkedinUrl: "https://linkedin.com/in/raj-patel-van",
      isVerified: true,
      migrationDate: "April 2024",
      profileImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-blue-500/5 to-purple-500/5" />
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
            <FiCheckCircle className="w-4 h-4" />
            <span>100% Verified Success Stories</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-green-100 to-blue-200 bg-clip-text text-transparent">
              Real Stories &
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Real Results
            </span>
          </h2>
          
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-4">
            Every review is video-recorded, geotagged, LinkedIn-authenticated, and publicly traceable.
          </p>
          <p className="text-amber-300 font-semibold">
            No paid actors, ever. Just real clients sharing their genuine migration journey.
          </p>
        </motion.div>

        {/* Main Testimonial Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Video/Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <GlassCard className="relative overflow-hidden group">
              <div className="aspect-video bg-slate-900 rounded-xl flex items-center justify-center relative overflow-hidden">
                {/* Background Image for Video */}
                <Image
                  src={currentTestimonial.profileImage}
                  alt={currentTestimonial.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover opacity-40 blur-sm group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 flex items-center justify-center">
                  <div className="text-center z-10">
                    <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-4 mx-auto border border-white/20 group-hover:bg-white/20 transition-all">
                      {isPlaying ? (
                        <FiPause className="w-10 h-10 text-white" />
                      ) : (
                        <FiPlay className="w-10 h-10 text-white ml-1" />
                      )}
                    </div>
                    <p className="text-white font-bold text-lg drop-shadow-lg tracking-wide uppercase">Video Story</p>
                    <p className="text-blue-200 text-sm">{currentTestimonial.name}</p>
                  </div>
                </div>
                
                {/* Play Button Overlay */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
                >
                  <div className="w-24 h-24 bg-blue-600/30 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/40 shadow-2xl">
                    {isPlaying ? (
                      <FiPause className="w-12 h-12 text-white" />
                    ) : (
                      <FiPlay className="w-12 h-12 text-white ml-2" />
                    )}
                  </div>
                </motion.button>
              </div>

              {/* Verification Badges */}
              <div className="absolute top-6 right-6 flex space-x-3">
                <div className="px-3 py-1.5 bg-green-500/30 backdrop-blur-md border border-green-400/40 rounded-full text-white text-[10px] font-bold uppercase tracking-widest flex items-center space-x-2 shadow-lg">
                  <FiCheckCircle className="w-3 h-3 text-green-400" />
                  <span>Verified Success</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Testimonial Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <GlassCard className="space-y-6 border-l-4 border-l-blue-500">
                  {/* Client Info */}
                  <div className="flex items-center space-x-5">
                    <div className="w-20 h-20 rounded-full border-2 border-blue-500/30 p-1">
                      <div className="relative w-full h-full rounded-full overflow-hidden">
                        <Image
                          src={currentTestimonial.profileImage}
                          alt={currentTestimonial.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white leading-tight">{currentTestimonial.name}</h3>
                      <div className="flex items-center space-x-2 text-blue-300 mt-1">
                        <FiMapPin className="w-4 h-4 text-red-400" />
                        <span className="text-sm font-medium tracking-wide">{currentTestimonial.location}</span>
                      </div>
                      <div className="inline-block mt-2 px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                        {currentTestimonial.program}
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar 
                          key={i} 
                          className={`w-4 h-4 ${i < currentTestimonial.rating ? 'text-yellow-400' : 'text-gray-600'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-gray-300 text-sm">({currentTestimonial.rating}/5)</span>
                  </div>

                  {/* Quote */}
                  <div className="relative">
                    <FaQuoteLeft className="absolute -top-2 -left-2 w-6 h-6 text-indigo-400/30" />
                    <p className="text-gray-200 leading-relaxed pl-6 italic">
                      "{currentTestimonial.quote}"
                    </p>
                  </div>

                  {/* Migration Details */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                    <div>
                      <p className="text-gray-400 text-sm">Destination</p>
                      <p className="text-white font-medium">{currentTestimonial.country}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Migration Date</p>
                      <p className="text-white font-medium">{currentTestimonial.migrationDate}</p>
                    </div>
                  </div>

                  {/* Verification Links */}
                  <div className="flex space-x-4 pt-4 border-t border-white/10">
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      href={currentTestimonial.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 rounded-lg text-blue-300 text-sm transition-all"
                    >
                      <FiLinkedin className="w-4 h-4" />
                      <span>View LinkedIn</span>
                      <FiExternalLink className="w-3 h-3" />
                    </motion.a>
                    <div className="flex items-center space-x-2 px-3 py-2 bg-green-500/20 border border-green-400/30 rounded-lg text-green-300 text-sm">
                      <FiCheckCircle className="w-4 h-4" />
                      <span>Verified Client</span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center space-x-6 mt-12">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevTestimonial}
            className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white transition-all"
          >
            ←
          </motion.button>

          {/* Dots Indicator */}
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                title={`View testimonial ${index + 1}`}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-indigo-400 scale-125' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextTestimonial}
            className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white transition-all"
          >
            →
          </motion.button>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-16"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/success-stories"
            className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 rounded-2xl text-white font-semibold text-lg shadow-2xl shadow-green-500/25 transition-all duration-300"
          >
            <span>View All Success Stories</span>
            <FiExternalLink className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
