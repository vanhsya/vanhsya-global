'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaDownload, 
  FaFileAlt,
  FaCalculator,
  FaCheckSquare,
  FaClock,
  FaGlobe,
  FaBook,
  FaVideo,
  FaUsers,
  FaSearch,
  FaFilter,
  FaPlay,
  FaExternalLinkAlt,
  FaStar,
  FaEye
} from 'react-icons/fa';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AnimatedCard from '@/components/AnimatedCard';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'guide' | 'calculator' | 'checklist' | 'video' | 'webinar' | 'template';
  category: string;
  downloadUrl?: string;
  externalUrl?: string;
  fileSize?: string;
  duration?: string;
  downloads: number;
  views: number;
  rating: number;
  isNew: boolean;
  isPremium: boolean;
  thumbnail: string;
}

const resources: Resource[] = [
  {
    id: '1',
    title: 'Complete Guide to Canadian Express Entry',
    description: 'Comprehensive 50-page guide covering all aspects of the Express Entry system, including CRS scoring, provincial nominations, and application strategies.',
    type: 'guide',
    category: 'Canada',
    downloadUrl: '/resources/canada-express-entry-guide.pdf',
    fileSize: '2.4 MB',
    downloads: 15420,
    views: 28650,
    rating: 4.9,
    isNew: false,
    isPremium: false,
    thumbnail: '/placeholder-guide-1.jpg'
  },
  {
    id: '2',
    title: 'Points Calculator - Australia SkillSelect',
    description: 'Interactive calculator to determine your points score for Australian skilled visas. Includes all visa subclasses and detailed explanations.',
    type: 'calculator',
    category: 'Australia',
    externalUrl: '/tools/australia-points-calculator',
    downloads: 0,
    views: 45230,
    rating: 4.8,
    isNew: true,
    isPremium: false,
    thumbnail: '/placeholder-calculator-1.jpg'
  },
  {
    id: '3',
    title: 'Document Checklist Generator',
    description: 'Generate personalized document checklists for any visa type and country. Covers over 200 different visa categories.',
    type: 'checklist',
    category: 'General',
    externalUrl: '/tools/document-checklist',
    downloads: 0,
    views: 32150,
    rating: 4.7,
    isNew: true,
    isPremium: true,
    thumbnail: '/placeholder-checklist-1.jpg'
  },
  {
    id: '4',
    title: 'US Immigration Pathways Explained',
    description: 'Video series covering all major US immigration routes including family-based, employment-based, and investment-based options.',
    type: 'video',
    category: 'USA',
    externalUrl: 'https://youtube.com/playlist?list=example',
    duration: '2h 45m',
    downloads: 0,
    views: 18750,
    rating: 4.9,
    isNew: false,
    isPremium: false,
    thumbnail: '/placeholder-video-1.jpg'
  },
  {
    id: '5',
    title: 'UK Post-Brexit Immigration Changes',
    description: 'Live webinar recording discussing the latest UK immigration rules, new point-based system, and strategies for 2024.',
    type: 'webinar',
    category: 'UK',
    externalUrl: '/webinars/uk-immigration-2024',
    duration: '1h 30m',
    downloads: 0,
    views: 12480,
    rating: 4.6,
    isNew: true,
    isPremium: true,
    thumbnail: '/placeholder-webinar-1.jpg'
  },
  {
    id: '6',
    title: 'Statement of Purpose Template',
    description: 'Professional SOP templates for study visas with examples for different fields and countries. Includes writing guidelines.',
    type: 'template',
    category: 'Study Visa',
    downloadUrl: '/resources/sop-templates.docx',
    fileSize: '1.2 MB',
    downloads: 8920,
    views: 16540,
    rating: 4.5,
    isNew: false,
    isPremium: false,
    thumbnail: '/placeholder-template-1.jpg'
  },
  {
    id: '7',
    title: 'Germany Blue Card Complete Guide',
    description: 'Everything you need to know about the EU Blue Card in Germany including salary requirements, application process, and benefits.',
    type: 'guide',
    category: 'Germany',
    downloadUrl: '/resources/germany-blue-card-guide.pdf',
    fileSize: '1.8 MB',
    downloads: 6750,
    views: 11230,
    rating: 4.7,
    isNew: false,
    isPremium: false,
    thumbnail: '/placeholder-guide-2.jpg'
  },
  {
    id: '8',
    title: 'Processing Time Tracker',
    description: 'Real-time tracking tool for visa processing times across different countries and visa types. Updated weekly with official data.',
    type: 'calculator',
    category: 'General',
    externalUrl: '/tools/processing-times',
    downloads: 0,
    views: 23650,
    rating: 4.8,
    isNew: true,
    isPremium: false,
    thumbnail: '/placeholder-tracker-1.jpg'
  }
];

const categories = ['All', 'General', 'Canada', 'Australia', 'USA', 'UK', 'Germany', 'Study Visa'];
const resourceTypes = ['All', 'guide', 'calculator', 'checklist', 'video', 'webinar', 'template'];

