"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiBriefcase, FiUsers, FiMapPin, FiSearch, FiArrowRight, FiGlobe, FiCheckCircle } from 'react-icons/fi';
import { FaHandshake } from 'react-icons/fa';
import GlassCard from './GlassCard';

interface EmployerStat {
  number: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

export default function EmployerConnectSection() {
  const [mounted, setMounted] = React.useState(false);
  const [networkElements, setNetworkElements] = React.useState<any[]>([]);

  React.useEffect(() => {
    setMounted(true);
    const elements = [...Array(15)].map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 4 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
    setNetworkElements(elements);
  }, []);

  const employerStats: EmployerStat[] = [
    {
      number: "500+",
      label: "Verified Employers",
      icon: <FiBriefcase className="w-5 h-5" />,
      color: "text-blue-400"
    },
    {
      number: "2,000+",
      label: "Active Job Listings",
      icon: <FiUsers className="w-5 h-5" />,
      color: "text-green-400"
    },
    {
      number: "45+",
      label: "Countries",
      icon: <FiGlobe className="w-5 h-5" />,
      color: "text-purple-400"
    },
    {
      number: "95%",
      label: "Visa Sponsorship Rate",
      icon: <FiCheckCircle className="w-5 h-5" />,
      color: "text-amber-400"
    }
  ];

  const features = [
    {
      title: "AI-Screened Candidates",
      description: "Access pre-vetted talent with verified skills and migration readiness"
    },
    {
      title: "Global Talent Pool",
      description: "Connect with skilled professionals from 45+ countries worldwide"
    },
    {
      title: "Visa Support Included",
      description: "We handle the entire visa sponsorship process for your selected candidates"
    },
    {
      title: "Compliance Guaranteed",
      description: "Full legal compliance with local employment and immigration laws"
    }
  ];

  const sampleJobs = [
    {
      title: "Senior Software Engineer",
      company: "TechCorp Canada",
      location: "Toronto, Canada",
      salary: "CAD 95,000 - 120,000",
      skills: ["React", "Node.js", "Python"]
    },
    {
      title: "Data Scientist",
      company: "Innovate Australia",
      location: "Sydney, Australia", 
      salary: "AUD 110,000 - 140,000",
      skills: ["Python", "ML", "SQL"]
    },
    {
      title: "UX Designer",
      company: "Design Studios UK",
      location: "London, UK",
      salary: "£50,000 - 75,000",
      skills: ["Figma", "Adobe", "User Research"]
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5" />
        {/* Professional Network Pattern */}
        <div className="absolute inset-0 opacity-10">
          {mounted && networkElements.map((el, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full"
              style={{
                left: el.left,
                top: el.top,
              }}
              animate={{
                scale: [1, 2, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: el.duration,
                repeat: Infinity,
                delay: el.delay,
              }}
            />
          ))}
          {/* Connection Lines */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`line-${i}`}
              className="absolute h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 25}%`,
                width: '15%',
                transform: `rotate(${i * 15}deg)`,
              }}
              animate={{
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
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
            <FaHandshake className="w-4 h-4" />
            <span>For Hiring Partners</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
              Employer
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Connect
            </span>
          </h2>
          
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Find the world's most verified, AI-screened migration candidates. 
            Access top talent with guaranteed visa sponsorship support.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {employerStats.map((stat, index) => (
            <motion.div
              key={stat.label}
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
                  <div className={`p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl text-white group-hover:from-indigo-500 group-hover:to-purple-500 transition-all duration-300`}>
                    {stat.icon}
                  </div>
                </div>
                <div className={`text-2xl md:text-3xl font-bold ${stat.color} mb-2`}>
                  {stat.number}
                </div>
                <div className="text-gray-300 text-sm font-medium">
                  {stat.label}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link 
            href="/contact"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-2xl text-white font-bold text-lg shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105"
          >
            <FiBriefcase className="w-5 h-5" />
            <span>Hire Verified Talent</span>
            <FiArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Why Choose VANHSYA for Hiring?
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Access the most reliable pool of migration-ready candidates, 
                all pre-screened with AI verification and expert validation.
              </p>
            </div>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start space-x-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg text-white mt-1">
                    <FiCheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">{feature.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Job Listings Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <GlassCard className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Browse by Skill/Location/Visa</h3>
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <FiSearch className="w-5 h-5 text-blue-400" />
                </div>
              </div>

              <div className="space-y-4">
                {sampleJobs.map((job, index) => (
                  <motion.div
                    key={job.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-white font-medium group-hover:text-blue-300 transition-colors">
                          {job.title}
                        </h4>
                        <p className="text-blue-400 text-sm">{job.company}</p>
                      </div>
                      <div className="px-2 py-1 bg-green-500/20 border border-green-400/30 rounded-full text-green-300 text-xs">
                        Visa Support
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-gray-400 text-sm mb-3">
                      <FiMapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill) => (
                          <span 
                            key={skill}
                            className="px-2 py-1 bg-indigo-500/20 text-indigo-300 text-xs rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <span className="text-white font-mono text-sm">{job.salary}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center pt-4 border-t border-white/10">
                <p className="text-gray-400 text-sm">
                  <span className="text-white font-semibold">2,000+</span> more positions available
                </p>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <GlassCard className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="text-left">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Ready to Find Top Talent?
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Join 500+ verified employers who trust VANHSYA to connect them 
                  with the world's best migration candidates.
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center space-x-2">
                    <FiCheckCircle className="w-4 h-4 text-green-400" />
                    <span>No placement fees until successful hire</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <FiCheckCircle className="w-4 h-4 text-green-400" />
                    <span>Visa sponsorship guidance included</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <FiCheckCircle className="w-4 h-4 text-green-400" />
                    <span>30-day replacement guarantee</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/employers"
                    className="flex items-center justify-center space-x-3 w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-2xl text-white font-semibold text-lg shadow-2xl shadow-blue-500/25 transition-all duration-300"
                  >
                    <FiBriefcase className="w-5 h-5" />
                    <span>For Employers</span>
                    <FiArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>

                <p className="text-gray-400 text-sm text-center">
                  Start hiring verified candidates today
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
