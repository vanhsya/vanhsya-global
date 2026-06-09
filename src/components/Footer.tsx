'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaFacebook, 
  FaTwitter, 
  FaLinkedin, 
  FaInstagram,
  FaYoutube,
  FaGlobe
} from 'react-icons/fa';
import { COMPANY } from '@/lib/company';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Services',
      links: [
        { name: 'Study Visa', href: '/services/study-visa' },
        { name: 'Work Visa', href: '/services/work-visa' },
        { name: 'Business Visa', href: '/services/business-visa' },
        { name: 'Family Visa', href: '/services/family-visa' },
        { name: 'Permanent Residence', href: '/services/permanent-residence' },
        { name: 'Tourist Visa', href: '/services/tourist-visa' }
      ]
    },
    {
      title: 'Destinations',
      links: [
        { name: 'Canada', href: '/countries/canada' },
        { name: 'Australia', href: '/countries/australia' },
        { name: 'United Kingdom', href: '/countries/uk' },
        { name: 'USA', href: '/countries/usa' },
        { name: 'Germany', href: '/countries/germany' },
        { name: 'New Zealand', href: '/countries/new-zealand' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'AI Eligibility Check', href: '/ai-tools/eligibility' },
        { name: 'Scam Detector', href: '/ai-tools/scam-detector' },
        { name: 'Success Stories', href: '/success-stories' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Blog', href: '/blog' },
        { name: 'Client Portal', href: '/portal' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Why VANHSYA?', href: '/why-vanhsya' },
        { name: 'Next Era', href: '/next-era' },
        { name: 'Investors', href: '/investors' },
        { name: 'Contact', href: '/contact' },
        { name: 'Referral Program', href: '/referral-program' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' }
      ]
    }
  ];

  const contactInfo = [
    {
      icon: FaPhone,
      label: 'Phone',
      value: COMPANY.phoneDisplay,
      href: `tel:${COMPANY.phoneE164}`
    },
    {
      icon: FaEnvelope,
      label: 'Support',
      value: COMPANY.emails.support,
      href: `mailto:${COMPANY.emails.support}`
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Address',
      value: `${COMPANY.uae.country} • Coverage across all 7 Emirates`,
      href: '/contact'
    },
    {
      icon: FaEnvelope,
      label: 'Investors',
      value: COMPANY.emails.founder,
      href: `mailto:${COMPANY.emails.founder}`
    },
    {
      icon: FaEnvelope,
      label: 'Careers',
      value: COMPANY.emails.career,
      href: `mailto:${COMPANY.emails.career}`
    }
  ];

  const socialLinks = [
    { icon: FaFacebook, href: COMPANY.social.facebookPage, label: 'Facebook' },
    { icon: FaTwitter, href: COMPANY.social.twitter, label: 'Twitter / X' },
    { icon: FaLinkedin, href: COMPANY.social.linkedin, label: 'LinkedIn' },
    { icon: FaInstagram, href: COMPANY.social.instagram, label: 'Instagram' },
    { icon: FaYoutube, href: COMPANY.social.youtubeChannel, label: 'YouTube' },
  ];

  return (
    <footer className="bg-slate-950 text-white border-t border-white/10">
      {/* Main Footer Content */}
      <div className="container-max px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-amber-400 rounded-xl flex items-center justify-center mr-3 border border-white/10">
                  <FaGlobe className="text-white text-xl" />
                </div>
                <span className="text-2xl font-bold">VANHSYA</span>
              </div>
              <p className="text-white/70 leading-relaxed mb-6">
                Premium global migration support with UAE-wide presence. Transparent processes, expert guidance, and 24/7 assistance across all 7 Emirates.
              </p>
              
              {/* Contact Information */}
              <div className="space-y-3">
                {contactInfo.map((contact) => (
                  <motion.a
                    key={contact.label}
                    href={contact.href}
                    whileHover={{ x: 5 }}
                    className="flex items-center text-white/70 hover:text-white transition-colors duration-200"
                  >
                    <contact.icon className="mr-3 text-amber-200" />
                    <span className="text-sm">{contact.value}</span>
                  </motion.a>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-sm font-semibold text-white mb-3">Official Contact Emails</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <a className="text-white/70 hover:text-white transition-colors" href={`mailto:${COMPANY.emails.founder}`}>{COMPANY.emails.founder}</a>
                  <a className="text-white/70 hover:text-white transition-colors" href={`mailto:${COMPANY.emails.connect}`}>{COMPANY.emails.connect}</a>
                  <a className="text-white/70 hover:text-white transition-colors" href={`mailto:${COMPANY.emails.hr}`}>{COMPANY.emails.hr}</a>
                  <a className="text-white/70 hover:text-white transition-colors" href={`mailto:${COMPANY.emails.support}`}>{COMPANY.emails.support}</a>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-sm font-semibold text-white mb-3">{COMPANY.uae.partnershipLabel}</div>
                <div className="text-sm text-white/70">{COMPANY.uae.availability}</div>
                <div className="text-xs text-white/50 mt-2">{COMPANY.uae.partnershipNote}</div>
              </div>
            </motion.div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 bg-white/[0.05] rounded-xl border border-white/10 flex items-center justify-center hover:bg-white/[0.10] transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="text-lg" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, sectionIndex) => (
            <div key={section.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: sectionIndex * 0.1 }}
              >
                <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <motion.a
                        href={link.href}
                        whileHover={{ x: 5 }}
                        className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-white/50 text-sm mb-4 md:mb-0">
              © {currentYear} VANHSYA Global Migration. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link
                href="/sitemap.xml"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
