'use client';

import { motion } from 'framer-motion';
import { Clock, Users, CheckCircle, Star, ArrowRight, Phone, Globe, TrendingUp, Award } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useCurrency } from '@/components/CurrencySelector';
import ContactSupport from '@/components/ContactSupport';
import { COMPANY } from '@/lib/company';

interface CountryData {
  name: string;
  flag: string;
  description: string;
  capital: string;
  population: string;
  language: string;
  currency: string;
  heroGradient: string;
  primaryColor: string;
  immigrationTarget: string;
  successRate: string;
  averageProcessing: string;
  programs: Array<{
    name: string;
    description: string;
    basePrice: number;
    processingTime: string;
    popularity: number;
    requirements: string[];
    success: string;
    icon: string;
  }>;
  provinces?: Array<{
    name: string;
    capital: string;
    population: string;
    programs: string[];
    highlights: string[];
  }>;
  benefits: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  whyChoose: Array<{
    title: string;
    description: string;
  }>;
  stats: Array<{
    value: string;
    label: string;
  }>;
}

interface CountryPageTemplateProps {
  countryData: CountryData;
}

export default function CountryPageTemplate({ countryData }: CountryPageTemplateProps) {
  const { formatPrice } = useCurrency();

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className={`section-padding pt-32 ${countryData.heroGradient} relative overflow-hidden`}>
        <div className="container-max relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-6xl">{countryData.flag}</span>
                <h1 className="text-4xl lg:text-6xl font-bold">
                  <span className="text-gray-800">Immigrate to</span>
                  <span className="block text-gradient-cyan">{countryData.name}</span>
                </h1>
              </div>
              
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                {countryData.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.a
                  href="#programs"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary"
                >
                  View Programs <ArrowRight className="w-4 h-4 ml-2" />
                </motion.a>
                <ContactSupport variant="floating" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <motion.div className="modern-card text-center">
                  <Users className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-800 mb-1">{countryData.population}</div>
                  <div className="text-sm text-gray-600">Population</div>
                </motion.div>
                
                <motion.div className="modern-card text-center">
                  <Globe className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-800 mb-1">{countryData.language}</div>
                  <div className="text-sm text-gray-600">Language</div>
                </motion.div>
                
                <motion.div className="modern-card text-center">
                  <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-800 mb-1">{countryData.immigrationTarget}</div>
                  <div className="text-sm text-gray-600">Annual Immigration</div>
                </motion.div>
                
                <motion.div className="modern-card text-center">
                  <Award className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-800 mb-1">{countryData.successRate}</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Immigration Programs */}
      <section id="programs" className="section-padding bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-xl text-gray-800 mb-6">
              {countryData.name} <span className="text-gradient-cyan">Immigration Programs</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from multiple pathways to {countryData.name} residence and work authorization
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {countryData.programs.map((program, index) => (
              <motion.div
                key={program.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="modern-card group hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{program.icon}</span>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{program.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">{program.success} success rate</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      {formatPrice(program.basePrice)}
                    </div>
                    <div className="text-sm text-gray-500">Professional fees</div>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{program.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-600">{program.processingTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-600">{program.popularity}% popularity</span>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <h4 className="font-semibold text-gray-800 text-sm">Key Requirements:</h4>
                  <div className="grid grid-cols-2 gap-1">
                    {program.requirements.map((req, reqIndex) => (
                      <div key={reqIndex} className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        <span className="text-xs text-gray-600">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="btn-primary flex-1 text-sm">
                    Get Started <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                  <ContactSupport variant="floating" className="btn-secondary text-sm" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* States/Provinces (if applicable) */}
      {countryData.provinces && (
        <section className="section-padding bg-white">
          <div className="container-max">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="heading-xl text-gray-800 mb-6">
                {countryData.name} <span className="text-gradient-cyan">States & Regions</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Each region offers unique opportunities and immigration programs
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {countryData.provinces.map((province, index) => (
                <motion.div
                  key={province.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="modern-card text-center group hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{province.name}</h3>
                  <p className="text-gray-600 mb-1">Capital: {province.capital}</p>
                  <p className="text-gray-600 mb-4">Population: {province.population}</p>

                  <div className="space-y-2 mb-4">
                    <h4 className="font-semibold text-gray-800 text-sm">Programs:</h4>
                    {province.programs.map((program, programIndex) => (
                      <div key={programIndex} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                        {program}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1 mb-6">
                    <h4 className="font-semibold text-gray-800 text-sm">Highlights:</h4>
                    {province.highlights.map((highlight, highlightIndex) => (
                      <div key={highlightIndex} className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        <span className="text-xs text-gray-600">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  <button className="btn-secondary w-full text-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    Learn More
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose This Country */}
      <section className="section-padding bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-xl text-gray-800 mb-8">
                Why Choose <span className="text-gradient-cyan">{countryData.name}?</span>
              </h2>

              <div className="space-y-6">
                {countryData.whyChoose.map((reason, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{reason.title}</h3>
                      <p className="text-gray-600">{reason.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className={`modern-card ${countryData.heroGradient} text-white`}>
                <h3 className="text-2xl font-bold mb-6">{countryData.name} Immigration Stats 2024</h3>
                
                <div className="grid grid-cols-2 gap-6">
                  {countryData.stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold mb-2">{stat.value}</div>
                      <div className="text-white/80">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-white/10 rounded-lg">
                  <p className="text-sm text-white/90">
                    {countryData.name} is actively seeking skilled workers, students, and entrepreneurs to 
                    contribute to its growing economy and diverse society.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container-max text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Start Your {countryData.name} Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Get expert guidance from licensed immigration consultants and increase your chances of success
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ContactSupport variant="floating" className="bg-white text-blue-600 hover:bg-gray-100" />
              <motion.a
                href={`tel:${COMPANY.phoneE164}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Now: {COMPANY.phoneDisplay}
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
