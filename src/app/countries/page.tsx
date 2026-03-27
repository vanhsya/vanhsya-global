'use client';

import { motion } from 'framer-motion';
import { ArrowRight, DollarSign, Clock, CheckCircle, Star, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const countries = [
  {
    name: "Canada",
    flag: "🇨🇦",
    description: "World-class healthcare, excellent education system, and high quality of life",
    gradient: "card-purple",
    stats: {
      programs: "80+",
      processing: "6-12 months",
      investment: "$13,310 CAD",
      success: "97%"
    },
    highlights: [
      "Express Entry System",
      "Provincial Nominee Program", 
      "Free Healthcare",
      "Multicultural Society"
    ],
    href: "/countries/canada"
  },
  {
    name: "Australia", 
    flag: "🇦🇺",
    description: "Strong economy, beautiful landscapes, and excellent work-life balance",
    gradient: "card-cyan",
    stats: {
      programs: "60+",
      processing: "8-16 months", 
      investment: "$4,045 AUD",
      success: "94%"
    },
    highlights: [
      "SkillSelect System",
      "State Nomination",
      "Points-based Immigration",
      "World-class Universities"
    ],
    href: "/countries/australia"
  },
  {
    name: "United States",
    flag: "🇺🇸", 
    description: "Land of opportunities with diverse career prospects and innovation hubs",
    gradient: "card-pink",
    stats: {
      programs: "50+",
      processing: "12-24 months",
      investment: "$1,760 USD",
      success: "89%"
    },
    highlights: [
      "H-1B Visa Program",
      "EB-5 Investment",
      "Family-based Immigration",
      "Tech Innovation Centers"
    ],
    href: "/countries/usa"
  },
  {
    name: "United Kingdom",
    flag: "🇬🇧",
    description: "Rich history, excellent education, and gateway to Europe",
    gradient: "card-green", 
    stats: {
      programs: "40+",
      processing: "3-8 months",
      investment: "£1,523 GBP",
      success: "92%"
    },
    highlights: [
      "Points-based System",
      "Global Talent Visa",
      "Student Routes",
      "NHS Healthcare"
    ],
    href: "/countries/uk"
  },
  {
    name: "Germany",
    flag: "🇩🇪",
    description: "Economic powerhouse with excellent social benefits and job security",
    gradient: "card-orange",
    stats: {
      programs: "35+", 
      processing: "4-10 months",
      investment: "€75 EUR",
      success: "91%"
    },
    highlights: [
      "EU Blue Card",
      "Job Seeker Visa",
      "Free Education",
      "Strong Economy"
    ],
    href: "/countries/germany"
  },
  {
    name: "New Zealand",
    flag: "🇳🇿",
    description: "Stunning natural beauty, friendly people, and excellent quality of life",
    gradient: "card-purple",
    stats: {
      programs: "25+",
      processing: "6-14 months", 
      investment: "$2,310 NZD",
      success: "93%"
    },
    highlights: [
      "Skilled Migrant Category",
      "Work to Residence",
      "Natural Beauty",
      "Work-Life Balance"
    ],
    href: "/countries/new-zealand"
  }
];

const popularDestinations = [
  { country: "Canada", percentage: "35%", trend: "+12%" },
  { country: "Australia", percentage: "28%", trend: "+8%" },
  { country: "USA", percentage: "18%", trend: "+5%" },
  { country: "UK", percentage: "12%", trend: "+15%" },
  { country: "Germany", percentage: "5%", trend: "+20%" },
  { country: "Others", percentage: "2%", trend: "+10%" }
];

const comparisonFactors = [
  {
    factor: "Processing Time",
    icon: Clock,
    description: "Average time from application to approval"
  },
  {
    factor: "Investment Required", 
    icon: DollarSign,
    description: "Minimum financial requirements"
  },
  {
    factor: "Job Market",
    icon: TrendingUp,
    description: "Employment opportunities and demand"
  },
  {
    factor: "Quality of Life",
    icon: Star,
    description: "Healthcare, education, and living standards"
  }
];

export default function CountriesPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="section-padding pt-32 bg-gradient-to-br from-purple-600 via-blue-600 to-pink-500">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="heading-xl text-white mb-6">
              Explore <span className="text-gradient-cyan">Immigration Destinations</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              Discover the best countries for immigration based on your profile, career goals, and lifestyle preferences.
            </p>
            <Link 
              href="/tools/country-selector"
              className="btn-primary group"
            >
              Find Your Ideal Country
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Popular Destinations Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="modern-card bg-white/10 backdrop-blur-md border-white/20 max-w-4xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">2024 Popular Destinations</h3>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {popularDestinations.map((dest, index) => (
                <motion.div
                  key={dest.country}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl font-bold text-white">{dest.percentage}</div>
                  <div className="text-white/80 text-sm">{dest.country}</div>
                  <div className="text-green-300 text-xs">{dest.trend}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Countries Grid */}
      <section className="section-padding bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg text-gradient mb-6">
              Top Immigration Destinations
            </h2>
            <p className="text-modern max-w-3xl mx-auto">
              Compare key factors and choose the country that best matches your immigration goals.
            </p>
          </motion.div>

          <div className="grid-modern">
            {countries.map((country, index) => (
              <motion.div
                key={country.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                className={`service-card ${country.gradient} group cursor-pointer`}
                whileHover={{ y: -8 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{country.flag}</div>
                  <h3 className="heading-sm text-white">{country.name}</h3>
                </div>
                
                <p className="text-white-soft mb-6 leading-relaxed">
                  {country.description}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{country.stats.programs}</div>
                    <div className="text-white/70 text-xs">Programs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{country.stats.success}</div>
                    <div className="text-white/70 text-xs">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-white">{country.stats.processing}</div>
                    <div className="text-white/70 text-xs">Processing</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-white">{country.stats.investment}</div>
                    <div className="text-white/70 text-xs">Min. Investment</div>
                  </div>
                </div>

                {/* Highlights */}
                <div className="space-y-2 mb-6">
                  {country.highlights.map((highlight, highlightIndex) => (
                    <motion.div
                      key={highlight}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: (index * 0.1) + (highlightIndex * 0.05) }}
                      viewport={{ once: true }}
                      className="flex items-center gap-2 text-white/80 text-sm"
                    >
                      <CheckCircle className="w-4 h-4 text-white/60" />
                      {highlight}
                    </motion.div>
                  ))}
                </div>

                <Link 
                  href={country.href}
                  className="inline-flex items-center gap-2 text-white font-medium hover:gap-4 transition-all group w-full justify-center bg-white/20 backdrop-blur-sm rounded-xl py-3 hover:bg-white/30"
                >
                  Explore {country.name}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Factors */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg text-white mb-6">
              Key <span className="text-gradient-pink">Comparison Factors</span>
            </h2>
            <p className="text-white/90 text-xl max-w-3xl mx-auto">
              Important factors to consider when choosing your immigration destination
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {comparisonFactors.map((factor, index) => {
              const IconComponent = factor.icon;
              return (
                <motion.div
                  key={factor.factor}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="modern-card text-center group hover:scale-105 transition-transform"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="heading-sm mb-3 text-gray-800">{factor.factor}</h3>
                  <p className="text-gray-600 leading-relaxed">{factor.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="modern-card max-w-4xl mx-auto">
              <h2 className="heading-lg text-gradient mb-6">
                Need Help Choosing the Right Country?
              </h2>
              <p className="text-modern mb-8 max-w-2xl mx-auto">
                Our country selection tool and expert consultants will help you find the perfect 
                immigration destination based on your profile and preferences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/tools/country-selector"
                  className="btn-primary group"
                >
                  Try Country Selector Tool
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link 
                  href="/consultation"
                  className="btn-secondary"
                >
                  Book Expert Consultation
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
