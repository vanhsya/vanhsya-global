'use client';

import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  FaGraduationCap, 
  FaUsers, 
  FaGlobe, 
  FaAward,
  FaHandshake,
  FaShieldAlt,
  FaChartLine,
  FaCertificate,
  FaLinkedin,
  FaLeaf
} from 'react-icons/fa';
import { FiCpu, FiDroplet, FiMapPin, FiX } from 'react-icons/fi';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import WorldMapVisualization from '@/components/WorldMapVisualization';
import GlassCard from '@/components/GlassCard';
import Link from 'next/link';

const teamMembers = [
  {
    name: 'Alex Thompson',
    role: 'Chief Technology Officer & AI Specialist',
    credentials: 'PhD AI, Certified Ethical AI',
    experience: '15+ years',
    specialization: 'Machine Learning, Natural Language Processing',
    education: 'PhD Computer Science, Stanford University',
    image: '/images/originallogo.png',
    linkedin: '#',
    bio: 'Alex leads our AI innovation initiatives and ensures all our technology solutions meet the highest standards of transparency and ethical AI practices.'
  },
  {
    name: 'Dr. Maria Rodriguez',
    role: 'Head of Innovation & Product Development',
    credentials: 'PhD Data Science, Innovation Leadership',
    experience: '12+ years',
    specialization: 'AI Product Development, User Experience',
    education: 'PhD Data Science, MIT',
    image: '/images/originallogo.png',
    linkedin: '#',
    bio: 'Maria drives our product innovation strategy and oversees the development of cutting-edge AI tools that empower users worldwide.'
  },
  {
    name: 'David Kim',
    role: 'Senior AI Engineer & Ethics Advisor',
    credentials: 'MSc AI Ethics, Certified Tech Ethics',
    experience: '10+ years',
    specialization: 'Ethical AI Development, Transparency Systems',
    education: 'MSc AI Ethics, Oxford University',
    image: '/images/originallogo.png',
    linkedin: '#',
    bio: 'David ensures all our AI systems operate with complete transparency and ethical guidelines, building trust through responsible technology development.'
  },
  {
    name: 'Sarah Chen',
    role: 'AI Research Scientist & Innovation Lead',
    credentials: 'PhD Machine Learning, AI Innovation',
    experience: '8+ years',
    specialization: 'Advanced AI Algorithms, Innovation Research',
    education: 'PhD Machine Learning, Carnegie Mellon',
    image: '/images/originallogo.png',
    linkedin: '#',
    bio: 'Sarah leads our advanced AI research initiatives and develops breakthrough algorithms that power our next-generation innovation platform.'
  }
];

const certifications = [
  {
    name: 'Transparency International',
    acronym: 'TI',
    number: 'TI-2024-001',
    logo: '/images/og-default.jpg',
    description: 'Committed to transparent and ethical AI innovations'
  },
  {
    name: 'Global AI Ethics Council',
    acronym: 'GAIEC',
    number: 'GAIEC-2024-001',
    logo: '/images/og-default.jpg',
    description: 'Verified ethical AI practices and user protection'
  },
  {
    name: 'Innovation Excellence Award',
    acronym: 'IEA',
    number: 'IEA-2024-001',
    logo: '/images/og-default.jpg',
    description: 'Recognized for cutting-edge AI technology solutions'
  }
];

const milestones = [
  { year: '2015', event: 'VANHSYA Innovation Lab founded' },
  { year: '2017', event: 'Launched first AI-powered tools' },
  { year: '2019', event: 'Achieved transparency and ethics certifications' },
  { year: '2021', event: 'Released advanced AI document wizard' },
  { year: '2023', event: 'Expanded to 50+ countries worldwide' },
  { year: '2024', event: 'Launched comprehensive AI innovations platform' }
];

const stats = [
  { number: '0', label: 'Cases Completed', icon: FaUsers },
  { number: '100%', label: 'Transparency', icon: FaChartLine },
  { number: '50+', label: 'Countries Network', icon: FaGlobe },
  { number: '9+', label: 'Years Innovation', icon: FaAward }
];

