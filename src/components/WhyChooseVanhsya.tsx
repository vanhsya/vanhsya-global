"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiUserX, FiEye, FiRefreshCcw, FiHeadphones } from 'react-icons/fi';
import { FaRobot, FaHandshake } from 'react-icons/fa';
import GlassCard from './GlassCard';

interface WhyChooseFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string[];
  color: string;
}

export default function WhyChooseVanhsya() {
  const features: WhyChooseFeature[] = [
    {
      icon: <FaRobot className="w-8 h-8" />,
      title: "AI Scam Shield",
      description: "200+ AI fraud pattern detection algorithms protect every application",
      details: [
        "Real-time document verification",
        "Fake agency detection",
        "Fraudulent job offer alerts",
        "Embassy impersonation protection"
      ],
      color: "from-red-500 to-orange-500"
    },
    {
      icon: <FiUserX className="w-8 h-8" />,
      title: "Zero Agent Policy",
      description: "Only certified migration experts and licensed consultants handle your case",
      details: [
        "MARA/ICCRC certified consultants",
        "No intermediary agents",
        "Direct government liaisons",
        "Verified credentials only"
      ],
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: <FiEye className="w-8 h-8" />,
      title: "Total Transparency",
      description: "Live status tracking, payment milestones, and complete process visibility",
      details: [
        "Real-time case updates",
        "Payment milestone tracking",
        "Document status visibility",
        "Direct officer communication"
      ],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <FiRefreshCcw className="w-8 h-8" />,
      title: "Guaranteed Refund",
      description: "100% money-back guarantee if we fail - written in every contract",
      details: [
        "Legal contract guarantee",
        "No-questions-asked refund",
        "Performance-based fees",
        "Risk-free migration"
      ],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <FiHeadphones className="w-8 h-8" />,
      title: "24/7 Client Care",
      description: "Round-the-clock support via live chat, WhatsApp, and direct calls",
      details: [
        "24/7 live chat support",
        "WhatsApp direct line",
        "Emergency helpline",
        "Multilingual assistance"
      ],
      color: "from-amber-500 to-yellow-500"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5" />
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
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-500/20 border border-indigo-400/30 rounded-full text-indigo-300 text-sm font-medium mb-6">
            <FaHandshake className="w-4 h-4" />
            <span>The VANHSYA Difference</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
              Why Choose
            </span>
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              VANHSYA?
            </span>
          </h2>
          
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            We've revolutionized migration services by eliminating the problems that plague the industry. 
            Here's how we're different from traditional agencies and competitors.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2,
                type: "spring",
                stiffness: 100 
              }}
              className={index === 4 ? "md:col-span-2 lg:col-span-1 lg:col-start-2" : ""}
            >
              <GlassCard className="h-full group hover:scale-105 transition-all duration-300">
                {/* Feature Icon */}
                <div className="flex justify-center mb-6">
                  <div className={`p-4 bg-gradient-to-r ${feature.color} rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                </div>

                {/* Feature Content */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Feature Details */}
                <div className="space-y-3">
                  {feature.details.map((detail, detailIndex) => (
                    <motion.div
                      key={detail}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.4, 
                        delay: (index * 0.2) + (detailIndex * 0.1) + 0.5 
                      }}
                      className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10"
                    >
                      <div className={`w-2 h-2 bg-gradient-to-r ${feature.color} rounded-full`} />
                      <span className="text-gray-300 text-sm">{detail}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center space-x-4 p-6 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-400/20 rounded-2xl">
            <FiShield className="w-8 h-8 text-green-400" />
            <div className="text-left">
              <h4 className="text-lg font-semibold text-white">
                Protected by VANHSYA Guarantee
              </h4>
              <p className="text-gray-300 text-sm">
                Every client is protected by our comprehensive guarantee and insurance coverage
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
