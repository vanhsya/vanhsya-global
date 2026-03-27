'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaHome, 
  FaPassport, 
  FaHeart, 
  FaGraduationCap,
  FaBriefcase,
  FaCheck,
  FaClock,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaUsers,
  FaGlobe,
  FaCalculator,
  FaFileAlt,
  FaPhoneAlt,
  FaStar,
  FaCalendarAlt
} from 'react-icons/fa';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AnimatedCard from '@/components/AnimatedCard';

const prPrograms = [
  {
    country: 'Canada',
    icon: FaMapMarkerAlt,
    pathways: [
      'Express Entry System',
      'Provincial Nominee Program (PNP)',
      'Quebec Skilled Worker Program',
      'Atlantic Immigration Program',
      'Rural and Northern Immigration Pilot',
      'Start-up Visa Program',
      'Self-employed Persons Program'
    ],
    timeframe: '6-18 months',
    points: 'CRS Score: 450+',
    color: 'red',
    description: 'Multiple pathways to Canadian permanent residence with excellent social benefits'
  },
  {
    country: 'Australia',
    icon: FaMapMarkerAlt,
    pathways: [
      'Skilled Independent Visa (189)',
      'Skilled Nominated Visa (190)',
      'Skilled Regional Visa (491)',
      'Global Talent Independent Program',
      'Business Innovation & Investment',
      'Partner & Family Visas',
      'Employer Nomination Scheme'
    ],
    timeframe: '8-24 months',
    points: 'Points Test: 65+',
    color: 'orange',
    description: 'Skilled migration programs leading to Australian citizenship eligibility'
  },
  {
    country: 'United States',
    icon: FaMapMarkerAlt,
    pathways: [
      'EB-1: Priority Workers',
      'EB-2: Advanced Degree Professionals',
      'EB-3: Skilled Workers',
      'EB-4: Special Immigrants',
      'EB-5: Investor Visa',
      'Family-based Immigration',
      'Diversity Visa Lottery'
    ],
    timeframe: '1-10 years',
    points: 'No Points System',
    color: 'blue',
    description: 'Employment and family-based green card pathways to US permanent residence'
  },
  {
    country: 'New Zealand',
    icon: FaMapMarkerAlt,
    pathways: [
      'Skilled Migrant Category',
      'Work to Residence Visa',
      'Investor Category',
      'Entrepreneur Work Visa',
      'Parent Category',
      'Partnership-based Residence',
      'Refugee & Protection Visas'
    ],
    timeframe: '6-30 months',
    points: 'Points System: 160+',
    color: 'green',
    description: 'Points-based system with pathway to New Zealand citizenship'
  }
];

const benefits = [
  {
    icon: FaHome,
    title: 'Right to Live & Work',
    description: 'Permanent right to live, work, and study anywhere in the country without restrictions'
  },
  {
    icon: FaHeart,
    title: 'Healthcare Benefits',
    description: 'Access to public healthcare systems and social services on par with citizens'
  },
  {
    icon: FaGraduationCap,
    title: 'Education Access',
    description: 'Free or subsidized education for children and reduced fees for higher education'
  },
  {
    icon: FaShieldAlt,
    title: 'Social Security',
    description: 'Eligibility for unemployment benefits, pensions, and other social safety nets'
  },
  {
    icon: FaGlobe,
    title: 'Travel Freedom',
    description: 'Enhanced travel privileges and ability to sponsor family members for visas'
  },
  {
    icon: FaPassport,
    title: 'Path to Citizenship',
    description: 'Eligibility to apply for citizenship after meeting residency requirements'
  }
];

const processSteps = [
  {
    step: 1,
    title: 'Eligibility Assessment',
    description: 'Comprehensive evaluation of your profile, points calculation, and pathway selection',
    timeframe: '1-2 weeks',
    icon: FaCalculator
  },
  {
    step: 2,
    title: 'Document Preparation',
    description: 'Gather and prepare all required documents, certificates, and supporting evidence',
    timeframe: '4-8 weeks',
    icon: FaFileAlt
  },
  {
    step: 3,
    title: 'Skills Assessment',
    description: 'Complete professional skills assessment and language proficiency tests',
    timeframe: '6-12 weeks',
    icon: FaGraduationCap
  },
  {
    step: 4,
    title: 'Application Submission',
    description: 'Submit complete application through official government portals',
    timeframe: '1-2 weeks',
    icon: FaBriefcase
  },
  {
    step: 5,
    title: 'Processing & Review',
    description: 'Government processing, background checks, and additional document requests',
    timeframe: '6-24 months',
    icon: FaClock
  },
  {
    step: 6,
    title: 'Decision & Landing',
    description: 'Receive decision, complete landing procedures, and obtain PR status',
    timeframe: '2-4 weeks',
    icon: FaCheck
  }
];

const requirements = [
  'Age: Typically 18-45 years (varies by program)',
  'Education: Post-secondary qualification or equivalent',
  'Language: English/French proficiency (IELTS/CELPIP)',
  'Work Experience: Skilled work experience in eligible occupation',
  'Health: Medical examinations and health requirements',
  'Character: Police clearances and background checks',
  'Funds: Proof of settlement funds and financial stability',
  'Skills Assessment: Professional qualification recognition'
];

const pricingTiers = [
  {
    name: 'Essential',
    price: '$2,999',
    description: 'Basic permanent residence application support',
    features: [
      'Eligibility assessment',
      'Document checklist',
      'Application review',
      'Basic consultation',
      'Email support'
    ],
    popular: false
  },
  {
    name: 'Professional',
    price: '$4,999',
    description: 'Comprehensive PR application management',
    features: [
      'Everything in Essential',
      'Document preparation',
      'Skills assessment guidance',
      'Application submission',
      'Priority phone support',
      'Progress tracking'
    ],
    popular: true
  },
  {
    name: 'Premium',
    price: '$7,999',
    description: 'Full-service PR application with guarantee',
    features: [
      'Everything in Professional',
      'Expedited processing',
      'Multiple pathway options',
      'Family application support',
      'Settlement assistance',
      'Success guarantee*'
    ],
    popular: false
  }
];