export default function AboutPage() {
  const projects = useMemo(
    () => [
      {
        id: 'migration',
        title: 'Vanhsya Global Migration',
        icon: FaGlobe,
        focus: 'End-to-end relocation, Golden Visas, and corporate migration.',
        integration: 'AI-powered eligibility, document automation, and scam-resistant workflows.',
        detail:
          'The flagship platform that connects assessment, documents, guidance, and support into one transparent journey.'
      },
      {
        id: 'yno',
        title: 'YNO Coin & Blockchain',
        icon: FiCpu,
        focus: 'Blockchain rails for global migration payments and asset transfer.',
        integration: 'High-performance networks for borderless value flows and settlement readiness.',
        detail:
          'A next-era finance layer designed to support compliant settlement flows and cross-border transfers.'
      },
      {
        id: 'beauty',
        title: 'Vanhsya Beauty & Natural',
        icon: FaLeaf,
        focus: 'Premium, eco-conscious lifestyle products aligned with sustainability.',
        integration: 'Quality-first supply chain and brand experience rooted in trust.',
        detail:
          'A lifestyle arm that reflects the group’s commitment to quality, design, and responsible sourcing.'
      },
      {
        id: 'tours',
        title: 'Vanhsya Tours & Adventure',
        icon: FiMapPin,
        focus: 'Luxury travel experiences and destination scouting for relocation clients.',
        integration: 'Destination discovery paired with relocation planning.',
        detail:
          'A premium experience layer that helps clients evaluate destinations beyond paperwork.'
      },
      {
        id: 'carwash',
        title: 'Eco-Friendly Waterless Car Wash (UAE)',
        icon: FiDroplet,
        focus: 'Technology-led luxury car care while conserving water.',
        integration: 'Sustainability-first operations designed for UAE environments.',
        detail:
          'A UAE-based sustainability venture aligned with premium service delivery and environmental efficiency.'
      },
      {
        id: 'ai-rd',
        title: 'AI R&D and Intellectual Property',
        icon: FaAward,
        focus: 'Research and development in AI SDKs and web3 integration.',
        integration: 'Concierge workflows, document intelligence, and next-gen automation.',
        detail:
          'The technical core that powers the concierge, eligibility, documents, and future-ready platform modules.'
      }
    ],
    []
  );

  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const activeProject = projects.find((p) => p.id === activeProjectId) || null;

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About The VANHSYA Group
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              A borderless ecosystem where technology, luxury, and opportunity converge — built for the next era of global mobility.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-lg mb-6">The Vision</h2>
              <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-100">
                <p className="text-lg text-gray-800 leading-relaxed font-semibold">
                  “To redefine global mobility by building a borderless ecosystem where technology, luxury, and opportunity converge, empowering every individual to find their place in the next era of human civilization.”
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-xl"
            >
              <h2 className="heading-lg mb-6">The Mission</h2>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <FaHandshake className="text-2xl text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Innovation</h3>
                    <p className="text-gray-700">
                      Integrating AI-driven solutions to simplify complex migration and business legalities.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <FaAward className="text-2xl text-purple-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Excellence</h3>
                    <p className="text-gray-700">
                      Providing an ultra-luxury, black-card experience for high-net-worth individuals and global entrepreneurs.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <FaShieldAlt className="text-2xl text-green-700 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Integrity</h3>
                    <p className="text-gray-700">
                      Building a transparent, secure, and decentralized future for global asset management and relocation.
                    </p>
                  </div>
                </div>
                <div className="pt-4">
                  <Link
                    href="/next-era"
                    className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
                  >
                    Explore the Next Era
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Group Portfolio */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-lg mb-4">The VANHSYA Group Portfolio</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Modular ecosystem pillars designed to scale globally — from migration to AI R&D and next-era finance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, idx) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
              >
                <div className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-shadow overflow-hidden h-full flex flex-col">
                  <div className="p-6 flex-1">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center mb-4">
                      <p.icon className="text-xl" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{p.title}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed mb-3">{p.focus}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      <span className="font-semibold text-gray-800">Key integration:</span> {p.integration}
                    </p>
                  </div>
                  <div className="px-6 pb-6">
                    <button
                      type="button"
                      onClick={() => setActiveProjectId(p.id)}
                      className="w-full py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-black transition-colors"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60]"
          >
            <button
              type="button"
              onClick={() => setActiveProjectId(null)}
              className="absolute inset-0 bg-black/50"
              aria-label="Close project panel"
            />
            <motion.div
              initial={{ x: 420 }}
              animate={{ x: 0 }}
              exit={{ x: 420 }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl"
              role="dialog"
              aria-modal="true"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center">
                    <activeProject.icon className="text-lg" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">Ecosystem Pillar</div>
                    <div className="text-base font-extrabold text-gray-900">{activeProject.title}</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveProjectId(null)}
                  className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                  aria-label="Close"
                >
                  <FiX />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="text-sm font-semibold text-gray-800">Focus</div>
                <div className="text-gray-700 leading-relaxed">{activeProject.focus}</div>
                <div className="text-sm font-semibold text-gray-800">Key integration</div>
                <div className="text-gray-700 leading-relaxed">{activeProject.integration}</div>
                <div className="text-sm font-semibold text-gray-800">Overview</div>
                <div className="text-gray-700 leading-relaxed">{activeProject.detail}</div>
                <div className="pt-2 flex flex-col gap-3">
                  <Link
                    href="/next-era"
                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-center transition-colors"
                    onClick={() => setActiveProjectId(null)}
                  >
                    Next Era Roadmap
                  </Link>
                  <Link
                    href="/contact"
                    className="w-full py-3 rounded-xl bg-gray-900 hover:bg-black text-white font-semibold text-center transition-colors"
                    onClick={() => setActiveProjectId(null)}
                  >
                    Talk to VANHSYA
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Presence Map */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="heading-lg mb-4">Global Presence</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              UAE-based operations with a global destination focus across the UK, Canada, and Europe.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            <div className="relative rounded-3xl overflow-hidden border border-gray-100 shadow-lg bg-slate-950">
              <WorldMapVisualization mode="Immigration" className="absolute inset-0 opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
              <div className="relative z-10 p-6 flex items-end h-full min-h-[360px]">
                <div className="text-white">
                  <div className="text-xs font-black uppercase tracking-[0.3em] text-white/70">Operations</div>
                  <div className="mt-2 text-2xl font-extrabold">United Arab Emirates</div>
                  <div className="mt-2 text-white/70">
                    Target destinations: Canada, UK, Europe, USA, Australia
                  </div>
                </div>
              </div>
            </div>

            <GlassCard className="h-full">
              <div className="text-gray-900 font-extrabold text-xl mb-4">Core Destinations</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Canada', href: '/countries/canada' },
                  { label: 'United Kingdom', href: '/countries/uk' },
                  { label: 'Germany / Europe', href: '/countries/germany' },
                  { label: 'United States', href: '/countries/usa' },
                  { label: 'Australia', href: '/countries/australia' },
                  { label: 'UAE', href: '/countries/uae' }
                ].map((d) => (
                  <Link
                    key={d.href}
                    href={d.href}
                    className="flex items-center justify-between rounded-2xl bg-white/70 border border-gray-100 px-4 py-4 hover:shadow-md transition-all"
                  >
                    <span className="font-semibold text-gray-900">{d.label}</span>
                    <span className="text-gray-500">→</span>
                  </Link>
                ))}
              </div>
              <div className="mt-6 rounded-2xl bg-gray-50 border border-gray-100 p-5">
                <div className="flex items-center gap-3">
                  <FaShieldAlt className="text-green-700 text-xl" />
                  <div>
                    <div className="font-bold text-gray-900">Transparency-first</div>
                    <div className="text-sm text-gray-600">
                      Verified guidance, scam-aware support, and AI-assisted workflows.
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg mb-4">Our Impact in Numbers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These numbers represent real families, real dreams, and real success stories that motivate us every day.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <stat.icon className="text-2xl text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg mb-4">Meet Our Innovation Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our certified AI specialists and technology experts bring decades of combined experience in artificial intelligence and innovation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-xl">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                      <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center">
                          <FaCertificate className="mr-1" />
                          {member.credentials}
                        </span>
                        <span>{member.experience}</span>
                      </div>
                    </div>
                    <a 
                      href={member.linkedin} 
                      className="text-blue-600 hover:text-blue-700"
                      title={`Connect with ${member.name} on LinkedIn`}
                      aria-label={`Visit ${member.name}'s LinkedIn profile`}
                    >
                      <FaLinkedin className="text-xl" />
                    </a>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div>
                      <span className="font-medium text-gray-700">Specialization: </span>
                      <span className="text-gray-600">{member.specialization}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Education: </span>
                      <span className="text-gray-600">{member.education}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mt-4 leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg mb-4">Our Certifications & Transparency</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We are fully certified and committed to transparent, ethical AI practices with recognition from leading technology organizations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg text-center"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCertificate className="text-2xl text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{cert.acronym}</h3>
                <p className="text-gray-600 text-sm mb-3">{cert.name}</p>
                <p className="text-blue-600 font-medium mb-2">License: {cert.number}</p>
                <p className="text-gray-600 text-sm">{cert.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg mb-4">Our Journey</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From a small consulting practice to a global immigration consultancy, here's our story.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200"></div>
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex items-center mb-8"
                >
                  <div className="absolute left-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="ml-16">
                    <div className="text-xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                    <div className="text-gray-700">{milestone.event}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg mb-4">Our Core Values</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              These principles guide every decision we make and every service we provide.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: FaShieldAlt,
                title: 'Transparency',
                description: '100% transparent processes and ethical AI practices in everything we do.'
              },
              {
                icon: FaGraduationCap,
                title: 'Innovation',
                description: 'Continuous advancement in AI technology and cutting-edge solutions.'
              },
              {
                icon: FaHandshake,
                title: 'User Focus',
                description: 'Your success and satisfaction through innovative technology solutions.'
              },
              {
                icon: FaGlobe,
                title: 'Global Impact',
                description: 'Serving users worldwide with AI-powered innovation and transparency.'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-white bg-opacity-10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-blue-100 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
