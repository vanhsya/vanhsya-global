'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { FaCalculator, FaClipboardList, FaClock, FaDollarSign, FaFileAlt, FaGraduationCap, FaPassport, FaChartLine } from 'react-icons/fa';

interface Tool {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  category: 'assessment' | 'planning' | 'calculation' | 'tracking';
  difficulty: 'easy' | 'medium' | 'advanced';
  estimatedTime: string;
  features: string[];
  popular: boolean;
}

const ToolsPage: React.FC = () => {
  const tools: Tool[] = [
    {
      id: 'eligibility-calculator',
      title: 'Immigration Eligibility Calculator',
      description: 'Comprehensive assessment tool to evaluate your eligibility for multiple countries including Canada, Australia, USA, UK, and Germany.',
      icon: <FaCalculator className="w-6 h-6" />,
      href: '/tools/eligibility-calculator',
      category: 'assessment',
      difficulty: 'easy',
      estimatedTime: '10-15 minutes',
      features: ['Multi-country comparison', 'Instant scoring', 'Personalized recommendations', 'Pathway suggestions'],
      popular: true
    },
    {
      id: 'document-checklist',
      title: 'Document Checklist Generator',
      description: 'Generate a personalized checklist of required documents based on your destination country and visa type.',
      icon: <FaClipboardList className="w-6 h-6" />,
      href: '/tools/document-checklist',
      category: 'planning',
      difficulty: 'easy',
      estimatedTime: '5-10 minutes',
      features: ['Country-specific requirements', 'Visa type filtering', 'Downloadable PDF', 'Progress tracking'],
      popular: true
    },
    {
      id: 'processing-time-tracker',
      title: 'Processing Time Tracker',
      description: 'Track current processing times and get real-time updates for different visa categories and countries.',
      icon: <FaClock className="w-6 h-6" />,
      href: '/tools/processing-time-tracker',
      category: 'tracking',
      difficulty: 'easy',
      estimatedTime: '2-5 minutes',
      features: ['Real-time data', 'Historical trends', 'Email notifications', 'Multiple countries'],
      popular: false
    },
    {
      id: 'cost-calculator',
      title: 'Immigration Cost Calculator',
      description: 'Calculate total costs including government fees, legal fees, language tests, and living expenses.',
      icon: <FaDollarSign className="w-6 h-6" />,
      href: '/tools/cost-calculator',
      category: 'calculation',
      difficulty: 'medium',
      estimatedTime: '15-20 minutes',
      features: ['Comprehensive cost breakdown', 'Currency conversion', 'Savings planner', 'Fee comparisons'],
      popular: true
    },
    {
      id: 'points-calculator',
      title: 'Points Calculator (Express Entry)',
      description: 'Calculate your Comprehensive Ranking System (CRS) score for Canada\'s Express Entry system.',
      icon: <FaChartLine className="w-6 h-6" />,
      href: '/tools/points-calculator',
      category: 'calculation',
      difficulty: 'medium',
      estimatedTime: '10-15 minutes',
      features: ['CRS scoring', 'Score optimization tips', 'Factor analysis', 'Improvement suggestions'],
      popular: true
    },
    {
      id: 'language-test-planner',
      title: 'Language Test Planner',
      description: 'Plan your language testing strategy with test comparisons, preparation timelines, and score requirements.',
      icon: <FaGraduationCap className="w-6 h-6" />,
      href: '/tools/language-test-planner',
      category: 'planning',
      difficulty: 'medium',
      estimatedTime: '10-15 minutes',
      features: ['Test comparisons', 'Score requirements', 'Preparation timeline', 'Test center locator'],
      popular: false
    },
    {
      id: 'visa-comparison',
      title: 'Visa Pathway Comparison',
      description: 'Compare different visa pathways side-by-side to find the best option for your specific situation.',
      icon: <FaPassport className="w-6 h-6" />,
      href: '/tools/visa-comparison',
      category: 'assessment',
      difficulty: 'advanced',
      estimatedTime: '20-30 minutes',
      features: ['Side-by-side comparison', 'Eligibility analysis', 'Timeline comparison', 'Success rates'],
      popular: false
    },
    {
      id: 'application-tracker',
      title: 'Application Status Tracker',
      description: 'Track your immigration application status and get insights into processing stages and next steps.',
      icon: <FaFileAlt className="w-6 h-6" />,
      href: '/tools/application-tracker',
      category: 'tracking',
      difficulty: 'easy',
      estimatedTime: '5 minutes setup',
      features: ['Status monitoring', 'Stage explanations', 'Next step guidance', 'Timeline predictions'],
      popular: false
    }
  ];

  const categories = [
    { id: 'all', label: 'All Tools', count: tools.length },
    { id: 'assessment', label: 'Assessment', count: tools.filter(t => t.category === 'assessment').length },
    { id: 'planning', label: 'Planning', count: tools.filter(t => t.category === 'planning').length },
    { id: 'calculation', label: 'Calculation', count: tools.filter(t => t.category === 'calculation').length },
    { id: 'tracking', label: 'Tracking', count: tools.filter(t => t.category === 'tracking').length }
  ];

  const [selectedCategory, setSelectedCategory] = React.useState('all');

  const filteredTools = selectedCategory === 'all' 
    ? tools 
    : tools.filter(tool => tool.category === selectedCategory);

  const popularTools = tools.filter(tool => tool.popular);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20';
      case 'advanced': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Immigration Tools & Calculators
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
            >
              Comprehensive suite of tools to help you plan, calculate, and track your immigration journey.
              Get accurate assessments and personalized recommendations.
            </motion.p>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600">{tools.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Tools</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">{popularTools.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Popular Tools</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div className="text-2xl font-bold text-yellow-600">5</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Countries</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-600">Free</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">All Tools</div>
              </div>
            </motion.div>
          </div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </motion.div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Link href={tool.href} className="block">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
                          {tool.icon}
                        </div>
                        {tool.popular && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full dark:bg-yellow-900/20 dark:text-yellow-400">
                            Popular
                          </span>
                        )}
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(tool.difficulty)}`}>
                        {tool.difficulty}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {tool.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {tool.description}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <span className="flex items-center">
                        <FaClock className="w-3 h-3 mr-1" />
                        {tool.estimatedTime}
                      </span>
                      <span className="capitalize">{tool.category}</span>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">Key Features:</h4>
                      <div className="grid grid-cols-1 gap-1">
                        {tool.features.slice(0, 3).map((feature, i) => (
                          <div key={i} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                            {feature}
                          </div>
                        ))}
                        {tool.features.length > 3 && (
                          <div className="text-sm text-blue-600 dark:text-blue-400">
                            +{tool.features.length - 3} more features
                          </div>
                        )}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <span className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:text-blue-700 dark:group-hover:text-blue-300">
                        Use Tool
                        <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Need Personalized Guidance?
              </h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                While our tools provide excellent guidance, every immigration case is unique. 
                Book a consultation with our experts for personalized advice.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                >
                  Book Consultation
                </Link>
                <Link
                  href="/faq"
                  className="border border-blue-300 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                >
                  View FAQ
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ToolsPage;
