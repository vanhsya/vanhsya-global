'use client';
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaHeart, 
  FaCheck, 
  FaClock,
  FaUsers,
  FaRing,
  FaBaby,
  FaUserFriends,
  FaCalculator,
  FaPhoneAlt,
  FaPassport
} from 'react-icons/fa';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AnimatedCard from '@/components/AnimatedCard';

const familyVisaTypes = [
  {
    name: 'Spouse/Partner Visa',
    icon: FaRing,
    countries: ['Canada', 'Australia', 'UK', 'USA'],
    processing: '12-24 months',
    description: 'Reunite with your spouse or common-law partner in their country of residence.',
    requirements: ['Valid marriage certificate', 'Proof of relationship', 'Financial support', 'Medical exams'],
    success_rate: '95%'
  },
  {
    name: 'Child Dependent Visa',
    icon: FaBaby,
    countries: ['Canada', 'Australia', 'UK', 'USA'],
    processing: '8-18 months',
    description: 'Bring your dependent children to join you in your new country.',
    requirements: ['Birth certificates', 'Custody documents', 'Financial support', 'Education plans'],
    success_rate: '98%'
  },
  {
    name: 'Parent Visa',
    icon: FaUserFriends,
    countries: ['Canada', 'Australia', 'USA'],
    processing: '24-60 months',
    description: 'Sponsor your parents for permanent residence or long-term visas.',
    requirements: ['Income requirements', 'Undertaking of assistance', 'Medical insurance', 'Background checks'],
    success_rate: '85%'
  },
  {
    name: 'Grandparent Visa',
    icon: FaUsers,
    countries: ['Canada', 'Australia'],
    processing: '18-36 months',
    description: 'Special programs for grandparents to visit or immigrate.',
    requirements: ['Super visa eligibility', 'Medical insurance', 'Financial support', 'Invitation letter'],
    success_rate: '90%'
  }
];

const countryPrograms = [
  {
    country: 'Canada',
    flag: '🇨🇦',
    programs: [
      { name: 'Spouse/Partner Sponsorship', processing: '12 months', requirements: '3-year undertaking' },
      { name: 'Dependent Child', processing: '12 months', requirements: 'Under 22 years old' },
      { name: 'Parent/Grandparent Program', processing: '24-36 months', requirements: 'Income threshold' },
      { name: 'Super Visa', processing: '8 weeks', requirements: 'Medical insurance $100K+' }
    ]
  },
  {
    country: 'Australia',
    flag: '🇦🇺',
    programs: [
      { name: 'Partner Visa (820/801)', processing: '18-24 months', requirements: 'Genuine relationship' },
      { name: 'Child Visa (101/802)', processing: '14-17 months', requirements: 'Dependency proof' },
      { name: 'Parent Visa (103/173)', processing: '30+ years', requirements: 'Assurance of support' },
      { name: 'Contributory Parent (143)', processing: '12-18 months', requirements: 'Contribution payment' }
    ]
  },
  {
    country: 'United Kingdom',
    flag: '🇬🇧',
    programs: [
      { name: 'Spouse/Partner Visa', processing: '8-24 weeks', requirements: 'Financial requirement £18,600' },
      { name: 'Child Dependent Visa', processing: '8-24 weeks', requirements: 'Under 18 years' },
      { name: 'Adult Dependent Relative', processing: '12+ months', requirements: 'Exceptional circumstances' }
    ]
  },
  {
    country: 'United States',
    flag: '🇺🇸',
    programs: [
      { name: 'IR-1/CR-1 Spouse', processing: '12-15 months', requirements: 'Petitioner must be USC/LPR' },
      { name: 'IR-2/CR-2 Child', processing: '8-12 months', requirements: 'Unmarried under 21' },
      { name: 'IR-5 Parent', processing: '8-12 months', requirements: 'Petitioner 21+ USC' },
      { name: 'F2A Spouse/Child LPR', processing: '24+ months', requirements: 'Priority date current' }
    ]
  }
];

const processSteps = [
  {
    step: 1,
    title: 'Eligibility Assessment',
    description: 'Comprehensive evaluation of your family situation and sponsorship eligibility',
    duration: '1-2 weeks',
    activities: ['Relationship assessment', 'Financial evaluation', 'Document review', 'Program selection']
  },
  {
    step: 2,
    title: 'Document Preparation',
    description: 'Gathering and preparing all required documentation for the application',
    duration: '4-8 weeks',
    activities: ['Civil documents', 'Relationship evidence', 'Financial documents', 'Medical exams']
  },
  {
    step: 3,
    title: 'Application Submission',
    description: 'Complete application preparation and submission to immigration authorities',
    duration: '2-4 weeks',
    activities: ['Form completion', 'Document compilation', 'Fee payment', 'Biometrics booking']
  },
  {
    step: 4,
    title: 'Processing & Interview',
    description: 'Government processing, background checks, and potential interview scheduling',
    duration: '6-24 months',
    activities: ['Background verification', 'Medical results', 'Interview preparation', 'Additional documents']
  },
  {
    step: 5,
    title: 'Decision & Arrival',
    description: 'Visa approval, travel arrangements, and settlement planning',
    duration: '2-4 weeks',
    activities: ['Visa issuance', 'Travel booking', 'Settlement preparation', 'Arrival support']
  }
];

