"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiBriefcase, 
  FiMapPin, 
  FiDollarSign, 
  FiClock, 
  FiUsers, 
  FiTrendingUp,
  FiFilter,
  FiSearch,
  FiHeart,
  FiExternalLink,
  FiX,
  FiStar,
  FiGlobe
} from 'react-icons/fi';
import GlassCard from './GlassCard';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  country: string;
  salary: string;
  type: 'full-time' | 'part-time' | 'contract';
  experience: string;
  skills: string[];
  description: string;
  requirements: string[];
  benefits: string[];
  isSponsored: boolean;
  postedDate: string;
  visaSupport: boolean;
  rating: number;
}

interface EmployerProfile {
  id: string;
  name: string;
  industry: string;
  size: string;
  location: string;
  website: string;
  description: string;
  openPositions: number;
  rating: number;
  visaSponsorship: boolean;
}

export function EmployerConnect() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('jobs');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [salaryFilter, setSalaryFilter] = useState('');

  const mockJobs: Job[] = [
    {
      id: "1",
      title: "Senior Software Engineer",
      company: "TechCorp Canada",
      location: "Toronto",
      country: "Canada",
      salary: "CAD 85,000 - 110,000",
      type: "full-time",
      experience: "3-5 years",
      skills: ["React", "Node.js", "TypeScript", "AWS"],
      description: "Join our dynamic team to build cutting-edge applications used by millions of users worldwide.",
      requirements: [
        "Bachelor's degree in Computer Science or related field",
        "3+ years of experience with React and Node.js",
        "Strong understanding of cloud platforms (AWS/Azure)",
        "Excellent communication skills in English"
      ],
      benefits: [
        "Comprehensive health insurance",
        "RRSP matching up to 6%",
        "Flexible work arrangements",
        "Professional development budget",
        "Immigration support and visa sponsorship"
      ],
      isSponsored: true,
      postedDate: "2024-01-15",
      visaSupport: true,
      rating: 4.8
    },
    {
      id: "2",
      title: "Data Scientist",
      company: "Innovate Australia",
      location: "Sydney",
      country: "Australia",
      salary: "AUD 95,000 - 125,000",
      type: "full-time",
      experience: "2-4 years",
      skills: ["Python", "Machine Learning", "SQL", "TensorFlow"],
      description: "Drive data-driven decisions and build ML models to solve complex business problems.",
      requirements: [
        "Master's degree in Data Science, Statistics, or related field",
        "2+ years of experience in machine learning",
        "Proficiency in Python and SQL",
        "Experience with cloud platforms"
      ],
      benefits: [
        "Competitive salary package",
        "Health and dental coverage",
        "Visa sponsorship available",
        "Remote work options",
        "Annual learning allowance"
      ],
      isSponsored: true,
      postedDate: "2024-01-12",
      visaSupport: true,
      rating: 4.6
    },
    {
      id: "3",
      title: "UX Designer",
      company: "Design Studios UK",
      location: "London",
      country: "United Kingdom",
      salary: "£45,000 - 65,000",
      type: "full-time",
      experience: "1-3 years",
      skills: ["Figma", "Adobe Creative Suite", "User Research", "Prototyping"],
      description: "Create beautiful and intuitive user experiences for digital products.",
      requirements: [
        "Bachelor's degree in Design or related field",
        "1+ years of UX/UI design experience",
        "Proficiency in Figma and Adobe Creative Suite",
        "Strong portfolio demonstrating design process"
      ],
      benefits: [
        "Competitive salary",
        "25 days annual leave",
        "Skilled worker visa sponsorship",
        "Creative workspace in Central London",
        "Team retreats and social events"
      ],
      isSponsored: false,
      postedDate: "2024-01-10",
      visaSupport: true,
      rating: 4.4
    }
  ];

  const mockEmployers: EmployerProfile[] = [
    {
      id: "1",
      name: "TechCorp Canada",
      industry: "Technology",
      size: "500-1000 employees",
      location: "Toronto, Canada",
      website: "techcorp.ca",
      description: "Leading technology company specializing in enterprise software solutions.",
      openPositions: 15,
      rating: 4.8,
      visaSponsorship: true
    },
    {
      id: "2",
      name: "Innovate Australia",
      industry: "Data & Analytics",
      size: "100-500 employees",
      location: "Sydney, Australia",
      website: "innovateaus.com",
      description: "Data science consultancy helping businesses make data-driven decisions.",
      openPositions: 8,
      rating: 4.6,
      visaSponsorship: true
    },
    {
      id: "3",
      name: "Design Studios UK",
      industry: "Design & Creative",
      size: "50-100 employees",
      location: "London, United Kingdom",
      website: "designstudios.co.uk",
      description: "Award-winning design agency creating digital experiences for global brands.",
      openPositions: 5,
      rating: 4.4,
      visaSponsorship: true
    }
  ];

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLocation = !locationFilter || job.country.toLowerCase().includes(locationFilter.toLowerCase());
    return matchesSearch && matchesLocation;
  });

  const renderJobCard = (job: Job) => (
    <motion.div
      key={job.id}
      whileHover={{ y: -2 }}
      className="cursor-pointer"
      onClick={() => setSelectedJob(job)}
    >
      <GlassCard className="p-6 h-full">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-1">{job.title}</h3>
            <p className="text-indigo-400 font-medium">{job.company}</p>
          </div>
          {job.isSponsored && (
            <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs rounded-full">
              Sponsored
            </span>
          )}
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center space-x-2 text-gray-300 text-sm">
            <FiMapPin className="w-4 h-4" />
            <span>{job.location}, {job.country}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-300 text-sm">
            <FiDollarSign className="w-4 h-4" />
            <span>{job.salary}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-300 text-sm">
            <FiClock className="w-4 h-4" />
            <span className="capitalize">{job.type}</span>
          </div>
          {job.visaSupport && (
            <div className="flex items-center space-x-2 text-green-400 text-sm">
              <FiGlobe className="w-4 h-4" />
              <span>Visa Support Available</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {job.skills.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-indigo-500/20 text-indigo-300 text-xs rounded-full"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 3 && (
            <span className="px-2 py-1 bg-gray-500/20 text-gray-400 text-xs rounded-full">
              +{job.skills.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-gray-300 text-sm">{job.rating}</span>
          </div>
          <span className="text-gray-400 text-xs">{job.postedDate}</span>
        </div>
      </GlassCard>
    </motion.div>
  );

  const renderEmployerCard = (employer: EmployerProfile) => (
    <motion.div
      key={employer.id}
      whileHover={{ y: -2 }}
    >
      <GlassCard className="p-6 h-full">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">{employer.name}</h3>
            <p className="text-indigo-400 text-sm">{employer.industry}</p>
          </div>
          {employer.visaSponsorship && (
            <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
              Visa Sponsor
            </span>
          )}
        </div>

        <div className="space-y-2 mb-4 text-sm text-gray-300">
          <div className="flex items-center space-x-2">
            <FiUsers className="w-4 h-4" />
            <span>{employer.size}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FiMapPin className="w-4 h-4" />
            <span>{employer.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FiBriefcase className="w-4 h-4" />
            <span>{employer.openPositions} open positions</span>
          </div>
        </div>

        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
          {employer.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-gray-300 text-sm">{employer.rating}</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-1 px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-lg transition-colors"
          >
            <span>View Jobs</span>
            <FiExternalLink className="w-3 h-3" />
          </motion.button>
        </div>
      </GlassCard>
    </motion.div>
  );

  const renderJobDetails = () => {
    if (!selectedJob) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={() => setSelectedJob(null)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-4xl max-h-[90vh] overflow-hidden bg-slate-900/90 backdrop-blur-md border border-white/20 rounded-2xl"
        >
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div>
              <h2 className="text-2xl font-bold text-white">{selectedJob.title}</h2>
              <p className="text-indigo-400 font-medium">{selectedJob.company}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedJob(null)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <FiX className="w-6 h-6" />
            </motion.button>
          </div>

          <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Job Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2 text-gray-300">
                      <FiMapPin className="w-4 h-4" />
                      <span>{selectedJob.location}, {selectedJob.country}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <FiDollarSign className="w-4 h-4" />
                      <span>{selectedJob.salary}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <FiClock className="w-4 h-4" />
                      <span className="capitalize">{selectedJob.type}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <FiTrendingUp className="w-4 h-4" />
                      <span>{selectedJob.experience}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Benefits</h3>
                  <ul className="space-y-1 text-sm text-gray-300">
                    {selectedJob.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-green-400 mt-1">•</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedJob.visaSupport && (
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div className="flex items-center space-x-2 text-green-400 mb-2">
                      <FiGlobe className="w-5 h-5" />
                      <span className="font-medium">Visa Support Available</span>
                    </div>
                    <p className="text-green-300 text-sm">
                      This employer provides visa sponsorship and immigration support for qualified candidates.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Job Description</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{selectedJob.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Requirements</h3>
              <ul className="space-y-1 text-sm text-gray-300">
                {selectedJob.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    <span>{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
              >
                Apply Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-white/10 text-white rounded-lg border border-white/20 hover:bg-white/20 transition-all"
              >
                <FiHeart className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const tabs = [
    { id: 'jobs', label: 'Job Board', icon: <FiBriefcase className="w-4 h-4" /> },
    { id: 'employers', label: 'Employers', icon: <FiUsers className="w-4 h-4" /> }
  ];

  return (
    <>
      {/* Employer Connect Access Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed top-4 right-32 z-40 flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
      >
        <FiBriefcase className="w-4 h-4" />
        <span>Job Board</span>
      </motion.button>

      {/* Main Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-7xl max-h-[95vh] overflow-hidden bg-slate-900/90 backdrop-blur-md border border-white/20 rounded-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div>
                  <h2 className="text-2xl font-bold text-white">Employer Connect</h2>
                  <p className="text-gray-400">Find your dream job with visa sponsorship</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <FiX className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-white/10">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-4 transition-all ${
                      activeTab === tab.id
                        ? 'text-indigo-400 border-b-2 border-indigo-400'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* Search and Filters */}
              {activeTab === 'jobs' && (
                <div className="p-6 border-b border-white/10">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative">
                      <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search jobs, companies, skills..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <select
                      title="Filter by country"
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                      className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">All Countries</option>
                      <option value="canada">Canada</option>
                      <option value="australia">Australia</option>
                      <option value="united kingdom">United Kingdom</option>
                    </select>
                    <select
                      title="Filter by salary range"
                      value={salaryFilter}
                      onChange={(e) => setSalaryFilter(e.target.value)}
                      className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">All Salaries</option>
                      <option value="50k">$50K+</option>
                      <option value="75k">$75K+</option>
                      <option value="100k">$100K+</option>
                    </select>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                    >
                      <FiFilter className="w-4 h-4" />
                      <span>Filter</span>
                    </motion.button>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                {activeTab === 'jobs' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredJobs.map(renderJobCard)}
                  </div>
                )}
                {activeTab === 'employers' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockEmployers.map(renderEmployerCard)}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Job Details Modal */}
      <AnimatePresence>
        {selectedJob && renderJobDetails()}
      </AnimatePresence>
    </>
  );
}
