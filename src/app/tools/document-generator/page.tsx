'use client';

import { motion } from 'framer-motion';
import { FileText, Download, Eye, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  fields: FormField[];
  previewAvailable: boolean;
}

interface FormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'date' | 'select' | 'textarea' | 'number';
  required: boolean;
  options?: string[];
  placeholder?: string;
}

const documentTemplates: DocumentTemplate[] = [
  {
    id: 'cover-letter',
    name: 'Immigration Cover Letter',
    description: 'Professional cover letter for your immigration application',
    category: 'application',
    previewAvailable: true,
    fields: [
      { id: 'fullName', label: 'Full Name', type: 'text', required: true, placeholder: 'John Smith' },
      { id: 'email', label: 'Email Address', type: 'email', required: true },
      { id: 'phone', label: 'Phone Number', type: 'text', required: true },
      { id: 'address', label: 'Current Address', type: 'textarea', required: true },
      { id: 'destination', label: 'Destination Country', type: 'select', required: true, 
        options: ['Canada', 'Australia', 'USA', 'UK', 'Germany', 'New Zealand'] },
      { id: 'visaType', label: 'Visa Type', type: 'select', required: true,
        options: ['Work Visa', 'Student Visa', 'Permanent Residence', 'Family Visa', 'Business Visa'] },
      { id: 'purpose', label: 'Purpose of Immigration', type: 'textarea', required: true, 
        placeholder: 'Describe your motivation and goals...' }
    ]
  },
  {
    id: 'sop',
    name: 'Statement of Purpose',
    description: 'Detailed statement outlining your immigration intentions',
    category: 'application',
    previewAvailable: true,
    fields: [
      { id: 'fullName', label: 'Full Name', type: 'text', required: true },
      { id: 'dateOfBirth', label: 'Date of Birth', type: 'date', required: true },
      { id: 'nationality', label: 'Nationality', type: 'text', required: true },
      { id: 'education', label: 'Highest Education', type: 'select', required: true,
        options: ['High School', 'Diploma', 'Bachelor\'s Degree', 'Master\'s Degree', 'PhD'] },
      { id: 'workExperience', label: 'Years of Work Experience', type: 'number', required: true },
      { id: 'currentJob', label: 'Current Job Title', type: 'text', required: true },
      { id: 'goals', label: 'Career Goals', type: 'textarea', required: true },
      { id: 'whyCountry', label: 'Why This Country?', type: 'textarea', required: true },
      { id: 'contribution', label: 'How Will You Contribute?', type: 'textarea', required: true }
    ]
  },
  {
    id: 'employment-letter',
    name: 'Employment Verification Letter',
    description: 'Letter template for employer to verify your employment',
    category: 'employment',
    previewAvailable: true,
    fields: [
      { id: 'employeeName', label: 'Employee Name', type: 'text', required: true },
      { id: 'employeeTitle', label: 'Job Title', type: 'text', required: true },
      { id: 'employeeId', label: 'Employee ID', type: 'text', required: false },
      { id: 'startDate', label: 'Employment Start Date', type: 'date', required: true },
      { id: 'salary', label: 'Annual Salary', type: 'number', required: true },
      { id: 'companyName', label: 'Company Name', type: 'text', required: true },
      { id: 'companyAddress', label: 'Company Address', type: 'textarea', required: true },
      { id: 'hrName', label: 'HR Manager Name', type: 'text', required: true },
      { id: 'hrTitle', label: 'HR Manager Title', type: 'text', required: true },
      { id: 'responsibilities', label: 'Key Responsibilities', type: 'textarea', required: true }
    ]
  },
  {
    id: 'financial-statement',
    name: 'Financial Support Statement',
    description: 'Statement of financial capability for immigration',
    category: 'financial',
    previewAvailable: true,
    fields: [
      { id: 'applicantName', label: 'Applicant Name', type: 'text', required: true },
      { id: 'sponsorName', label: 'Sponsor Name (if applicable)', type: 'text', required: false },
      { id: 'relationship', label: 'Relationship to Applicant', type: 'select', required: false,
        options: ['Self', 'Parent', 'Spouse', 'Sibling', 'Other Family', 'Friend'] },
      { id: 'bankBalance', label: 'Current Bank Balance', type: 'number', required: true },
      { id: 'monthlyIncome', label: 'Monthly Income', type: 'number', required: true },
      { id: 'assets', label: 'Other Assets', type: 'textarea', required: false },
      { id: 'supportAmount', label: 'Amount of Support', type: 'number', required: true },
      { id: 'supportDuration', label: 'Duration of Support', type: 'text', required: true }
    ]
  }
];

