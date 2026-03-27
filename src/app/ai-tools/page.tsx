'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Brain, FileText, Shield, CheckSquare, ArrowRight, Sparkles, Zap, Target } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

  const tools = [
    {
      title: "EligibilityBot",
      description: "AI-powered assessment to determine your visa eligibility across multiple countries with personalized recommendations",
      icon: Brain,
      features: ["Smart questionnaire", "Multi-country analysis", "Success probability", "Next steps guidance"],
      gradient: "from-blue-600 to-purple-600",
      href: "/ai-tools/eligibility"
    },
    {
      title: "Document Wizard",
      description: "Intelligent document checklist generator that ensures you have all required paperwork for your application",
      icon: FileText,
      features: ["Dynamic checklists", "Upload management", "Deadline tracking", "Expert tips"],
      gradient: "from-green-600 to-teal-600",
      href: "/ai-tools/document-wizard"
    },
    {
      title: "Scam Detector",
      description: "Advanced fraud detection system that protects you from immigration scams and fake service providers",
      icon: Shield,
      features: ["URL scanning", "Email analysis", "Phone verification", "Red flag alerts"],
      gradient: "from-red-600 to-pink-600",
      href: "/ai-tools/scam-detector"
    },
    {
      title: "Checklist Assistant",
      description: "Smart task management system that keeps you organized throughout your immigration journey",
      icon: CheckSquare,
      features: ["Smart reminders", "Progress tracking", "Priority sorting", "Timeline optimization"],
      gradient: "from-purple-600 to-indigo-600",
      href: "/ai-tools/checklist-assistant"
    },
    {
      title: "Visa Timeline Predictor",
      description: "Risk-aware approval window forecasting to plan travel, study, and relocation with confidence",
      icon: Target,
      features: ["Decision band forecast", "Milestone timeline", "Buffer planning", "Seasonality flags"],
      gradient: "from-yellow-500 to-amber-600",
      href: "/ai-tools/visa-timeline-predictor"
    },
    {
      title: "Entry Requirements Radar",
      description: "Border-ready pack generator that maps requirements by route, nationality, and purpose",
      icon: Shield,
      features: ["Document pack builder", "Risk band scoring", "Purpose checklist", "Consulate-ready PDFs"],
      gradient: "from-amber-600 to-pink-600",
      href: "/ai-tools/entry-requirements-radar"
    },
    {
      title: "Travel Itinerary AI",
      description: "Visa-smart tourism itineraries with consistent documentation and clean day-by-day routing",
      icon: Sparkles,
      features: ["Day cards", "Budget presets", "Visa narrative alignment", "Refundable plan tips"],
      gradient: "from-indigo-600 to-purple-600",
      href: "/ai-tools/travel-itinerary-ai"
    }
  ];

export default function AIToolsPage() {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="section-padding pt-32 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container-max relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              AI Tools Built to <span className="text-gradient-cyan">Get You Approved</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Instant eligibility checks, document lists, fraud screening, and step-by-step guidance—designed for faster, safer applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/consultation">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary bg-white text-purple-600 hover:bg-gray-100"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Free Consultation
                </motion.button>
              </Link>
              <Link href="#tools">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary border-white text-white hover:bg-white/10"
                >
                  Explore All Tools
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI Tools Grid */}
      <section id="tools" className="section-padding bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-xl text-gray-800 mb-6">
              Intelligent <span className="text-gradient-cyan">Migration Assistant</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered tools are designed to make your immigration process faster, 
              more accurate, and completely transparent.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredTool(tool.title)}
                onMouseLeave={() => setHoveredTool(null)}
                className="group cursor-pointer"
              >
                <div className={`modern-card overflow-hidden transform transition-all duration-300 ${
                  hoveredTool === tool.title ? 'scale-105 shadow-2xl' : 'hover:shadow-xl'
                }`}>
                  <div className={`bg-gradient-to-br ${tool.gradient} p-8 text-white relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 transform translate-x-8 -translate-y-8"></div>
                    <div className="relative z-10">
                      <tool.icon className="w-12 h-12 mb-4" />
                      <h3 className="text-2xl font-bold mb-2">{tool.title}</h3>
                      <p className="text-white/90">{tool.description}</p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-3 mb-6">
                      {tool.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${tool.gradient}`}></div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Link href={tool.href}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full bg-gradient-to-r ${tool.gradient} text-white py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2`}
                      >
                        Launch Tool
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* AI Innovations Link */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="modern-card bg-gradient-to-r from-purple-500 to-blue-600 text-white p-8">
              <h3 className="text-2xl font-bold mb-4">Discover More AI Innovations</h3>
              <p className="text-white/90 mb-6">
                Explore our complete suite of AI-powered features including CV Builder, 
                Referral System, Lucky Draw, and cutting-edge migration technology.
              </p>
              <Link href="/ai-innovations">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center gap-2 mx-auto"
                >
                  <Sparkles className="w-5 h-5" />
                  Explore AI Innovations
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-xl text-gray-800 mb-8">
                Why Choose Our <span className="text-gradient-cyan">AI Tools?</span>
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Precision Accuracy</h3>
                    <p className="text-gray-600">Advanced AI algorithms trained on thousands of successful cases for maximum accuracy</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Instant Results</h3>
                    <p className="text-gray-600">Get immediate assessments and recommendations without waiting</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Secure & Private</h3>
                    <p className="text-gray-600">Your data is encrypted and protected with enterprise-grade security</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Continuously Learning</h3>
                    <p className="text-gray-600">AI models updated regularly with latest immigration policies and trends</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="modern-card bg-gradient-to-br from-purple-500 to-blue-600 text-white p-8">
                <h3 className="text-2xl font-bold mb-6">AI Tools Usage Statistics</h3>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">98.7%</div>
                    <div className="text-purple-100">Accuracy Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">15,000+</div>
                    <div className="text-purple-100">Assessments Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">2.5s</div>
                    <div className="text-purple-100">Average Response Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">24/7</div>
                    <div className="text-purple-100">Availability</div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-white/10 rounded-lg">
                  <p className="text-sm text-purple-100">
                    Join thousands of successful applicants who used our AI tools to 
                    streamline their immigration journey and increase their success rate.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Access CTA */}
      <section className="section-padding bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container-max text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Experience AI-Powered Immigration?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Get instant access to all AI tools with our premium membership. 
              Start your intelligent immigration journey today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary bg-white text-blue-600 hover:bg-gray-100"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Get Premium Access
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary border-white text-white hover:bg-white/10"
              >
                Book Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
