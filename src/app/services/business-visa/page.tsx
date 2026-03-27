'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaChartLine, 
  FaCheck, 
  FaClock, 
  FaDollarSign,
  FaBuilding,
  FaHandshake,
  FaLightbulb,
  FaCalculator,
  FaPhoneAlt,
  FaTrophy,
  FaUsers
} from 'react-icons/fa';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';


const investmentPrograms = [
  {
    country: 'Canada',
    flag: '🇨🇦',
    programs: [
      {
        name: 'Start-up Visa Program',
        investment: '$200,000 - $1,200,000',
        timeline: '12-16 months',
        highlights: ['No net worth requirement', 'Path to PR', 'Family inclusion']
      },
      {
        name: 'Self-employed Persons',
        investment: '$100,000+',
        timeline: '18-24 months',
        highlights: ['Cultural/agricultural focus', 'Experience required', 'Rural opportunities']
      },
      {
        name: 'Quebec Investor Program',
        investment: '$1,200,000',
        timeline: '24-36 months',
        highlights: ['Passive investment', 'No business management', 'French advantage']
      }
    ]
  },
  {
    country: 'Australia',
    flag: '🇦🇺',
    programs: [
      {
        name: 'Business Innovation & Investment',
        investment: '$500,000 - $5,000,000',
        timeline: '8-12 months',
        highlights: ['Multiple streams', 'State nomination', 'Pathway to PR']
      },
      {
        name: 'Significant Investor Visa',
        investment: '$5,000,000',
        timeline: '6-8 months',
        highlights: ['Fast processing', 'Complying investments', 'Residence pathway']
      }
    ]
  },
  {
    country: 'United Kingdom',
    flag: '🇬🇧',
    programs: [
      {
        name: 'Innovator Founder Visa',
        investment: '$50,000+',
        timeline: '3-6 months',
        highlights: ['Innovative business', 'Endorsement required', 'Settlement path']
      },
      {
        name: 'Global Talent Visa',
        investment: 'No minimum',
        timeline: '8-12 weeks',
        highlights: ['Exceptional talent', 'No job offer needed', 'Fast track to settlement']
      }
    ]
  },
  {
    country: 'United States',
    flag: '🇺🇸',
    programs: [
      {
        name: 'EB-5 Immigrant Investor',
        investment: '$800,000 - $1,050,000',
        timeline: '24-36 months',
        highlights: ['Green card pathway', 'Job creation', 'Family inclusion']
      },
      {
        name: 'E-2 Treaty Investor',
        investment: '$100,000+',
        timeline: '2-4 months',
        highlights: ['Non-immigrant visa', 'Renewable', 'Spouse work authorization']
      }
    ]
  }
];

const businessTypes = [
  {
    type: 'Technology Startups',
    icon: FaLightbulb,
    description: 'Innovative tech companies with scalable business models',
    examples: ['Software development', 'AI/ML applications', 'Fintech solutions', 'E-commerce platforms'],
    suitablePrograms: ['Canada Start-up Visa', 'UK Innovator Founder', 'Australia BII']
  },
  {
    type: 'Manufacturing',
    icon: FaBuilding,
    description: 'Production and manufacturing businesses creating jobs',
    examples: ['Food processing', 'Automotive parts', 'Textiles', 'Electronics'],
    suitablePrograms: ['US EB-5', 'Canada PNP Business', 'Australia BII']
  },
  {
    type: 'Consulting Services',
    icon: FaHandshake,
    description: 'Professional services and consulting businesses',
    examples: ['Management consulting', 'IT consulting', 'Financial advisory', 'Engineering services'],
    suitablePrograms: ['UK Global Talent', 'Canada Self-employed', 'US E-2']
  },
  {
    type: 'Retail & Hospitality',
    icon: FaUsers,
    description: 'Customer-facing businesses in retail and hospitality',
    examples: ['Restaurants', 'Hotels', 'Retail stores', 'Tourism services'],
    suitablePrograms: ['Australia BII', 'US E-2', 'Canada PNP Business']
  }
];

const processSteps = [
  {
    step: 1,
    title: 'Business Assessment',
    description: 'Comprehensive evaluation of your business concept, financial capacity, and immigration goals.',
    duration: '1-2 weeks',
    activities: ['Business plan review', 'Financial assessment', 'Program eligibility check', 'Risk analysis']
  },
  {
    step: 2,
    title: 'Program Selection',
    description: 'Identify the most suitable business immigration program based on your profile.',
    duration: '1 week',
    activities: ['Program comparison', 'Country selection', 'Timeline planning', 'Investment strategy']
  },
  {
    step: 3,
    title: 'Business Plan Development',
    description: 'Create a comprehensive business plan meeting immigration requirements.',
    duration: '4-6 weeks',
    activities: ['Market research', 'Financial projections', 'Job creation plan', 'Compliance review']
  },
  {
    step: 4,
    title: 'Documentation Preparation',
    description: 'Compile all required documents and evidence for the application.',
    duration: '2-4 weeks',
    activities: ['Financial documentation', 'Experience proof', 'Educational credentials', 'Legal documents']
  },
  {
    step: 5,
    title: 'Application Submission',
    description: 'Submit the complete application with supporting documentation.',
    duration: '1-2 weeks',
    activities: ['Application forms', 'Document filing', 'Fee payment', 'Biometrics booking']
  },
  {
    step: 6,
    title: 'Business Implementation',
    description: 'Support in setting up and operating the business post-approval.',
    duration: 'Ongoing',
    activities: ['Business registration', 'Banking setup', 'Compliance monitoring', 'Reporting assistance']
  }
];

