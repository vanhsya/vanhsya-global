'use client';
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaChevronDown, FaUser, FaGlobe } from 'react-icons/fa';

interface NavigationProps {
  onLoginClick?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onLoginClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    {
      label: 'Services',
      href: '/services',
      dropdown: [
        { label: 'Work Visa', href: '/services/work-visa' },
        { label: 'Study Visa', href: '/services/study-visa' },
        { label: 'Tourist Visa', href: '/services/tourist-visa' },
        { label: 'Business Visa', href: '/services/business-visa' },
        { label: 'Family Visa', href: '/services/family-visa' },
        { label: 'Permanent Residency', href: '/services/permanent-residency' },
      ]
    },
    {
      label: 'Countries',
      href: '/countries',
      dropdown: [
        { label: 'Canada', href: '/countries/canada' },
        { label: 'Australia', href: '/countries/australia' },
        { label: 'United States', href: '/countries/usa' },
        { label: 'United Kingdom', href: '/countries/uk' },
        { label: 'Germany', href: '/countries/germany' },
        { label: 'New Zealand', href: '/countries/new-zealand' },
      ]
    },
    { label: 'About Us', href: '/about' },
    { label: 'Success Stories', href: '/success-stories' },
    { label: 'Resources', href: '/resources' },
    { label: 'Contact', href: '/contact' },
  ];

  const handleDropdownToggle = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-xl border-b border-gray-100' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Enhanced Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-3"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-blue-700 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent"></div>
              <FaGlobe className="text-white text-xl relative z-10" />
            </div>
            <span className={`text-2xl font-bold ${
              isScrolled ? 'text-gray-800' : 'text-white'
            }`}>
              VANHSYA
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div key={item.label} className="relative group">
                {item.dropdown ? (
                  <div>
                    <button
                      onClick={() => handleDropdownToggle(item.label)}
                      className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                        isScrolled
                          ? 'text-gray-700 hover:text-blue-600'
                          : 'text-white hover:text-amber-300'
                      }`}
                    >
                      <span>{item.label}</span>
                      <FaChevronDown className={`text-xs transition-transform duration-200 ${
                        activeDropdown === item.label ? 'rotate-180' : ''
                      }`} />
                    </button>
                    
                    <AnimatePresence>
                      {activeDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: -15, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -15, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute top-full left-0 mt-3 w-64 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-100 py-3 overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-yellow-50/30"></div>
                          {item.dropdown.map((dropdownItem, index) => (
                            <motion.a
                              key={dropdownItem.label}
                              href={dropdownItem.href}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="relative block px-5 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-700 transition-all duration-200 border-l-2 border-transparent hover:border-blue-500"
                            >
                              {dropdownItem.label}
                            </motion.a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <a
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isScrolled
                        ? 'text-gray-700 hover:text-blue-600'
                        : 'text-white hover:text-amber-300'
                    }`}
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={onLoginClick}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                isScrolled
                  ? 'text-gray-700 hover:text-blue-600'
                  : 'text-white hover:text-amber-300'
              }`}
            >
              <FaUser className="text-xs" />
              <span>Login</span>
            </button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              Free Consultation
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 rounded-md ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-6 space-y-4">
              {navigationItems.map((item) => (
                <div key={item.label}>
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => handleDropdownToggle(item.label)}
                        className="flex items-center justify-between w-full px-3 py-2 text-left text-gray-700 hover:text-blue-600 font-medium"
                      >
                        {item.label}
                        <FaChevronDown className={`text-xs transition-transform duration-200 ${
                          activeDropdown === item.label ? 'rotate-180' : ''
                        }`} />
                      </button>
                      
                      <AnimatePresence>
                        {activeDropdown === item.label && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="ml-4 mt-2 space-y-2"
                          >
                            {item.dropdown.map((dropdownItem) => (
                              <a
                                key={dropdownItem.label}
                                href={dropdownItem.href}
                                className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600"
                              >
                                {dropdownItem.label}
                              </a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <a
                      href={item.href}
                      className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
                    >
                      {item.label}
                    </a>
                  )}
                </div>
              ))}
              
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <button
                  onClick={onLoginClick}
                  className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
                >
                  <FaUser className="text-xs" />
                  <span>Login</span>
                </button>
                
                <button className="w-full btn-primary">
                  Free Consultation
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
