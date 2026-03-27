'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Upload, CheckCircle, Download, AlertCircle, Eye, MessageSquare } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface DocumentCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  required: string[];
  optional: string[];
  tips: string[];
}

const documentCategories: DocumentCategory[] = [
  {
    id: 'express-entry',
    name: 'Express Entry (Canada)',
    description: 'Federal skilled worker program for permanent residence',
    icon: FileText,
    required: [
      'Passport or travel document',
      'Language test results (IELTS/CELPIP/TEF)',
      'Educational Credential Assessment (ECA)',
      'Proof of work experience letters',
      'Police clearance certificate',
      'Medical exam results'
    ],
    optional: [
      'Proof of funds',
      'Job offer letter',
      'Provincial nomination certificate',
      'Canadian education certificate'
    ],
    tips: [
      'Get your ECA done early as it takes 4-6 weeks',
      'Take language tests before ECA expires',
      'Organize documents in PDF format under 4MB each',
      'Get reference letters on company letterhead'
    ]
  },
  {
    id: 'skilled-visa',
    name: 'Skilled Visa (Australia)',
    description: 'Points-based system for skilled workers',
    icon: FileText,
    required: [
      'Passport',
      'Skills assessment from relevant authority',
      'English language test (IELTS/PTE/TOEFL)',
      'Qualification documents',
      'Work experience evidence',
      'Health examinations',
      'Character documents (police checks)'
    ],
    optional: [
      'Partner skills assessment',
      'Community language credentials',
      'Australian study documents',
      'Professional year program certificate'
    ],
    tips: [
      'Skills assessment can take 2-4 months',
      'Book health exams after invitation only',
      'Get police checks from all countries lived in',
      'Keep original documents safe'
    ]
  },
  {
    id: 'work-visa',
    name: 'Work Visa (UK)',
    description: 'Skilled Worker and Global Talent visas',
    icon: FileText,
    required: [
      'Current passport',
      'Certificate of Sponsorship (CoS)',
      'English language certificate',
      'Tuberculosis test results',
      'Academic qualifications',
      'Financial documents',
      'Previous passport pages'
    ],
    optional: [
      'Criminal record certificate',
      'Relationship documents (if applicable)',
      'Previous UK visa documents',
      'Maintenance funds evidence'
    ],
    tips: [
      'Apply online and book biometrics appointment',
      'CoS must be used within 3 months',
      'Financial requirements vary by visa type',
      'Keep documents in English or get certified translations'
    ]
  }
];

interface DocumentChecklist {
  category: DocumentCategory;
  checkedItems: Set<string>;
  uploadedFiles: Record<string, File>;
}