const categories = ['all', 'application', 'employment', 'financial', 'legal'];

export default function DocumentGenerator() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDocument, setGeneratedDocument] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const filteredTemplates = selectedCategory === 'all' 
    ? documentTemplates 
    : documentTemplates.filter(template => template.category === selectedCategory);

  const handleFieldChange = (fieldId: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  const generateDocument = async () => {
    if (!selectedTemplate) return;
    
    setIsGenerating(true);
    
    // Simulate document generation
    setTimeout(() => {
      let document = '';
      
      if (selectedTemplate.id === 'cover-letter') {
        document = generateCoverLetter();
      } else if (selectedTemplate.id === 'sop') {
        document = generateSOP();
      } else if (selectedTemplate.id === 'employment-letter') {
        document = generateEmploymentLetter();
      } else if (selectedTemplate.id === 'financial-statement') {
        document = generateFinancialStatement();
      }
      
      setGeneratedDocument(document);
      setIsGenerating(false);
    }, 2000);
  };

  const generateCoverLetter = () => {
    return `
IMMIGRATION COVER LETTER

${formData.fullName}
${formData.address}
${formData.email}
${formData.phone}

Date: ${new Date().toLocaleDateString()}

To Whom It May Concern,

I am writing to formally submit my application for ${formData.visaType} to ${formData.destination}. 

I am ${formData.fullName}, and I am excited about the opportunity to immigrate to ${formData.destination}. My purpose for immigration is as follows:

${formData.purpose}

I have carefully prepared all required documentation and meet the eligibility criteria for this visa category. I am committed to complying with all immigration laws and regulations of ${formData.destination}.

I look forward to a positive response to my application and the opportunity to contribute to ${formData.destination}.

Thank you for your consideration.

Sincerely,
${formData.fullName}
    `.trim();
  };

  const generateSOP = () => {
    return `
STATEMENT OF PURPOSE

Personal Information:
Name: ${formData.fullName}
Date of Birth: ${formData.dateOfBirth}
Nationality: ${formData.nationality}

Educational Background:
Highest Education: ${formData.education}

Professional Experience:
Work Experience: ${formData.workExperience} years
Current Position: ${formData.currentJob}

Career Goals:
${formData.goals}

Why This Country:
${formData.whyCountry}

Contribution to Society:
${formData.contribution}

I hereby declare that all information provided in this statement is true and accurate to the best of my knowledge.

Signature: ${formData.fullName}
Date: ${new Date().toLocaleDateString()}
    `.trim();
  };

  const generateEmploymentLetter = () => {
    return `
EMPLOYMENT VERIFICATION LETTER

${formData.companyName}
${formData.companyAddress}

Date: ${new Date().toLocaleDateString()}

To Whom It May Concern,

This letter serves to confirm the employment of ${formData.employeeName} with ${formData.companyName}.

Employee Details:
- Name: ${formData.employeeName}
- Job Title: ${formData.employeeTitle}
- Employee ID: ${formData.employeeId || 'N/A'}
- Employment Start Date: ${formData.startDate}
- Annual Salary: $${formData.salary}

Key Responsibilities:
${formData.responsibilities}

${formData.employeeName} is a valued employee and is in good standing with our organization.

Should you require any additional information, please feel free to contact me.

Sincerely,

${formData.hrName}
${formData.hrTitle}
${formData.companyName}
    `.trim();
  };

  const generateFinancialStatement = () => {
    return `
FINANCIAL SUPPORT STATEMENT

I, ${formData.sponsorName || formData.applicantName}, hereby declare that I will provide financial support for ${formData.applicantName}'s immigration and settlement.

Financial Details:
- Current Bank Balance: $${formData.bankBalance}
- Monthly Income: $${formData.monthlyIncome}
- Support Amount: $${formData.supportAmount}
- Duration of Support: ${formData.supportDuration}
- Relationship to Applicant: ${formData.relationship || 'Self'}

${formData.assets ? `Additional Assets: ${formData.assets}` : ''}

I understand the financial responsibilities involved and confirm my ability and commitment to provide the stated support.

Signature: ${formData.sponsorName || formData.applicantName}
Date: ${new Date().toLocaleDateString()}
    `.trim();
  };

  const downloadDocument = () => {
    if (!generatedDocument) return;
    
    const element = document.createElement('a');
    const file = new Blob([generatedDocument], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${selectedTemplate?.name.replace(/\s+/g, '-').toLowerCase()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

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
            <h1 className="heading-xl text-white mb-6">
              Document <span className="text-gradient-cyan">Generator</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Generate professional immigration documents instantly. Our templates ensure your documents 
              meet all requirements and formatting standards.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container-max">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all capitalize ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-white/70 backdrop-blur-sm text-gray-700 hover:bg-white/90'
                }`}
              >
                {category === 'all' ? 'All Templates' : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container-max">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Template Selection */}
            <div className="lg:col-span-1">
              <div className="modern-card">
                <h3 className="text-xl font-semibold mb-6 text-gray-800">Select Template</h3>
                <div className="space-y-4">
                  {filteredTemplates.map((template) => (
                    <motion.div
                      key={template.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => setSelectedTemplate(template)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedTemplate?.id === template.id
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <FileText className="w-6 h-6 text-purple-500 mt-1" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 mb-1">{template.name}</h4>
                          <p className="text-gray-600 text-sm mb-2">{template.description}</p>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                              {template.category}
                            </span>
                            {template.previewAvailable && (
                              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                                Preview Available
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="lg:col-span-2">
              {selectedTemplate ? (
                <div className="modern-card">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">
                      Generate {selectedTemplate.name}
                    </h3>
                    {selectedTemplate.previewAvailable && (
                      <button
                        onClick={() => setShowPreview(!showPreview)}
                        className="btn-secondary"
                      >
                        <Eye className="w-4 h-4" />
                        Preview
                      </button>
                    )}
                  </div>

                  <form className="space-y-6">
                    {selectedTemplate.fields.map((field) => (
                      <div key={field.id}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {field.label}
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        
                        {field.type === 'select' ? (
                          <select
                            value={formData[field.id] || ''}
                            onChange={(e) => handleFieldChange(field.id, e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required={field.required}
                          >
                            <option value="">Select {field.label}</option>
                            {field.options?.map((option) => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        ) : field.type === 'textarea' ? (
                          <textarea
                            value={formData[field.id] || ''}
                            onChange={(e) => handleFieldChange(field.id, e.target.value)}
                            placeholder={field.placeholder}
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required={field.required}
                          />
                        ) : (
                          <input
                            type={field.type}
                            value={formData[field.id] || ''}
                            onChange={(e) => handleFieldChange(field.id, e.target.value)}
                            placeholder={field.placeholder}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required={field.required}
                          />
                        )}
                      </div>
                    ))}

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={generateDocument}
                        disabled={isGenerating}
                        className="btn-primary flex-1"
                      >
                        {isGenerating ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <FileText className="w-4 h-4" />
                            Generate Document
                          </>
                        )}
                      </button>
                      
                      {generatedDocument && (
                        <button
                          type="button"
                          onClick={downloadDocument}
                          className="btn-secondary"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      )}
                    </div>
                  </form>

                  {/* Generated Document Preview */}
                  {generatedDocument && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="mt-8 p-6 bg-gray-50 rounded-xl border"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="font-medium text-gray-800">Document Generated Successfully</span>
                      </div>
                      <pre className="whitespace-pre-wrap text-sm text-gray-700 bg-white p-4 rounded-lg max-h-96 overflow-y-auto">
                        {generatedDocument}
                      </pre>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="modern-card text-center py-16">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Select a Template</h3>
                  <p className="text-gray-500">Choose a document template from the left panel to get started.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
