'use client';

import { motion } from 'framer-motion';
import { Star, Users, ArrowRight, Shield, Quote } from 'lucide-react';
import Link from 'next/link';

interface SuccessStoriesProps {
  variant?: 'homepage' | 'full-page';
  className?: string;
}

export default function SuccessStories({ variant = 'homepage', className = '' }: SuccessStoriesProps) {
  if (variant === 'homepage') {
    return (
      <section className={`section-padding bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 ${className}`}>
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            {/* Starting from Zero Banner */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-white/20">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Opening a New Era of Migration
                </h2>
                <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
                  We're building the future of immigration services. Every client's success story begins here, 
                  and yours will be next.
                </p>
                <div className="flex items-center justify-center gap-2 text-white/80">
                  <Users className="w-5 h-5" />
                  <span className="text-lg font-medium">Every journey starts with a single step</span>
                </div>
              </motion.div>
            </div>

            {/* Placeholder for Future Stories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20"
            >
              <h3 className="text-2xl font-semibold text-white mb-4">
                Your Success Story Awaits
              </h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                As we embark on this journey together, we're committed to creating genuine success stories. 
                Each client who achieves their immigration goals adds to our growing legacy of trust and excellence.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-2">Verified</div>
                  <div className="text-white/80 text-sm">Client Reviews Only</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-2">Authentic</div>
                  <div className="text-white/80 text-sm">Real Experiences</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-2">Transparent</div>
                  <div className="text-white/80 text-sm">Complete Journey</div>
                </div>
              </div>

              <Link 
                href="/portal/login"
                className="inline-flex items-center gap-2 bg-white text-purple-600 font-semibold px-6 py-3 rounded-xl hover:bg-white/90 transition-all group"
              >
                Join Our Community
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  }

  // Full page variant for dedicated success stories page
  return (
    <div className={`min-h-screen ${className}`}>
      <section className="section-padding pt-32 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="heading-xl text-white mb-6">
              Success <span className="text-gradient-cyan">Stories</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Real stories from real clients who achieved their immigration dreams with VANHSYA.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container-max">
          {/* New Era Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="modern-card text-center mb-16"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Star className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gradient mb-6">
              Opening a New Era of Migration
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              We're committed to transparency and authenticity. Every success story you see here comes from 
              verified clients who have completed their immigration journey with us.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-blue-50 rounded-xl p-6 text-center">
                <Shield className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">Verified Stories</h3>
                <p className="text-gray-600 text-sm">Only from completed clients</p>
              </div>
              <div className="bg-green-50 rounded-xl p-6 text-center">
                <Quote className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">Authentic Reviews</h3>
                <p className="text-gray-600 text-sm">Real experiences shared</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-6 text-center">
                <Users className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">Client Portal</h3>
                <p className="text-gray-600 text-sm">Secure review system</p>
              </div>
              <div className="bg-pink-50 rounded-xl p-6 text-center">
                <Star className="w-8 h-8 text-pink-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">Growing Legacy</h3>
                <p className="text-gray-600 text-sm">Building trust together</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Be Part of Our Success Story
              </h3>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                As we grow together, your journey becomes part of our legacy. Join thousands of clients 
                who trust VANHSYA for their immigration needs.
              </p>
              <Link 
                href="/consultation"
                className="btn-primary group inline-flex items-center"
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          {/* Future Stories Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            <div className="bg-white rounded-xl p-12 shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Stories Coming Soon
              </h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                We're building something special. As our first clients complete their immigration journeys, 
                their authentic stories will appear here. Each story will be verified and shared with permission.
              </p>
              <Link 
                href="/portal/login"
                className="btn-secondary inline-flex items-center"
              >
                Join Our Community
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
