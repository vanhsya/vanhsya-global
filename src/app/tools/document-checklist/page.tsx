'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { FaClipboardList, FaDownload, FaPrint, FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaFileAlt, FaUser, FaGraduationCap, FaBriefcase, FaHeart, FaPlane } from 'react-icons/fa';

interface DocumentRequirement {
  id: string;
  name: string;
  description: string;
  required: boolean;
  category: 'personal' | 'education' | 'work' | 'financial' | 'family' | 'travel';
  notes?: string;
  validityPeriod?: string;
  alternatives?: string[];
  tipForObtaining?: string;
}

interface ChecklistConfig {
  country: string;
  visaType: string;
  applicantType: string;
  familySize: number;
  hasWorkExperience: boolean;
  hasEducation: boolean;
  hasPreviousTravel: boolean;
}

const DocumentChecklistGenerator: React.FC = () => {
  const [config, setConfig] = useState<ChecklistConfig>({
    country: '',
    visaType: '',
    applicantType: 'primary',
    familySize: 1,
    hasWorkExperience: false,
    hasEducation: false,
    hasPreviousTravel: false
  });

  const [checklist, setChecklist] = useState<DocumentRequirement[]>([]);
  const [showChecklist, setShowChecklist] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const countries = [
    { code: 'canada', name: 'Canada' },
    { code: 'australia', name: 'Australia' },
    { code: 'usa', name: 'United States' },
    { code: 'uk', name: 'United Kingdom' },
    { code: 'germany', name: 'Germany' }
  ];

  const visaTypes = {
    canada: [
      { code: 'express-entry', name: 'Express Entry (Federal Skilled Worker)' },
      { code: 'pnp', name: 'Provincial Nominee Program' },
      { code: 'study', name: 'Study Permit' },
      { code: 'work', name: 'Work Permit' },
      { code: 'visitor', name: 'Visitor Visa' },
      { code: 'family', name: 'Family Sponsorship' }
    ],
    australia: [
      { code: 'skilled-independent', name: 'Skilled Independent (189)' },
      { code: 'skilled-nominated', name: 'Skilled Nominated (190)' },
      { code: 'student', name: 'Student Visa (500)' },
      { code: 'temporary-skill', name: 'Temporary Skill Shortage (482)' },
      { code: 'visitor', name: 'Visitor Visa (600)' },
      { code: 'partner', name: 'Partner Visa (820/801)' }
    ],
    usa: [
      { code: 'h1b', name: 'H-1B Specialty Occupation' },
      { code: 'eb2', name: 'EB-2 Employment-Based' },
      { code: 'f1', name: 'F-1 Student Visa' },
      { code: 'b1b2', name: 'B-1/B-2 Visitor' },
      { code: 'family', name: 'Family-Based Immigration' }
    ],
    uk: [
      { code: 'skilled-worker', name: 'Skilled Worker Visa' },
      { code: 'global-talent', name: 'Global Talent Visa' },
      { code: 'student', name: 'Student Visa' },
      { code: 'visitor', name: 'Visitor Visa' },
      { code: 'family', name: 'Family Visa' }
    ],
    germany: [
      { code: 'eu-blue-card', name: 'EU Blue Card' },
      { code: 'skilled-immigration', name: 'Skilled Immigration Act' },
      { code: 'student', name: 'Student Visa' },
      { code: 'job-seeker', name: 'Job Seeker Visa' },
      { code: 'family-reunion', name: 'Family Reunion' }
    ]
  };

  const generateChecklist = () => {
    const documents: DocumentRequirement[] = [];

    // Base documents for all applications
    const baseDocuments: DocumentRequirement[] = [
      {
        id: 'passport',
        name: 'Valid Passport',
        description: 'Current passport with at least 6 months validity',
        required: true,
        category: 'personal',
        validityPeriod: 'Must be valid for at least 6 months',
        tipForObtaining: 'Apply for renewal if expiring within 12 months'
      },
      {
        id: 'photos',
        name: 'Passport-sized Photographs',
        description: 'Recent passport-style photographs meeting specific requirements',
        required: true,
        category: 'personal',
        notes: 'Usually 2-6 photos required, check specific dimensions'
      },
      {
        id: 'birth-certificate',
        name: 'Birth Certificate',
        description: 'Official birth certificate or equivalent',
        required: true,
        category: 'personal',
        alternatives: ['Hospital birth record', 'Baptismal certificate (if no birth certificate available)']
      }
    ];

    documents.push(...baseDocuments);

    // Country-specific documents
    if (config.country === 'canada') {
      documents.push(
        {
          id: 'police-clearance',
          name: 'Police Clearance Certificate',
          description: 'From all countries where you lived for 6+ months since age 18',
          required: true,
          category: 'personal',
          validityPeriod: 'Must be less than 3 months old when submitted',
          tipForObtaining: 'Start early as this can take 2-3 months to obtain'
        },
        {
          id: 'medical-exam',
          name: 'Medical Examination',
          description: 'From panel physician approved by IRCC',
          required: true,
          category: 'personal',
          validityPeriod: 'Valid for 12 months',
          notes: 'Book only after receiving instruction from IRCC'
        }
      );

      if (config.visaType === 'express-entry' || config.visaType === 'pnp') {
        documents.push(
          {
            id: 'eca',
            name: 'Educational Credential Assessment (ECA)',
            description: 'Assessment of foreign educational credentials',
            required: true,
            category: 'education',
            validityPeriod: 'Valid for 5 years',
            tipForObtaining: 'WES, ICAS, or CES are designated organizations'
          },
          {
            id: 'language-test',
            name: 'Language Test Results',
            description: 'IELTS, CELPIP, or TEF results for English/French',
            required: true,
            category: 'education',
            validityPeriod: 'Valid for 2 years',
            notes: 'Minimum CLB 7 for Express Entry'
          },
          {
            id: 'proof-of-funds',
            name: 'Proof of Funds',
            description: 'Bank statements showing required settlement funds',
            required: true,
            category: 'financial',
            notes: 'Must show 6 months of banking history'
          }
        );
      }
    }

    if (config.country === 'australia') {
      documents.push(
        {
          id: 'skills-assessment',
          name: 'Skills Assessment',
          description: 'Positive skills assessment from relevant assessing authority',
          required: true,
          category: 'work',
          validityPeriod: 'Usually valid for 3 years',
          tipForObtaining: 'Different authorities for different occupations'
        },
        {
          id: 'english-test',
          name: 'English Language Test',
          description: 'IELTS, PTE Academic, or TOEFL iBT results',
          required: true,
          category: 'education',
          validityPeriod: 'Valid for 3 years',
          notes: 'Minimum competent English required'
        }
      );
    }

    // Education documents
    if (config.hasEducation) {
      documents.push(
        {
          id: 'degree-certificates',
          name: 'Degree/Diploma Certificates',
          description: 'All educational certificates and degrees',
          required: true,
          category: 'education',
          notes: 'Include transcripts and mark sheets'
        },
        {
          id: 'transcripts',
          name: 'Official Transcripts',
          description: 'Detailed academic transcripts from all institutions',
          required: true,
          category: 'education',
          tipForObtaining: 'Request sealed transcripts from institutions'
        }
      );
    }

    // Work experience documents
    if (config.hasWorkExperience) {
      documents.push(
        {
          id: 'employment-letters',
          name: 'Employment Letters',
          description: 'Letters from all employers detailing job duties and salary',
          required: true,
          category: 'work',
          notes: 'Must include specific job duties, hours worked, and salary'
        },
        {
          id: 'pay-stubs',
          name: 'Pay Stubs/Salary Slips',
          description: 'Recent pay stubs or salary certificates',
          required: true,
          category: 'work',
          validityPeriod: 'Last 6-12 months'
        },
        {
          id: 'tax-documents',
          name: 'Tax Returns/Form 16',
          description: 'Income tax returns or equivalent tax documents',
          required: true,
          category: 'work',
          notes: 'Usually last 2-3 years required'
        }
      );
    }

    // Family documents
    if (config.familySize > 1) {
      documents.push(
        {
          id: 'marriage-certificate',
          name: 'Marriage Certificate',
          description: 'Official marriage certificate if applicable',
          required: true,
          category: 'family',
          notes: 'Must be registered with government authority'
        },
        {
          id: 'spouse-documents',
          name: 'Spouse Documents',
          description: 'All required documents for spouse (passport, education, etc.)',
          required: true,
          category: 'family',
          notes: 'Spouse needs same documents as primary applicant'
        }
      );

      if (config.familySize > 2) {
        documents.push({
          id: 'children-documents',
          name: 'Children Birth Certificates',
          description: 'Birth certificates for all dependent children',
          required: true,
          category: 'family',
          notes: 'Include adoption papers if applicable'
        });
      }
    }

    // Travel documents
    if (config.hasPreviousTravel) {
      documents.push({
        id: 'travel-history',
        name: 'Travel History',
        description: 'Details of all international travel in last 10 years',
        required: true,
        category: 'travel',
        notes: 'Include entry/exit stamps and visa copies'
      });
    }

    // Financial documents
    documents.push(
      {
        id: 'bank-statements',
        name: 'Bank Statements',
        description: 'Recent bank statements showing financial stability',
        required: true,
        category: 'financial',
        validityPeriod: 'Last 6 months',
        notes: 'All pages required, including blank pages'
      },
      {
        id: 'financial-documents',
        name: 'Additional Financial Documents',
        description: 'Fixed deposits, property documents, investment certificates',
        required: false,
        category: 'financial',
        notes: 'Helpful to show strong financial ties'
      }
    );

    setChecklist(documents);
    setShowChecklist(true);
  };

  const toggleCheck = (documentId: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(documentId)) {
      newChecked.delete(documentId);
    } else {
      newChecked.add(documentId);
    }
    setCheckedItems(newChecked);
  };

  const getProgressPercentage = () => {
    const requiredDocuments = checklist.filter(doc => doc.required);
    const checkedRequired = requiredDocuments.filter(doc => checkedItems.has(doc.id));
    return requiredDocuments.length > 0 ? Math.round((checkedRequired.length / requiredDocuments.length) * 100) : 0;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'personal': return <FaUser className="w-4 h-4" />;
      case 'education': return <FaGraduationCap className="w-4 h-4" />;
      case 'work': return <FaBriefcase className="w-4 h-4" />;
      case 'financial': return <FaClipboardList className="w-4 h-4" />;
      case 'family': return <FaHeart className="w-4 h-4" />;
      case 'travel': return <FaPlane className="w-4 h-4" />;
      default: return <FaFileAlt className="w-4 h-4" />;
    }
  };

  const exportToPDF = () => {
    // In a real implementation, you would use a library like jsPDF
    alert('PDF export functionality would be implemented here');
  };

  const printChecklist = () => {
    window.print();
  };

  if (!showChecklist) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        
        <div className="pt-20 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex justify-center mb-6"
              >
                <FaClipboardList className="w-16 h-16 text-blue-600" />
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
              >
                Document Checklist Generator
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              >
                Generate a personalized document checklist based on your destination country and visa type.
                Never miss a required document again.
              </motion.p>
            </div>

            {/* Configuration Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Tell us about your application
              </h2>

              <div className="space-y-6">
                {/* Country Selection */}
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Destination Country
                  </label>
                  <select
                    id="country"
                    value={config.country}
                    onChange={(e) => setConfig(prev => ({ ...prev, country: e.target.value, visaType: '' }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a country</option>
                    {countries.map(country => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Visa Type Selection */}
                {config.country && (
                  <div>
                    <label htmlFor="visaType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Visa/Immigration Program
                    </label>
                    <select
                      id="visaType"
                      value={config.visaType}
                      onChange={(e) => setConfig(prev => ({ ...prev, visaType: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select a visa type</option>
                      {config.country && visaTypes[config.country as keyof typeof visaTypes]?.map(visa => (
                        <option key={visa.code} value={visa.code}>
                          {visa.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Applicant Type */}
                <div>
                  <label htmlFor="applicantType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Applicant Type
                  </label>
                  <select
                    id="applicantType"
                    value={config.applicantType}
                    onChange={(e) => setConfig(prev => ({ ...prev, applicantType: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="primary">Primary Applicant</option>
                    <option value="spouse">Spouse/Partner</option>
                    <option value="dependent">Dependent Child</option>
                  </select>
                </div>

                {/* Family Size */}
                <div>
                  <label htmlFor="familySize" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Total Family Members (including yourself)
                  </label>
                  <select
                    id="familySize"
                    value={config.familySize}
                    onChange={(e) => setConfig(prev => ({ ...prev, familySize: parseInt(e.target.value) }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(size => (
                      <option key={size} value={size}>
                        {size} {size === 1 ? 'person' : 'people'}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Additional Options */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Additional Information
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="hasEducation"
                        checked={config.hasEducation}
                        onChange={(e) => setConfig(prev => ({ ...prev, hasEducation: e.target.checked }))}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="hasEducation" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        I have post-secondary education credentials
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="hasWorkExperience"
                        checked={config.hasWorkExperience}
                        onChange={(e) => setConfig(prev => ({ ...prev, hasWorkExperience: e.target.checked }))}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="hasWorkExperience" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        I have relevant work experience
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="hasPreviousTravel"
                        checked={config.hasPreviousTravel}
                        onChange={(e) => setConfig(prev => ({ ...prev, hasPreviousTravel: e.target.checked }))}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="hasPreviousTravel" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        I have significant international travel history
                      </label>
                    </div>
                  </div>
                </div>

                {/* Generate Button */}
                <div className="pt-6">
                  <button
                    onClick={generateChecklist}
                    disabled={!config.country || !config.visaType}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Generate My Document Checklist
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  // Checklist Display
  const categories = ['personal', 'education', 'work', 'financial', 'family', 'travel'];
  const categorizedDocuments = categories.map(category => ({
    category,
    documents: checklist.filter(doc => doc.category === category)
  })).filter(cat => cat.documents.length > 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Document Checklist for {countries.find(c => c.code === config.country)?.name}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-gray-600 dark:text-gray-300 mb-6"
            >
              {config.country && visaTypes[config.country as keyof typeof visaTypes]?.find(v => v.code === config.visaType)?.name}
            </motion.p>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Required Documents Progress
                </span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {getProgressPercentage()}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${getProgressPercentage()}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
                <span>{checklist.filter(doc => doc.required && checkedItems.has(doc.id)).length} completed</span>
                <span>{checklist.filter(doc => doc.required).length} required</span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button
                onClick={exportToPDF}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaDownload className="w-4 h-4" />
                <span>Export PDF</span>
              </button>
              <button
                onClick={printChecklist}
                className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <FaPrint className="w-4 h-4" />
                <span>Print</span>
              </button>
              <button
                onClick={() => setShowChecklist(false)}
                className="flex items-center space-x-2 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
              >
                <span>Modify Selection</span>
              </button>
            </div>
          </div>

          {/* Document Categories */}
          <div className="space-y-8">
            {categorizedDocuments.map((categoryData, index) => (
              <motion.div
                key={categoryData.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
                    {getCategoryIcon(categoryData.category)}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white capitalize">
                    {categoryData.category} Documents
                  </h2>
                  <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full text-sm">
                    {categoryData.documents.length} items
                  </span>
                </div>

                <div className="space-y-4">
                  {categoryData.documents.map((document) => (
                    <div
                      key={document.id}
                      className={`border rounded-lg p-4 transition-all ${
                        checkedItems.has(document.id)
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <button
                          onClick={() => toggleCheck(document.id)}
                          className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                            checkedItems.has(document.id)
                              ? 'border-green-500 bg-green-500 text-white'
                              : 'border-gray-300 hover:border-green-500'
                          }`}
                        >
                          {checkedItems.has(document.id) && (
                            <FaCheckCircle className="w-3 h-3" />
                          )}
                        </button>

                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className={`font-medium ${
                              checkedItems.has(document.id) 
                                ? 'text-green-800 dark:text-green-200 line-through' 
                                : 'text-gray-900 dark:text-white'
                            }`}>
                              {document.name}
                            </h3>
                            {document.required ? (
                              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full dark:bg-red-900/20 dark:text-red-400">
                                Required
                              </span>
                            ) : (
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full dark:bg-blue-900/20 dark:text-blue-400">
                                Optional
                              </span>
                            )}
                          </div>

                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                            {document.description}
                          </p>

                          {document.validityPeriod && (
                            <div className="flex items-center space-x-1 text-xs text-yellow-600 dark:text-yellow-400 mb-1">
                              <FaExclamationTriangle className="w-3 h-3" />
                              <span>Validity: {document.validityPeriod}</span>
                            </div>
                          )}

                          {document.notes && (
                            <div className="flex items-center space-x-1 text-xs text-blue-600 dark:text-blue-400 mb-1">
                              <FaInfoCircle className="w-3 h-3" />
                              <span>{document.notes}</span>
                            </div>
                          )}

                          {document.tipForObtaining && (
                            <div className="text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/10 p-2 rounded mt-2">
                              <strong>Tip:</strong> {document.tipForObtaining}
                            </div>
                          )}

                          {document.alternatives && document.alternatives.length > 0 && (
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                              <strong>Alternatives:</strong> {document.alternatives.join(', ')}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mt-8"
          >
            <div className="flex items-start space-x-3">
              <FaExclamationTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
              <div>
                <h3 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                  Important Notice
                </h3>
                <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                  This checklist is based on general requirements and may not include all specific requirements for your case.
                  Always consult the official government website or immigration lawyer for the most up-to-date and personalized requirements.
                  Document requirements can change without notice.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DocumentChecklistGenerator;
