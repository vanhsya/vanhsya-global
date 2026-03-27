'use client';

import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { 
  FaBriefcase, 
  FaCheck, 
  FaClock, 
  FaUsers, 
  FaArrowRight,
  FaStar,
  FaShieldAlt
} from 'react-icons/fa';

const WorkVisaPage: React.FC = () => {
  const countries = [
    {
      name: 'Canada',
      flag: '🇨🇦',
      programs: ['Express Entry', 'Provincial Nominee Program', 'Quebec Skilled Worker'],
      processing: '6-12 months',
      fee: '$1,500'
    },
    {
      name: 'Australia',
      flag: '🇦🇺',
      programs: ['Skilled Independent', 'Employer Sponsored', 'Regional Skilled'],
      processing: '8-15 months',
      fee: '$2,000'
    },
    {
      name: 'United States',
      flag: '🇺🇸',
      programs: ['H-1B', 'L-1', 'O-1', 'TN Visa'],
      processing: '3-8 months',
      fee: '$2,500'
    },
    {
      name: 'United Kingdom',
      flag: '🇬🇧',
      programs: ['Skilled Worker', 'Global Talent', 'Health and Care Worker'],
      processing: '3-8 weeks',
      fee: '$1,800'
    }
  ];

  const eligibilityRequirements = [
    'Valid job offer from approved employer',
    'Relevant work experience (typically 2+ years)',
    'Educational qualifications assessment',
    'English language proficiency',
    'Clean criminal background check',
    'Medical examination',
    'Proof of financial support',
    'Skills assessment (country-specific)'
  ];

  const processSteps = [
    {
      step: '1',
      title: 'Initial Consultation',
      description: 'Free assessment of your eligibility and best pathway options',
      duration: '30 minutes'
    },
    {
      step: '2',
      title: 'Document Collection',
      description: 'Comprehensive checklist and guidance for all required documents',
      duration: '2-4 weeks'
    },
    {
      step: '3',
      title: 'Application Preparation',
      description: 'Professional preparation and review of your complete application',
      duration: '1-2 weeks'
    },
    {
      step: '4',
      title: 'Submission & Tracking',
      description: 'Application submission and ongoing status monitoring',
      duration: 'Ongoing'
    },
    {
      step: '5',
      title: 'Interview Preparation',
      description: 'Mock interviews and coaching for visa interviews (if required)',
      duration: '1 week'
    },
    {
      step: '6',
      title: 'Visa Approval & Support',
      description: 'Post-approval support and settlement guidance',
      duration: 'Ongoing'
    }
  ];

  const includedServices = [
    'Comprehensive eligibility assessment',
    'Document checklist and verification',
    'Professional application preparation',
    'Employer liaison and communication',
    'Interview coaching and preparation',
    'Application tracking and updates',
    'Post-approval settlement support',
    '24/7 client support portal access'
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="hero-gradient section-padding text-white">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <FaBriefcase className="text-4xl mr-4" />
              <h1 className="heading-xl">Work Visa Services</h1>
            </div>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
              Secure your professional future abroad with our comprehensive work visa services. 
              From temporary work permits to permanent residency pathways.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#consultation"
                whileHover={{ scale: 1.05 }}
                className="btn-secondary"
              >
                Start Free Assessment
              </motion.a>
              <motion.a
                href="#process"
                whileHover={{ scale: 1.05 }}
                className="btn-outline bg-white/10 border-white/30 text-white hover:bg-white hover:text-blue-600"
              >
                Learn About Process
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Countries & Programs */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg mb-6">Popular Work Visa Destinations</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We specialize in work visa applications for the world's most sought-after destinations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {countries.map((country, index) => (
              <motion.div
                key={country.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{country.flag}</span>
                  <h3 className="text-2xl font-semibold text-gray-800">{country.name}</h3>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processing Time:</span>
                    <span className="font-medium">{country.processing}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Starting Fee:</span>
                    <span className="font-bold text-blue-600">{country.fee}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Available Programs:</h4>
                  <div className="space-y-2">
                    {country.programs.map((program, idx) => (
                      <div key={idx} className="flex items-center">
                        <FaCheck className="text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{program}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="btn-primary w-full"
                >
                  Get Started with {country.name}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility Requirements */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-md mb-6">General Eligibility Requirements</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                While specific requirements vary by country and visa type, most work visa applications 
                require the following basic criteria to be met.
              </p>
              
              <div className="space-y-4">
                {eligibilityRequirements.map((requirement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <FaCheck className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{requirement}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-8 p-6 bg-blue-50 rounded-lg"
              >
                <div className="flex items-center mb-3">
                  <FaShieldAlt className="text-blue-600 mr-2" />
                  <h3 className="font-semibold text-blue-800">Free Eligibility Assessment</h3>
                </div>
                <p className="text-blue-700 text-sm mb-4">
                  Not sure if you qualify? Our experts will assess your profile at no cost and 
                  recommend the best pathway for your situation.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="btn-primary"
                >
                  Check My Eligibility
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-md mb-6">What's Included in Our Service</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our comprehensive work visa service covers every aspect of your application 
                from initial assessment to post-approval support.
              </p>

              <div className="space-y-4">
                {includedServices.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start bg-white p-4 rounded-lg shadow-sm"
                  >
                    <FaStar className="text-amber-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{service}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section id="process" className="section-padding bg-white">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg mb-6">Our Proven Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A step-by-step approach that has helped thousands secure work visas worldwide
            </p>
          </motion.div>

          <div className="space-y-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col md:flex-row items-start md:items-center"
              >
                <div className="flex items-center mb-4 md:mb-0 md:mr-8">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
                    {step.step}
                  </div>
                  <div className="hidden md:block w-32 text-sm text-gray-500">
                    Duration: {step.duration}
                  </div>
                </div>
                
                <div className="flex-1 bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  <div className="md:hidden mt-2 text-sm text-gray-500">
                    Duration: {step.duration}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="consultation" className="section-padding bg-blue-600 text-white">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="heading-lg mb-6">Ready to Advance Your Career Abroad?</h2>
            <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Take the first step towards your international career. Our experts are ready to guide you 
              through every step of the work visa process.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <FaClock className="text-3xl text-blue-200 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Fast Processing</h3>
                <p className="text-blue-100 text-sm">Quick turnaround on applications</p>
              </div>
              <div className="text-center">
                <FaUsers className="text-3xl text-blue-200 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Expert Support</h3>
                <p className="text-blue-100 text-sm">Licensed immigration professionals</p>
              </div>
              <div className="text-center">
                <FaShieldAlt className="text-3xl text-blue-200 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Success Guarantee</h3>
                <p className="text-blue-100 text-sm">Transparent process with no hidden fees</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/consultation"
                whileHover={{ scale: 1.05 }}
                className="btn-secondary group"
              >
                Book Free Consultation
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                className="btn-outline border-white text-white hover:bg-white hover:text-blue-600"
              >
                Contact Our Experts
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WorkVisaPage;