export default function PermanentResidencePage() {
  const [selectedCountry, setSelectedCountry] = useState('Canada');
  const [activeStep, setActiveStep] = useState(1);

  const selectedProgram = prPrograms.find(p => p.country === selectedCountry);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <FaHome className="text-6xl mx-auto mb-6 text-green-300" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Permanent Residence Visas
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100">
              Secure your future with permanent residence status in your dream destination
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="btn-primary bg-white text-green-600 hover:bg-gray-100"
              >
                <FaCalculator className="mr-2" />
                Check Eligibility
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="btn-outline border-white text-white hover:bg-white hover:text-green-600"
              >
                <FaPhoneAlt className="mr-2" />
                Free Consultation
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg mb-4">Benefits of Permanent Residence</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Permanent residence offers life-changing benefits for you and your family
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <AnimatedCard
                key={index}
                delay={index * 0.1}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl"
              >
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
                  <benefit.icon className="text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Country Programs Section */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg mb-4">Popular PR Destinations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from multiple pathways to permanent residence in top destinations
            </p>
          </motion.div>

          {/* Country Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {prPrograms.map((program) => (
              <motion.button
                key={program.country}
                onClick={() => setSelectedCountry(program.country)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  selectedCountry === program.country
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {program.country}
              </motion.button>
            ))}
          </div>

          {/* Selected Country Details */}
          {selectedProgram && (
            <motion.div
              key={selectedCountry}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {selectedProgram.country} Permanent Residence
                  </h3>
                  <p className="text-gray-600 mb-6">{selectedProgram.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white rounded-lg p-4">
                      <FaClock className="text-green-600 mb-2" />
                      <div className="text-sm text-gray-500">Processing Time</div>
                      <div className="font-semibold">{selectedProgram.timeframe}</div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <FaStar className="text-green-600 mb-2" />
                      <div className="text-sm text-gray-500">Requirements</div>
                      <div className="font-semibold">{selectedProgram.points}</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-gray-800 mb-4">Available Pathways:</h4>
                  <div className="space-y-3">
                    {selectedProgram.pathways.map((pathway, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center bg-white rounded-lg p-3"
                      >
                        <FaCheck className="text-green-600 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{pathway}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Process Timeline */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg mb-4">PR Application Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our systematic approach ensures your permanent residence application success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step) => (
              <AnimatedCard
                key={step.step}
                delay={step.step * 0.1}
                className={`bg-white rounded-xl p-6 shadow-lg cursor-pointer transition-all ${
                  activeStep === step.step ? 'ring-2 ring-green-500 transform scale-105' : ''
                }`}
                onClick={() => setActiveStep(step.step)}
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                    {step.step}
                  </div>
                  <step.icon className="text-2xl text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-600 mb-4">{step.description}</p>
                <div className="flex items-center text-sm text-green-600">
                  <FaClock className="mr-2" />
                  {step.timeframe}
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6">General Requirements</h2>
              <p className="text-gray-600 mb-8">
                While requirements vary by country and program, these are common criteria for permanent residence applications.
              </p>

              <div className="space-y-4">
                {requirements.map((requirement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center p-4 bg-gray-50 rounded-lg"
                  >
                    <FaCheck className="text-green-600 mr-4 flex-shrink-0" />
                    <span className="text-gray-700">{requirement}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Success Tips</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <FaGraduationCap className="text-green-600 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Improve Your Profile</h4>
                    <p className="text-gray-600 text-sm">
                      Enhance your language scores, education credentials, and work experience to increase your points.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FaFileAlt className="text-green-600 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Document Preparation</h4>
                    <p className="text-gray-600 text-sm">
                      Start gathering documents early as some certificates can take months to obtain.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FaClock className="text-green-600 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Timing Matters</h4>
                    <p className="text-gray-600 text-sm">
                      Apply when you have maximum points and all documents are ready to avoid delays.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FaUsers className="text-green-600 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Professional Guidance</h4>
                    <p className="text-gray-600 text-sm">
                      Work with licensed consultants to navigate complex requirements and avoid costly mistakes.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg mb-4">Service Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the level of support that best fits your permanent residence journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <AnimatedCard
                key={index}
                delay={index * 0.1}
                className={`bg-white rounded-xl p-8 shadow-lg ${
                  tier.popular ? 'ring-2 ring-green-500 transform scale-105' : ''
                }`}
              >
                {tier.popular && (
                  <div className="bg-green-600 text-white text-sm font-medium px-3 py-1 rounded-full inline-block mb-4">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{tier.name}</h3>
                <div className="text-3xl font-bold text-green-600 mb-4">{tier.price}</div>
                <p className="text-gray-600 mb-6">{tier.description}</p>
                
                <div className="space-y-3 mb-8">
                  {tier.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <FaCheck className="text-green-600 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    tier.popular
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Get Started
                </motion.button>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <FaHome className="text-5xl mx-auto mb-6 text-green-300" />
            <h2 className="heading-lg mb-4">Ready to Make Your Move?</h2>
            <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto">
              Start your permanent residence journey today with expert guidance and support
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="btn-primary bg-white text-green-600 hover:bg-gray-100"
              >
                <FaCalendarAlt className="mr-2" />
                Book Free Assessment
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="btn-outline border-white text-white hover:bg-white hover:text-green-600"
              >
                <FaPhoneAlt className="mr-2" />
                Speak to Expert
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