const pricingPlans = [
  {
    name: 'Essential',
    price: '$2,999',
    description: 'Basic family sponsorship support',
    features: [
      'Eligibility assessment',
      'Document checklist',
      'Application review',
      'Basic consultation (2 hours)',
      'Email support',
      'Government fee guidance'
    ],
    popular: false
  },
  {
    name: 'Complete',
    price: '$4,999',
    description: 'Comprehensive family visa service',
    features: [
      'Full eligibility assessment',
      'Complete document preparation',
      'Application drafting & review',
      'Extended consultation (5 hours)',
      'Interview preparation',
      'Phone & email support',
      'Settlement guidance',
      'Priority processing'
    ],
    popular: true
  },
  {
    name: 'Premium',
    price: '$7,999',
    description: 'White-glove family immigration service',
    features: [
      'Comprehensive case management',
      'Full document preparation & notarization',
      'Complete application management',
      'Unlimited consultations',
      'Legal representation',
      'Priority support (24/7)',
      'Settlement & integration support',
      'Appeal assistance if needed',
      'Multi-country options'
    ],
    popular: false
  }
];

const successMetrics = [
  { metric: '95%', label: 'Success Rate', icon: FaCheck },
  { metric: '15,000+', label: 'Families Reunited', icon: FaHeart },
  { metric: '25+', label: 'Years Experience', icon: FaClock },
  { metric: '40+', label: 'Countries Served', icon: FaPassport }
];

export default function FamilyVisaPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-600 via-red-600 to-purple-700 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <FaHeart className="text-6xl mx-auto mb-6 text-pink-300" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Family Visa Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-pink-100">
              Reunite with your loved ones through our expert family sponsorship and immigration services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="btn-primary bg-white text-pink-600 hover:bg-gray-100"
              >
                <FaCalculator className="mr-2" />
                Check Eligibility
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="btn-outline border-white text-white hover:bg-white hover:text-pink-600"
              >
                <FaPhoneAlt className="mr-2" />
                Free Consultation
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {successMetrics.map((item, index) => (
              <AnimatedCard
                key={index}
                delay={index * 0.1}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <item.icon className="text-3xl text-pink-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-800 mb-2">{item.metric}</div>
                <div className="text-gray-600">{item.label}</div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Family Visa Types */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg mb-4">Family Visa Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore different family sponsorship options to bring your loved ones together
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {familyVisaTypes.map((visa, index) => (
              <AnimatedCard
                key={index}
                delay={index * 0.1}
                className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-pink-500"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-pink-100 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                    <visa.icon className="text-xl text-pink-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{visa.name}</h3>
                    <div className="text-sm text-gray-500">Processing: {visa.processing}</div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{visa.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">Available Countries:</h4>
                  <div className="flex flex-wrap gap-2">
                    {visa.countries.map((country, idx) => (
                      <span key={idx} className="bg-pink-50 text-pink-700 px-3 py-1 rounded-full text-sm">
                        {country}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">Key Requirements:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {visa.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-center">
                        <FaCheck className="text-green-500 mr-2 text-xs" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-green-600 font-medium">
                    Success Rate: {visa.success_rate}
                  </div>
                  <button className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors">
                    Learn More
                  </button>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Country Programs */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg mb-4">Family Immigration Programs by Country</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Each country offers specific family sponsorship programs with unique requirements and processing times
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {countryPrograms.map((country, index) => (
              <AnimatedCard
                key={index}
                delay={index * 0.1}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center mb-6">
                  <span className="text-4xl mr-4">{country.flag}</span>
                  <h3 className="text-2xl font-bold text-gray-800">{country.country}</h3>
                </div>
                
                <div className="space-y-4">
                  {country.programs.map((program, idx) => (
                    <div key={idx} className="border-l-2 border-pink-200 pl-4">
                      <h4 className="font-medium text-gray-800">{program.name}</h4>
                      <div className="text-sm text-gray-600 mt-1">
                        Processing: {program.processing}
                      </div>
                      <div className="text-sm text-pink-600 mt-1">
                        {program.requirements}
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg mb-4">Our Family Visa Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A systematic approach to ensure successful family reunification
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-pink-200 hidden md:block"></div>
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex items-start mb-12"
                >
                  <div className="absolute left-0 w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center md:relative md:mr-8">
                    <span className="text-white font-bold text-sm">{step.step}</span>
                  </div>
                  <div className="ml-16 md:ml-0 bg-white rounded-lg p-6 shadow-lg flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
                      <span className="text-sm text-pink-600 font-medium">{step.duration}</span>
                    </div>
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {step.activities.map((activity, idx) => (
                        <div key={idx} className="text-sm text-gray-500 flex items-center">
                          <FaCheck className="text-green-500 mr-2 text-xs" />
                          {activity}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
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
            <h2 className="heading-lg mb-4">Family Visa Service Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the right level of support for your family immigration journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <AnimatedCard
                key={index}
                delay={index * 0.1}
                className={`bg-white rounded-xl p-8 shadow-lg relative ${
                  plan.popular 
                    ? 'border-2 border-pink-500 transform scale-105' 
                    : 'border border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-pink-600 mb-2">{plan.price}</div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <FaCheck className="text-green-500 mr-3 text-sm" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  plan.popular
                    ? 'bg-pink-600 text-white hover:bg-pink-700'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}>
                  Get Started
                </button>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-pink-600 to-purple-700 text-white">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <FaHeart className="text-5xl mx-auto mb-6 text-pink-300" />
            <h2 className="heading-lg mb-4">Ready to Reunite Your Family?</h2>
            <p className="text-xl mb-8 text-pink-100 max-w-2xl mx-auto">
              Let our experienced team guide you through the family visa process and bring your loved ones home
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="btn-primary bg-white text-pink-600 hover:bg-gray-100"
              >
                <FaCalculator className="mr-2" />
                Free Assessment
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="btn-outline border-white text-white hover:bg-white hover:text-pink-600"
              >
                <FaPhoneAlt className="mr-2" />
                Book Consultation
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
