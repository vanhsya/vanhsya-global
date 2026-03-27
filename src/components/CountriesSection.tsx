'use client';
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaClock, FaDollarSign, FaArrowRight, FaInfoCircle } from 'react-icons/fa';

interface CountryCardProps {
  name: string;
  flag: string;
  description: string;
  popularVisas: string[];
  averageProcessingTime: string;
  estimatedCost: string;
  keyRequirements: string[];
  isPopular?: boolean;
  href: string;
}

const CountryCard: React.FC<CountryCardProps> = ({
  name,
  flag,
  description,
  popularVisas,
  averageProcessingTime,
  estimatedCost,
  keyRequirements,
  isPopular = false,
  href
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      whileHover={{ y: -5 }}
      className={`relative card h-auto ${isPopular ? 'ring-2 ring-amber-400' : ''}`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}

      <div className="flex items-center mb-4">
        <span className="text-4xl mr-4">{flag}</span>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-500">Immigration Destination</p>
        </div>
      </div>

      <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <FaClock className="mr-2" />
            Processing Time:
          </div>
          <span className="text-sm font-medium text-gray-800">{averageProcessingTime}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <FaDollarSign className="mr-2" />
            Starting from:
          </div>
          <span className="text-lg font-bold text-blue-600">{estimatedCost}</span>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-800 mb-2">Popular Visa Types:</h4>
        <div className="flex flex-wrap gap-2">
          {popularVisas.map((visa, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
            >
              {visa}
            </span>
          ))}
        </div>
      </div>

      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center text-sm text-blue-600 hover:text-blue-700 mb-4"
      >
        <FaInfoCircle className="mr-2" />
        {isExpanded ? 'Hide Requirements' : 'View Key Requirements'}
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4"
          >
            <h5 className="text-sm font-semibold text-gray-800 mb-2">Key Requirements:</h5>
            <ul className="space-y-1">
              {keyRequirements.map((requirement, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                  {requirement}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={href}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="btn-primary w-full group inline-flex items-center justify-center mt-auto"
      >
        Explore {name}
        <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
      </motion.a>
    </motion.div>
  );
};

const CountriesSection: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  const countries: (CountryCardProps & { region: string })[] = [
    {
      name: 'Canada',
      flag: '🇨🇦',
      region: 'north-america',
      description: 'Known for its welcoming immigration policies, excellent healthcare, and high quality of life. Canada offers multiple pathways to permanent residency.',
      popularVisas: ['Express Entry', 'PNP', 'Family Class', 'Work Permit'],
      averageProcessingTime: '6-12 months',
      estimatedCost: '$1,500',
      keyRequirements: [
        'Language proficiency (English/French)',
        'Educational credential assessment',
        'Work experience documentation',
        'Medical examination',
        'Police clearance certificates'
      ],
      isPopular: true,
      href: '/countries/canada'
    },
    {
      name: 'Australia',
      flag: '🇦🇺',
      region: 'oceania',
      description: 'Offers a points-based immigration system with excellent opportunities for skilled workers in a vibrant, multicultural society.',
      popularVisas: ['Skilled Independent', 'Employer Sponsored', 'Student Visa', 'Partner Visa'],
      averageProcessingTime: '8-15 months',
      estimatedCost: '$2,000',
      keyRequirements: [
        'Skills assessment',
        'English language test (IELTS/PTE)',
        'Health insurance',
        'Character requirements',
        'Age requirements (under 45 for most visas)'
      ],
      href: '/countries/australia'
    },
    {
      name: 'United States',
      flag: '🇺🇸',
      region: 'north-america',
      description: 'The land of opportunity with diverse visa options for work, study, investment, and family reunification.',
      popularVisas: ['H-1B', 'L-1', 'EB-5', 'F-1', 'Family Based'],
      averageProcessingTime: '8-24 months',
      estimatedCost: '$2,500',
      keyRequirements: [
        'Petition approval',
        'Financial documentation',
        'Medical examination',
        'Interview at US consulate',
        'Background checks'
      ],
      href: '/countries/usa'
    },
    {
      name: 'United Kingdom',
      flag: '🇬🇧',
      region: 'europe',
      description: 'Rich in history and culture, the UK offers pathways for skilled workers, students, and investors.',
      popularVisas: ['Skilled Worker', 'Student Visa', 'Investor Visa', 'Family Visa'],
      averageProcessingTime: '3-8 weeks',
      estimatedCost: '$1,800',
      keyRequirements: [
        'Certificate of Sponsorship',
        'English language requirement',
        'Financial requirements',
        'Tuberculosis test',
        'Criminal record check'
      ],
      href: '/countries/uk'
    },
    {
      name: 'Germany',
      flag: '🇩🇪',
      region: 'europe',
      description: 'Europes economic powerhouse with strong job market and excellent social benefits for residents.',
      popularVisas: ['EU Blue Card', 'Job Seeker Visa', 'Student Visa', 'Family Reunion'],
      averageProcessingTime: '4-12 weeks',
      estimatedCost: '$1,200',
      keyRequirements: [
        'University degree recognition',
        'German language skills',
        'Job offer or qualification',
        'Health insurance',
        'Financial proof'
      ],
      href: '/countries/germany'
    },
    {
      name: 'New Zealand',
      flag: '🇳🇿',
      region: 'oceania',
      description: 'Known for its stunning landscapes and work-life balance, offering clear pathways to residency.',
      popularVisas: ['Skilled Migrant', 'Work to Residence', 'Student Visa', 'Partner Visa'],
      averageProcessingTime: '6-18 months',
      estimatedCost: '$1,600',
      keyRequirements: [
        'Points-based assessment',
        'English language proficiency',
        'Health and character requirements',
        'Age requirements',
        'Skilled employment offer'
      ],
      href: '/countries/new-zealand'
    }
  ];

  const regions = [
    { value: 'all', label: 'All Countries' },
    { value: 'north-america', label: 'North America' },
    { value: 'europe', label: 'Europe' },
    { value: 'oceania', label: 'Oceania' }
  ];

  const filteredCountries = selectedRegion === 'all' 
    ? countries 
    : countries.filter(country => country.region === selectedRegion);

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg mb-6">
            <span className="gradient-text">Global Destinations</span> We Serve
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Explore immigration opportunities across the worlds most sought-after destinations. 
            Each country offers unique pathways to achieve your global mobility goals.
          </p>

          {/* Region Filter */}
          <div className="flex flex-wrap justify-center gap-4">
            {regions.map((region) => (
              <motion.button
                key={region.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedRegion(region.value)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedRegion === region.value
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                {region.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredCountries.map((country, index) => (
              <motion.div
                key={country.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
              >
                <CountryCard {...country} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <FaMapMarkerAlt className="text-4xl text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Dont See Your Preferred Destination?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We provide immigration services for many additional countries not listed here. 
              Contact our experts to discuss your specific destination and requirements.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              Request Custom Consultation
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CountriesSection;
