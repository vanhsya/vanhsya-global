'use client';
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaQuestionCircle } from 'react-icons/fa';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

const faqData: FAQ[] = [
  {
    id: '1',
    question: 'How long does the immigration process take?',
    answer: 'Processing times vary by program and country. Express Entry (Canada) typically takes 6-8 months, Australian skilled visas take 8-12 months, and UK work visas take 3-8 weeks. We provide realistic timelines based on current processing times and your specific case.',
    category: 'General'
  },
  {
    id: '2',
    question: 'What are your success rates?',
    answer: 'We maintain a 95% success rate across all immigration programs. Our success comes from thorough case assessment, complete documentation, and expert guidance throughout the process. We only take cases we are confident we can win.',
    category: 'General'
  },
  {
    id: '3',
    question: 'Do you provide refunds if my application is rejected?',
    answer: 'Yes, we offer a partial refund policy. If your application is rejected due to our error or incomplete guidance, we provide up to 70% refund of professional fees (government fees are non-refundable). Terms and conditions apply.',
    category: 'Fees'
  },
  {
    id: '4',
    question: 'Can you help improve my language test scores?',
    answer: 'While we don\'t provide language training directly, we partner with certified language institutes and can recommend proven preparation courses. We also provide tips and resources to help you achieve the required scores.',
    category: 'Requirements'
  },
  {
    id: '5',
    question: 'What makes VANHSYA different from other consultancies?',
    answer: 'Our transparent approach, certified consultants, no false promises, regular updates, and client-first philosophy set us apart. We provide realistic assessments and only proceed with viable cases.',
    category: 'General'
  },
  {
    id: '6',
    question: 'Do you handle family applications?',
    answer: 'Yes, we handle family class applications including spouse sponsorship, dependent children, parent and grandparent programs, and family reunification cases for all major destination countries.',
    category: 'Services'
  },
  {
    id: '7',
    question: 'What documents do I need to get started?',
    answer: 'Basic documents include passport, educational credentials, work experience letters, language test results, and proof of funds. We provide a detailed checklist after initial assessment.',
    category: 'Requirements'
  },
  {
    id: '8',
    question: 'Can you help if my application was previously rejected?',
    answer: 'Yes, we specialize in reapplication cases. We analyze rejection reasons, address gaps, and resubmit with stronger documentation. Many of our successful clients had previous rejections.',
    category: 'Services'
  },
  {
    id: '9',
    question: 'Do you provide post-landing services?',
    answer: 'Yes, we offer settlement services including SIN number application, bank account setup, healthcare registration, job search assistance, and initial accommodation guidance.',
    category: 'Services'
  },
  {
    id: '10',
    question: 'How much does your service cost?',
    answer: 'Fees vary by service complexity. Basic assessment is free, comprehensive services range from $2,000-$8,000 CAD depending on the program. We provide transparent pricing with no hidden costs.',
    category: 'Fees'
  }
];

const categories = ['All', 'General', 'Services', 'Requirements', 'Fees'];

const FAQSection: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredFAQs = activeCategory === 'All' 
    ? faqData 
    : faqData.filter(faq => faq.category === activeCategory);

  const toggleFAQ = (faqId: string) => {
    setOpenFAQ(openFAQ === faqId ? null : faqId);
  };

  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <FaQuestionCircle className="text-4xl text-blue-600 mx-auto mb-4" />
          <h2 className="heading-lg mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our immigration services and processes
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                activeCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
                  >
                    <span className="font-semibold text-gray-800 pr-4">
                      {faq.question}
                    </span>
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
                        <div className="px-6 pb-4 text-gray-700 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-8"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-6">
            Our immigration experts are here to help with personalized answers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/consultation"
              whileHover={{ scale: 1.05 }}
              className="btn-primary"
            >
              Book Free Consultation
            </motion.a>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              className="btn-outline"
            >
              Contact Us
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
