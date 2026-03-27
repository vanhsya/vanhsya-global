'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaGraduationCap, 
  FaCheck, 
  FaClock, 
  FaUniversity,
  FaGlobe,
  FaBookOpen,
  FaCalculator,
  FaPhoneAlt
} from 'react-icons/fa';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';


const countries = [
  {
    name: 'Canada',
    flag: '🇨🇦',
    highlights: ['Post-graduation work permits', 'Pathway to PR', 'Quality education', 'Affordable tuition'],
    tuitionRange: '$15,000 - $35,000/year',
    livingCost: '$12,000 - $18,000/year',
    workRights: '20 hrs/week during studies'
  },
  {
    name: 'Australia',
    flag: '🇦🇺',
    highlights: ['World-class universities', 'Post-study work visa', 'Research opportunities', 'Vibrant student life'],
    tuitionRange: '$20,000 - $45,000/year',
    livingCost: '$18,000 - $25,000/year',
    workRights: '48 hrs/fortnight during studies'
  },
  {
    name: 'United Kingdom',
    flag: '🇬🇧',
    highlights: ['Prestigious institutions', 'Graduate visa route', 'Rich cultural heritage', 'English proficiency'],
    tuitionRange: '$15,000 - $50,000/year',
    livingCost: '$15,000 - $20,000/year',
    workRights: '20 hrs/week during studies'
  },
  {
    name: 'United States',
    flag: '🇺🇸',
    highlights: ['Top-ranked universities', 'OPT opportunities', 'Research facilities', 'Diverse programs'],
    tuitionRange: '$25,000 - $60,000/year',
    livingCost: '$15,000 - $25,000/year',
    workRights: 'On-campus work permitted'
  }
];

const popularPrograms = [
  {
    level: 'Undergraduate',
    programs: ['Business Administration', 'Computer Science', 'Engineering', 'Healthcare'],
    duration: '3-4 years',
    entryRequirements: 'High school diploma, IELTS 6.0+'
  },
  {
    level: 'Postgraduate',
    programs: ['MBA', 'Master of Engineering', 'Data Science', 'Public Health'],
    duration: '1-2 years',
    entryRequirements: 'Bachelor degree, IELTS 6.5+'
  },
  {
    level: 'Doctoral',
    programs: ['PhD Programs', 'Research Doctorate', 'Professional Doctorate'],
    duration: '3-5 years',
    entryRequirements: 'Master degree, Research proposal'
  },
  {
    level: 'Diploma/Certificate',
    programs: ['IT Certification', 'Trade Programs', 'Language Courses'],
    duration: '6 months - 2 years',
    entryRequirements: 'Varies by program'
  }
];

const processSteps = [
  {
    step: 1,
    title: 'Initial Assessment',
    description: 'Evaluate academic background, career goals, and preferred destinations.',
    duration: '1-2 days',
    deliverables: ['Eligibility assessment', 'Country recommendations', 'Program suggestions']
  },
  {
    step: 2,
    title: 'University Selection',
    description: 'Research and shortlist universities based on your profile and preferences.',
    duration: '1-2 weeks',
    deliverables: ['University shortlist', 'Program comparison', 'Application timeline']
  },
  {
    step: 3,
    title: 'Application Preparation',
    description: 'Prepare and submit applications to selected universities.',
    duration: '2-4 weeks',
    deliverables: ['Application forms', 'Document preparation', 'Essay writing support']
  },
  {
    step: 4,
    title: 'Offer Management',
    description: 'Manage offers, negotiate terms, and secure your preferred choice.',
    duration: '2-8 weeks',
    deliverables: ['Offer evaluation', 'Acceptance guidance', 'Scholarship applications']
  },
  {
    step: 5,
    title: 'Visa Application',
    description: 'Prepare and submit student visa application with required documentation.',
    duration: '4-12 weeks',
    deliverables: ['Visa application', 'Financial documentation', 'Interview preparation']
  },
  {
    step: 6,
    title: 'Pre-departure Support',
    description: 'Comprehensive support for travel, accommodation, and settling in.',
    duration: '2-4 weeks',
    deliverables: ['Travel arrangements', 'Accommodation booking', 'Orientation materials']
  }
];

