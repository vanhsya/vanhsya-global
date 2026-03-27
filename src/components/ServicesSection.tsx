'use client';
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaHeart, FaPlane, FaHome, FaArrowRight, FaStar } from 'react-icons/fa';
import { MdBusiness, MdWork } from 'react-icons/md';

interface ServiceCardProps {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  features: string[];
  processingTime: string;
  startingPrice: string;
  successRate: string;
  href: string;
  isPopular?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon: Icon,
  title,
  description,
  features,
  processingTime,
  startingPrice,
  successRate,
  href,
  isPopular = false
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`relative card h-full ${isPopular ? 'ring-2 ring-blue-500' : ''}`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
          <Icon className="text-2xl text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      
      <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Processing Time:</span>
          <span className="text-sm font-medium text-gray-800">{processingTime}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Starting from:</span>
          <span className="text-lg font-bold text-blue-600">{startingPrice}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Success Rate:</span>
          <div className="flex items-center">
            <FaStar className="text-yellow-400 text-sm mr-1" />
            <span className="text-sm font-medium text-gray-800">{successRate}</span>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-800 mb-2">What's Included:</h4>
        <ul className="space-y-1">
          {features.map((feature, index) => (
            <li key={index} className="text-sm text-gray-600 flex items-center">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 flex-shrink-0"></div>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mt-auto">
        <motion.a
          href={href}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-primary w-full group inline-flex items-center justify-center"
        >
          Learn More
          <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
        </motion.a>
      </div>
    </motion.div>
  );
};

const ServicesSection: React.FC = () => {
  const services: ServiceCardProps[] = [
    {
      icon: MdWork,
      title: "Work Visa",
      description: "Secure employment-based visas for skilled professionals looking to advance their careers abroad.",
      features: [
        "Complete application review",
        "Document preparation",
        "Interview coaching",
        "Employer liaison",
        "Post-approval support"
      ],
      processingTime: "4-8 weeks",
      startingPrice: "$1,200",
      successRate: "Your journey starts here",
      href: "/services/work-visa",
      isPopular: true
    },
    {
      icon: FaGraduationCap,
      title: "Study Visa",
      description: "Educational visa assistance for students pursuing academic excellence in top global institutions.",
      features: [
        "University selection guidance",
        "Scholarship assistance",
        "Student visa processing",
        "Accommodation support",
        "Pre-departure briefing"
      ],
      processingTime: "6-12 weeks",
      startingPrice: "$800",
      successRate: "Your journey starts here",
      href: "/services/study-visa"
    },
    {
      icon: MdBusiness,
      title: "Business Visa",
      description: "Business and investor visa solutions for entrepreneurs and corporate executives.",
      features: [
        "Business plan review",
        "Investment documentation",
        "Market analysis support",
        "Legal compliance check",
        "Ongoing business support"
      ],
      processingTime: "2-6 weeks",
      startingPrice: "$1,500",
      successRate: "Your journey starts here",
      href: "/services/business-visa"
    },
    {
      icon: FaHeart,
      title: "Family Visa",
      description: "Reunite with your loved ones through comprehensive family immigration services.",
      features: [
        "Relationship documentation",
        "Sponsorship guidance",
        "Financial requirement planning",
        "Interview preparation",
        "Family integration support"
      ],
      processingTime: "8-16 weeks",
      startingPrice: "$900",
      successRate: "Your journey starts here",
      href: "/services/family-visa"
    },
    {
      icon: FaPlane,
      title: "Tourist Visa",
      description: "Hassle-free tourist visa processing for your vacation and travel needs.",
      features: [
        "Quick processing",
        "Travel itinerary planning",
        "Document verification",
        "Embassy coordination",
        "Travel insurance guidance"
      ],
      processingTime: "7-14 days",
      startingPrice: "$299",
      successRate: "Your journey starts here",
      href: "/services/tourist-visa"
    },
    {
      icon: FaHome,
      title: "Permanent Residency",
      description: "Comprehensive PR services for those seeking to make a new country their permanent home.",
      features: [
        "Eligibility assessment",
        "Points calculation",
        "Document compilation",
        "Application tracking",
        "Settlement services"
      ],
      processingTime: "12-24 months",
      startingPrice: "$2,500",
      successRate: "Your journey starts here",
      href: "/services/permanent-residency"
    }
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg mb-6">
            Our <span className="gradient-text">Professional Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From temporary visits to permanent settlement, we provide comprehensive immigration solutions 
            tailored to your specific needs and circumstances.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-6">
            Can't find the service you're looking for? We offer customized solutions for unique cases.
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-outline"
          >
            Request Custom Consultation
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
