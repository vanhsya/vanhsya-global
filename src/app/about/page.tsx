'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaGraduationCap, 
  FaUsers, 
  FaGlobe, 
  FaAward,
  FaHandshake,
  FaShieldAlt,
  FaChartLine,
  FaCertificate,
  FaLinkedin
} from 'react-icons/fa';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

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
              About VANHSYA AI Innovations
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Your trusted partner in AI-powered solutions with complete transparency, cutting-edge technology, and commitment to innovation excellence.
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
              <h2 className="heading-lg mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                To provide transparent, innovative AI-powered solutions that empower individuals and organizations worldwide. We believe in complete transparency, ethical AI practices, and delivering cutting-edge technology without compromising user trust.
              </p>
              <div className="flex items-center space-x-4">
                <FaHandshake className="text-3xl text-blue-600" />
                <div>
                  <h3 className="font-semibold text-gray-800">Innovation-First Approach</h3>
                  <p className="text-gray-600">Your success through technology</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-xl"
            >
              <h2 className="heading-lg mb-6">Our Vision</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                To become the world's most trusted AI innovation platform, known for our transparency, cutting-edge technology, and commitment to transforming lives through artificial intelligence solutions.
              </p>
              <div className="flex items-center space-x-4">
                <FaShieldAlt className="text-3xl text-green-600" />
                <div>
                  <h3 className="font-semibold text-gray-800">Trust & Transparency</h3>
                  <p className="text-gray-600">100% transparent, ethical AI solutions</p>
                </div>
              </div>
            </motion.div>
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
