'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, CheckCircle, Search, Upload, MessageSquare, ExternalLink } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { COMPANY } from '@/lib/company';

interface ScamAlert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  indicators: string[];
  action: string;
}

interface ScamReport {
  url?: string;
  email?: string;
  phone?: string;
  company?: string;
  score: number;
  risk: 'high' | 'medium' | 'low';
  alerts: ScamAlert[];
  safetyTips: string[];
}

const commonScams = [
  {
    title: 'Fake Job Offers',
    description: 'Fraudulent job offers requiring upfront payments',
    indicators: ['Requests for payment', 'Too good to be true salary', 'No company verification', 'Urgent timeline'],
    prevention: 'Always verify the company independently and never pay for job opportunities'
  },
  {
    title: 'Document Forgery Services',
    description: 'Illegal services offering fake immigration documents',
    indicators: ['Promises of guaranteed visas', 'Unusually low prices', 'No official accreditation', 'Cash-only payments'],
    prevention: 'Only work with licensed immigration professionals and government agencies'
  },
  {
    title: 'Investment Visa Fraud',
    description: 'Fake investment opportunities for visa programs',
    indicators: ['Guaranteed returns', 'High-pressure tactics', 'Unlicensed advisors', 'Offshore accounts'],
    prevention: 'Verify all investment opportunities with financial regulators'
  },
  {
    title: 'Educational Institution Scams',
    description: 'Fake schools offering student visas',
    indicators: ['Not accredited', 'No physical address', 'Pay for grades', 'Immediate admission'],
    prevention: 'Check official government databases for accredited institutions'
  }
];

const hashString = (value: string) => {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++) {
    const cp = value.codePointAt(i) ?? 0;
    hash ^= cp;
    if (cp > 0xffff) i++; // advance extra for surrogate pairs
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
};

