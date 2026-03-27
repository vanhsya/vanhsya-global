'use client';
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaPlane, 
  FaCheck, 
  FaClock,
  FaCamera,
  FaMapMarkedAlt,
  FaUmbrellaBeach,
  FaCalculator,
  FaPhoneAlt,
  FaPassport,
  FaGlobe,
  FaCalendarAlt
} from 'react-icons/fa';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AnimatedCard from '@/components/AnimatedCard';

const touristVisaTypes = [
  {
    name: 'Single Entry Tourist Visa',
    icon: FaPlane,
    countries: ['Canada', 'USA', 'UK', 'Schengen'],
    validity: '6 months',
    stay: '30-90 days',
    description: 'Perfect for first-time visitors planning a single trip for tourism, family visits, or business meetings.',
    best_for: ['First-time travelers', 'Short vacations', 'Family visits', 'Business meetings'],
    processing: '2-4 weeks'
  },
  {
    name: 'Multiple Entry Tourist Visa',
    icon: FaGlobe,
    countries: ['Canada', 'USA', 'UK', 'Australia'],
    validity: '5-10 years',
    stay: '180 days per entry',
    description: 'Ideal for frequent travelers who plan multiple visits over several years.',
    best_for: ['Business travelers', 'Frequent visitors', 'Family connections', 'Regular tourism'],
    processing: '3-6 weeks'
  },
  {
    name: 'Transit Visa',
    icon: FaMapMarkedAlt,
    countries: ['Canada', 'UK', 'Schengen', 'USA'],
    validity: '6 months',
    stay: '24-48 hours',
    description: 'Required for travelers passing through certain countries en route to their final destination.',
    best_for: ['Connecting flights', 'Airport layovers', 'Transit stops', 'Onward travel'],
    processing: '1-2 weeks'
  },
  {
    name: 'eVisa/ETA',
    icon: FaPassport,
    countries: ['Australia', 'Canada', 'USA', 'UK'],
    validity: '1-5 years',
    stay: '90-180 days',
    description: 'Electronic travel authorization for eligible countries, processed entirely online.',
    best_for: ['Quick processing', 'Online application', 'Eligible nationalities', 'Convenient travel'],
    processing: '24-72 hours'
  }
];

const popularDestinations = [
  {
    country: 'Canada',
    flag: '🇨🇦',
    highlights: ['Niagara Falls', 'Rocky Mountains', 'Toronto CN Tower', 'Quebec City'],
    visa_type: 'Visitor Visa',
    processing: '2-4 weeks',
    validity: '10 years',
    stay: '6 months per visit',
    requirements: ['Passport', 'Photos', 'Financial proof', 'Travel itinerary']
  },
  {
    country: 'USA',
    flag: '🇺🇸',
    highlights: ['New York City', 'Grand Canyon', 'Disney World', 'Las Vegas'],
    visa_type: 'B-1/B-2 Visa',
    processing: '3-5 weeks',
    validity: '10 years',
    stay: '180 days per visit',
    requirements: ['DS-160 form', 'Interview', 'Financial documents', 'Travel purpose']
  },
  {
    country: 'United Kingdom',
    flag: '🇬🇧',
    highlights: ['London Eye', 'Edinburgh Castle', 'Stonehenge', 'Lake District'],
    visa_type: 'Standard Visitor',
    processing: '3 weeks',
    validity: '6 months - 10 years',
    stay: '6 months per visit',
    requirements: ['Application form', 'Biometrics', 'Financial evidence', 'Accommodation']
  },
  {
    country: 'Australia',
    flag: '🇦🇺',
    highlights: ['Sydney Opera House', 'Great Barrier Reef', 'Uluru', 'Melbourne'],
    visa_type: 'Visitor Visa (600)',
    processing: '1-4 weeks',
    validity: '1-3 years',
    stay: '3-12 months',
    requirements: ['Health insurance', 'Character requirements', 'Financial capacity', 'Genuine tourist']
  },
  {
    country: 'Schengen Area',
    flag: '🇪🇺',
    highlights: ['Paris Eiffel Tower', 'Rome Colosseum', 'Amsterdam Canals', 'Swiss Alps'],
    visa_type: 'Schengen Visa',
    processing: '2-4 weeks',
    validity: '90 days in 180 days',
    stay: '90 days maximum',
    requirements: ['Travel insurance', 'Accommodation proof', 'Itinerary', 'Financial means']
  },
  {
    country: 'New Zealand',
    flag: '🇳🇿',
    highlights: ['Milford Sound', 'Queenstown', 'Rotorua', 'Hobbiton'],
    visa_type: 'Visitor Visa',
    processing: '2-3 weeks',
    validity: '18 months',
    stay: '9 months per visit',
    requirements: ['Health requirements', 'Character requirements', 'Financial proof', 'Return ticket']
  }
];