export default function DocumentWizard() {
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory | null>(null);
  const [checklist, setChecklist] = useState<DocumentChecklist | null>(null);

  const initializeChecklist = (category: DocumentCategory) => {
    setChecklist({
      category,
      checkedItems: new Set(),
      uploadedFiles: {}
    });
  };

  const toggleItem = (item: string) => {
    if (!checklist) return;
    
    const newCheckedItems = new Set(checklist.checkedItems);
    if (newCheckedItems.has(item)) {
      newCheckedItems.delete(item);
    } else {
      newCheckedItems.add(item);
    }
    
    setChecklist({
      ...checklist,
      checkedItems: newCheckedItems
    });
  };

  const handleFileUpload = (item: string, file: File) => {
    if (!checklist) return;
    
    setChecklist({
      ...checklist,
      uploadedFiles: {
        ...checklist.uploadedFiles,
        [item]: file
      }
    });
    
    // Auto-check the item when file is uploaded
    const newCheckedItems = new Set(checklist.checkedItems);
    newCheckedItems.add(item);
    setChecklist(prev => prev ? {
      ...prev,
      checkedItems: newCheckedItems
    } : null);
  };

  const getProgress = () => {
    if (!checklist) return 0;
    const totalRequired = checklist.category.required.length;
    const checkedRequired = checklist.category.required.filter(item => 
      checklist.checkedItems.has(item)
    ).length;
    return (checkedRequired / totalRequired) * 100;
  };

  const getCompletionStatus = () => {
    if (!checklist) return { completed: 0, total: 0 };
    
    const totalItems = checklist.category.required.length + checklist.category.optional.length;
    const completedItems = checklist.checkedItems.size;
    
    return { completed: completedItems, total: totalItems };
  };

  if (!selectedCategory) {
    return (
      <div className="min-h-screen">
        <Navigation />
        
        <section className="section-padding pt-32 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="container-max">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="heading-xl text-gray-800 mb-6">
                AI Document <span className="text-gradient-cyan">Wizard</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get personalized document checklists for your immigration application. 
                Our AI ensures you have everything needed for a successful submission.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {documentCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="modern-card group cursor-pointer hover:scale-105 transition-all duration-300"
                  onClick={() => {
                    setSelectedCategory(category);
                    initializeChecklist(category);
                  }}
                >
                  <div className="text-center p-6">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                      <category.icon className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{category.name}</h3>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{category.required.length} Required</span>
                      <span>{category.optional.length} Optional</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="modern-card mt-16 p-8 text-center"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Use Our Document Wizard?</h2>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Complete Checklists</h3>
                  <p className="text-gray-600 text-sm">Never miss a required document with our comprehensive, country-specific checklists</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Document Upload</h3>
                  <p className="text-gray-600 text-sm">Securely upload and organize all your documents in one place</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Expert Tips</h3>
                  <p className="text-gray-600 text-sm">Get insider tips and best practices for each document type</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  if (!checklist) return null;

  const progress = getProgress();
  const { completed, total } = getCompletionStatus();

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="section-padding pt-32 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <button
              onClick={() => {
                setSelectedCategory(null);
                setChecklist(null);
              }}
              className="btn-secondary mb-6"
            >
              ← Back to Categories
            </button>
            
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{checklist.category.name}</h1>
                <p className="text-gray-600">{checklist.category.description}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600 mb-1">{Math.round(progress)}%</div>
                <div className="text-sm text-gray-500">Required Complete</div>
              </div>
            </div>

            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-6">
              <motion.div
                className="h-full bg-gradient-to-r from-green-500 to-blue-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1 }}
              />
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>{completed} of {total} documents completed</span>
              <span>•</span>
              <span>{checklist.category.required.length} required documents</span>
              <span>•</span>
              <span>{checklist.category.optional.length} optional documents</span>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="modern-card p-6 mb-8"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                  Required Documents
                </h2>
                
                <div className="space-y-4">
                  {checklist.category.required.map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`border-2 rounded-lg p-4 transition-all duration-300 ${
                        checklist.checkedItems.has(item)
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleItem(item)}
                          className={`w-5 h-5 border-2 rounded flex items-center justify-center mt-1 transition-all ${
                            checklist.checkedItems.has(item)
                              ? 'bg-green-500 border-green-500'
                              : 'border-gray-300 hover:border-green-400'
                          }`}
                        >
                          {checklist.checkedItems.has(item) && (
                            <CheckCircle className="w-3 h-3 text-white" />
                          )}
                        </button>
                        
                        <div className="flex-1">
                          <h3 className={`font-semibold ${
                            checklist.checkedItems.has(item) ? 'text-green-700' : 'text-gray-800'
                          }`}>
                            {item}
                          </h3>
                          
                          {checklist.uploadedFiles[item] && (
                            <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                              <CheckCircle className="w-4 h-4" />
                              <span>{checklist.uploadedFiles[item].name}</span>
                            </div>
                          )}
                          
                          <div className="mt-2 flex gap-2">
                            <label className="btn-sm bg-blue-100 text-blue-700 cursor-pointer">
                              <Upload className="w-3 h-3 mr-1" />
                              Upload
                              <input
                                type="file"
                                className="hidden"
                                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleFileUpload(item, file);
                                }}
                              />
                            </label>
                            
                            {checklist.uploadedFiles[item] && (
                              <button className="btn-sm bg-green-100 text-green-700">
                                <Eye className="w-3 h-3 mr-1" />
                                View
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="modern-card p-6"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <CheckCircle className="w-5 h-5 text-blue-500 mr-2" />
                  Optional Documents
                  <span className="text-sm font-normal text-gray-500 ml-2">(Recommended for stronger application)</span>
                </h2>
                
                <div className="space-y-4">
                  {checklist.category.optional.map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`border-2 rounded-lg p-4 transition-all duration-300 ${
                        checklist.checkedItems.has(item)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleItem(item)}
                          className={`w-5 h-5 border-2 rounded flex items-center justify-center mt-1 transition-all ${
                            checklist.checkedItems.has(item)
                              ? 'bg-blue-500 border-blue-500'
                              : 'border-gray-300 hover:border-blue-400'
                          }`}
                        >
                          {checklist.checkedItems.has(item) && (
                            <CheckCircle className="w-3 h-3 text-white" />
                          )}
                        </button>
                        
                        <div className="flex-1">
                          <h3 className={`font-semibold ${
                            checklist.checkedItems.has(item) ? 'text-blue-700' : 'text-gray-800'
                          }`}>
                            {item}
                          </h3>
                          
                          {checklist.uploadedFiles[item] && (
                            <div className="mt-2 flex items-center gap-2 text-sm text-blue-600">
                              <CheckCircle className="w-4 h-4" />
                              <span>{checklist.uploadedFiles[item].name}</span>
                            </div>
                          )}
                          
                          <div className="mt-2 flex gap-2">
                            <label className="btn-sm bg-blue-100 text-blue-700 cursor-pointer">
                              <Upload className="w-3 h-3 mr-1" />
                              Upload
                              <input
                                type="file"
                                className="hidden"
                                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleFileUpload(item, file);
                                }}
                              />
                            </label>
                            
                            {checklist.uploadedFiles[item] && (
                              <button className="btn-sm bg-green-100 text-green-700">
                                <Eye className="w-3 h-3 mr-1" />
                                View
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="modern-card p-6"
              >
                <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                  <MessageSquare className="w-5 h-5 text-orange-500 mr-2" />
                  Expert Tips
                </h3>
                <div className="space-y-3">
                  {checklist.category.tips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-600">{tip}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="modern-card p-6"
              >
                <h3 className="font-bold text-gray-800 mb-4">Actions</h3>
                <div className="space-y-3">
                  <button className="w-full btn-primary text-sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download Checklist PDF
                  </button>
                  <button className="w-full btn-secondary text-sm">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Get Expert Review
                  </button>
                  <button className="w-full btn-secondary text-sm">
                    Schedule Consultation
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="modern-card p-6"
              >
                <h3 className="font-bold text-gray-800 mb-4">Progress Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Required Documents:</span>
                    <span className="font-semibold text-green-600">
                      {checklist.category.required.filter(item => checklist.checkedItems.has(item)).length}/{checklist.category.required.length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Optional Documents:</span>
                    <span className="font-semibold text-blue-600">
                      {checklist.category.optional.filter(item => checklist.checkedItems.has(item)).length}/{checklist.category.optional.length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Files Uploaded:</span>
                    <span className="font-semibold text-purple-600">
                      {Object.keys(checklist.uploadedFiles).length}
                    </span>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between text-sm font-semibold">
                      <span className="text-gray-800">Overall Progress:</span>
                      <span className="text-blue-600">{Math.round((completed / total) * 100)}%</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}