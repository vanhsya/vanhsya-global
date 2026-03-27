'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Plane, GraduationCap, Briefcase, Heart, Home, Globe2 } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    icon: Briefcase,
    title: "Work Visa",
    description: "Professional work permits for skilled workers seeking employment opportunities abroad.",
    gradient: "card-purple",
    features: ["Express Processing", "Job Placement Support", "Document Assistance"]
  },
  {
    icon: GraduationCap,
    title: "Study Visa",
    description: "Student visas for pursuing higher education in top universities worldwide.",
    gradient: "card-pink",
    features: ["University Selection", "Scholarship Guidance", "Accommodation Support"]
  },
  {
    icon: Plane,
    title: "Tourist Visa",
    description: "Travel visas for leisure, business trips, and exploring new destinations.",
    gradient: "card-cyan",
    features: ["Fast Track Processing", "Group Applications", "Travel Insurance"]
  },
  {
    icon: Heart,
    title: "Family Visa",
    description: "Reunite with your loved ones through family sponsorship programs.",
    gradient: "card-green",
    features: ["Spouse Visa", "Parent Sponsorship", "Child Immigration"]
  },
  {
    icon: Home,
    title: "Permanent Residency",
    description: "Secure your future with permanent residence in your chosen country.",
    gradient: "card-orange",
    features: ["PR Processing", "Investment Programs", "Citizenship Pathways"]
  },
  {
    icon: Globe2,
    title: "Business Visa",
    description: "Expand your business globally with investor and entrepreneur visas.",
    gradient: "card-purple",
    features: ["Investment Visa", "Entrepreneur Programs", "Business Setup"]
  }
];

export default function Services() {
  return (
    <section className="section-padding bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container-max">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg text-gradient mb-6">
            Comprehensive Migration Services
          </h2>
          <p className="text-modern max-w-3xl mx-auto">
            From consultation to settlement, we provide end-to-end immigration solutions 
            tailored to your unique needs and aspirations.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid-modern">
          {services.map((service, index) => {
            const IconComponent = service.icon;
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
                className={`service-card ${service.gradient} group cursor-pointer`}
                whileHover={{ y: -8 }}
              >
                <div className="service-icon">
                  <IconComponent className="w-8 h-8" />
                </div>
                
                <h3 className="heading-sm mb-3 text-white">
                  {service.title}
                </h3>
                
                <p className="text-white-soft mb-6 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: (index * 0.1) + (featureIndex * 0.05) }}
                      viewport={{ once: true }}
                      className="flex items-center gap-2 text-white/80 text-sm"
                    >
                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                <Link 
                  href={`/services/${service.title.toLowerCase().replace(' ', '-')}`}
                  className="inline-flex items-center gap-2 text-white font-medium hover:gap-4 transition-all group"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="modern-card max-w-2xl mx-auto">
            <h3 className="heading-md text-gradient mb-4">
              Not Sure Which Service You Need?
            </h3>
            <p className="text-modern mb-6">
              Our expert consultants will assess your profile and recommend the best 
              immigration pathway for your specific situation.
            </p>
            <Link 
              href="/consultation"
              className="btn-primary group"
            >
              Get Free Consultation
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