const visaProcessSteps = [
  {
    step: 1,
    title: 'Destination Consultation',
    description: 'Choose your destination and understand visa requirements specific to your nationality',
    duration: '30 minutes',
    activities: ['Country selection', 'Visa type determination', 'Requirements overview', 'Timeline planning']
  },
  {
    step: 2,
    title: 'Document Collection',
    description: 'Gather all required documents including passport, photos, and supporting documents',
    duration: '1-2 weeks',
    activities: ['Passport preparation', 'Photo specifications', 'Financial documents', 'Travel bookings']
  },
  {
    step: 3,
    title: 'Application Submission',
    description: 'Complete visa application forms and submit with required documentation',
    duration: '1 week',
    activities: ['Form completion', 'Document review', 'Fee payment', 'Biometric appointment']
  },
  {
    step: 4,
    title: 'Processing Period',
    description: 'Embassy/consulate processes your application and conducts necessary checks',
    duration: '1-6 weeks',
    activities: ['Application review', 'Background verification', 'Interview (if required)', 'Decision making']
  },
  {
    step: 5,
    title: 'Visa Collection & Travel',
    description: 'Receive your visa and prepare for your journey with travel tips and guidance',
    duration: '1 week',
    activities: ['Visa collection', 'Travel preparation', 'Entry requirements', 'Travel insurance']
  }
];

const travelPackages = [
  {
    name: 'Explorer',
    price: '$299',
    description: 'Basic tourist visa assistance',
    features: [
      'Visa consultation (1 hour)',
      'Document checklist',
      'Application form guidance',
      'Basic interview preparation',
      'Email support',
      'Processing time estimates'
    ],
    countries: 'Single country',
    processing: 'Standard'
  },
  {
    name: 'Adventurer',
    price: '$599',
    description: 'Complete tourist visa service',
    features: [
      'Comprehensive consultation',
      'Complete document preparation',
      'Application review & submission',
      'Interview coaching',
      'Travel itinerary assistance',
      'Phone & email support',
      'Visa tracking',
      'Travel tips & guidance'
    ],
    countries: 'Up to 2 countries',
    processing: 'Priority'
  },
  {
    name: 'Globetrotter',
    price: '$999',
    description: 'Premium travel visa concierge',
    features: [
      'Multi-destination planning',
      'Complete visa management',
      'Expedited processing',
      'VIP appointment booking',
      'Travel insurance guidance',
      '24/7 priority support',
      'Emergency assistance',
      'Post-visa travel support',
      'Multiple entry optimization'
    ],
    countries: 'Multiple countries',
    processing: 'Expedited'
  }
];

const travelTips = [
  {
    icon: FaCalendarAlt,
    title: 'Plan Ahead',
    tip: 'Apply for your tourist visa at least 4-6 weeks before your planned travel date to avoid delays.'
  },
  {
    icon: FaPassport,
    title: 'Passport Validity',
    tip: 'Ensure your passport is valid for at least 6 months beyond your intended stay in the destination country.'
  },
  {
    icon: FaCamera,
    title: 'Photo Requirements',
    tip: 'Follow specific photo requirements for each country - size, background, and facial expression matter.'
  },
  {
    icon: FaUmbrellaBeach,
    title: 'Travel Insurance',
    tip: 'Many countries require travel insurance. Purchase comprehensive coverage before applying.'
  }
];

const successMetrics = [
  { metric: '98%', label: 'Approval Rate', icon: FaCheck },
  { metric: '25,000+', label: 'Visas Processed', icon: FaPlane },
  { metric: '150+', label: 'Destinations', icon: FaGlobe },
  { metric: '48hrs', label: 'Fastest Processing', icon: FaClock }
];

