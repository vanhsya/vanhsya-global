'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt,
  FaClock,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaCheck,
  FaPaperPlane,
  FaComments,
  FaCalendarAlt,
  FaGlobe
} from 'react-icons/fa';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AnimatedCard from '@/components/AnimatedCard';
import { COMPANY } from '@/lib/company';

const contactMethods = [
  {
    icon: FaPhone,
    title: 'Phone Consultation',
    description: 'Speak directly with our immigration experts',
    contact: COMPANY.phoneDisplay,
    action: 'Call Now',
    href: `tel:${COMPANY.phoneE164}`,
    available: COMPANY.uae.availability,
    color: 'green'
  },
  {
    icon: FaEnvelope,
    title: 'Email Support',
    description: 'Send us your questions and documents',
    contact: COMPANY.emails.support,
    action: 'Send Email',
    href: `mailto:${COMPANY.emails.support}`,
    available: 'Response in 2 hours',
    color: 'blue'
  },
  {
    icon: FaEnvelope,
    title: 'Investor Relations',
    description: 'Investment, automation partnerships, and strategic collaboration',
    contact: COMPANY.emails.founder,
    action: 'Email Founder',
    href: `mailto:${COMPANY.emails.founder}`,
    available: 'Direct channel',
    color: 'amber'
  },
  {
    icon: FaEnvelope,
    title: 'Careers',
    description: 'Join VANHSYA and build the next era of migration automation',
    contact: COMPANY.emails.career,
    action: 'Email Careers',
    href: `mailto:${COMPANY.emails.career}`,
    available: 'Hiring pipeline',
    color: 'purple'
  },
  {
    icon: FaWhatsapp,
    title: 'WhatsApp Chat',
    description: 'Quick answers and document sharing',
    contact: COMPANY.phoneDisplay,
    action: 'Start Chat',
    href: COMPANY.whatsappLink,
    available: 'Instant Response',
    color: 'green'
  },
  {
    icon: FaCalendarAlt,
    title: 'Book Appointment',
    description: 'Schedule a detailed consultation',
    contact: 'Free 30-min session',
    action: 'Book Now',
    href: '/consultation',
    available: 'Next Available: Today',
    color: 'purple'
  }
];

const officeLocations = [
  {
    city: 'Dubai',
    address: 'United Arab Emirates\nDubai (by appointment)',
    phone: COMPANY.phoneDisplay,
    email: COMPANY.emails.connect,
    hours: COMPANY.uae.availability,
    services: ['Work Visas', 'Study Visas', 'Family Visas', 'Business Visas']
  },
  {
    city: 'Abu Dhabi',
    address: 'United Arab Emirates\nAbu Dhabi (by appointment)',
    phone: COMPANY.phoneDisplay,
    email: COMPANY.emails.connect,
    hours: COMPANY.uae.availability,
    services: ['Eligibility Review', 'Document Review', 'Consultations', 'Application Strategy']
  },
  {
    city: 'Sharjah',
    address: 'United Arab Emirates\nSharjah (by appointment)',
    phone: COMPANY.phoneDisplay,
    email: COMPANY.emails.connect,
    hours: COMPANY.uae.availability,
    services: ['Work Visas', 'Study Visas', 'Document Checklists', 'SOP Guidance']
  },
  {
    city: 'Ajman',
    address: 'United Arab Emirates\nAjman (by appointment)',
    phone: COMPANY.phoneDisplay,
    email: COMPANY.emails.connect,
    hours: COMPANY.uae.availability,
    services: ['Quick Assessments', 'Document Support', 'Case Updates', 'Client Support']
  },
  {
    city: 'Umm Al Quwain',
    address: 'United Arab Emirates\nUmm Al Quwain (by appointment)',
    phone: COMPANY.phoneDisplay,
    email: COMPANY.emails.connect,
    hours: COMPANY.uae.availability,
    services: ['Consultations', 'Document Review', 'Application Planning', 'Support']
  },
  {
    city: 'Ras Al Khaimah',
    address: 'United Arab Emirates\nRas Al Khaimah (by appointment)',
    phone: COMPANY.phoneDisplay,
    email: COMPANY.emails.connect,
    hours: COMPANY.uae.availability,
    services: ['Case Review', 'Eligibility Guidance', 'Checklist Support', 'Support']
  },
  {
    city: 'Fujairah',
    address: 'United Arab Emirates\nFujairah (by appointment)',
    phone: COMPANY.phoneDisplay,
    email: COMPANY.emails.connect,
    hours: COMPANY.uae.availability,
    services: ['Client Support', 'Document Guidance', 'Consultations', 'Updates']
  }
];

