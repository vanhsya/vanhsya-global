'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaRobot, 
  FaChartLine, 
  FaFileAlt, 
  FaGift,
  FaUsers,
  FaBrain,
  FaLightbulb,
  FaGlobe,
  FaArrowRight
} from 'react-icons/fa';
import Link from 'next/link';

const AIFeaturesDashboard = () => {
  const features = [
    {
      icon: FaFileAlt,
      title: 'AI CV Builder',
      description: 'Create professional CVs with AI-powered templates',
      users: '1,000+',
      growth: '+25%',
      link: '/ai-innovations',
      color: 'from-blue-500 to-purple-600'
    },
    {
      icon: FaUsers,
      title: 'Referral System',
      description: 'Smart networking with reward mechanisms',
      users: '500+',
      growth: '+40%',
      link: '/ai-innovations',
      color: 'from-green-500 to-blue-600'
    },
    {
      icon: FaGift,
      title: 'Lucky Draw',
      description: 'Monthly prizes and innovation rewards',
      users: '2,000+',
      growth: '+60%',
      link: '/ai-innovations',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: FaBrain,
      title: 'AI Analytics',
      description: 'Smart insights and data intelligence',
      users: '750+',
      growth: '+35%',
      link: '/ai-tools',
      color: 'from-orange-500 to-red-600'
    }
  ];

  const stats = [
    { label: 'Active Users', value: '4,250+', icon: FaUsers },
    { label: 'AI Innovations', value: '12+', icon: FaLightbulb },
    { label: 'Success Rate', value: '100%', icon: FaChartLine },
    { label: 'Countries', value: '50+', icon: FaGlobe }
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white">
      <div className="container-max">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <FaRobot className="text-4xl text-blue-400 mr-3" />
            <h2 className="text-4xl font-bold">AI Innovation Dashboard</h2>
          </div>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Real-time insights into our AI-powered platform performance and user engagement
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 text-center border border-white border-opacity-20"
            >
              <stat.icon className="text-3xl text-blue-400 mx-auto mb-3" />
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-blue-200 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link href={feature.link}>
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 cursor-pointer h-full">
                  <div className={`w-14 h-14 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="text-2xl text-white" />
                  </div>
                  
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-blue-200 text-sm mb-4">{feature.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-lg font-semibold">{feature.users}</div>
                      <div className="text-xs text-blue-300">Active Users</div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-semibold">{feature.growth}</div>
                      <div className="text-xs text-blue-300">Growth</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center text-blue-400 text-sm group-hover:text-white transition-colors">
                    <span>Explore</span>
                    <FaArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/ai-innovations"
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105"
          >
            <FaRobot className="mr-2" />
            Explore All AI Features
            <FaArrowRight className="ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default AIFeaturesDashboard;
