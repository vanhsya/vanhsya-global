'use client';

import { motion } from 'framer-motion';
import { FileText, Scale, Shield, AlertTriangle, CheckCircle, XCircle, DollarSign, Clock } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { COMPANY } from '@/lib/company';

export default function TermsOfService() {
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
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Scale className="w-8 h-8 text-white" />
            </div>
            <h1 className="heading-xl text-white mb-6">
              Terms of <span className="text-gradient-cyan">Service</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Our terms and conditions outline the rules and guidelines for using VANHSYA immigration services.
            </p>
            <div className="text-white/80 mt-4">
              <p>Last updated: January 1, 2025</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="section-padding bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            
            {/* Acceptance of Terms */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="modern-card mb-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-800">Acceptance of Terms</h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Welcome to VANHSYA Global Migration. These Terms of Service ("Terms") govern your use of our website, 
                  services, and client portal. By accessing or using our services, you agree to be bound by these Terms.
                </p>
                
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-blue-800 mb-1">Agreement</h3>
                      <p className="text-blue-700 text-sm">
                        By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-yellow-800 mb-1">Updates</h3>
                      <p className="text-yellow-700 text-sm">
                        We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Services Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="modern-card mb-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-semibold text-gray-800">Our Services</h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  VANHSYA provides professional immigration consulting services, including but not limited to:
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">Visa application assistance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">Immigration consultation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">Document preparation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">Application tracking</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">Legal guidance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">Settlement support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">Educational resources</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">Ongoing support</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <h3 className="font-semibold text-green-800 mb-2">Professional Standards</h3>
                  <p className="text-green-700 text-sm">
                    All services are provided by licensed immigration consultants in accordance with applicable laws and professional standards.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Client Responsibilities */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="modern-card mb-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
                <h2 className="text-2xl font-semibold text-gray-800">Client Responsibilities</h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  As our client, you agree to:
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <CheckCircle className="w-5 h-5 text-orange-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-orange-800">Accurate Information</h3>
                      <p className="text-orange-700 text-sm">Provide complete, accurate, and truthful information at all times.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-blue-800">Timely Response</h3>
                      <p className="text-blue-700 text-sm">Respond promptly to requests for information or documentation.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <CheckCircle className="w-5 h-5 text-purple-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-purple-800">Document Authenticity</h3>
                      <p className="text-purple-700 text-sm">Ensure all submitted documents are genuine and legally obtained.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-green-800">Legal Compliance</h3>
                      <p className="text-green-700 text-sm">Comply with all applicable immigration laws and regulations.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Payment Terms */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="modern-card mb-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <DollarSign className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-semibold text-gray-800">Payment Terms</h2>
              </div>
              
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h3 className="font-semibold text-blue-800 mb-3">Fees and Charges</h3>
                    <ul className="text-blue-700 text-sm space-y-2">
                      <li>• Service fees are clearly stated before engagement</li>
                      <li>• Government fees are separate and non-refundable</li>
                      <li>• Additional charges may apply for expedited services</li>
                      <li>• All prices are subject to applicable taxes</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h3 className="font-semibold text-green-800 mb-3">Payment Methods</h3>
                    <ul className="text-green-700 text-sm space-y-2">
                      <li>• Secure online payments via credit/debit card</li>
                      <li>• Bank transfers and wire payments</li>
                      <li>• Installment plans available for certain services</li>
                      <li>• Multi-currency support</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-yellow-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-yellow-800 mb-2">Payment Schedule</h3>
                      <p className="text-yellow-700 text-sm">
                        Initial consultation fees are due upon booking. Service fees are typically required before 
                        beginning substantive work on your file. Payment schedules will be clearly outlined in your service agreement.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Refund Policy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="modern-card mb-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <XCircle className="w-6 h-6 text-red-600" />
                <h2 className="text-2xl font-semibold text-gray-800">Refund Policy</h2>
              </div>
              
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200 text-center">
                    <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-green-800 mb-1">Eligible for Refund</h3>
                    <p className="text-green-700 text-sm">Services not yet commenced within 48 hours of payment</p>
                  </div>

                  <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200 text-center">
                    <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-yellow-800 mb-1">Partial Refund</h3>
                    <p className="text-yellow-700 text-sm">Services partially completed based on work done</p>
                  </div>

                  <div className="bg-red-50 rounded-lg p-4 border border-red-200 text-center">
                    <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-red-800 mb-1">Non-Refundable</h3>
                    <p className="text-red-700 text-sm">Government fees, third-party costs, completed consultations</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-2">Refund Process</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    Refund requests must be submitted in writing within the applicable timeframe. Approved refunds 
                    will be processed within 5-10 business days to the original payment method.
                  </p>
                  <p className="text-gray-600 text-xs">
                    Note: Application outcomes are not guaranteed, and visa refusals by government authorities 
                    do not automatically entitle clients to refunds of professional service fees.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Limitations and Disclaimers */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="modern-card mb-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Scale className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-semibold text-gray-800">Limitations and Disclaimers</h2>
              </div>
              
              <div className="space-y-4">
                <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-red-800 mb-2">No Guarantee of Outcome</h3>
                      <p className="text-red-700 text-sm">
                        While we provide professional services to the best of our ability, we cannot guarantee 
                        the approval of any visa or immigration application. Final decisions rest with government authorities.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-blue-800 mb-2">Limitation of Liability</h3>
                      <p className="text-blue-700 text-sm">
                        Our liability is limited to the amount of fees paid for our services. We are not liable 
                        for indirect, consequential, or punitive damages arising from our services.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-purple-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-purple-800 mb-2">Information Accuracy</h3>
                      <p className="text-purple-700 text-sm">
                        While we strive to provide accurate information, immigration laws and policies change frequently. 
                        Always verify current requirements with official government sources.
                      </p>
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
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Questions About These Terms?</h2>
              
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us:
                </p>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Email</h3>
                      <p className="text-gray-700">{COMPANY.emails.support}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Phone</h3>
                      <p className="text-gray-700">{COMPANY.phoneDisplay}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-gray-700 text-sm">
                    <strong>Governing Law:</strong> These Terms are governed by the laws of Canada. Any disputes will be 
                    resolved in the courts of Toronto, Ontario. If any provision of these Terms is found to be unenforceable, 
                    the remaining provisions will continue in full force and effect.
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
