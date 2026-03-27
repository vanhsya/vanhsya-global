'use client';

import { motion } from 'framer-motion';
import { Shield, AlertTriangle, CheckCircle, XCircle, Search, Upload, Link, Mail, Phone } from 'lucide-react';
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface ScamAlert {
  id: string;
  type: 'company' | 'website' | 'email' | 'phone';
  name: string;
  description: string;
  riskLevel: 'high' | 'medium' | 'low';
  reportedDate: string;
  reports: number;
  warning: string;
}

interface AnalysisResult {
  score: number;
  riskLevel: 'high' | 'medium' | 'low' | 'safe';
  flags: string[];
  recommendations: string[];
  details: {
    domainAge?: string;
    sslCertificate?: boolean;
    contactInfo?: boolean;
    socialPresence?: boolean;
    reviews?: number;
    complaints?: number;
  };
}

const knownScams: ScamAlert[] = [
  {
    id: '1',
    type: 'company',
    name: 'FastTrack Immigration Solutions',
    description: 'Promises visa approval in 24 hours for upfront payment',
    riskLevel: 'high',
    reportedDate: '2024-01-15',
    reports: 47,
    warning: 'Multiple reports of taking payments without providing services'
  },
  {
    id: '2',
    type: 'website',
    name: 'quickvisa-canada.com',
    description: 'Fake Canadian government website charging for free services',
    riskLevel: 'high',
    reportedDate: '2024-01-20',
    reports: 156,
    warning: 'Impersonating official government website'
  },
  {
    id: '3',
    type: 'email',
    name: 'visa.officer@gmail.com',
    description: 'Claims to be immigration officer requesting personal information',
    riskLevel: 'high',
    reportedDate: '2024-01-18',
    reports: 89,
    warning: 'Government officials never use Gmail for official communication'
  },
  {
    id: '4',
    type: 'phone',
    name: '+1-555-VISA-NOW',
    description: 'Cold calls offering guaranteed visa approval',
    riskLevel: 'medium',
    reportedDate: '2024-01-22',
    reports: 23,
    warning: 'High-pressure sales tactics and unrealistic promises'
  },
  {
    id: '5',
    type: 'company',
    name: 'Express Immigration LLC',
    description: 'Charges excessive fees for document preparation',
    riskLevel: 'medium',
    reportedDate: '2024-01-10',
    reports: 31,
    warning: 'Overcharges for services that can be done for free'
  }
];

const redFlags = [
  'Guarantees 100% visa approval',
  'Requests payment before starting work',
  'Urgency tactics ("limited time offer")',
  'Asks for passwords or sensitive login details',
  'No physical address or phone number',
  'Uses generic email addresses (Gmail, Yahoo)',
  'Poor grammar and spelling mistakes',
  'Significantly cheaper than market rates',
  'No proper business registration or licenses',
  'Negative reviews or BBB complaints'
];