const socialLinks = [
  { icon: FaFacebook, name: 'Facebook', url: COMPANY.social.facebook, color: 'blue-600' },
  { icon: FaTwitter, name: 'Twitter', url: COMPANY.social.twitter, color: 'blue-400' },
  { icon: FaLinkedin, name: 'LinkedIn', url: COMPANY.social.linkedin, color: 'blue-700' },
  { icon: FaInstagram, name: 'Instagram', url: COMPANY.social.instagram, color: 'pink-600' },
  { icon: FaYoutube, name: 'YouTube', url: COMPANY.social.youtubeChannel, color: 'red-600' }
];

const faqs = [
  {
    question: 'How long does the consultation take?',
    answer: 'Initial consultations typically last 30-60 minutes, allowing us to understand your situation and provide personalized advice.'
  },
  {
    question: 'Is the first consultation free?',
    answer: 'Yes, we offer a complimentary 30-minute consultation to assess your case and explain our services.'
  },
  {
    question: 'Do you offer services in multiple languages?',
    answer: 'Yes, our team speaks English, French, Spanish, Mandarin, Hindi, and several other languages.'
  },
  {
    question: 'Can I get document review remotely?',
    answer: 'Absolutely! We use secure digital platforms to review documents and provide services to clients worldwide.'
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    country: '',
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
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <FaComments className="text-6xl mx-auto mb-6 text-blue-300" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Contact Our Experts
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Get personalized immigration advice from our certified consultants worldwide
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="btn-primary bg-white text-blue-600 hover:bg-gray-100"
              >
                <FaCalendarAlt className="mr-2" />
                Book Free Consultation
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="btn-outline border-white text-white hover:bg-white hover:text-blue-600"
              >
                <FaWhatsapp className="mr-2" />
                Chat on WhatsApp
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg mb-4">Get In Touch</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose your preferred way to connect with our immigration experts
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => {
              const colorClasses = {
                green: 'bg-green-100 text-green-600 border-green-500',
                blue: 'bg-blue-100 text-blue-600 border-blue-500',
                purple: 'bg-purple-100 text-purple-600 border-purple-500',
                amber: 'bg-amber-100 text-amber-700 border-amber-500'
              };

              const buttonClasses = {
                green: 'bg-green-600 hover:bg-green-700',
                blue: 'bg-blue-600 hover:bg-blue-700',
                purple: 'bg-purple-600 hover:bg-purple-700',
                amber: 'bg-amber-600 hover:bg-amber-700'
              };

              return (
                <AnimatedCard
                  key={index}
                  delay={index * 0.1}
                  className={`bg-white rounded-xl p-6 shadow-lg border-l-4 ${colorClasses[method.color as keyof typeof colorClasses].split(' ')[2]}`}
                  hover={true}
                  clickable={true}
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${colorClasses[method.color as keyof typeof colorClasses]}`}>
                    <method.icon className="text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{method.title}</h3>
                  <p className="text-gray-600 mb-3">{method.description}</p>
                  <div className="text-lg font-semibold text-gray-800 mb-2">{method.contact}</div>
                  <div className="text-sm text-gray-500 mb-4">{method.available}</div>
                  <a
                    href={method.href}
                    className={`w-full py-2 rounded-lg font-medium transition-colors text-white flex items-center justify-center ${
                      buttonClasses[method.color as keyof typeof buttonClasses]
                    }`}
                    target={method.href.startsWith('http') ? '_blank' : undefined}
                    rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {method.action}
                  </a>
                </AnimatedCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and our experts will get back to you within 24 hours.
              </p>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={COMPANY.phoneDisplay}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Service Interest</label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        required
                        title="Select the immigration service you're interested in"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select a service</option>
                        <option value="work-visa">Work Visa</option>
                        <option value="study-visa">Study Visa</option>
                        <option value="business-visa">Business Visa</option>
                        <option value="family-visa">Family Visa</option>
                        <option value="tourist-visa">Tourist Visa</option>
                        <option value="permanent-residence">Permanent Residence</option>
                        <option value="consultation">General Consultation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Destination Country</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      title="Select your destination country for immigration"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select destination</option>
                      <option value="canada">Canada</option>
                      <option value="australia">Australia</option>
                      <option value="usa">United States</option>
                      <option value="uk">United Kingdom</option>
                      <option value="germany">Germany</option>
                      <option value="new-zealand">New Zealand</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tell us about your immigration goals and any specific questions you have..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className={`w-full py-4 rounded-lg font-semibold transition-colors ${
                      isSubmitting
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending Message...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <FaPaperPlane className="mr-2" />
                        Send Message
                      </div>
                    )}
                  </motion.button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaCheck className="text-2xl text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Message Sent Successfully!</h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for contacting us. Our team will review your message and get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}
            </motion.div>

            {/* Map & Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">UAE Office Coverage</h2>
                <p className="text-gray-600 mb-6">
                  We provide UAE-wide support across all 7 Emirates with consultations by appointment and 24/7 remote assistance.
                </p>
              </div>

              {/* Quick Contact Info */}
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Contact</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <FaPhone className="text-blue-600 mr-3" />
                    <span className="text-gray-700">{COMPANY.phoneDisplay}</span>
                  </div>
                  <div className="flex items-center">
                    <FaEnvelope className="text-blue-600 mr-3" />
                    <span className="text-gray-700">{COMPANY.emails.support}</span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="text-blue-600 mr-3" />
                    <span className="text-gray-700">{COMPANY.uae.availability}</span>
                  </div>
                  <div className="flex items-center">
                    <FaGlobe className="text-blue-600 mr-3" />
                    <span className="text-gray-700">www.vanhsya.com</span>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-12 h-12 bg-${social.color} text-white rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity`}
                    >
                      <social.icon className="text-xl" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* FAQ Preview */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {faqs.slice(0, 2).map((faq, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-medium text-gray-800 mb-2">{faq.question}</h4>
                      <p className="text-gray-600 text-sm">{faq.answer}</p>
                    </div>
                  ))}
                  <motion.a
                    href="/faq"
                    whileHover={{ x: 5 }}
                    className="text-blue-600 hover:text-blue-700 font-medium inline-block"
                  >
                    View All FAQs →
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg mb-4">Our Global Offices</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Visit us at any of our worldwide locations for in-person consultations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {officeLocations.map((office, index) => (
              <AnimatedCard
                key={index}
                delay={index * 0.1}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">{office.city}</h3>
                  <FaMapMarkerAlt className="text-blue-600 text-xl" />
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="text-gray-400 mr-3 mt-1" />
                    <div className="text-gray-600 whitespace-pre-line">{office.address}</div>
                  </div>
                  <div className="flex items-center">
                    <FaPhone className="text-gray-400 mr-3" />
                    <span className="text-gray-600">{office.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <FaEnvelope className="text-gray-400 mr-3" />
                    <span className="text-gray-600">{office.email}</span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="text-gray-400 mr-3" />
                    <span className="text-gray-600">{office.hours}</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Services Available:</h4>
                  <div className="flex flex-wrap gap-2">
                    {office.services.map((service, idx) => (
                      <span key={idx} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <FaComments className="text-5xl mx-auto mb-6 text-blue-300" />
            <h2 className="heading-lg mb-4">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Don't wait - contact our experts today and take the first step towards your immigration goals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="btn-primary bg-white text-blue-600 hover:bg-gray-100"
              >
                <FaCalendarAlt className="mr-2" />
                Book Free Consultation
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="btn-outline border-white text-white hover:bg-white hover:text-blue-600"
              >
                <FaPhone className="mr-2" />
                Call Now: {COMPANY.phoneDisplay}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