const costs = [
  {
    service: 'Basic Package',
    description: 'University selection and application assistance',
    price: '$2,500',
    includes: ['Up to 5 university applications', 'Document preparation', 'Application tracking', 'Basic visa guidance']
  },
  {
    service: 'Comprehensive Package',
    description: 'Complete study abroad solution',
    price: '$4,500',
    includes: ['Unlimited university applications', 'Visa application support', 'Scholarship assistance', 'Pre-departure support'],
    popular: true
  },
  {
    service: 'Premium Package',
    description: 'White-glove service with ongoing support',
    price: '$6,500',
    includes: ['All comprehensive features', 'Priority processing', 'Interview coaching', '6-month post-arrival support']
  }
];

export default function StudyVisaPage() {

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-blue-600 to-purple-700 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <FaGraduationCap className="text-6xl mx-auto mb-6 text-yellow-300" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Study Visa Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Transform your academic dreams into reality with our comprehensive study abroad solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="btn-primary bg-yellow-500 hover:bg-yellow-600 text-black"
              >
                <FaCalculator className="mr-2" />
                Free Assessment
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="btn-outline border-white text-white hover:bg-white hover:text-blue-600"
              >
                <FaPhoneAlt className="mr-2" />
                Speak to Expert
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUniversity className="text-2xl text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">University Selection</h3>
              <p className="text-gray-600">Expert guidance in choosing the right institution and program for your career goals.</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaBookOpen className="text-2xl text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Application Support</h3>
              <p className="text-gray-600">Complete assistance with applications, essays, and documentation requirements.</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaGlobe className="text-2xl text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Visa Processing</h3>
              <p className="text-gray-600">Streamlined student visa applications with high success rates.</p>
            </motion.div>
          </div>

          {/* Key Statistics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
              <div className="text-gray-600">Visa Success Rate</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-3xl font-bold text-blue-600 mb-2">2,500+</div>
              <div className="text-gray-600">Students Placed</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-gray-600">Partner Universities</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-3xl font-bold text-orange-600 mb-2">25+</div>
              <div className="text-gray-600">Countries Served</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Countries Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg mb-4">Popular Study Destinations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore world-class education opportunities in top international destinations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {countries.map((country, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-4">{country.flag}</span>
                  <h3 className="text-2xl font-bold text-gray-800">{country.name}</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Key Highlights</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {country.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-center">
                          <FaCheck className="text-green-500 mr-2 text-xs" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium text-gray-700">Tuition: </span>
                      <span className="text-gray-600">{country.tuitionRange}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Living Cost: </span>
                      <span className="text-gray-600">{country.livingCost}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Work Rights: </span>
                      <span className="text-gray-600">{country.workRights}</span>
                    </div>
                  </div>
                </div>
                
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Learn More About {country.name}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Study Programs */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg mb-4">Popular Study Programs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From undergraduate degrees to doctoral programs, find the right academic path for your career goals
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularPrograms.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-blue-500"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-3">{program.level}</h3>
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">Popular Programs:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {program.programs.map((prog, idx) => (
                      <li key={idx}>• {prog}</li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Duration: </span>
                    <span className="text-gray-600">{program.duration}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Entry: </span>
                    <span className="text-gray-600">{program.entryRequirements}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
            <h2 className="heading-lg mb-4">Our Study Visa Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A systematic approach to ensure your study abroad journey is smooth and successful
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
                      <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mr-4">
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
                      <h4 className="font-semibold text-gray-700 mb-2">Deliverables:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {step.deliverables.map((deliverable, idx) => (
                          <li key={idx} className="flex items-center">
                            <FaCheck className="text-green-500 mr-2 text-xs" />
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="lg:w-1/2 flex justify-center">
                  <div className="w-64 h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                    <FaGraduationCap className="text-6xl text-blue-600" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg mb-4">Service Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Transparent pricing with no hidden fees. Choose the package that best fits your needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {costs.map((cost, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-xl p-6 shadow-lg relative ${
                  cost.popular ? 'border-2 border-blue-500 transform scale-105' : ''
                }`}
              >
                {cost.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{cost.service}</h3>
                  <p className="text-gray-600 text-sm mb-4">{cost.description}</p>
                  <div className="text-3xl font-bold text-blue-600 mb-2">{cost.price}</div>
                  <div className="text-gray-500 text-sm">Professional fees only</div>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {cost.includes.map((item, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <FaCheck className="text-green-500 mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  cost.popular 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}>
                  Choose Package
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="heading-lg mb-4">Ready to Start Your Study Journey?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Get your free assessment and take the first step towards international education
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="btn-primary bg-white text-blue-600 hover:bg-gray-100"
              >
                <FaCalculator className="mr-2" />
                Free Assessment
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="btn-outline border-white text-white hover:bg-white hover:text-blue-600"
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
