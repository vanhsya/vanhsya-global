'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaStar, 
  FaQuoteLeft,
  FaMapMarkerAlt,
  FaClock,
  FaBriefcase,
  FaGraduationCap,
  FaHeart,
  FaHome,
  FaFilter,
  FaPlay,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';
import NavigationPremium from '@/components/NavigationPremium';
import Image from 'next/image';
import Footer from '@/components/Footer';
import AnimatedCard from '@/components/AnimatedCard';

interface SuccessStory {
  id: string;
  name: string;
  country: string;
  visaType: string;
  category: string;
  timeline: string;
  image: string;
  testimonial: string;
  fullStory: string;
  outcome: string;
  challenges: string[];
  rating: number;
  videoUrl?: string;
  beforeAfter: {
    before: string;
    after: string;
  };
}

const successStories: SuccessStory[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    country: 'Worldwide Network',
    visaType: 'AI Career Transformation',
    category: 'AI Tools',
    timeline: '6 months',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
    testimonial: "VANHSYA's AI innovations transformed my career completely. Their CV builder and AI tools helped me land my dream job with full transparency and cutting-edge technology.",
    fullStory: "Sarah came to us seeking career advancement through AI-powered solutions. Our comprehensive AI tools, including the CV builder and career analysis, helped her optimize her professional profile and connect with global opportunities.",
    outcome: 'Successfully transformed career with AI assistance',
    challenges: ['Career optimization', 'Profile enhancement', 'Global networking'],
    rating: 5,
    beforeAfter: {
      before: 'Traditional career approach in Singapore',
      after: 'AI-enhanced career success with global opportunities'
    }
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    country: 'Worldwide Network',
    visaType: 'AI Professional Development',
    category: 'AI Tools',
    timeline: '8 months',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800',
    testimonial: "From initial consultation to achieving my goals, VANHSYA's AI platform provided exceptional results. Their transparent approach and innovative tools made the complex process straightforward.",
    fullStory: "Michael's case involved comprehensive career transformation using our AI innovation suite. Our assessment tools and referral system identified the best opportunities and connected him with our global network.",
    outcome: 'Professional excellence achieved through AI',
    challenges: ['Skills assessment', 'Career optimization', 'Global networking'],
    rating: 5,
    beforeAfter: {
      before: 'Traditional career path in Mexico',
      after: 'AI-enhanced professional success globally'
    }
  },
  {
    id: '3',
    name: 'Priya Sharma',
    country: 'Worldwide Network',
    visaType: 'AI Innovation Program',
    category: 'Innovation',
    timeline: '8 months',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800',
    testimonial: 'VANHSYA AI innovations completely transformed my approach to professional development. Their transparent platform and cutting-edge tools opened new possibilities.',
    fullStory: 'Priya, a software engineer from Singapore, wanted to advance her career through AI-powered solutions. Our comprehensive AI tools, including career analysis and skill optimization, helped her achieve remarkable professional growth through innovative technology.',
    outcome: 'AI-enhanced career advancement with global opportunities',
    challenges: ['Skill optimization', 'Technology adaptation', 'Global networking'],
    rating: 5,
    beforeAfter: {
      before: 'Traditional software development approach',
      after: 'Leading AI-powered innovation projects globally'
    }
  },
  {
    id: '4',
    name: 'Ahmed Hassan',
    country: 'Innovation Hubs',
    visaType: 'CV Builder Success',
    category: 'CV Builder',
    timeline: '12 months',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    testimonial: 'The VANHSYA CV Builder revolutionized my job search. Their AI-powered templates and optimization tools helped me land my dream position.',
    fullStory: 'Ahmed, a civil engineer from Egypt, struggled with creating compelling CVs for international opportunities. Our AI-powered CV Builder provided professional templates and intelligent optimization that transformed his profile presentation, leading to multiple job offers.',
    outcome: 'Secured dream position with 40% salary increase',
    challenges: ['CV optimization', 'International standards', 'Professional presentation'],
    rating: 5,
    beforeAfter: {
      before: 'Struggling with traditional CV formats',
      after: 'Professional success with AI-optimized profile'
    }
  },
  {
    id: '7',
    name: 'Maria Rodriguez',
    country: 'United States',
    visaType: 'O-1 Extraordinary Ability',
    category: 'Work Visa',
    timeline: '6 months',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=800',
    testimonial: 'VANHSYA helped me understand how to present my achievements for the O-1 visa. Their strategic approach was brilliant.',
    fullStory: 'Maria, a renowned graphic designer from Spain, wanted to work with top advertising agencies in New York. The O-1 visa requires proving extraordinary ability, which can be challenging. VANHSYA helped her compile a compelling portfolio of her achievements, including international awards, media coverage, and high-salary evidence. Our strategic presentation of her qualifications led to visa approval.',
    outcome: 'Working as Creative Director at a Fortune 500 company in New York',
    challenges: ['Proving extraordinary ability', 'Documentation of achievements', 'US employer requirements'],
    rating: 5,
    beforeAfter: {
      before: 'Talented designer limited to European markets',
      after: 'Leading creative projects for global brands in New New York'
    }
  },
  {
    id: '8',
    name: 'James Wilson',
    country: 'United Kingdom',
    visaType: 'Global Talent Visa',
    category: 'Work Visa',
    timeline: '4 months',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800',
    testimonial: 'Fast-track approval thanks to VANHSYA\'s expertise in the UK Global Talent route. Exceptional service!',
    fullStory: 'James, a fintech entrepreneur from Australia, wanted to expand his business to London. The UK Global Talent visa was perfect for his profile, but required endorsement from Tech Nation. VANHSYA guided him through the endorsement application, helping present his innovative fintech solutions and leadership in the industry. The strategic approach led to both endorsement and visa approval.',
    outcome: 'Successfully established UK operations, now employing 15 people in London',
    challenges: ['Tech Nation endorsement process', 'Proving exceptional talent', 'Business expansion documentation'],
    rating: 5,
    beforeAfter: {
      before: 'Successful business limited to Australian market',
      after: 'Expanding globally with headquarters in London\'s financial district'
    }
  },
  {
    id: '7',
    name: 'Priya Sharma',
    country: 'Germany',
    visaType: 'EU Blue Card',
    category: 'Work Visa',
    timeline: '3 months',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800',
    testimonial: 'VANHSYA made my move to Germany seamless. Their knowledge of EU Blue Card requirements was impressive.',
    fullStory: 'Priya, a data scientist from India, received a job offer from a German tech company. The EU Blue Card process seemed straightforward, but there were many nuances. VANHSYA helped with credential recognition, contract negotiation guidance, and ensuring all requirements were met. The efficient process allowed her to start her new role on schedule.',
    outcome: 'Senior Data Scientist in Berlin, on path to permanent residence',
    challenges: ['Credential recognition', 'Salary threshold requirements', 'German bureaucracy navigation'],
    rating: 5,
    beforeAfter: {
      before: 'Working remotely for international clients from India',
      after: 'Leading AI projects at a cutting-edge tech company in Berlin'
    }
  },
  {
    id: '8',
    name: 'David Kim',
    country: 'Canada',
    visaType: 'Start-up Visa Program',
    category: 'Business Visa',
    timeline: '14 months',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800',
    testimonial: 'VANHSYA connected me with the right investors and guided me through the start-up visa process perfectly.',
    fullStory: 'David, a tech entrepreneur from South Korea, had an innovative AI startup idea but needed Canadian investment and residency. The Start-up Visa Program was ideal but required connections with designated organizations. VANHSYA facilitated introductions to angel investor groups and helped prepare compelling pitch materials. The comprehensive support led to both investment and visa approval.',
    outcome: 'CEO of successful AI company in Vancouver, creating 25 jobs',
    challenges: ['Finding designated investors', 'Business plan development', 'Language requirements'],
    rating: 5,
    beforeAfter: {
      before: 'Startup idea with limited resources in South Korea',
      after: 'Running a successful AI company with international clients from Vancouver'
    }
  }
];

