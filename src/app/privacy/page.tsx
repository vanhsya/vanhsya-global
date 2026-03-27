'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, UserCheck, Globe, Mail, Phone } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { COMPANY } from '@/lib/company';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="section-padding pt-32 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="heading-xl text-white mb-6">
              Privacy <span className="text-gradient-cyan">Policy</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Your privacy is fundamental to our service. Learn how we protect and handle your personal information.
            </p>
            <div className="text-white/80 mt-4">
              <p>Last updated: January 1, 2025</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="section-padding bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            
            {/* Overview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="modern-card mb-8"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Overview</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                VANHSYA Global Migration ("we," "our," or "us") is committed to protecting your privacy and personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
                immigration services, website, and client portal.
              </p>
              <p className="text-gray-700 leading-relaxed">
                By using our services, you agree to the collection and use of information in accordance with this policy. 
                We will not use or share your information with anyone except as described in this Privacy Policy.
              </p>
            </motion.div>

            {/* Information We Collect */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="modern-card mb-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Database className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-800">Information We Collect</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Personal Information</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Full name, date of birth, and nationality</li>
                    <li>Contact information (email, phone, address)</li>
                    <li>Passport and identification documents</li>
                    <li>Educational and employment history</li>
                    <li>Financial information for visa applications</li>
                    <li>Family member information when required</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Technical Information</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>IP address and browser information</li>
                    <li>Cookies and usage data</li>
                    <li>Device information and preferences</li>
                    <li>Website interaction and navigation patterns</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Service-Related Information</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Immigration goals and preferences</li>
                    <li>Communication history with our team</li>
                    <li>Application status and updates</li>
                    <li>Payment and billing information</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* How We Use Information */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="modern-card mb-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <UserCheck className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-semibold text-gray-800">How We Use Your Information</h2>
              </div>
              
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-2">Primary Services</h3>
                  <ul className="list-disc list-inside text-blue-700 space-y-1">
                    <li>Processing visa and immigration applications</li>
                    <li>Providing personalized consultation and advice</li>
                    <li>Communicating updates and important information</li>
                    <li>Maintaining your client portal and account</li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 mb-2">Service Improvement</h3>
                  <ul className="list-disc list-inside text-green-700 space-y-1">
                    <li>Enhancing our website and services</li>
                    <li>Analyzing usage patterns and preferences</li>
                    <li>Developing new features and tools</li>
                    <li>Training our team for better service</li>
                  </ul>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-800 mb-2">Legal and Administrative</h3>
                  <ul className="list-disc list-inside text-purple-700 space-y-1">
                    <li>Complying with immigration laws and regulations</li>
                    <li>Responding to legal requests and court orders</li>
                    <li>Preventing fraud and ensuring security</li>
                    <li>Maintaining business records and accounts</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Information Sharing */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="modern-card mb-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Globe className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-semibold text-gray-800">Information Sharing and Disclosure</h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                    <h3 className="font-semibold text-yellow-800 mb-2">Government Authorities</h3>
                    <p className="text-yellow-700 text-sm">
                      When required for visa processing, immigration applications, or legal compliance with local and international laws.
                    </p>
                  </div>

                  <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                    <h3 className="font-semibold text-red-800 mb-2">Service Providers</h3>
                    <p className="text-red-700 text-sm">
                      With trusted partners who assist in providing our services, under strict confidentiality agreements.
                    </p>
                  </div>

                  <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                    <h3 className="font-semibold text-indigo-800 mb-2">Legal Requirements</h3>
                    <p className="text-indigo-700 text-sm">
                      When required by law, court order, or to protect our rights, property, or safety, or that of others.
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-2">Your Consent</h3>
                    <p className="text-gray-700 text-sm">
                      When you explicitly consent to sharing your information for specific purposes or services.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Data Security */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="modern-card mb-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Lock className="w-6 h-6 text-red-600" />
                <h2 className="text-2xl font-semibold text-gray-800">Data Security</h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  We implement robust security measures to protect your personal information against unauthorized access, 
                  alteration, disclosure, or destruction:
                </p>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                    <Lock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-blue-800 mb-1">Encryption</h3>
                    <p className="text-blue-700 text-sm">256-bit SSL encryption for all data transmission</p>
                  </div>

                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                    <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-green-800 mb-1">Access Control</h3>
                    <p className="text-green-700 text-sm">Restricted access on a need-to-know basis</p>
                  </div>

                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                    <Database className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-purple-800 mb-1">Secure Storage</h3>
                    <p className="text-purple-700 text-sm">Protected servers with regular security audits</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Your Rights */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="modern-card mb-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Eye className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-semibold text-gray-800">Your Rights and Choices</h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  You have the following rights regarding your personal information:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Access</h3>
                        <p className="text-gray-600 text-sm">Request a copy of your personal information</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Correction</h3>
                        <p className="text-gray-600 text-sm">Update or correct inaccurate information</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Deletion</h3>
                        <p className="text-gray-600 text-sm">Request deletion of your personal data</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Portability</h3>
                        <p className="text-gray-600 text-sm">Transfer your data to another service</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Restriction</h3>
                        <p className="text-gray-600 text-sm">Limit how we process your information</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Objection</h3>
                        <p className="text-gray-600 text-sm">Object to certain uses of your data</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="modern-card"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Contact Us About Privacy</h2>
              
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                    <Mail className="w-6 h-6 text-blue-600" />
                    <div>
                      <h3 className="font-semibold text-blue-800">Email</h3>
                      <p className="text-blue-700">{COMPANY.emails.support}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                    <Phone className="w-6 h-6 text-green-600" />
                    <div>
                      <h3 className="font-semibold text-green-800">Phone</h3>
                      <p className="text-green-700">{COMPANY.phoneDisplay}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-gray-700 text-sm">
                    <strong>Note:</strong> This Privacy Policy may be updated from time to time. We will notify you of any 
                    significant changes by email or through our website. Your continued use of our services after such 
                    modifications constitutes acknowledgment and acceptance of the updated policy.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