const successMetrics = [
  { number: '88%', label: 'Success Rate', icon: FaTrophy },
  { number: '450+', label: 'Businesses Established', icon: FaBuilding },
  { number: '$250M+', label: 'Investment Facilitated', icon: FaDollarSign },
  { number: '2,500+', label: 'Jobs Created', icon: FaUsers }
];

const packagePricing = [
  {
    name: 'Consultation Package',
    price: '$1,500',
    description: 'Initial assessment and program guidance',
    features: [
      'Business concept evaluation',
      'Program eligibility assessment',
      'Investment requirement analysis',
      'Timeline and strategy planning',
      'Initial business plan outline'
    ]
  },
  {
    name: 'Standard Package',
    price: '$8,000',
    description: 'Complete business immigration solution',
    features: [
      'All consultation features',
      'Comprehensive business plan',
      'Application preparation',
      'Document compilation',
      'Submission and tracking',
      'Interview preparation'
    ],
    popular: true
  },
  {
    name: 'Premium Package',
    price: '$15,000',
    description: 'Full-service with ongoing support',
    features: [
      'All standard features',
      'Priority processing',
      'Legal review',
      'Business setup assistance',
      '12-month compliance support',
      'Dedicated relationship manager'
    ]
  }
];

export default function BusinessVisaPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-blue-600 to-green-600 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <FaChartLine className="text-6xl mx-auto mb-6 text-yellow-300" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Business Visa Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Transform your business vision into global opportunities with our expert immigration guidance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="btn-primary bg-yellow-500 hover:bg-yellow-600 text-black"
              >
                <FaCalculator className="mr-2" />
                Business Assessment
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="btn-outline border-white text-white hover:bg-white hover:text-blue-600"
              >
                <FaPhoneAlt className="mr-2" />
                Expert Consultation
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {successMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <metric.icon className="text-2xl text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{metric.number}</div>
                <div className="text-gray-600">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Programs */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg mb-4">Business Immigration Programs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore investment and entrepreneur visa options across major destinations
            </p>
          </motion.div>

          <div className="space-y-12">
            {investmentPrograms.map((country, countryIndex) => (
              <motion.div
                key={countryIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: countryIndex * 0.2 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                  <div className="flex items-center">
                    <span className="text-4xl mr-4">{country.flag}</span>
                    <h3 className="text-2xl font-bold">{country.country}</h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {country.programs.map((program, programIndex) => (
                      <div key={programIndex} className="border rounded-lg p-4">
                        <h4 className="text-lg font-bold text-gray-800 mb-3">{program.name}</h4>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm">
                            <FaDollarSign className="text-green-500 mr-2" />
                            <span className="font-medium">Investment: </span>
                            <span className="text-gray-600 ml-1">{program.investment}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <FaClock className="text-blue-500 mr-2" />
                            <span className="font-medium">Timeline: </span>
                            <span className="text-gray-600 ml-1">{program.timeline}</span>
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="font-medium text-gray-700 mb-2">Key Highlights:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {program.highlights.map((highlight, idx) => (
                              <li key={idx} className="flex items-center">
                                <FaCheck className="text-green-500 mr-2 text-xs" />
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Types */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg mb-4">Suitable Business Types</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Various business models and industries that qualify for business immigration programs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {businessTypes.map((business, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                    <business.icon className="text-xl text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{business.type}</h3>
                </div>
                
                <p className="text-gray-600 mb-4">{business.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">Examples:</h4>
                  <div className="flex flex-wrap gap-2">
                    {business.examples.map((example, idx) => (
                      <span key={idx} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Suitable Programs:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {business.suitablePrograms.map((program, idx) => (
                      <li key={idx} className="flex items-center">
                        <FaCheck className="text-green-500 mr-2 text-xs" />
                        {program}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg mb-4">Our Business Immigration Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A structured approach to guide you through every step of your business immigration journey
            </p>
          </motion.div>

          <div className="space-y-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="lg:w-1/2">
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="flex items-center mb-4">
                      <div className="bg-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mr-4">
                        {step.step}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <FaClock className="mr-1" />
                          {step.duration}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Key Activities:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {step.activities.map((activity, idx) => (
                          <li key={idx} className="flex items-center">
                            <FaCheck className="text-green-500 mr-2 text-xs" />
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="lg:w-1/2 flex justify-center">
                  <div className="w-64 h-48 bg-gradient-to-br from-purple-100 to-blue-200 rounded-xl flex items-center justify-center">
                    <FaChartLine className="text-6xl text-purple-600" />
                  </div>
                </div>
              </motion.div>
            ))}
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
              Comprehensive packages designed to meet different business immigration needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packagePricing.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-xl p-6 shadow-lg relative ${
                  pkg.popular ? 'border-2 border-purple-500 transform scale-105' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Recommended
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{pkg.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
                  <div className="text-3xl font-bold text-purple-600 mb-2">{pkg.price}</div>
                  <div className="text-gray-500 text-sm">Plus government fees</div>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <FaCheck className="text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  pkg.popular 
                    ? 'bg-purple-600 text-white hover:bg-purple-700' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}>
                  Select Package
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="heading-lg mb-4">Ready to Expand Your Business Globally?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Get expert guidance on the best business immigration strategy for your goals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="btn-primary bg-white text-purple-600 hover:bg-gray-100"
              >
                <FaCalculator className="mr-2" />
                Business Assessment
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="btn-outline border-white text-white hover:bg-white hover:text-purple-600"
              >
                <FaPhoneAlt className="mr-2" />
                Schedule Consultation
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
