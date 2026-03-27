'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Phone, Mail, MapPin, Clock, Send, Globe, HeadphonesIcon } from 'lucide-react';
import { useState } from 'react';
import { COMPANY } from '@/lib/company';

interface ContactSupportProps {
  variant?: 'floating' | 'section' | 'page';
  className?: string;
}

export default function ContactSupport({ variant = 'section', className = '' }: ContactSupportProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    service: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    // console.log('Form submitted:', formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const sectionContent = (
    <section className={`section-padding bg-gradient-to-br from-slate-50 to-blue-50 ${className}`}>
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg text-gradient mb-6">
            Get In Touch
          </h2>
          <p className="text-modern max-w-3xl mx-auto">
            24/7 UAE support across all 7 Emirates. Call, WhatsApp, or email our team for fast, reliable guidance.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="modern-card">
              <h3 className="heading-sm mb-8 text-gray-800">
                Multiple Ways to Reach Us
              </h3>

              <div className="space-y-6">
                <motion.a
                  href={COMPANY.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-4 p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-all border border-green-200"
                >
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">WhatsApp</h4>
                    <p className="text-gray-600 text-sm">Instant messaging support</p>
                    <p className="text-green-600 font-medium">{COMPANY.phoneDisplay}</p>
                  </div>
                </motion.a>

                <motion.a
                  href={`tel:${COMPANY.phoneE164}`}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-4 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all border border-blue-200"
                >
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Phone Support</h4>
                    <p className="text-gray-600 text-sm">Speak directly with our team</p>
                    <p className="text-blue-600 font-medium">{COMPANY.phoneDisplay}</p>
                  </div>
                </motion.a>

                <motion.a
                  href={`mailto:${COMPANY.emails.support}`}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-4 p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-all border border-purple-200"
                >
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Email Support</h4>
                    <p className="text-gray-600 text-sm">Support & documentation</p>
                    <p className="text-purple-600 font-medium">{COMPANY.emails.support}</p>
                  </div>
                </motion.a>

                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Availability</h4>
                    <p className="text-gray-600 text-sm">Always online</p>
                    <p className="text-gray-700 font-medium">{COMPANY.uae.availability}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200">
                  <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{COMPANY.uae.country}</h4>
                    <p className="text-gray-600 text-sm">Coverage across all 7 Emirates</p>
                    <p className="text-gray-700 text-sm mt-2">{COMPANY.uae.emirates.join(' • ')}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="modern-card">
              <h3 className="heading-sm mb-6 text-gray-800">
                Send us a Quick Message
              </h3>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contactsupport-name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      id="contactsupport-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="contactsupport-email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      id="contactsupport-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                      placeholder={COMPANY.emails.support}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contactsupport-phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      id="contactsupport-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                      placeholder={COMPANY.phoneDisplay}
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                      Interested Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    >
                      <option value="">Select Country</option>
                      <option value="uae">United Arab Emirates</option>
                      <option value="canada">Canada</option>
                      <option value="australia">Australia</option>
                      <option value="usa">United States</option>
                      <option value="uk">United Kingdom</option>
                      <option value="germany">Germany</option>
                      <option value="new-zealand">New Zealand</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  >
                    <option value="">Select Service</option>
                    <option value="work-visa">Work Visa</option>
                    <option value="study-visa">Study Visa</option>
                    <option value="family-visa">Family Visa</option>
                    <option value="tourist-visa">Tourist Visa</option>
                    <option value="permanent-residence">Permanent Residence</option>
                    <option value="business-visa">Business Visa</option>
                    <option value="consultation">General Consultation</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contactsupport-message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="contactsupport-message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
                    placeholder="Tell us about your goals and timeline..."
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full group"
                >
                  Send Message
                  <Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );

  // Floating contact button for all pages
  if (variant === 'floating') {
    return (
      <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
        <div className="flex flex-col gap-3">
          <motion.a
            href={COMPANY.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all"
            title="WhatsApp Support"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.a>
          <motion.a
            href={`tel:${COMPANY.phoneE164}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all"
            title="Call Now"
          >
            <Phone className="w-6 h-6" />
          </motion.a>
          <motion.a
            href={`mailto:${COMPANY.emails.support}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 bg-purple-500 hover:bg-purple-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all"
            title="Email Us"
          >
            <Mail className="w-6 h-6" />
          </motion.a>
        </div>
      </div>
    );
  }

  // Section variant for homepage/other pages
  if (variant === 'section') {
    return sectionContent;
  }

  // Full page variant
  return (
    <div className={`min-h-screen ${className}`}>
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
              Contact <span className="text-gradient-cyan">VANHSYA</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Ready to start your immigration journey? Get in touch with our expert team today. 
              We're here to guide you every step of the way.
            </p>
          </motion.div>

          {/* Quick Contact Grid */}
          <div className="grid md:grid-cols-4 gap-6">
            <motion.a
              href={COMPANY.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center text-white hover:bg-white/20 transition-all border border-white/20"
            >
              <MessageCircle className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">WhatsApp</h3>
              <p className="text-sm text-white/80">Instant Support</p>
            </motion.a>

            <motion.a
              href={`tel:${COMPANY.phoneE164}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center text-white hover:bg-white/20 transition-all border border-white/20"
            >
              <Phone className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Call Now</h3>
              <p className="text-sm text-white/80">Direct Line</p>
            </motion.a>

            <motion.a
              href={`mailto:${COMPANY.emails.support}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center text-white hover:bg-white/20 transition-all border border-white/20"
            >
              <Mail className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Email Us</h3>
              <p className="text-sm text-white/80">Detailed Queries</p>
            </motion.a>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center text-white border border-white/20"
            >
              <Clock className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p className="text-sm text-white/80">Always Available</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      {sectionContent}

      {/* Office Information */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="modern-card text-center"
          >
            <h2 className="heading-lg text-gradient mb-8">
              Global Presence, Local Support
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Headquarters</h3>
                <p className="text-gray-600">{COMPANY.uae.country}</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Global Reach</h3>
                <p className="text-gray-600">50+ Countries Served</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <HeadphonesIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Expert Team</h3>
                <p className="text-gray-600">Certified Consultants</p>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="font-semibold text-gray-900 mb-2">Official Email Channels</div>
                <div className="space-y-1 text-sm text-gray-700">
                  <a className="block hover:text-blue-700 transition-colors" href={`mailto:${COMPANY.emails.founder}`}>{COMPANY.emails.founder}</a>
                  <a className="block hover:text-blue-700 transition-colors" href={`mailto:${COMPANY.emails.connect}`}>{COMPANY.emails.connect}</a>
                  <a className="block hover:text-blue-700 transition-colors" href={`mailto:${COMPANY.emails.hr}`}>{COMPANY.emails.hr}</a>
                  <a className="block hover:text-blue-700 transition-colors" href={`mailto:${COMPANY.emails.support}`}>{COMPANY.emails.support}</a>
                </div>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="font-semibold text-gray-900 mb-2">{COMPANY.uae.partnershipLabel}</div>
                <div className="text-sm text-gray-700">{COMPANY.uae.partnershipNote}</div>
                <div className="text-sm text-gray-700 mt-2">Coverage: {COMPANY.uae.emirates.join(', ')}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
