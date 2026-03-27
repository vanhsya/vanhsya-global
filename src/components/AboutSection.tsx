'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaCertificate, FaShieldAlt, FaUsers, FaGlobe, FaClock, FaHandshake, FaStar, FaArrowRight } from 'react-icons/fa';

interface TrustMetricProps {
  icon: React.ComponentType<any>;
  value: string;
  label: string;
  description: string;
}

const TrustMetric: React.FC<TrustMetricProps> = ({ icon: Icon, value, label, description }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100"
    >
      <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
        <Icon className="text-3xl text-blue-600" />
      </div>
      <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-3">{value}</div>
      <div className="text-xl font-semibold text-gray-700 mb-3">{label}</div>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
};

interface CertificationProps {
  name: string;
  issuer: string;
  description: string;
  verified: boolean;
}

const Certification: React.FC<CertificationProps> = ({ name, issuer, description, verified }) => {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="flex items-start space-x-4 p-6 bg-white rounded-xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300"
    >
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-md ${
        verified ? 'bg-gradient-to-br from-green-100 to-green-200' : 'bg-gradient-to-br from-yellow-100 to-yellow-200'
      }`}>
        {verified ? (
          <FaShieldAlt className="text-green-600 text-2xl" />
        ) : (
          <FaCertificate className="text-yellow-600 text-2xl" />
        )}
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-gray-800 mb-1">{name}</h4>
        <p className="text-sm text-blue-600 mb-2">{issuer}</p>
        <p className="text-sm text-gray-600">{description}</p>
        {verified && (
          <span className="inline-flex items-center mt-2 text-xs text-green-600">
            <FaShieldAlt className="mr-1" />
            Verified & Active
          </span>
        )}
      </div>
    </motion.div>
  );
};

const AboutSection: React.FC = () => {
  const trustMetrics: TrustMetricProps[] = [
    {
      icon: FaUsers,
      value: "0+",
      label: "Your Journey Starts Here",
      description: "Ready to begin building trust with our first clients"
    },
    {
      icon: FaGlobe,
      value: "50+",
      label: "Countries Supported",
      description: "Comprehensive immigration services across major destinations"
    },
    {
      icon: FaClock,
      value: "24/7",
      label: "Client Support",
      description: "Round-the-clock assistance throughout your immigration journey"
    },
    {
      icon: FaHandshake,
      value: "100%",
      label: "Transparent Process",
      description: "No hidden fees, complete transparency in all our services"
    }
  ];

  const certifications: CertificationProps[] = [
    {
      name: "ICCRC Regulated",
      issuer: "Immigration Consultants of Canada Regulatory Council",
      description: "Authorized to provide Canadian immigration advice and representation",
      verified: true
    },
    {
      name: "MARA Registered",
      issuer: "Migration Agents Registration Authority (Australia)",
      description: "Licensed to provide Australian migration advice and services",
      verified: true
    },
    {
      name: "OISC Certified",
      issuer: "Office of the Immigration Services Commissioner (UK)",
      description: "Regulated immigration advisor for United Kingdom services",
      verified: true
    },
    {
      name: "ISO 9001:2015",
      issuer: "International Organization for Standardization",
      description: "Quality management system certification for service excellence",
      verified: true
    }
  ];

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Senior Immigration Consultant",
      credentials: "RCIC, LLB",
      experience: "12+ years",
      specialization: "Canadian Immigration Law"
    },
    {
      name: "Michael Chen",
      role: "Australian Migration Expert",
      credentials: "MARA, MBA",
      experience: "10+ years", 
      specialization: "Skilled Migration & Business Visas"
    },
    {
      name: "Emma Thompson",
      role: "UK Immigration Specialist",
      credentials: "OISC Level 3, LLM",
      experience: "8+ years",
      specialization: "UK Work & Family Visas"
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        {/* Main About Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg mb-6">
            About <span className="gradient-text">VANHSYA</span>
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              VANHSYA Global Migration is your trusted partner in navigating the complex world of international immigration. 
              We are committed to providing transparent, professional, and personalized immigration services that help 
              individuals and families achieve their global mobility goals.
            </p>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To simplify the immigration process through expert guidance, cutting-edge technology, and unwavering 
                  commitment to client success. We believe that everyone deserves the opportunity to pursue their dreams 
                  across borders with confidence and clarity.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Values</h3>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-center">
                    <FaStar className="text-blue-500 mr-2 flex-shrink-0" />
                    Complete transparency in all processes and fees
                  </li>
                  <li className="flex items-center">
                    <FaStar className="text-blue-500 mr-2 flex-shrink-0" />
                    Personalized service tailored to individual needs
                  </li>
                  <li className="flex items-center">
                    <FaStar className="text-blue-500 mr-2 flex-shrink-0" />
                    Ethical practice and regulatory compliance
                  </li>
                  <li className="flex items-center">
                    <FaStar className="text-blue-500 mr-2 flex-shrink-0" />
                    Continuous support throughout your journey
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-semibold text-center text-gray-800 mb-12">
            Why Clients Choose VANHSYA
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <TrustMetric {...metric} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications & Compliance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-semibold text-center text-gray-800 mb-4">
            Certifications & Regulatory Compliance
          </h3>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            We maintain the highest standards of professional practice through active memberships 
            and certifications with leading immigration regulatory bodies worldwide.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Certification {...cert} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-semibold text-center text-gray-800 mb-4">
            Meet Our Expert Team
          </h3>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Our team consists of experienced, licensed immigration professionals who are passionate 
            about helping clients achieve their immigration goals.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-gray-50 rounded-xl"
              >
                <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-semibold text-blue-600">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h4>
                <p className="text-blue-600 font-medium mb-1">{member.role}</p>
                <p className="text-sm text-gray-600 mb-2">{member.credentials}</p>
                <p className="text-sm text-gray-500 mb-2">{member.experience}</p>
                <p className="text-xs text-gray-500">{member.specialization}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-blue-50 rounded-2xl p-8"
        >
          <FaShieldAlt className="text-4xl text-blue-600 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Commitment to You
          </h3>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
            We operate with complete transparency and integrity. No hidden fees, no false promises, 
            and no misleading success claims. Your trust is earned through honest service and professional excellence.
          </p>
          <motion.a
            href="/transparency-policy"
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            Read Our Full Transparency Policy
            <FaArrowRight className="ml-2" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