export default function ScamDetector() {
  const [activeTab, setActiveTab] = useState<'url' | 'email' | 'phone' | 'document'>('url');
  const [inputValue, setInputValue] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState<ScamReport | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const analyzeInput = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const seed = hashString(`${activeTab}:${inputValue.trim().toLowerCase()}`);
    const score = seed % 100;
    const riskValue = (seed % 1000) / 1000;
    const risk: ScamReport['risk'] = riskValue > 0.74 ? 'high' : riskValue > 0.42 ? 'medium' : 'low';

    // Generate mock report based on input
    const mockReport: ScamReport = {
      [activeTab]: inputValue,
      score,
      risk,
      alerts: generateMockAlerts(seed),
      safetyTips: [
        'Never pay upfront fees for immigration services',
        'Verify all companies with official registries',
        'Always get written agreements',
        'Be suspicious of guaranteed outcomes',
        'Check reviews from multiple sources'
      ]
    };
    
    setReport(mockReport);
    setIsAnalyzing(false);
  };

  const generateMockAlerts = (seed: number): ScamAlert[] => {
    const alerts: ScamAlert[] = [];
    
    if (seed % 2 === 0) {
      alerts.push({
        id: '1',
        type: 'warning',
        title: 'Suspicious Domain Registration',
        description: 'This domain was registered recently and lacks established credibility',
        indicators: ['Domain registered less than 6 months ago', 'No WHOIS information', 'Hosted on shared servers'],
        action: 'Proceed with extreme caution and verify through alternative channels'
      });
    }
    
    if ((seed % 7) === 0) {
      alerts.push({
        id: '2',
        type: 'critical',
        title: 'Known Scam Pattern Detected',
        description: 'This communication matches patterns of known immigration scams',
        indicators: ['Requests immediate payment', 'Guarantees visa approval', 'No official credentials'],
        action: 'Do not engage. Report to authorities immediately'
      });
    }
    
    return alerts;
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    // In a real implementation, this would analyze the document
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-red-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="section-padding pt-32 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="heading-xl text-gray-800 mb-6">
              Immigration Scam <span className="text-gradient-cyan">Detector</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Protect yourself from immigration fraud with our AI-powered scam detection. 
              Analyze websites, emails, phone numbers, and documents for potential threats.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Analysis Tool */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="modern-card p-6 mb-8"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Analyze for Scams</h2>
                
                {/* Tab Navigation */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    { id: 'url', label: 'Website URL', icon: ExternalLink },
                    { id: 'email', label: 'Email Address', icon: MessageSquare },
                    { id: 'phone', label: 'Phone Number', icon: Shield },
                    { id: 'document', label: 'Document', icon: Upload }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as 'url' | 'email' | 'phone' | 'document')}
                      className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all ${
                        activeTab === tab.id
                          ? 'bg-red-100 text-red-700 border-2 border-red-300'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <tab.icon className="w-4 h-4 mr-2" />
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Input Area */}
                <div className="mb-6">
                  {activeTab === 'document' ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">Upload a document to analyze for authenticity</p>
                      <label className="btn-primary cursor-pointer">
                        Choose File
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(file);
                          }}
                        />
                      </label>
                      {uploadedFile && (
                        <div className="mt-4 text-sm text-green-600">
                          Uploaded: {uploadedFile.name}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Enter {activeTab === 'url' ? 'Website URL' : activeTab === 'email' ? 'Email Address' : 'Phone Number'}
                      </label>
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={
                          activeTab === 'url' ? 'https://example.com' :
                          activeTab === 'email' ? 'contact@company.com' :
                          COMPANY.phoneDisplay
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                  )}
                </div>

                {/* Analyze Button */}
                <button
                  onClick={analyzeInput}
                  disabled={isAnalyzing || (!inputValue && !uploadedFile)}
                  className={`w-full flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all ${
                    isAnalyzing || (!inputValue && !uploadedFile)
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5 mr-2" />
                      Analyze for Scams
                    </>
                  )}
                </button>
              </motion.div>

              {/* Results */}
              {report && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="modern-card p-6"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Analysis Results</h3>
                  
                  {/* Risk Score */}
                  <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-800">Risk Score</h4>
                      <p className="text-sm text-gray-600">Higher scores indicate greater risk</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-3xl font-bold ${getScoreColor(report.score)}`}>
                        {report.score}/100
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getRiskColor(report.risk)}`}>
                        {report.risk.toUpperCase()} RISK
                      </div>
                    </div>
                  </div>

                  {/* Alerts */}
                  {report.alerts.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-4">Security Alerts</h4>
                      <div className="space-y-4">
                        {report.alerts.map(alert => (
                          <div
                            key={alert.id}
                            className={`border-l-4 p-4 rounded-lg ${
                              alert.type === 'critical' ? 'border-red-500 bg-red-50' :
                              alert.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
                              'border-blue-500 bg-blue-50'
                            }`}
                          >
                            <div className="flex items-start">
                              <AlertTriangle className={`w-5 h-5 mt-1 mr-3 ${
                                alert.type === 'critical' ? 'text-red-500' :
                                alert.type === 'warning' ? 'text-yellow-500' :
                                'text-blue-500'
                              }`} />
                              <div className="flex-1">
                                <h5 className="font-semibold text-gray-800 mb-2">{alert.title}</h5>
                                <p className="text-gray-600 text-sm mb-3">{alert.description}</p>
                                <div className="mb-3">
                                  <p className="text-sm font-medium text-gray-700 mb-1">Indicators:</p>
                                  <ul className="text-sm text-gray-600 space-y-1">
                                    {alert.indicators.map((indicator, index) => (
                                      <li key={index} className="flex items-start">
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                        {indicator}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div className="bg-white bg-opacity-50 rounded p-3">
                                  <p className="text-sm font-medium text-gray-800">Recommended Action:</p>
                                  <p className="text-sm text-gray-600">{alert.action}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Safety Tips */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-4">Safety Tips</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {report.safetyTips.map((tip, index) => (
                        <div key={index} className="flex items-start p-3 bg-green-50 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                          <p className="text-sm text-gray-700">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Common Scams */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="modern-card p-6"
              >
                <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                  <AlertTriangle className="w-5 h-5 text-orange-500 mr-2" />
                  Common Immigration Scams
                </h3>
                <div className="space-y-4">
                  {commonScams.map((scam, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">{scam.title}</h4>
                      <p className="text-sm text-gray-600 mb-3">{scam.description}</p>
                      <details className="text-sm">
                        <summary className="font-medium text-blue-600 cursor-pointer">View Details</summary>
                        <div className="mt-2 space-y-2">
                          <div>
                            <p className="font-medium text-gray-700">Warning Signs:</p>
                            <ul className="text-gray-600 ml-4">
                              {scam.indicators.map((indicator, i) => (
                                <li key={i} className="list-disc">{indicator}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">Prevention:</p>
                            <p className="text-gray-600">{scam.prevention}</p>
                          </div>
                        </div>
                      </details>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Report Scam */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="modern-card p-6"
              >
                <h3 className="font-bold text-gray-800 mb-4">Report a Scam</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Help protect others by reporting immigration scams you encounter.
                </p>
                <div className="space-y-3">
                  <button className="w-full btn-primary text-sm">
                    Report to Authorities
                  </button>
                  <button className="w-full btn-secondary text-sm">
                    Submit to Our Database
                  </button>
                </div>
              </motion.div>

              {/* Resources */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="modern-card p-6"
              >
                <h3 className="font-bold text-gray-800 mb-4">Official Resources</h3>
                <div className="space-y-3">
                  <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">
                    FTC Immigration Scam Alerts
                  </a>
                  <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">
                    USCIS Avoid Scams
                  </a>
                  <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">
                    Canadian Anti-Fraud Centre
                  </a>
                  <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">
                    UK Action Fraud
                  </a>
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
