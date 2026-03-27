'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const ModernLoader = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ duration: 1, type: "spring", stiffness: 200 }}
          className="w-20 h-20 mx-auto mb-8 relative"
        >
          <Image
            src="/images/originallogo.png"
            alt="VANHSYA"
            fill
            className="object-contain"
            priority
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-2 border-blue-400 border-t-transparent rounded-full"
          />
        </motion.div>

        {/* Brand Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-white mb-6"
        >
          <h1 className="text-3xl font-bold mb-2">VANHSYA</h1>
          <p className="text-blue-200">AI Innovations</p>
        </motion.div>

        {/* Loading Dots */}
        <div className="flex space-x-2 justify-center">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              animate={{ y: [0, -20, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: index * 0.2,
              }}
              className="w-3 h-3 bg-blue-400 rounded-full"
            />
          ))}
        </div>

        {/* Loading Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-blue-200 mt-4"
        >
          Initializing AI innovations...
        </motion.p>
      </div>
    </div>
  );
};

export default ModernLoader;