export default function TouristVisaPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <FaPlane className="text-6xl mx-auto mb-6 text-cyan-300" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Tourist Visa Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-cyan-100">
              Explore the world with confidence through our expert tourist visa and travel documentation services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="btn-primary bg-white text-blue-600 hover:bg-gray-100"
              >
                <FaCalculator className="mr-2" />
                Check Requirements
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="btn-outline border-white text-white hover:bg-white hover:text-blue-600"
              >
                <FaPhoneAlt className="mr-2" />
                Travel Consultation
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
                <item.icon className="text-3xl text-blue-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-800 mb-2">{item.metric}</div>
                <div className="text-gray-600">{item.label}</div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Tourist Visa Types */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg mb-4">Tourist Visa Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the right visa type based on your travel plans and destination requirements
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {touristVisaTypes.map((visa, index) => (
              <AnimatedCard
                key={index}
                delay={index * 0.1}
                className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                    <visa.icon className="text-xl text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{visa.name}</h3>
                    <div className="text-sm text-gray-500">Processing: {visa.processing}</div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{visa.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Validity:</span>
                    <div className="text-blue-600">{visa.validity}</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Max Stay:</span>
                    <div className="text-blue-600">{visa.stay}</div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">Available Countries:</h4>
                  <div className="flex flex-wrap gap-2">
                    {visa.countries.map((country, idx) => (
                      <span key={idx} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {country}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">Best For:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {visa.best_for.map((purpose, idx) => (
                      <li key={idx} className="flex items-center">
                        <FaCheck className="text-green-500 mr-2 text-xs" />
                        {purpose}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Apply Now
                </button>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg mb-4">Popular Tourist Destinations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover amazing destinations and their specific visa requirements
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularDestinations.map((destination, index) => (
              <AnimatedCard
                key={index}
                delay={index * 0.1}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-4">{destination.flag}</span>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{destination.country}</h3>
                    <div className="text-sm text-blue-600">{destination.visa_type}</div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">Must-See Attractions:</h4>
                  <div className="grid grid-cols-2 gap-1">
                    {destination.highlights.map((highlight, idx) => (
                      <div key={idx} className="text-sm text-gray-600 flex items-center">
                        <FaCamera className="text-blue-500 mr-2 text-xs" />
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Processing:</span>
                    <div className="text-gray-600">{destination.processing}</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Validity:</span>
                    <div className="text-gray-600">{destination.validity}</div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <span className="font-medium text-gray-700">Max Stay:</span>
                  <div className="text-blue-600 font-medium">{destination.stay}</div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2 text-sm">Key Requirements:</h4>
                  <div className="space-y-1">
                    {destination.requirements.map((req, idx) => (
                      <div key={idx} className="text-xs text-gray-600 flex items-center">
                        <FaCheck className="text-green-500 mr-2" style={{ fontSize: '8px' }} />
                        {req}
                      </div>
                    ))}
                  </div>
                </div>
                
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  Start Application
                </button>
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
            <h2 className="heading-lg mb-4">Tourist Visa Application Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our streamlined process ensures a smooth visa application experience
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200 hidden md:block"></div>
              {visaProcessSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex items-start mb-12"
                >
                  <div className="absolute left-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center md:relative md:mr-8">
                    <span className="text-white font-bold text-sm">{step.step}</span>
                  </div>
                  <div className="ml-16 md:ml-0 bg-white rounded-lg p-6 shadow-lg flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
                      <span className="text-sm text-blue-600 font-medium">{step.duration}</span>
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

      {/* Travel Tips */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg mb-4">Essential Travel Tips</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Important tips to ensure a successful visa application and smooth travel experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {travelTips.map((tip, index) => (
              <AnimatedCard
                key={index}
                delay={index * 0.1}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-start">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <tip.icon className="text-xl text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{tip.title}</h3>
                    <p className="text-gray-600">{tip.tip}</p>
                  </div>
                </div>
              </AnimatedCard>
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
            <h2 className="heading-lg mb-4">Tourist Visa Service Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the perfect package for your travel plans and destination requirements
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {travelPackages.map((plan, index) => (
              <AnimatedCard
                key={index}
                delay={index * 0.1}
                className={`bg-white rounded-xl p-8 shadow-lg relative ${
                  index === 1 
                    ? 'border-2 border-blue-500 transform scale-105' 
                    : 'border border-gray-200'
                }`}
              >
                {index === 1 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-blue-600 mb-2">{plan.price}</div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>
                
                <div className="mb-6">
                  <div className="grid grid-cols-1 gap-2 mb-4">
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">Countries: </span>
                      <span className="text-blue-600">{plan.countries}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">Processing: </span>
                      <span className="text-blue-600">{plan.processing}</span>
                    </div>
                  </div>
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
                  index === 1
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
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
      <section className="section-padding bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <FaPlane className="text-5xl mx-auto mb-6 text-cyan-300" />
            <h2 className="heading-lg mb-4">Ready to Explore the World?</h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Let us handle your tourist visa application so you can focus on planning your perfect journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="btn-primary bg-white text-blue-600 hover:bg-gray-100"
              >
                <FaCalculator className="mr-2" />
                Check Visa Requirements
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="btn-outline border-white text-white hover:bg-white hover:text-blue-600"
              >
                <FaPhoneAlt className="mr-2" />
                Plan Your Trip
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
