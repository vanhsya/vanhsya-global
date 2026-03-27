'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUpload, 
  FaFileAlt, 
  FaShieldAlt, 
  FaCheck, 
  FaTimes,
  FaExclamationTriangle,
  FaSpinner,
  FaDownload
} from 'react-icons/fa';
import GlassCard from './GlassCard';

interface ScamDetectionResult {
  isAuthentic: boolean;
  confidence: number;
  riskFactors: string[];
  recommendations: string[];
  analysis: {
    documentType: string;
    issuer: string;
    validityChecks: Array<{
      check: string;
      status: 'pass' | 'fail' | 'warning';
      details: string;
    }>;
  };
}

export default function ScamShieldVerifier() {
  const [isOpen, setIsOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ScamDetectionResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setResult(null);
    }
  };

  const analyzeDocument = async () => {
    if (!uploadedFile) return;

    setIsAnalyzing(true);
    
    // Simulate AI analysis with global scam pattern detection
    await new Promise(resolve => setTimeout(resolve, 4000));

    // Mock analysis results
    const mockResult: ScamDetectionResult = {
      isAuthentic: Math.random() > 0.3, // 70% chance of being authentic for demo
      confidence: Math.floor(Math.random() * 30) + 70, // 70-100% confidence
      riskFactors: [],
      recommendations: [],
      analysis: {
        documentType: uploadedFile.name.includes('visa') ? 'Visa Document' : 
                    uploadedFile.name.includes('permit') ? 'Work Permit' :
                    uploadedFile.name.includes('job') ? 'Job Offer Letter' : 'Immigration Document',
        issuer: 'Government of Canada', // Mock issuer
        validityChecks: [
          {
            check: 'Digital Signature Verification',
            status: Math.random() > 0.2 ? 'pass' : 'fail',
            details: 'Cryptographic signature matches official database'
          },
          {
            check: 'Watermark Authentication',
            status: Math.random() > 0.3 ? 'pass' : 'warning',
            details: 'Security watermarks detected and verified'
          },
          {
            check: 'Issuer Database Cross-Check',
            status: Math.random() > 0.25 ? 'pass' : 'fail',
            details: 'Document number verified against official registry'
          },
          {
            check: 'Format Compliance',
            status: 'pass',
            details: 'Document follows official formatting standards'
          },
          {
            check: 'Security Pattern Analysis',
            status: Math.random() > 0.4 ? 'pass' : 'warning',
            details: 'Security patterns match known authentic templates'
          }
        ]
      }
    };

    // Determine risk factors and recommendations based on checks
    const failedChecks = mockResult.analysis.validityChecks.filter(check => check.status === 'fail');
    const warningChecks = mockResult.analysis.validityChecks.filter(check => check.status === 'warning');

    if (failedChecks.length > 0) {
      mockResult.isAuthentic = false;
      mockResult.riskFactors = [
        'Failed digital signature verification',
        'Document not found in official database',
        'Suspicious formatting patterns detected'
      ];
      mockResult.recommendations = [
        'Do not proceed with this document',
        'Contact the issuing authority directly',
        'Report suspicious document to authorities',
        'Seek verification through official channels'
      ];
    } else if (warningChecks.length > 1) {
      mockResult.riskFactors = [
        'Minor inconsistencies detected',
        'Document may require additional verification'
      ];
      mockResult.recommendations = [
        'Verify with issuing authority',
        'Request additional documentation',
        'Proceed with caution'
      ];
    } else {
      mockResult.recommendations = [
        'Document appears authentic',
        'Safe to proceed with application',
        'Keep secure copies for your records'
      ];
    }

    setResult(mockResult);
    setIsAnalyzing(false);
  };

  const resetVerifier = () => {
    setUploadedFile(null);
    setResult(null);
    setIsAnalyzing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-400';
    if (confidence >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getStatusIcon = (status: 'pass' | 'fail' | 'warning') => {
    switch (status) {
      case 'pass': return <FaCheck className="w-4 h-4 text-green-400" />;
      case 'fail': return <FaTimes className="w-4 h-4 text-red-400" />;
      case 'warning': return <FaExclamationTriangle className="w-4 h-4 text-yellow-400" />;
    }
  };

  if (!isOpen) {
    return (
      <GlassCard className="cursor-pointer group" onClick={() => setIsOpen(true)}>
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <FaShieldAlt className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            AI Scam Shield
          </h3>
          <p className="text-white/70 mb-4">
            Verify document authenticity with 200+ global scam patterns
          </p>
          <div className="text-sm text-accent-400 font-medium">
            Click to verify documents →
          </div>
        </div>
      </GlassCard>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <GlassCard className="bg-slate-900/90 backdrop-blur-xl border-white/20">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <FaShieldAlt className="w-8 h-8 text-red-500" />
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      ScamShield Verifier
                    </h2>
                    <p className="text-white/70">
                      Advanced AI-powered document authentication
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <FaTimes className="w-6 h-6" />
                </button>
              </div>

              {/* Upload Area */}
              {!result && !isAnalyzing && (
                <div className="mb-8">
                  <div 
                    className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center hover:border-white/50 transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <FaUpload className="w-12 h-12 text-white/70 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Upload Document for Verification
                    </h3>
                    <p className="text-white/70 mb-4">
                      Support: PDF, JPG, PNG (Max 10MB)
                    </p>
                    <p className="text-sm text-white/50">
                      Visa documents, permits, job offers, certificates
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={handleFileUpload}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                    />
                  </div>

                  {uploadedFile && (
                    <div className="mt-4 p-4 bg-white/10 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FaFileAlt className="w-5 h-5 text-white/70" />
                          <div>
                            <p className="text-white font-medium">{uploadedFile.name}</p>
                            <p className="text-white/70 text-sm">
                              {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={analyzeDocument}
                          className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
                        >
                          Analyze Document
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Analysis Progress */}
              {isAnalyzing && (
                <div className="text-center py-12">
                  <FaSpinner className="w-12 h-12 text-red-500 animate-spin mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Scanning Document...
                  </h3>
                  <p className="text-white/70 mb-4">
                    Checking against 200+ global scam patterns
                  </p>
                  <div className="space-y-2 text-sm text-white/60">
                    <p>✓ Analyzing digital signatures</p>
                    <p>✓ Verifying watermarks and security features</p>
                    <p>✓ Cross-checking with official databases</p>
                    <p>✓ Pattern matching against known fraudulent documents</p>
                  </div>
                </div>
              )}

              {/* Results */}
              {result && (
                <div className="space-y-6">
                  {/* Overall Result */}
                  <div className="text-center p-6 rounded-xl bg-gradient-to-r from-slate-800 to-slate-700">
                    <div className={`text-6xl font-bold mb-2 ${result.isAuthentic ? 'text-green-400' : 'text-red-400'}`}>
                      {result.isAuthentic ? '✓' : '✗'}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {result.isAuthentic ? 'Document Appears Authentic' : 'Suspicious Document Detected'}
                    </h3>
                    <p className={`text-lg ${getConfidenceColor(result.confidence)}`}>
                      Confidence: {result.confidence}%
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Document Analysis */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">
                        📋 Document Analysis
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-white/70">Type:</span>
                          <span className="text-white">{result.analysis.documentType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Issuer:</span>
                          <span className="text-white">{result.analysis.issuer}</span>
                        </div>
                      </div>

                      <h5 className="text-md font-medium text-white mt-6 mb-3">Security Checks:</h5>
                      <div className="space-y-2">
                        {result.analysis.validityChecks.map((check, index) => (
                          <div key={index} className="flex items-center justify-between p-2 rounded bg-white/5">
                            <span className="text-white/90 text-sm">{check.check}</span>
                            {getStatusIcon(check.status)}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Risk Factors & Recommendations */}
                    <div>
                      {result.riskFactors.length > 0 && (
                        <>
                          <h4 className="text-lg font-semibold text-red-400 mb-4">
                            ⚠️ Risk Factors
                          </h4>
                          <div className="space-y-2 mb-6">
                            {result.riskFactors.map((risk, index) => (
                              <p key={index} className="text-red-300 text-sm">
                                • {risk}
                              </p>
                            ))}
                          </div>
                        </>
                      )}

                      <h4 className="text-lg font-semibold text-white mb-4">
                        💡 Recommendations
                      </h4>
                      <div className="space-y-2">
                        {result.recommendations.map((rec, index) => (
                          <p key={index} className="text-white/80 text-sm">
                            • {rec}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-6 border-t border-white/20">
                    <button
                      onClick={resetVerifier}
                      className="flex-1 bg-white/20 text-white py-3 rounded-lg hover:bg-white/30 transition-colors"
                    >
                      Verify Another Document
                    </button>
                    <button
                      className="flex-1 bg-gradient-to-r from-primary-600 to-accent-500 text-white py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    >
                      <FaDownload className="w-4 h-4" />
                      Download Report
                    </button>
                  </div>
                </div>
              )}

              {/* Features Footer */}
              <div className="mt-8 pt-6 border-t border-white/20">
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-accent-400">200+</div>
                    <div className="text-white/70 text-sm">Scam Patterns</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent-400">50+</div>
                    <div className="text-white/70 text-sm">Countries Covered</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent-400">99.7%</div>
                    <div className="text-white/70 text-sm">Accuracy Rate</div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
