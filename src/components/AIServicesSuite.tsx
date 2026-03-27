'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaRobot, 
  FaFileAlt, 
  FaVideo, 
  FaShieldAlt,
  FaArrowRight,
  FaCheck
} from 'react-icons/fa';
import { IconType } from 'react-icons';
import { GlassServiceCard } from './GlassCard';
import EligibilityBot from './EligibilityBot';
import ScamShieldVerifier from './ScamShieldVerifier';

interface AIService {
  id: string;
  title: string;
  description: string;
  icon: IconType;
  features: string[];
  color: string;
  available: boolean;
}

const aiServices: AIService[] = [
  {
    id: 'eligibility-bot',
    title: 'EligibilityBot',
    description: 'AI-powered visa eligibility assessment with instant results',
    icon: FaRobot,
    features: [
      'Multi-step assessment questionnaire',
      'AI analysis of 50+ immigration programs',
      'Personalized recommendations',
      'Instant eligibility scoring'
    ],
    color: 'from-blue-500 to-purple-600',
    available: true
  },
  {
    id: 'document-wizard',
    title: 'DocumentWizard',
    description: 'OCR-powered document processing and auto-fill capabilities',
    icon: FaFileAlt,
    features: [
      'OCR text extraction from documents',
      'Auto-fill immigration forms',
      'Document template generation',
      'Multi-language support'
    ],
    color: 'from-green-500 to-teal-600',
    available: false
  },
  {
    id: 'interview-simulator',
    title: 'InterviewSimulator',
    description: 'AI-powered interview practice with real-time feedback',
    icon: FaVideo,
    features: [
      'Webcam-based practice sessions',
      'AI analysis of body language',
      'Common visa interview questions',
      'Performance scoring and tips'
    ],
    color: 'from-purple-500 to-pink-600',
    available: false
  },
  {
    id: 'scam-shield',
    title: 'ScamShieldVerifier',
    description: 'Advanced document authenticity verification system',
    icon: FaShieldAlt,
    features: [
      '200+ global scam patterns',
      'Real-time document verification',
      'Security feature analysis',
      'Risk assessment reporting'
    ],
    color: 'from-red-500 to-orange-600',
    available: true
  }
];

export default function AIServicesSuite() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const handleServiceClick = (serviceId: string) => {
    if (serviceId === 'eligibility-bot' || serviceId === 'scam-shield') {
      setSelectedService(serviceId);
    }
  };

  return (
    <section className="section-padding bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container-max">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg text-white mb-4">
            🤖 AI-Powered Migration Tools
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Experience the future of immigration services with our cutting-edge AI suite.
            From eligibility assessment to document verification - all powered by advanced artificial intelligence.
          </p>
        </motion.div>

        {/* AI Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {aiServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className={`h-full cursor-pointer group ${
                    !service.available ? 'opacity-70' : ''
                  }`}
                  onClick={() => handleServiceClick(service.id)}
                >
                  <GlassServiceCard className="h-full">
                    <div className="text-center">
                      {/* Icon */}
                      <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-white/80 text-sm mb-4">
                        {service.description}
                      </p>

                      {/* Features */}
                      <div className="space-y-2 mb-6">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-white/70 text-xs">
                            <FaCheck className="w-3 h-3 text-green-400 mr-2 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>

                      {/* Action Button */}
                      <button
                        className={`w-full py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                          service.available
                            ? `bg-gradient-to-r ${service.color} text-white hover:opacity-90`
                            : 'bg-white/20 text-white/60 cursor-not-allowed'
                        }`}
                        disabled={!service.available}
                      >
                        {service.available ? (
                          <>
                            Try Now
                            <FaArrowRight className="w-3 h-3" />
                          </>
                        ) : (
                          'Coming Soon'
                        )}
                      </button>

                      {/* Beta Badge */}
                      {service.available && (
                        <div className="mt-2">
                          <span className="text-xs bg-accent-500 text-black px-2 py-1 rounded-full">
                            BETA
                          </span>
                        </div>
                      )}
                    </div>
                  </GlassServiceCard>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* AI Features Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          <GlassServiceCard className="text-center">
            <div className="text-4xl font-bold text-primary-400 mb-2">200+</div>
            <div className="text-white font-medium mb-2">Scam Patterns</div>
            <div className="text-white/70 text-sm">Global database of fraudulent documents</div>
          </GlassServiceCard>

          <GlassServiceCard className="text-center">
            <div className="text-4xl font-bold text-accent-400 mb-2">99.7%</div>
            <div className="text-white font-medium mb-2">Accuracy Rate</div>
            <div className="text-white/70 text-sm">AI-powered verification accuracy</div>
          </GlassServiceCard>

          <GlassServiceCard className="text-center">
            <div className="text-4xl font-bold text-green-400 mb-2">24/7</div>
            <div className="text-white font-medium mb-2">AI Availability</div>
            <div className="text-white/70 text-sm">Round-the-clock intelligent assistance</div>
          </GlassServiceCard>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <GlassServiceCard className="bg-gradient-to-r from-primary-600/20 to-accent-500/20 border-primary-500/30">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Experience AI-Powered Migration?
            </h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Join thousands of successful applicants who have used our AI tools to streamline their migration journey.
              Get started with our free eligibility assessment today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setSelectedService('eligibility-bot')}
                className="bg-gradient-to-r from-primary-600 to-accent-500 text-white px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                Start Free Assessment
              </button>
              <button className="bg-white/20 text-white px-8 py-3 rounded-lg hover:bg-white/30 transition-colors">
                Book AI Demo
              </button>
            </div>
          </GlassServiceCard>
        </motion.div>
      </div>

      {/* AI Service Modals */}
      {selectedService === 'eligibility-bot' && <EligibilityBot />}
      {selectedService === 'scam-shield' && <ScamShieldVerifier />}
    </section>
  );
}
