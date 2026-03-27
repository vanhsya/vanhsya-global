'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Plane, GraduationCap, Briefcase, Heart, Home, Globe2, CheckCircle, Clock, Users, Star, MessageCircle, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useCurrency } from '@/components/CurrencySelector';
import { COMPANY } from '@/lib/company';

const services = [
  {
    icon: Briefcase,
    title: "Work Visa",
    description: "Professional work permits for skilled workers seeking employment opportunities abroad.",
    features: ["Express Processing", "Job Placement Support", "Document Assistance", "Post-Landing Services"],
    priceUSD: 999,
    gradient: "card-purple",
    href: "/services/work-visa"
  },
  {
    icon: GraduationCap,
    title: "Study Visa",
    description: "Student visas for pursuing higher education in top universities worldwide.",
    features: ["University Selection", "Scholarship Guidance", "Accommodation Support", "Academic Counseling"],
    priceUSD: 799,
    gradient: "card-pink",
    href: "/services/study-visa"
  },
  {
    icon: Plane,
    title: "Tourist Visa",
    description: "Travel visas for leisure, business trips, and exploring new destinations.",
    features: ["Fast Track Processing", "Group Applications", "Travel Insurance", "Itinerary Planning"],
    priceUSD: 199,
    gradient: "card-cyan",
    href: "/services/tourist-visa"
  },
  {
    icon: Heart,
    title: "Family Visa",
    description: "Reunite with your loved ones through family sponsorship programs.",
    features: ["Spouse Visa", "Parent Sponsorship", "Child Immigration", "Family Assessment"],
    priceUSD: 1299,
    gradient: "card-green",
    href: "/services/family-visa"
  },
  {
    icon: Home,
    title: "Permanent Residency",
    description: "Secure your future with permanent residence in your chosen country.",
    features: ["PR Processing", "Investment Programs", "Citizenship Pathways", "Settlement Support"],
    priceUSD: 1999,
    gradient: "card-orange",
    href: "/services/permanent-residence"
  },
  {
    icon: Globe2,
    title: "Business Visa",
    description: "Expand your business globally with investor and entrepreneur visas.",
    features: ["Investment Visa", "Entrepreneur Programs", "Business Setup", "Market Analysis"],
    priceUSD: 1599,
    gradient: "card-purple",
    href: "/services/business-visa"
  }
];

const processSteps = [
  {
    step: "01",
    title: "Free Consultation",
    description: "Comprehensive assessment of your profile and immigration goals",
    icon: Users
  },
  {
    step: "02", 
    title: "Documentation",
    description: "Expert guidance in preparing and organizing all required documents",
    icon: CheckCircle
  },
  {
    step: "03",
    title: "Application Submission",
    description: "Professional submission of your application with follow-up tracking",
    icon: Clock
  },
  {
    step: "04",
    title: "Success & Support",
    description: "Visa approval celebration and post-landing settlement assistance",
    icon: Star
  }
];

const whyChooseUs = [
  { number: "Premium", label: "Quality Service", desc: "Professional excellence" },
  { number: "Global", label: "Reach", desc: "Worldwide destinations" },
  { number: "Trusted", label: "Partner", desc: "Your migration ally" },
  { number: "24/7", label: "Support", desc: "Always available" }
];