const categories = ['All', 'AI Tools', 'Innovation', 'CV Builder', 'Referral System', 'Lucky Draw'];
const countries = ['All', 'Global Network', 'North America', 'Europe', 'Asia Pacific', 'Innovation Hubs'];

export default function SuccessStoriesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeCountry, setActiveCountry] = useState('All');
  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const filteredStories = successStories.filter(story => {
    const matchesCategory = activeCategory === 'All' || story.category === activeCategory;
    return matchesCategory && matchesSearch(story, activeCountry);
  });

  function matchesSearch(story: SuccessStory, region: string) {
    if (region === 'All') return true;
    if (region === 'Global Network' && story.country === 'Worldwide Network') return true;
    if (region === 'North America' && (story.country === 'Canada' || story.country === 'United States')) return true;
    if (region === 'Europe' && (story.country === 'United Kingdom' || story.country === 'Germany')) return true;
    if (region === 'Asia Pacific' && (story.country === 'Singapore' || story.country === 'Australia')) return true;
    if (region === 'Innovation Hubs' && story.country === 'Innovation Hubs') return true;
    return false;
  }

  const nextTestimonial = () => {
    if (filteredStories.length === 0) return;
    setCurrentTestimonial((prev) => (prev + 1) % filteredStories.length);
  };

  const prevTestimonial = () => {
    if (filteredStories.length === 0) return;
    setCurrentTestimonial((prev) => (prev - 1 + filteredStories.length) % filteredStories.length);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'AI Tools': return FaBriefcase;
      case 'Innovation': return FaGraduationCap;
      case 'CV Builder': return FaBriefcase;
      case 'Referral System': return FaHeart;
      case 'Lucky Draw': return FaHome;
      default: return FaStar;
    }
  };

  return (
    <div className="min-h-screen text-white">
      <NavigationPremium variant="neo" />
      
      {/* Hero Section */}
      <section className="hero-glow-vanhsya bg-black/20 text-white py-20 pt-32">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <FaStar className="text-6xl mx-auto mb-6 text-yellow-300" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Success Stories
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100">
              Building trust through transparency. We're committed to honest service and growing our global network.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-yellow-300">1,200+</div>
                <div className="text-green-100">Cases Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-300">50+</div>
                <div className="text-green-100">Countries Network</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-300">100%</div>
                <div className="text-green-100">Transparency</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Testimonial Carousel */}
      <section className="section-padding bg-black/20">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Featured Success Stories</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Hear directly from our clients about their AI innovation journey and how our transparent platform helped them succeed.
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {filteredStories.length > 0 ? (
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="bg-white/[0.04] border border-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-2 h-full bg-purple-500"></div>
                  <FaQuoteLeft className="text-4xl text-white/20 mx-auto mb-6" />
                  <p className="text-xl md:text-2xl text-gray-200 mb-8 italic leading-relaxed">
                    "{filteredStories[currentTestimonial]?.testimonial}"
                  </p>
                  <div className="flex items-center justify-center mb-6">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 h-6 w-6" />
                    ))}
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="relative w-20 h-20 mb-4">
                      <Image 
                        src={filteredStories[currentTestimonial]?.image || ''} 
                        alt={filteredStories[currentTestimonial]?.name || ''}
                        fill
                        className="rounded-full object-cover border-4 border-blue-50 shadow-md"
                      />
                    </div>
                    <div className="font-bold text-xl text-white">
                      {filteredStories[currentTestimonial]?.name}
                    </div>
                    <div className="text-purple-300 font-semibold tracking-wide uppercase text-sm">
                      {filteredStories[currentTestimonial]?.visaType}
                    </div>
                    <div className="text-gray-400 flex items-center justify-center mt-3 text-sm">
                      <FaMapMarkerAlt className="mr-2 text-red-500" />
                      {filteredStories[currentTestimonial]?.country}
                      <span className="mx-3 text-white/20">|</span>
                      <FaClock className="mr-2 text-green-500" />
                      {filteredStories[currentTestimonial]?.timeline}
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-black/40 border border-white/10 backdrop-blur-md rounded-full p-4 shadow-xl hover:bg-black/60 transition-all z-10"
              aria-label="Previous testimonial"
              title="Previous testimonial"
            >
              <FaChevronLeft className="text-white text-xl" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 md:translate-x-12 bg-black/40 border border-white/10 backdrop-blur-md rounded-full p-4 shadow-xl hover:bg-black/60 transition-all z-10"
              aria-label="Next testimonial"
              title="Next testimonial"
            >
              <FaChevronRight className="text-white text-xl" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-10 space-x-3">
              {filteredStories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-purple-400 w-8' : 'bg-white/20'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                  title={`Testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-8">Explore All Success Stories</h2>
            
            {/* Category Filter */}
            <div className="mb-8">
              <div className="flex items-center justify-center mb-4">
                <FaFilter className="text-purple-300 mr-2" />
                <span className="font-semibold text-gray-200">Filter by Service Type:</span>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => {
                  const Icon = getCategoryIcon(category);
                  return (
                    <motion.button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-5 py-2.5 rounded-full font-medium transition-all flex items-center shadow-sm ${
                        activeCategory === category
                          ? 'bg-purple-600 text-white shadow-purple-600/30'
                          : 'bg-white/[0.04] text-gray-200 border border-white/10 hover:border-purple-300/40 hover:text-purple-200'
                      }`}
                    >
                      {category !== 'All' && <Icon className="mr-2 h-4 w-4" />}
                      {category}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Country Filter */}
            <div>
              <div className="flex items-center justify-center mb-4">
                <FaMapMarkerAlt className="text-green-600 mr-2" />
                <span className="font-semibold text-gray-200">Filter by Region:</span>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {countries.map((country) => (
                  <motion.button
                    key={country}
                    onClick={() => setActiveCountry(country)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-5 py-2.5 rounded-full font-medium transition-all shadow-sm ${
                      activeCountry === country
                        ? 'bg-purple-600 text-white shadow-purple-600/30'
                        : 'bg-white/[0.04] text-gray-200 border border-white/10 hover:border-purple-300/40 hover:text-purple-200'
                    }`}
                  >
                    {country}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Success Stories Grid */}
      <section className="section-padding bg-black/20">
        <div className="container-max">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${activeCountry}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredStories.map((story, index) => {
                const Icon = getCategoryIcon(story.category);
                return (
                  <AnimatedCard
                    key={story.id}
                    delay={index * 0.1}
                    className="bg-white/[0.04] border border-white/10 backdrop-blur-md rounded-2xl shadow-md overflow-hidden cursor-pointer group hover:shadow-2xl transition-all duration-300"
                    onClick={() => setSelectedStory(story)}
                  >
                    <div className="relative h-56 overflow-hidden">
                      <Image 
                        src={story.image} 
                        alt={story.name}
                        fill
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                        <div>
                          <div className="flex items-center text-xs font-medium mb-1">
                            <Icon className="mr-1 text-blue-400" />
                            {story.category}
                          </div>
                          <h3 className="font-bold text-xl">{story.name}</h3>
                        </div>
                        {story.videoUrl && (
                          <div className="bg-white/20 backdrop-blur-md rounded-full p-3 border border-white/30">
                            <FaPlay className="text-white text-sm" />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        {[...Array(story.rating)].map((_, i) => (
                          <FaStar key={i} className="text-yellow-400 h-4 w-4" />
                        ))}
                      </div>
                      
                      <div className="text-purple-300 font-bold mb-3 text-lg">{story.visaType}</div>
                      
                      <div className="flex items-center text-sm text-gray-400 mb-4">
                        <FaMapMarkerAlt className="mr-1.5 text-red-400" />
                        {story.country}
                        <FaClock className="ml-4 mr-1.5 text-green-400" />
                        {story.timeline}
                      </div>
                      
                      <p className="text-gray-300 text-sm leading-relaxed mb-6 line-clamp-3 italic">
                        "{story.testimonial}"
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-purple-300 font-bold text-sm group-hover:underline">
                          Read Full Story →
                        </span>
                        <div className="h-8 w-8 bg-white/[0.04] border border-white/10 rounded-full flex items-center justify-center text-purple-200 group-hover:bg-purple-500 group-hover:text-white group-hover:border-purple-400/40 transition-colors">
                          <FaChevronRight className="text-xs" />
                        </div>
                      </div>
                    </div>
                  </AnimatedCard>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {filteredStories.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20 bg-white/[0.04] border border-white/10 backdrop-blur-md rounded-3xl shadow-sm"
            >
              <div className="bg-white/[0.04] border border-white/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaStar className="h-10 w-10 text-white/20" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">No stories found</h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                We couldn't find any success stories matching your current filter criteria. Try broader options.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('All');
                  setActiveCountry('All');
                }}
                className="px-8 py-3 bg-purple-600 text-white rounded-full font-bold shadow-lg shadow-purple-600/30 hover:bg-purple-700 transition-all"
              >
                Reset All Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-700 text-white">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Write Your Success Story?</h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Join thousands of satisfied clients who have achieved their innovation goals with VANHSYA's expert AI-powered solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                className="btn-primary bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-600/30"
              >
                Start Your Journey
              </motion.a>
              <motion.a
                href="/consultation"
                whileHover={{ scale: 1.05 }}
                className="btn-outline border-white text-white hover:bg-white hover:text-blue-600"
              >
                Free Consultation
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Story Detail Modal */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedStory(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-slate-950/95 border border-white/10 rounded-xl max-w-4xl max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{selectedStory.name}</h2>
                    <div className="text-purple-300 font-medium">{selectedStory.visaType}</div>
                  </div>
                  <button
                    onClick={() => setSelectedStory(null)}
                    className="text-gray-400 hover:text-white text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold text-white mb-2">Journey Overview</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="text-purple-300 mr-2" />
                        <span>{selectedStory.country}</span>
                      </div>
                      <div className="flex items-center">
                        <FaClock className="text-green-600 mr-2" />
                        <span>{selectedStory.timeline}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-white mb-2">Outcome</h3>
                    <p className="text-sm text-gray-200">{selectedStory.outcome}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-white mb-3">Full Story</h3>
                  <p className="text-gray-200 leading-relaxed">{selectedStory.fullStory}</p>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-white mb-3">Challenges Overcome</h3>
                  <ul className="space-y-2">
                    {selectedStory.challenges.map((challenge, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-200">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white/[0.04] border border-white/10 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-3">Before & After</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium text-red-600 mb-1">Before</div>
                      <p className="text-sm text-gray-200">{selectedStory.beforeAfter.before}</p>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-green-600 mb-1">After</div>
                      <p className="text-sm text-gray-200">{selectedStory.beforeAfter.after}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
