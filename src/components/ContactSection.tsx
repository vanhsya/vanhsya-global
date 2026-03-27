'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaClock, 
  FaCalendarAlt, 
  FaArrowRight,
  FaCheckCircle,
  FaWhatsapp,
  FaComments
} from 'react-icons/fa';
import { COMPANY } from '@/lib/company';

interface ContactMethod {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  value: string;
  href: string;
  color: string;
  available: string;
}

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    service: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', country: '', service: '', message: '' });
    }, 2000);
  };

  const contactMethods: ContactMethod[] = [
    {
      icon: FaPhone,
      title: 'Call Us',
      description: 'Speak directly with our immigration experts',
      value: COMPANY.phoneDisplay,
      href: `tel:${COMPANY.phoneE164}`,
      color: 'bg-blue-500',
      available: COMPANY.uae.availability
    },
    {
      icon: FaWhatsapp,
      title: 'WhatsApp',
      description: 'Quick responses via WhatsApp messaging',
      value: COMPANY.phoneDisplay,
      href: COMPANY.whatsappLink,
      color: 'bg-green-500',
      available: '24/7 Quick Response'
    },
    {
      icon: FaEnvelope,
      title: 'Email Us',
      description: 'Send us your detailed inquiry',
      value: COMPANY.emails.support,
      href: `mailto:${COMPANY.emails.support}`,
      color: 'bg-purple-500',
      available: 'Response within 2 hours'
    },
    {
      icon: FaComments,
      title: 'Live Chat',
      description: 'Chat with our support team',
      value: 'Start Chat',
      href: '#chat',
      color: 'bg-orange-500',
      available: 'Available 24/7'
    }
  ];

  const services = [
    'Work Visa',
    'Study Visa',
    'Business Visa', 
    'Family Visa',
    'Tourist Visa',
    'Permanent Residency',
    'General Inquiry'
  ];

  const countries = [
    'Canada',
    'Australia', 
    'United States',
    'United Kingdom',
    'Germany',
    'New Zealand',
    'Other'
  ];

  if (isSubmitted) {
    return (
      <section className="section-padding bg-green-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCheckCircle className="text-3xl text-white" />
            </div>
            <h2 className="heading-md mb-4 text-green-800">
              Thank You for Your Interest!
            </h2>
            <p className="text-lg text-green-700 mb-6">
              Your consultation request has been received. One of our immigration experts will contact you within 24 hours to discuss your case in detail.
            </p>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4">What happens next?</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-semibold text-sm">1</span>
                  </div>
                  <span className="text-gray-700">Initial consultation call (30 minutes, FREE)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-semibold text-sm">2</span>
                  </div>
                  <span className="text-gray-700">Case assessment and eligibility review</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-semibold text-sm">3</span>
                  </div>
                  <span className="text-gray-700">Customized immigration strategy proposal</span>
                </div>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsSubmitted(false)}
              className="btn-outline mt-6"
            >
              Submit Another Inquiry
            </motion.button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg mb-6">
            Ready to Start Your <span className="gradient-text">Immigration Journey</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get personalized guidance from our licensed immigration experts. Your first consultation is completely free, 
            with no hidden fees or obligations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-8">Get in Touch</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.title}
                  href={method.href}
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300"
                >
                  <div className={`w-12 h-12 ${method.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <method.icon className="text-white text-xl" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">{method.title}</h4>
                  <p className="text-gray-600 text-sm mb-2">{method.description}</p>
                  <p className="font-medium text-blue-600 mb-1">{method.value}</p>
                  <p className="text-xs text-gray-500">{method.available}</p>
                </motion.a>
              ))}
            </div>

            {/* Office Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-blue-50 rounded-xl p-6"
            >
              <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-blue-600" />
                Our Office
              </h4>
              <div className="space-y-2 text-gray-600">
                <p>123 Immigration Plaza, Suite 500</p>
                <p>Toronto, ON M5V 3A1, Canada</p>
                <div className="flex items-center mt-4">
                  <FaClock className="mr-2 text-blue-600" />
                  <span>Monday - Friday: 9:00 AM - 6:00 PM EST</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Free Consultation Request</h3>
              <p className="text-gray-600 mb-6">Tell us about your immigration goals and we'll provide personalized guidance.</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder={COMPANY.phoneDisplay}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-country" className="block text-sm font-medium text-gray-700 mb-2">
                      Destination Country
                    </label>
                    <select
                      id="contact-country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select a country</option>
                      {countries.map((country) => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-service" className="block text-sm font-medium text-gray-700 mb-2">
                    Service Needed
                  </label>
                  <select
                    id="contact-service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tell us about your situation
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Please describe your immigration goals, timeline, and any specific questions you have..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className={`w-full btn-primary group ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <FaCalendarAlt className="mr-2" />
                      Request Free Consultation
                      <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </motion.button>

                <p className="text-xs text-gray-500 text-center">
                  By submitting this form, you agree to our privacy policy. We never share your information with third parties.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
