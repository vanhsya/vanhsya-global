'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Users, Trophy, Clock, Shield } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: Users,
    title: "Expert Team",
    description: "Certified immigration consultants with 15+ years of experience"
  },
  {
    icon: Trophy,
    title: "99% Success Rate",
    description: "Proven track record with thousands of successful applications"
  },
  {
    icon: Clock,
    title: "Fast Processing",
    description: "Streamlined process ensuring quick turnaround times"
  },
  {
    icon: Shield,
    title: "Secure & Confidential",
    description: "Your documents and data are handled with utmost security"
  }
];

const achievements = [
  { number: "15K+", label: "Happy Clients" },
  { number: "50+", label: "Countries" },
  { number: "99%", label: "Success Rate" },
  { number: "15+", label: "Years Experience" }
];

export default function About() {
  return (
    <section className="section-padding">
      <div className="container-max">
        {/* Main About Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-lg text-white mb-6">
              About <span className="text-gradient-pink">VANHSYA</span>
            </h2>
            <p className="text-white/90 text-lg leading-relaxed mb-6">
              Since 2008, VANHSYA Global Migration has been the trusted partner for thousands 
              of families seeking new opportunities abroad. Our team of certified immigration 
              experts provides personalized guidance through every step of your migration journey.
            </p>
            <p className="text-white/80 leading-relaxed mb-8">
              We understand that immigration is more than just paperwork - it's about dreams, 
              aspirations, and building a better future. That's why we combine technical expertise 
              with genuine care to deliver exceptional results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/about"
                className="btn-secondary group"
              >
                Learn More About Us
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link 
                href="/consultation"
                className="btn-primary"
              >
                Start Your Journey
              </Link>
            </div>
          </motion.div>

          {/* Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="modern-card bg-white/10 backdrop-blur-md border-white/20">
              <div className="grid grid-2 gap-6">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="stats-number text-white">
                      {achievement.number}
                    </div>
                    <div className="stats-label text-white/80">
                      {achievement.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="heading-md text-center text-white mb-12">
            Why Choose <span className="text-gradient-green">VANHSYA?</span>
          </h3>
          
          <div className="grid-4">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="modern-card text-center group hover:scale-105 transition-transform"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="heading-sm mb-3 text-gray-800">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="modern-card"
        >
          <div className="text-center mb-12">
            <h3 className="heading-md text-gradient mb-4">
              Our Simple 4-Step Process
            </h3>
            <p className="text-modern">
              We've streamlined the immigration process to make it as smooth as possible
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Consultation", desc: "Free assessment of your profile" },
              { step: "02", title: "Documentation", desc: "Prepare and verify all documents" },
              { step: "03", title: "Application", desc: "Submit your application" },
              { step: "04", title: "Success", desc: "Receive your visa approval" }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
                
                {index < 3 && (
                  <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transform -translate-x-6" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