const typeIcons = {
  guide: FaBook,
  calculator: FaCalculator,
  checklist: FaCheckSquare,
  video: FaVideo,
  webinar: FaUsers,
  template: FaFileAlt
};

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeType, setActiveType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular'); // popular, newest, rating

  const filteredResources = resources
    .filter(resource => {
      const matchesCategory = activeCategory === 'All' || resource.category === activeCategory;
      const matchesType = activeType === 'All' || resource.type === activeType;
      const matchesSearch = searchQuery === '' || 
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesType && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1;
        case 'rating':
          return b.rating - a.rating;
        case 'popular':
        default:
          return (b.downloads + b.views) - (a.downloads + a.views);
      }
    });

  const getTypeIcon = (type: string) => {
    return typeIcons[type as keyof typeof typeIcons] || FaFileAlt;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-blue-600 text-white py-20">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <FaBook className="text-6xl mx-auto mb-6 text-purple-300" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Immigration Resources
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              Free guides, calculators, checklists, and tools to help you navigate your immigration journey successfully.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-yellow-300">50+</div>
                <div className="text-purple-100">Free Resources</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-300">100k+</div>
                <div className="text-purple-100">Downloads</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-300">4.8/5</div>
                <div className="text-purple-100">Average Rating</div>
              </div>
            </div>
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
            className="max-w-6xl mx-auto"
          >
            {/* Search Bar */}
            <div className="relative mb-8 max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search resources..."
                className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              {/* Category Filter */}
              <div className="flex items-center">
                <FaGlobe className="text-purple-600 mr-2" />
                <span className="font-medium text-gray-700 mr-3">Category:</span>
                <select
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Type Filter */}
              <div className="flex items-center">
                <FaFilter className="text-blue-600 mr-2" />
                <span className="font-medium text-gray-700 mr-3">Type:</span>
                <select
                  value={activeType}
                  onChange={(e) => setActiveType(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {resourceTypes.map(type => (
                    <option key={type} value={type}>
                      {type === 'All' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Filter */}
              <div className="flex items-center">
                <FaStar className="text-yellow-600 mr-2" />
                <span className="font-medium text-gray-700 mr-3">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="text-center mb-8">
              <p className="text-gray-600">
                Showing {filteredResources.length} {filteredResources.length === 1 ? 'resource' : 'resources'}
                {activeCategory !== 'All' && ` in ${activeCategory}`}
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="section-padding">
        <div className="container-max">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${activeType}-${searchQuery}-${sortBy}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredResources.map((resource, index) => {
                const Icon = getTypeIcon(resource.type);
                return (
                  <AnimatedCard
                    key={resource.id}
                    delay={index * 0.05}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="relative">
                      <div className="h-32 bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                        <Icon className="text-4xl text-white" />
                      </div>
                      
                      {/* Badges */}
                      <div className="absolute top-2 left-2 flex gap-2">
                        {resource.isNew && (
                          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                            NEW
                          </span>
                        )}
                        {resource.isPremium && (
                          <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                            PREMIUM
                          </span>
                        )}
                      </div>

                      {/* Type Badge */}
                      <div className="absolute top-2 right-2">
                        <span className="bg-white bg-opacity-20 text-white text-xs px-2 py-1 rounded-full font-medium backdrop-blur-sm">
                          {resource.type.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                        {resource.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                        {resource.description}
                      </p>
                      
                      {/* Stats */}
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <div className="flex items-center space-x-3">
                          {resource.downloads > 0 && (
                            <div className="flex items-center">
                              <FaDownload className="mr-1" />
                              {formatNumber(resource.downloads)}
                            </div>
                          )}
                          <div className="flex items-center">
                            <FaEye className="mr-1" />
                            {formatNumber(resource.views)}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <FaStar className="text-yellow-400 mr-1" />
                          {resource.rating}
                        </div>
                      </div>

                      {/* File Info */}
                      {(resource.fileSize || resource.duration) && (
                        <div className="text-xs text-gray-500 mb-3">
                          {resource.fileSize && (
                            <span className="flex items-center">
                              <FaFileAlt className="mr-1" />
                              {resource.fileSize}
                            </span>
                          )}
                          {resource.duration && (
                            <span className="flex items-center">
                              <FaClock className="mr-1" />
                              {resource.duration}
                            </span>
                          )}
                        </div>
                      )}
                      
                      {/* Action Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center"
                        onClick={() => {
                          if (resource.downloadUrl) {
                            window.open(resource.downloadUrl, '_blank');
                          } else if (resource.externalUrl) {
                            window.open(resource.externalUrl, '_blank');
                          }
                        }}
                      >
                        {resource.type === 'video' || resource.type === 'webinar' ? (
                          <>
                            <FaPlay className="mr-2" />
                            Watch
                          </>
                        ) : resource.downloadUrl ? (
                          <>
                            <FaDownload className="mr-2" />
                            Download
                          </>
                        ) : (
                          <>
                            <FaExternalLinkAlt className="mr-2" />
                            Open Tool
                          </>
                        )}
                      </motion.button>
                    </div>
                  </AnimatedCard>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {filteredResources.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <FaSearch className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No resources found</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any resources matching your criteria. Try adjusting your filters or search terms.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                  setActiveType('All');
                }}
                className="btn-primary"
              >
                Clear All Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl text-white p-8 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Stay Updated with New Resources</h2>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter to get notified when we release new guides, calculators, and immigration updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
