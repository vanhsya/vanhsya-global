'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaQuestionCircle, 
  FaChevronDown, 
  FaSearch,
  FaGraduationCap,
  FaBriefcase,
  FaHeart,
  FaPlane,
  FaHome,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { COMPANY } from '@/lib/company';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQ[] = [
  // General Questions
  {
    id: '1',
    category: 'General',
    question: 'How long does the visa application process typically take?',
    answer: 'Processing times vary significantly depending on the visa type and country. Tourist visas typically take 1-3 weeks, while work visas can take 2-6 months. Permanent residence applications may take 6-18 months. We provide detailed timelines for each specific case during our consultation.'
  },
  {
    id: '2',
    category: 'General',
    question: 'What documents do I need for my visa application?',
    answer: 'Required documents vary by visa type and destination country. Common requirements include a valid passport, photographs, application forms, financial statements, medical examinations, and supporting letters. We provide a personalized document checklist for each client.'
  },
  {
    id: '3',
    category: 'General',
    question: 'Can VANHSYA guarantee visa approval?',
    answer: 'No ethical immigration consultant can guarantee visa approval, as final decisions rest with government immigration authorities. However, we significantly increase your chances of success through proper preparation, accurate documentation, and expert guidance based on current immigration laws.'
  },

  // Work Visa Questions
  {
    id: '4',
    category: 'Work Visa',
    question: 'Do I need a job offer before applying for a work visa?',
    answer: 'This depends on the country and visa type. Many countries require a job offer (like the US H-1B, UK Skilled Worker visa), while others allow you to apply first and search for work later (like Canada Express Entry). We help identify the best pathway for your situation.'
  },
  {
    id: '5',
    category: 'Work Visa',
    question: 'Can my family accompany me on a work visa?',
    answer: 'Most work visas allow dependent family members (spouse and children) to accompany you. Spouses may also be eligible for work authorization in many countries. We assist with family applications to ensure everyone can migrate together.'
  },
  {
    id: '6',
    category: 'Work Visa',
    question: 'How do I prove my qualifications are recognized abroad?',
    answer: 'Many countries require credential evaluation or recognition by designated assessment bodies. We guide you through the process of getting your education and work experience assessed by recognized agencies like WES, ICAS, or country-specific evaluation services.'
  },

  // Study Visa Questions
  {
    id: '7',
    category: 'Study Visa',
    question: 'When should I start my study visa application?',
    answer: 'We recommend starting your application 6-12 months before your intended start date. This allows time for university applications, English language testing, financial preparation, and visa processing. Some countries have specific intake periods that require earlier planning.'
  },
  {
    id: '8',
    category: 'Study Visa',
    question: 'How much money do I need to show for a study visa?',
    answer: 'Financial requirements vary by country and institution. Generally, you need to demonstrate ability to pay tuition fees plus living expenses for at least one year. For example, Canada typically requires CAD $10,000-$20,000 for living expenses, plus tuition fees.'
  },
  {
    id: '9',
    category: 'Study Visa',
    question: 'Can I work while studying abroad?',
    answer: 'Most countries allow international students to work part-time (usually 20 hours per week) during studies and full-time during breaks. Post-graduation work permits are also available in many countries, providing pathways to permanent residence.'
  },

  // Business Visa Questions
  {
    id: '10',
    category: 'Business Visa',
    question: 'What is the minimum investment required for a business visa?',
    answer: 'Investment requirements vary significantly by country and program. For example, the US EB-5 requires $800,000-$1,050,000, while Canada Start-up Visa has no minimum investment if you get support from designated organizations. We help identify programs that match your investment capacity.'
  },
  {
    id: '11',
    category: 'Business Visa',
    question: 'Do I need business experience to apply for an investor visa?',
    answer: 'Requirements vary by program. Some investor visas require demonstrated business experience and management skills, while others focus more on the investment amount and job creation potential. We assess your background and recommend suitable programs.'
  },

  // Family Visa Questions
  {
    id: '12',
    category: 'Family Visa',
    question: 'Can I sponsor my parents for permanent residence?',
    answer: 'Many countries allow citizens and permanent residents to sponsor their parents, though waiting times can be long and requirements strict. Programs like Canada Parent and Grandparent Program or US Family-based immigration have specific criteria and annual quotas.'
  },
  {
    id: '13',
    category: 'Family Visa',
    question: 'How long after marriage can I apply for a spouse visa?',
    answer: 'You can typically apply for a spouse visa immediately after marriage, provided you can prove the relationship is genuine. Processing times vary from 3-12 months depending on the country. We help prepare strong relationship evidence to support your application.'
  },

  // Tourist Visa Questions
  {
    id: '14',
    category: 'Tourist Visa',
    question: 'How far in advance should I apply for a tourist visa?',
    answer: 'We recommend applying 4-6 weeks before your travel date. Some countries offer same-day or expedited processing for additional fees, while others require longer processing times. We help you plan the timing to ensure your visa is ready for your trip.'
  },
  {
    id: '15',
    category: 'Tourist Visa',
    question: 'What if my tourist visa application is refused?',
    answer: 'Visa refusals can often be appealed or you can reapply with additional documentation addressing the refusal reasons. We analyze refusal letters and help strengthen your application for resubmission or explore alternative visa options.'
  },

  // Permanent Residence Questions
  {
    id: '16',
    category: 'Permanent Residence',
    question: 'Which country is easiest for permanent residence?',
    answer: 'The "easiest" country depends on your individual profile - age, education, work experience, language skills, and family ties. Canada Express Entry, Australia SkillSelect, and various European programs each have different criteria. We assess your profile against multiple programs to find the best match.'
  },
  {
    id: '17',
    category: 'Permanent Residence',
    question: 'Can I apply for permanent residence from within the country?',
    answer: 'Many countries allow in-country applications for permanent residence if you hold valid temporary status. This is often called "adjustment of status" (US) or "in-land application" (Canada). We help determine if you\'re eligible for in-country processing.'
  },
  {
    id: '18',
    category: 'Permanent Residence',
    question: 'Do I need to maintain my permanent residence status?',
    answer: 'Yes, most countries have residency obligations for permanent residents. For example, Canada requires 730 days in 5 years, while Australia requires 2 years in 5 years. We provide guidance on maintaining your status and pathways to citizenship.'
  }
];