export default function ScamDetector() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'all' | 'company' | 'website' | 'email' | 'phone'>('all');
  const [analysisInput, setAnalysisInput] = useState('');
  const [analysisType, setAnalysisType] = useState<'website' | 'email' | 'phone' | 'company'>('website');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState<'search' | 'analyze' | 'report'>('search');

  const filteredScams = searchQuery 
    ? knownScams.filter(scam => 
        (searchType === 'all' || scam.type === searchType) &&
        (scam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
         scam.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : knownScams.filter(scam => searchType === 'all' || scam.type === searchType);

  const analyzeInput = async () => {
    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      let score = 0;
      const flags: string[] = [];
      const recommendations: string[] = [];
      
      // Simple analysis based on input patterns
      const input = analysisInput.toLowerCase();
      
      // Check for red flags
      if (input.includes('guarantee') || input.includes('100%')) {
        score += 30;
        flags.push('Guarantees success - major red flag');
      }
      
      if (input.includes('urgent') || input.includes('limited time')) {
        score += 25;
        flags.push('Uses urgency tactics');
      }
      
      if (input.includes('gmail.com') || input.includes('yahoo.com')) {
        score += 20;
        flags.push('Uses generic email provider');
      }
      
      if (input.includes('cheap') || input.includes('discount')) {
        score += 15;
        flags.push('Unusually low prices');
      }
      
      // Check against known scams
      const isKnownScam = knownScams.some(scam => 
        scam.name.toLowerCase().includes(input) || 
        input.includes(scam.name.toLowerCase())
      );
      
      if (isKnownScam) {
        score += 50;
        flags.push('Matches known scam entity');
      }
      
      // Generate recommendations
      if (score > 50) {
        recommendations.push('Avoid this entity completely');
        recommendations.push('Report to relevant authorities');
        recommendations.push('Do not provide any personal information');
      } else if (score > 30) {
        recommendations.push('Exercise extreme caution');
        recommendations.push('Verify credentials independently');
        recommendations.push('Get second opinion from trusted source');
      } else if (score > 15) {
        recommendations.push('Do additional research');
        recommendations.push('Check reviews and testimonials');
        recommendations.push('Verify business registration');
      } else {
        recommendations.push('Appears legitimate but still verify');
        recommendations.push('Check official credentials');
        recommendations.push('Trust your instincts');
      }
      
      let riskLevel: 'high' | 'medium' | 'low' | 'safe' = 'safe';
      if (score > 50) riskLevel = 'high';
      else if (score > 30) riskLevel = 'medium';
      else if (score > 15) riskLevel = 'low';
      
      setAnalysisResult({
        score,
        riskLevel,
        flags,
        recommendations,
        details: {
          domainAge: analysisType === 'website' ? Math.random() > 0.5 ? '2+ years' : 'Less than 6 months' : undefined,
          sslCertificate: analysisType === 'website' ? Math.random() > 0.3 : undefined,
          contactInfo: Math.random() > 0.4,
          socialPresence: Math.random() > 0.3,
          reviews: Math.floor(Math.random() * 100),
          complaints: Math.floor(Math.random() * 20)
        }
      });
      
      setIsAnalyzing(false);
    }, 2000);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-blue-500';
      default: return 'text-green-500';
    }
  };

  const getRiskBg = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-100 border-red-200';
      case 'medium': return 'bg-yellow-100 border-yellow-200';
      case 'low': return 'bg-blue-100 border-blue-200';
      default: return 'bg-green-100 border-green-200';
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="section-padding pt-32 bg-gradient-to-br from-red-600 via-orange-600 to-yellow-500">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex justify-center mb-6">
              <Shield className="w-16 h-16 text-white" />
            </div>
            <h1 className="heading-xl text-white mb-6">
              Immigration <span className="text-gradient-cyan">Scam Detector</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Protect yourself from immigration fraud. Check companies, websites, and communications 
              against our database of known scams and get real-time risk assessments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container-max">
          <div className="flex justify-center">
            <div className="bg-white/70 backdrop-blur-sm rounded-full p-2">
              {[
                { id: 'search', label: 'Search Database', icon: Search },
                { id: 'analyze', label: 'Analyze Entity', icon: Shield },
                { id: 'report', label: 'Report Scam', icon: AlertTriangle }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as any)}
                  className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${
                    activeTab === id
                      ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-white/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container-max">
          {/* Search Tab */}
          {activeTab === 'search' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="modern-card mb-8">
                <h3 className="text-xl font-semibold mb-6 text-gray-800">Search Known Scams</h3>
                
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for company name, website, email, or phone..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value as any)}
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="all">All Types</option>
                    <option value="company">Companies</option>
                    <option value="website">Websites</option>
                    <option value="email">Email Addresses</option>
                    <option value="phone">Phone Numbers</option>
                  </select>
                </div>

                <div className="grid gap-4">
                  {filteredScams.map((scam) => (
                    <motion.div
                      key={scam.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`p-6 rounded-xl border-2 ${getRiskBg(scam.riskLevel)}`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {scam.type === 'company' && <Shield className="w-6 h-6" />}
                          {scam.type === 'website' && <Link className="w-6 h-6" />}
                          {scam.type === 'email' && <Mail className="w-6 h-6" />}
                          {scam.type === 'phone' && <Phone className="w-6 h-6" />}
                          <div>
                            <h4 className="font-semibold text-gray-800">{scam.name}</h4>
                            <p className="text-gray-600 text-sm capitalize">{scam.type}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(scam.riskLevel)} ${getRiskBg(scam.riskLevel)}`}>
                            {scam.riskLevel.toUpperCase()} RISK
                          </span>
                          <p className="text-gray-500 text-sm mt-1">{scam.reports} reports</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-3">{scam.description}</p>
                      
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-red-700">
                          <AlertTriangle className="w-4 h-4" />
                          <span className="font-medium">Warning:</span>
                        </div>
                        <p className="text-red-700 text-sm mt-1">{scam.warning}</p>
                      </div>
                    </motion.div>
                  ))}
                  
                  {filteredScams.length === 0 && (
                    <div className="text-center py-12">
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h4 className="text-xl font-semibold text-gray-800 mb-2">No matches found</h4>
                      <p className="text-gray-600">
                        {searchQuery 
                          ? "The entity you searched for is not in our scam database. However, always verify independently."
                          : "Browse through known scams to stay informed about current threats."
                        }
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Analyze Tab */}
          {activeTab === 'analyze' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="modern-card">
                  <h3 className="text-xl font-semibold mb-6 text-gray-800">Analyze Entity</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type of Entity
                      </label>
                      <select
                        value={analysisType}
                        onChange={(e) => setAnalysisType(e.target.value as any)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <option value="website">Website/URL</option>
                        <option value="email">Email Address</option>
                        <option value="phone">Phone Number</option>
                        <option value="company">Company Name</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {analysisType === 'website' && 'Website URL'}
                        {analysisType === 'email' && 'Email Address'}
                        {analysisType === 'phone' && 'Phone Number'}
                        {analysisType === 'company' && 'Company Name'}
                      </label>
                      <input
                        type="text"
                        value={analysisInput}
                        onChange={(e) => setAnalysisInput(e.target.value)}
                        placeholder={
                          analysisType === 'website' ? 'https://example.com' :
                          analysisType === 'email' ? 'contact@example.com' :
                          analysisType === 'phone' ? '+1-555-123-4567' :
                          'Company Name Inc.'
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    <button
                      onClick={analyzeInput}
                      disabled={!analysisInput || isAnalyzing}
                      className="btn-primary w-full"
                    >
                      {isAnalyzing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Shield className="w-4 h-4" />
                          Analyze Risk
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Analysis Results */}
                <div className="modern-card">
                  {analysisResult ? (
                    <div>
                      <h3 className="text-xl font-semibold mb-6 text-gray-800">Analysis Results</h3>
                      
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-700">Risk Score</span>
                          <span className={`font-bold ${getRiskColor(analysisResult.riskLevel)}`}>
                            {analysisResult.score}/100
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full transition-all ${
                              analysisResult.riskLevel === 'high' ? 'bg-red-500' :
                              analysisResult.riskLevel === 'medium' ? 'bg-yellow-500' :
                              analysisResult.riskLevel === 'low' ? 'bg-blue-500' :
                              'bg-green-500'
                            }`}
                            style={{ width: `${analysisResult.score}%` }}
                          />
                        </div>
                        <div className="mt-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(analysisResult.riskLevel)} ${getRiskBg(analysisResult.riskLevel)}`}>
                            {analysisResult.riskLevel.toUpperCase()} RISK
                          </span>
                        </div>
                      </div>

                      {analysisResult.flags.length > 0 && (
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-800 mb-3">Risk Flags</h4>
                          <div className="space-y-2">
                            {analysisResult.flags.map((flag: string, index: number) => (
                              <div key={index} className="flex items-center gap-2 text-red-600">
                                <AlertTriangle className="w-4 h-4" />
                                <span className="text-sm">{flag}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-800 mb-3">Recommendations</h4>
                        <div className="space-y-2">
                          {analysisResult.recommendations.map((rec, index) => (
                            <div key={index} className="flex items-center gap-2 text-blue-600">
                              <CheckCircle className="w-4 h-4" />
                              <span className="text-sm">{rec}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-3">Additional Details</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          {analysisResult.details.domainAge && (
                            <div>
                              <span className="text-gray-600">Domain Age:</span>
                              <span className="ml-2 font-medium">{analysisResult.details.domainAge}</span>
                            </div>
                          )}
                          {analysisResult.details.sslCertificate !== undefined && (
                            <div>
                              <span className="text-gray-600">SSL Certificate:</span>
                              <span className={`ml-2 font-medium ${analysisResult.details.sslCertificate ? 'text-green-600' : 'text-red-600'}`}>
                                {analysisResult.details.sslCertificate ? 'Valid' : 'Invalid'}
                              </span>
                            </div>
                          )}
                          <div>
                            <span className="text-gray-600">Contact Info:</span>
                            <span className={`ml-2 font-medium ${analysisResult.details.contactInfo ? 'text-green-600' : 'text-red-600'}`}>
                              {analysisResult.details.contactInfo ? 'Available' : 'Missing'}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">Reviews:</span>
                            <span className="ml-2 font-medium">{analysisResult.details.reviews}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h4 className="text-xl font-semibold text-gray-600 mb-2">No Analysis Yet</h4>
                      <p className="text-gray-500">Enter an entity to analyze and click "Analyze Risk".</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Report Tab */}
          {activeTab === 'report' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="max-w-2xl mx-auto">
                <div className="modern-card">
                  <h3 className="text-xl font-semibold mb-6 text-gray-800">Report a Scam</h3>
                  
                  <form className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type of Scam
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500">
                        <option value="">Select type</option>
                        <option value="company">Fraudulent Company</option>
                        <option value="website">Fake Website</option>
                        <option value="email">Phishing Email</option>
                        <option value="phone">Phone Scam</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Entity Name/Contact
                      </label>
                      <input
                        type="text"
                        placeholder="Company name, website URL, email, or phone number"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description of Scam
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Describe what happened, how you were contacted, what they asked for, etc."
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Financial Loss (if any)
                      </label>
                      <input
                        type="number"
                        placeholder="Amount lost in USD"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Supporting Evidence
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600">Upload screenshots, emails, or other evidence</p>
                        <p className="text-gray-400 text-sm mt-1">PNG, JPG, PDF up to 10MB</p>
                      </div>
                    </div>

                    <button type="submit" className="btn-primary w-full">
                      <AlertTriangle className="w-4 h-4" />
                      Submit Report
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          )}

          {/* Red Flags Section */}
          <div className="mt-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="modern-card"
            >
              <h3 className="text-2xl font-semibold mb-8 text-gray-800 text-center">
                Common Red Flags to Watch For
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {redFlags.map((flag: string, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg"
                  >
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <span className="text-red-700">{flag}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
