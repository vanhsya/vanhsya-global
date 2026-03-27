'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { COMPANY } from '@/lib/company';
import { FaVideo, FaPhone, FaMapMarkerAlt, FaClock, FaCheckCircle, FaArrowRight, FaStar, FaShieldAlt } from 'react-icons/fa';

interface ConsultationForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  preferredDestination: string;
  consultationType: 'video' | 'phone' | 'in-person';
  preferredDate: string;
  preferredTime: string;
  immigrationGoal: string;
  currentStatus: string;
  additionalNotes: string;
  marketingConsent: boolean;
}

const ConsultationBooking: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ConsultationForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    preferredDestination: '',
    consultationType: 'video',
    preferredDate: '',
    preferredTime: '',
    immigrationGoal: '',
    currentStatus: '',
    additionalNotes: '',
    marketingConsent: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalSteps = 3;

  const consultationTypes = [
    {
      type: 'video' as const,
      name: 'Video Call',
      description: 'Convenient online consultation via Zoom/Teams',
      icon: <FaVideo className="w-6 h-6" />,
      duration: '45 minutes',
      price: 'Free Initial Consultation'
    },
    {
      type: 'phone' as const,
      name: 'Phone Call',
      description: 'Traditional phone consultation',
      icon: <FaPhone className="w-6 h-6" />,
      duration: '30 minutes',
      price: 'Free Initial Consultation'
    },
    {
      type: 'in-person' as const,
      name: 'In-Person Meeting',
      description: 'Face-to-face consultation at our office',
      icon: <FaMapMarkerAlt className="w-6 h-6" />,
      duration: '60 minutes',
      price: 'Premium Consultation'
    }
  ];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'
  ];

  const countries = [
    'India', 'Pakistan', 'Bangladesh', 'Sri Lanka', 'Nepal', 'Philippines',
    'Nigeria', 'Ghana', 'Kenya', 'South Africa', 'UAE', 'Saudi Arabia', 'Other'
  ];

  const destinationCountries = [
    'Canada', 'Australia', 'United States', 'United Kingdom', 'Germany',
    'New Zealand', 'Netherlands', 'Denmark', 'Sweden', 'Norway', 'Other'
  ];

  const immigrationGoals = [
    'Permanent Residence',
    'Work Visa',
    'Study Visa',
    'Business/Investment Visa',
    'Family Sponsorship',
    'Tourist/Visitor Visa',
    'Unsure - Need Guidance'
  ];

  const updateFormData = (field: keyof ConsultationForm, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => updateFormData('firstName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => updateFormData('lastName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={COMPANY.phoneDisplay}
                  required
                />
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                  Current Country *
                </label>
                <select
                  id="country"
                  value={formData.country}
                  onChange={(e) => updateFormData('country', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select your country</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="preferredDestination" className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Destination *
                </label>
                <select
                  id="preferredDestination"
                  value={formData.preferredDestination}
                  onChange={(e) => updateFormData('preferredDestination', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select destination</option>
                  {destinationCountries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="immigrationGoal" className="block text-sm font-medium text-gray-700 mb-2">
                Immigration Goal *
              </label>
              <select
                id="immigrationGoal"
                value={formData.immigrationGoal}
                onChange={(e) => updateFormData('immigrationGoal', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select your goal</option>
                {immigrationGoals.map(goal => (
                  <option key={goal} value={goal}>{goal}</option>
                ))}
              </select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Consultation Preferences</h3>
            
            {/* Consultation Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Preferred Consultation Type *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {consultationTypes.map((type) => (
                  <div
                    key={type.type}
                    onClick={() => updateFormData('consultationType', type.type)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.consultationType === type.type
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="text-blue-600">{type.icon}</div>
                      <h4 className="font-medium text-gray-900">{type.name}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{type.description}</p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span className="flex items-center">
                        <FaClock className="w-3 h-3 mr-1" />
                        {type.duration}
                      </span>
                      <span className="font-medium text-green-600">{type.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Date Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Date *
                </label>
                <input
                  id="preferredDate"
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => updateFormData('preferredDate', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Time *
                </label>
                <select
                  id="preferredTime"
                  value={formData.preferredTime}
                  onChange={(e) => updateFormData('preferredTime', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select time</option>
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="currentStatus" className="block text-sm font-medium text-gray-700 mb-2">
                Current Immigration Status
              </label>
              <textarea
                id="currentStatus"
                value={formData.currentStatus}
                onChange={(e) => updateFormData('currentStatus', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tell us about your current situation, any previous applications, etc."
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Information & Review</h3>
            
            <div>
              <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes or Questions
              </label>
              <textarea
                id="additionalNotes"
                value={formData.additionalNotes}
                onChange={(e) => updateFormData('additionalNotes', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Any specific questions or concerns you'd like to discuss..."
              />
            </div>

            {/* Review Summary */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-medium text-gray-900 mb-4">Consultation Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">{formData.firstName} {formData.lastName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Destination:</span>
                  <span className="font-medium">{formData.preferredDestination}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Goal:</span>
                  <span className="font-medium">{formData.immigrationGoal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium">
                    {consultationTypes.find(t => t.type === formData.consultationType)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date & Time:</span>
                  <span className="font-medium">{formData.preferredDate} at {formData.preferredTime}</span>
                </div>
              </div>
            </div>

            {/* Marketing Consent */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="marketingConsent"
                checked={formData.marketingConsent}
                onChange={(e) => updateFormData('marketingConsent', e.target.checked)}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="marketingConsent" className="text-sm text-gray-700">
                I agree to receive marketing communications and updates about immigration opportunities.
                You can unsubscribe at any time.
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        <div className="min-h-screen flex items-center justify-center py-12 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCheckCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Consultation Booked Successfully!
            </h2>
            
            <p className="text-gray-600 mb-6">
              Thank you for booking your consultation. We'll send you a confirmation email shortly with 
              the meeting details and preparation guidelines.
            </p>
            
            <div className="space-y-3 text-sm text-left bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{formData.preferredDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="font-medium">{formData.preferredTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Type:</span>
                <span className="font-medium">
                  {consultationTypes.find(t => t.type === formData.consultationType)?.name}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => window.location.href = '/'}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Return to Homepage
              </button>
              
              <button
                onClick={() => window.location.href = '/portal'}
                className="w-full border border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Access Client Portal
              </button>
            </div>
          </motion.div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Book Your Free Consultation
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Get personalized immigration guidance from our certified experts. 
              We'll help you choose the best pathway to achieve your goals.
            </motion.p>
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <div className="flex items-center space-x-3 justify-center">
              <FaStar className="w-5 h-5 text-yellow-500" />
              <span className="text-gray-700">4.9/5 Client Rating</span>
            </div>
            <div className="flex items-center space-x-3 justify-center">
              <FaShieldAlt className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">ICCRC Certified</span>
            </div>
            <div className="flex items-center space-x-3 justify-center">
              <FaCheckCircle className="w-5 h-5 text-blue-500" />
              <span className="text-gray-700">500+ Success Stories</span>
            </div>
          </motion.div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm font-medium text-gray-700">
                {Math.round((currentStep / totalSteps) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Form */}
          <motion.div
            layout
            className="bg-white rounded-xl shadow-lg p-8"
          >
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              
              <button
                onClick={nextStep}
                disabled={isSubmitting}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    <span>Booking...</span>
                  </>
                ) : (
                  <>
                    <span>{currentStep === totalSteps ? 'Book Consultation' : 'Next'}</span>
                    <FaArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 bg-blue-50 rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-blue-900 mb-4">What to Expect</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
              <div className="flex items-start space-x-2">
                <FaCheckCircle className="w-4 h-4 mt-1 text-blue-600" />
                <span>Comprehensive assessment of your profile</span>
              </div>
              <div className="flex items-start space-x-2">
                <FaCheckCircle className="w-4 h-4 mt-1 text-blue-600" />
                <span>Personalized immigration strategy</span>
              </div>
              <div className="flex items-start space-x-2">
                <FaCheckCircle className="w-4 h-4 mt-1 text-blue-600" />
                <span>Document checklist and timeline</span>
              </div>
              <div className="flex items-start space-x-2">
                <FaCheckCircle className="w-4 h-4 mt-1 text-blue-600" />
                <span>Next steps and action plan</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ConsultationBooking;