const categories = ['All', 'General', 'Work Visa', 'Study Visa', 'Business Visa', 'Family Visa', 'Tourist Visa', 'Permanent Residence'];

const categoryIcons = {
  'General': FaQuestionCircle,
  'Work Visa': FaBriefcase,
  'Study Visa': FaGraduationCap,
  'Business Visa': FaBriefcase,
  'Family Visa': FaHeart,
  'Tourist Visa': FaPlane,
  'Permanent Residence': FaHome
};

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (faqId: string) => {
    setOpenFAQ(openFAQ === faqId ? null : faqId);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <FaQuestionCircle className="text-6xl mx-auto mb-6 text-blue-300" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Find answers to common questions about immigration processes, visa applications, and our services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            {/* Search Bar */}
            <div className="relative mb-8">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search FAQs..."
                className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((category) => {
                const Icon = categoryIcons[category as keyof typeof categoryIcons] || FaQuestionCircle;
                return (
                  <motion.button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-3 rounded-full font-medium transition-all flex items-center ${
                      activeCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                  >
                    {category !== 'All' && <Icon className="mr-2 h-4 w-4" />}
                    {category}
                  </motion.button>
                );
              })}
            </div>

            {/* Results Count */}
            <div className="text-center mb-8">
              <p className="text-gray-600">
                Showing {filteredFAQs.length} {filteredFAQs.length === 1 ? 'question' : 'questions'}
                {activeCategory !== 'All' && ` in ${activeCategory}`}
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="section-padding">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <motion.div
              key={`${activeCategory}-${searchQuery}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
                {filteredFAQs.map((faq, index) => {
                  const Icon = categoryIcons[faq.category as keyof typeof categoryIcons] || FaQuestionCircle;
                  return (
                    <motion.div
                      key={faq.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <button
                        onClick={() => toggleFAQ(faq.id)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center flex-1">
                          <Icon className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
                          <span className="font-semibold text-gray-800 pr-4">
                            {faq.question}
                          </span>
                        </div>
                        <motion.div
                          animate={{ rotate: openFAQ === faq.id ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <FaChevronDown className="text-gray-500 flex-shrink-0" />
                        </motion.div>
                      </button>
                      
                      <AnimatePresence>
                        {openFAQ === faq.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-4 pt-2 border-t border-gray-100">
                              <div className="flex items-start">
                                <div className="bg-blue-100 rounded-full p-2 mr-3 mt-1">
                                  <Icon className="h-4 w-4 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-gray-700 leading-relaxed">
                                    {faq.answer}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </motion.div>

            {filteredFAQs.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <FaQuestionCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No questions found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any questions matching your search. Try different keywords or browse all categories.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('All');
                  }}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-gray-600 mb-8">
              Our immigration experts are here to help with personalized answers to your specific situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                className="btn-primary flex items-center justify-center"
              >
                <FaEnvelope className="mr-2" />
                Contact Us
              </motion.a>
              <motion.a
                href={`tel:${COMPANY.phoneE164}`}
                whileHover={{ scale: 1.05 }}
                className="btn-outline flex items-center justify-center"
              >
                <FaPhone className="mr-2" />
                Call: {COMPANY.phoneDisplay}
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
