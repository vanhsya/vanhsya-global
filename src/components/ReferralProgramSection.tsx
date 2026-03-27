"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiGift, FiArrowRight, FiTarget, FiCheckCircle } from 'react-icons/fi';
import { FaGift, FaTrophy } from 'react-icons/fa';
import GlassCard from './GlassCard';

interface ReferralTier {
  name: string;
  referrals: number;
  reward: string;
  color: string;
  benefits: string[];
}

export default function ReferralProgramSection() {
  const [mounted, setMounted] = React.useState(false);
  const [particles, setParticles] = React.useState<any[]>([]);

  React.useEffect(() => {
    setMounted(true);
    const elements = [...Array(30)].map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
    setParticles(elements);
  }, []);

  const referralTiers: ReferralTier[] = [
    {
      name: "Bronze",
      referrals: 3,
      reward: "₹15,000 Discount",
      color: "from-orange-600 to-yellow-600",
      benefits: ["15% fee reduction", "Priority support", "Bonus consultation"]
    },
    {
      name: "Silver", 
      referrals: 5,
      reward: "₹35,000 Discount",
      color: "from-gray-400 to-gray-600",
      benefits: ["35% fee reduction", "VIP support", "Document review", "Fast tracking"]
    },
    {
      name: "Gold",
      referrals: 8,
      reward: "₹65,000 Discount",
      color: "from-yellow-400 to-yellow-600",
      benefits: ["65% fee reduction", "Premium support", "Personal consultant", "Express processing"]
    },
    {
      name: "Platinum",
      referrals: 10,
      reward: "FREE Migration Package",
      color: "from-purple-400 to-pink-600",
      benefits: ["100% FREE migration", "Dedicated team", "Settlement support", "Lifetime assistance"]
    }
  ];

  const currentStats = {
    totalReferrals: 6,
    earnedRewards: "₹42,000",
    friendsMigrated: 4,
    rank: "#247"
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-yellow-500/5" />
        {/* Celebratory Particles */}
        <div className="absolute inset-0">
          {mounted && particles.map((el, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full"
              style={{
                left: el.left,
                top: el.top,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: el.duration,
                repeat: Infinity,
                delay: el.delay,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-pink-500/20 border border-yellow-400/30 rounded-full text-yellow-300 text-sm font-medium mb-6">
            <FaGift className="w-4 h-4" />
            <span>Get Your Migration FREE</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-yellow-100 to-pink-200 bg-clip-text text-transparent">
              Referral Program
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Earn While You Help
            </span>
          </h2>
          
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-4">
            <span className="text-yellow-300 font-bold">Pay small, refer 10 friends, get full package FREE!</span>
          </p>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Help your friends migrate safely while earning rewards for yourself. 
            The more you refer, the more you save - up to 100% of your migration fees.
          </p>
        </motion.div>

        {/* Live Progress Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <GlassCard className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">
                  {currentStats.totalReferrals}/10
                </div>
                <div className="text-gray-400 text-sm">Referrals Made</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  {currentStats.earnedRewards}
                </div>
                <div className="text-gray-400 text-sm">Earned Rewards</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {currentStats.friendsMigrated}
                </div>
                <div className="text-gray-400 text-sm">Friends Migrated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {currentStats.rank}
                </div>
                <div className="text-gray-400 text-sm">Global Rank</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white font-medium">Progress to FREE Migration</span>
                <span className="text-yellow-300 font-bold">
                  {10 - currentStats.totalReferrals} more to go!
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-4">
                <motion.div 
                  className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 h-4 rounded-full flex items-center justify-end pr-2"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(currentStats.totalReferrals / 10) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                >
                  <FiTarget className="w-3 h-3 text-white" />
                </motion.div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Referral Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {referralTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100 
              }}
            >
              <GlassCard className={`h-full text-center group hover:scale-105 transition-all duration-300 ${
                currentStats.totalReferrals >= tier.referrals ? 'ring-2 ring-yellow-400' : ''
              }`}>
                {/* Tier Badge */}
                <div className="flex justify-center mb-4">
                  <div className={`px-4 py-2 bg-gradient-to-r ${tier.color} rounded-full text-white font-bold text-sm flex items-center space-x-2`}>
                    {tier.name === "Platinum" && <FaTrophy className="w-4 h-4" />}
                    <span>{tier.name}</span>
                  </div>
                </div>
                
                <div className="text-2xl font-bold text-white mb-2">
                  {tier.referrals} Referrals
                </div>
                <div className="text-yellow-300 font-semibold mb-4">
                  {tier.reward}
                </div>

                <ul className="space-y-2 text-sm text-gray-300">
                  {tier.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center justify-center space-x-2">
                      <FiCheckCircle className="w-3 h-3 text-green-400" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link 
            href="/referral-program"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-yellow-500 to-pink-500 hover:from-yellow-600 hover:to-pink-600 rounded-2xl text-white font-bold text-lg shadow-lg shadow-yellow-500/25 transition-all duration-300 hover:scale-105"
          >
            <FaGift className="w-5 h-5" />
            <span>Start Referring Now</span>
            <FiArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Leaderboard Tease */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <GlassCard className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <FaTrophy className="w-8 h-8 text-yellow-400" />
              <h3 className="text-2xl font-bold text-white">Global Referral Leaderboard</h3>
            </div>
            
            <p className="text-lg text-gray-300 mb-6">
              Top referrers win exclusive global experiences and lifetime benefits!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 rounded-xl">
                <div className="text-2xl font-bold text-yellow-400 mb-2">#1</div>
                <div className="text-white font-medium mb-1">Priya S.</div>
                <div className="text-gray-400 text-sm">47 Referrals</div>
                <div className="text-yellow-300 text-xs mt-2">🏆 Won Dubai Trip</div>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-gray-400/20 to-gray-600/20 border border-gray-400/30 rounded-xl">
                <div className="text-2xl font-bold text-gray-400 mb-2">#2</div>
                <div className="text-white font-medium mb-1">Ahmed K.</div>
                <div className="text-gray-400 text-sm">39 Referrals</div>
                <div className="text-gray-300 text-xs mt-2">🥈 Won Canada Trip</div>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-orange-600/20 to-yellow-600/20 border border-orange-400/30 rounded-xl">
                <div className="text-2xl font-bold text-orange-400 mb-2">#3</div>
                <div className="text-white font-medium mb-1">Maria L.</div>
                <div className="text-gray-400 text-sm">31 Referrals</div>
                <div className="text-orange-300 text-xs mt-2">🥉 Won London Trip</div>
              </div>
            </div>

            <div className="text-purple-300 font-medium">
              Your current rank: <span className="text-white">#{currentStats.rank}</span> 
              <span className="text-gray-400 text-sm ml-2">Keep climbing!</span>
            </div>
          </GlassCard>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link
              href="/referral-program"
              className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-yellow-600 via-pink-600 to-purple-600 hover:from-yellow-700 hover:via-pink-700 hover:to-purple-700 rounded-2xl text-white font-semibold text-lg shadow-2xl shadow-pink-500/25 transition-all duration-300"
            >
              <FiGift className="w-6 h-6" />
              <span>Start Referring & Earning</span>
              <FiArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          <p className="text-gray-400 text-sm mt-4 max-w-2xl mx-auto">
            Join thousands of successful referrers who have earned FREE migrations 
            and helped their friends achieve their dreams safely.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