export default function ServicesPage() {
  const { formatPrice } = useCurrency();

  const getServiceAccent = (title: string) => {
    if (title === 'Work Visa') return 'neo-accent-gold';
    if (title === 'Permanent Residency') return 'neo-accent-emerald';
    if (title === 'Business Visa') return 'neo-accent-violet';
    if (title === 'Study Visa') return 'neo-accent-cyan';
    if (title === 'Family Visa') return 'neo-accent-rose';
    return 'neo-accent-slate';
  };

  const getServiceBadge = (title: string) => {
    if (title === 'Work Visa') return { label: 'Premium', tone: 'neo-badge-premium' as const };
    if (title === 'Permanent Residency') return { label: 'Secure', tone: 'neo-badge-security' as const };
    if (title === 'Study Visa') return { label: 'Popular', tone: 'neo-badge-popular' as const };
    return null;
  };

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
              Comprehensive <span className="text-gradient-cyan">Immigration Services</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              From consultation to settlement, we provide end-to-end immigration solutions 
              tailored to your unique needs and aspirations.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {whyChooseUs.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="stats-card"
              >
                <div className="stats-number">{stat.number}</div>
                <div className="stats-label">{stat.label}</div>
                <div className="text-white/70 text-xs mt-1">{stat.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a10] via-[#07070c] to-[#0a0a10]" />
          <div className="absolute inset-0 hero-glow-vanhsya opacity-70" />
          <div className="absolute -top-40 left-1/2 h-[520px] w-[920px] -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-700/25 via-indigo-700/20 to-purple-700/25 blur-3xl" />
          <div className="absolute -bottom-52 left-1/2 h-[520px] w-[920px] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-700/20 via-purple-700/15 to-indigo-700/20 blur-3xl" />
          <div className="absolute inset-0 neo-noise opacity-[0.07]" />
        </div>
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-5">
              <span className="bg-gradient-to-r from-purple-200 via-white to-slate-200 bg-clip-text text-transparent">
                Explore All Services
              </span>
            </h2>
            <p className="text-sm md:text-base font-medium tracking-[0.15em] uppercase text-white/70">
              Every pathway. Every tool. One intelligent ecosystem.
            </p>
          </motion.div>

          <div className="grid-modern">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              const accent = getServiceAccent(service.title);
              const badge = getServiceBadge(service.title);
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  viewport={{ once: true }}
                  className={`group cursor-pointer neo-card ${accent}`}
                  whileHover={{ y: -6 }}
                >
                  <div className="neo-card-sweep" />
                  <div className="neo-card-innerglow" />
                  <div className="neo-card-border" />
                  <div className="neo-noise absolute inset-0 opacity-[0.06]" />

                  {badge && (
                    <div className="absolute top-5 right-5 z-10">
                      <span className={`neo-badge ${badge.tone}`}>
                        {badge.label}
                      </span>
                    </div>
                  )}

                  <div className="service-icon">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  
                  <h3 className="heading-sm mb-3 text-white">
                    {service.title}
                  </h3>
                  
                  <p className="text-white-soft mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: (index * 0.1) + (featureIndex * 0.05) }}
                        viewport={{ once: true }}
                        className="neo-feature-row flex items-center gap-2 text-white/80 text-sm"
                      >
                        <CheckCircle className="neo-feature-icon w-4 h-4 text-white/60" />
                        <span className="neo-feature-text">{feature}</span>
                        <span className="neo-feature-underline" />
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <span className="text-white font-semibold text-lg">
                      Starting from {formatPrice(service.priceUSD)}
                    </span>
                    <span className="text-white/70 text-sm">*Consultation Required</span>
                  </div>

                  <Link 
                    href={service.href}
                    className="inline-flex items-center gap-2 text-white font-medium hover:gap-4 transition-all group w-full justify-center bg-white/20 backdrop-blur-sm rounded-xl py-3 hover:bg-white/30"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
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
              Our Simple <span className="text-gradient-pink">4-Step Process</span>
            </h2>
            <p className="text-white/90 text-xl max-w-3xl mx-auto">
              We've streamlined the immigration process to make it as smooth and transparent as possible
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="modern-card text-center relative group hover:scale-105 transition-transform"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="text-3xl font-bold text-gradient mb-2">{step.step}</div>
                  <h3 className="heading-sm mb-3 text-gray-800">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transform -translate-x-8 z-0" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
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
                Ready to Start Your Immigration Journey?
              </h2>
              <p className="text-modern mb-8 max-w-2xl mx-auto">
                Book a free consultation with our certified immigration experts and take the first step 
                towards your new life abroad.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link 
                  href="/consultation"
                  className="btn-primary group"
                >
                  Book Free Consultation
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link 
                  href="/contact"
                  className="btn-secondary"
                >
                  Contact Us
                </Link>
              </div>

              {/* Quick Contact Options */}
              <div className="flex flex-wrap justify-center gap-6 pt-6 border-t border-gray-200">
                <a
                  href={COMPANY.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-medium">WhatsApp</span>
                </a>
                <a
                  href={`tel:${COMPANY.phoneE164}`}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span className="font-medium">Call Now</span>
                </a>
                <a
                  href={`mailto:${COMPANY.emails.support}`}
                  className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span className="font-medium">Email Us</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
