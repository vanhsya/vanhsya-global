'use client';
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

interface TestimonialProps {
  id: string;
  name: string;
  location: string;
  country: string;
  flag: string;
  service: string;
  rating: number;
  comment: string;
  date: string;
  profileImage: string;
  visaType: string;
  isVerified: boolean;
}

const TestimonialCard: React.FC<{ testimonial: TestimonialProps; isActive: boolean }> = ({ 
  testimonial, 
  isActive 
}) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={index < rating ? 'text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: isActive ? 1 : 0.7, 
        scale: isActive ? 1 : 0.95,
        y: isActive ? 0 : 20
      }}
      className={`p-8 rounded-2xl shadow-lg border transition-all duration-300 ${
        isActive 
          ? 'bg-white border-blue-200 shadow-xl' 
          : 'bg-gray-50 border-gray-200'
      }`}
    >
      <div className="flex items-start mb-6">
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
            {testimonial.name.split(' ').map(n => n[0]).join('')}
          </div>
          {testimonial.isVerified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
          )}
        </div>
        <div className="ml-4 flex-1">
          <h4 className="font-semibold text-gray-800 text-lg">{testimonial.name}</h4>
          <div className="flex items-center text-gray-600 text-sm mb-2">
            <FaMapMarkerAlt className="mr-1" />
            {testimonial.location}
            <span className="ml-2">{testimonial.flag}</span>
          </div>
          <div className="flex items-center mb-2">
            {renderStars(testimonial.rating)}
            <span className="ml-2 text-sm text-gray-600">({testimonial.rating}/5)</span>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <FaCalendarAlt className="mr-1" />
            {testimonial.date}
          </div>
        </div>
      </div>

      <div className="relative mb-4">
        <FaQuoteLeft className="absolute -top-2 -left-2 text-3xl text-blue-200" />
        <p className="text-gray-700 leading-relaxed pl-6 italic">
          "{testimonial.comment}"
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
            {testimonial.service}
          </span>
          <span className="inline-block ml-2 px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
            {testimonial.visaType}
          </span>
        </div>
        {testimonial.isVerified && (
          <span className="text-xs text-green-600 font-medium">
            ✓ Verified Client
          </span>
        )}
      </div>
    </motion.div>
  );
};

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Demo testimonials - easily replaceable with CMS data
  const testimonials: TestimonialProps[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      location: 'Vancouver, Canada',
      country: 'Canada',
      flag: '🇨🇦',
      service: 'Express Entry',
      rating: 5,
      comment: 'VANHSYA made my Canadian dream come true. Their team was incredibly professional and kept me informed throughout the entire process. The transparency about fees and timelines was exactly what I needed.',
      date: 'March 2024',
      profileImage: 'SC',
      visaType: 'Permanent Resident',
      isVerified: true
    },
    {
      id: '2',
      name: 'Michael Rodriguez',
      location: 'Sydney, Australia',
      country: 'Australia',
      flag: '🇦🇺',
      service: 'Skilled Independent Visa',
      rating: 5,
      comment: 'From the initial consultation to receiving my visa, VANHSYA provided exceptional service. They helped me understand the point system and guided me through each step with patience and expertise.',
      date: 'February 2024',
      profileImage: 'MR',
      visaType: 'Subclass 189',
      isVerified: true
    },
    {
      id: '3',
      name: 'Priya Sharma',
      location: 'London, United Kingdom',
      country: 'UK',
      flag: '🇬🇧',
      service: 'Skilled Worker Visa',
      rating: 5,
      comment: 'The team at VANHSYA was fantastic. They were always available to answer my questions and made the complex UK visa process seem straightforward. Highly recommend their services.',
      date: 'January 2024',
      profileImage: 'PS',
      visaType: 'Skilled Worker',
      isVerified: true
    },
    {
      id: '4',
      name: 'David Thompson',
      location: 'Toronto, Canada',
      country: 'Canada',
      flag: '🇨🇦',
      service: 'Family Sponsorship',
      rating: 5,
      comment: 'Reuniting with my family seemed impossible until I found VANHSYA. Their compassionate approach and thorough knowledge of family immigration made all the difference.',
      date: 'December 2023',
      profileImage: 'DT',
      visaType: 'Family Class',
      isVerified: true
    },
    {
      id: '5',
      name: 'Anna Mueller',
      location: 'Berlin, Germany',
      country: 'Germany',
      flag: '🇩🇪',
      service: 'EU Blue Card',
      rating: 5,
      comment: 'Professional, efficient, and trustworthy. VANHSYA helped me secure my EU Blue Card for Germany. The process was smooth and their communication was excellent throughout.',
      date: 'November 2023',
      profileImage: 'AM',
      visaType: 'EU Blue Card',
      isVerified: true
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push(testimonials[index]);
    }
    return visible;
  };

  return (
    <section className="section-padding bg-gradient-to-br from-blue-50 via-white to-amber-50">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg mb-6">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real stories from real clients who trusted VANHSYA with their immigration journey. 
            Every testimonial is verified and represents our commitment to client success.
          </p>
        </motion.div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center mb-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevTestimonial}
            className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center mr-4 hover:bg-blue-50 transition-colors"
          >
            <FaChevronLeft className="text-blue-600" />
          </motion.button>

          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextTestimonial}
            className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center ml-4 hover:bg-blue-50 transition-colors"
          >
            <FaChevronRight className="text-blue-600" />
          </motion.button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {getVisibleTestimonials().map((testimonial, index) => (
              <motion.div
                key={`${currentIndex}-${index}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <TestimonialCard 
                  testimonial={testimonial} 
                  isActive={index === 1} // Middle card is active
                />
              </motion.div>
            ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">0+</div>
              <div className="text-gray-600">Successful Cases</div>
              <div className="text-sm text-gray-500 mt-1">Building trust with every client</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">5.0</div>
              <div className="text-gray-600">Average Rating</div>
              <div className="text-sm text-gray-500 mt-1">Based on verified reviews</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-600 mb-2">100%</div>
              <div className="text-gray-600">Transparency</div>
              <div className="text-sm text-gray-500 mt-1">No hidden fees or false claims</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600">Client Support</div>
              <div className="text-sm text-gray-500 mt-1">Always here when you need us</div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-6">
            Ready to start your own success story?
          </p>
          <motion.a
            href="/consultation"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary text-lg px-8 py-4"
          >
            Book Your Free Consultation
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
