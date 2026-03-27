'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUsers, 
  FaGift, 
  FaTrophy,
  FaCopy,
  FaCheck,
  FaStar
} from 'react-icons/fa';
import { GlassServiceCard } from './GlassCard';
import { IconType } from 'react-icons';

interface ReferralTier {
  name: string;
  referrals: number;
  reward: string;
  benefits: string[];
  color: string;
  icon: IconType;
}

interface ReferralStats {
  totalReferrals: number;
  successfulReferrals: number;
  totalEarnings: number;
  currentTier: string;
  nextTierProgress: number;
}

const referralTiers: ReferralTier[] = [
  {
    name: 'Bronze Explorer',
    referrals: 0,
    reward: '₹5,000',
    benefits: ['5% cashback', 'Basic support'],
    color: 'from-amber-600 to-amber-800',
    icon: FaUsers
  },
  {
    name: 'Silver Navigator',
    referrals: 3,
    reward: '₹15,000',
    benefits: ['10% cashback', 'Priority support', 'Exclusive webinars'],
    color: 'from-gray-400 to-gray-600',
    icon: FaStar
  },
  {
    name: 'Gold Ambassador',
    referrals: 7,
    reward: '₹50,000',
    benefits: ['15% cashback', 'VIP support', 'Direct consultant access'],
    color: 'from-yellow-400 to-yellow-600',
    icon: FaTrophy
  },
  {
    name: 'Platinum Partner',
    referrals: 10,
    reward: 'FREE PACKAGE',
    benefits: ['Full package free', '20% lifetime commission', 'Co-marketing opportunities'],
    color: 'from-purple-400 to-purple-600',
    icon: FaGift
  }
];

export default function ReferralSystem() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [referralCode] = useState('VANHSYA-USER123');
  const [copied, setCopied] = useState(false);
  const [stats] = useState<ReferralStats>({
    totalReferrals: 7,
    successfulReferrals: 5,
    totalEarnings: 35000,
    currentTier: 'Gold Ambassador',
    nextTierProgress: 70
  });

  const copyReferralCode = () => {
    navigator.clipboard.writeText(`Join VANHSYA with my referral code: ${referralCode} and get ₹5,000 bonus! https://vanhsya.com/ref/${referralCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareReferral = (platform: string) => {
    const text = `🌍 Join me on VANHSYA Global Migration! Use code ${referralCode} for ₹5,000 bonus. World's most trusted migration platform with AI-powered services! 🚀`;
    const url = `https://vanhsya.com/ref/${referralCode}`;
    
    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`);
        break;
      case 'facebook':
        window.open(`https://facebook.com/sharer/sharer.php?u=${url}&quote=${encodeURIComponent(text)}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`);
        break;
      case 'linkedin':
        window.open(`https://linkedin.com/sharing/share-offsite/?url=${url}`);
        break;
    }
  };

  const currentTierIndex = referralTiers.findIndex(tier => tier.name === stats.currentTier);
  const nextTier = referralTiers[currentTierIndex + 1];

  if (!isExpanded) {
    return (
      <div className="relative">
        {/* Floating Referral Banner */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-20 right-6 z-40 w-80"
        >
          <GlassServiceCard className="bg-gradient-to-r from-purple-600/90 to-pink-600/90 backdrop-blur-xl border-white/30">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FaGift className="w-5 h-5 text-yellow-300" />
                <span className="font-semibold text-white">Referral Rewards</span>
              </div>
              <button
                onClick={() => setIsExpanded(true)}
                className="text-white/80 hover:text-white text-sm"
              >
                View All
              </button>
            </div>
            
            <div className="space-y-2">
              <div className="text-white text-sm">
                Current: <span className="font-semibold text-yellow-300">{stats.currentTier}</span>
              </div>
              <div className="text-white text-sm">
                Referrals: <span className="font-semibold">{stats.totalReferrals}/10</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <motion.div 
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(stats.totalReferrals / 10) * 100}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
              <div className="text-yellow-300 text-xs text-center">
                {10 - stats.totalReferrals} more for FREE PACKAGE! 🎉
              </div>
            </div>
          </GlassServiceCard>
        </motion.div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsExpanded(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-6xl max-h-[90vh] overflow-y-auto"
          >
            <GlassServiceCard className="bg-slate-900/95 backdrop-blur-xl border-white/20">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">
                  🎁 VANHSYA Referral Program
                </h2>
                <p className="text-white/80 text-lg">
                  Refer 10 friends → Get ₹6,00,000 package absolutely FREE!
                </p>
              </div>

              {/* Current Stats Dashboard */}
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-4 bg-white/10 rounded-xl">
                  <div className="text-3xl font-bold text-primary-400">{stats.totalReferrals}</div>
                  <div className="text-white/70 text-sm">Total Referrals</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-xl">
                  <div className="text-3xl font-bold text-green-400">{stats.successfulReferrals}</div>
                  <div className="text-white/70 text-sm">Successful</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-xl">
                  <div className="text-3xl font-bold text-accent-400">₹{stats.totalEarnings.toLocaleString()}</div>
                  <div className="text-white/70 text-sm">Total Earnings</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-xl">
                  <div className="text-3xl font-bold text-purple-400">{stats.currentTier}</div>
                  <div className="text-white/70 text-sm">Current Tier</div>
                </div>
              </div>

              {/* Progress to Next Tier */}
              {nextTier && (
                <div className="mb-8 p-6 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl border border-purple-500/30">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white font-medium">Progress to {nextTier.name}</span>
                    <span className="text-white/70">{stats.totalReferrals}/{nextTier.referrals}</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3 mb-2">
                    <motion.div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(stats.totalReferrals / nextTier.referrals) * 100}%` }}
                      transition={{ duration: 1.2 }}
                    />
                  </div>
                  <p className="text-white/80 text-sm">
                    Just {nextTier.referrals - stats.totalReferrals} more referrals to unlock {nextTier.reward}!
                  </p>
                </div>
              )}

              {/* Referral Tiers */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {referralTiers.map((tier, index) => {
                  const Icon = tier.icon;
                  const isCurrentTier = tier.name === stats.currentTier;
                  const isUnlocked = stats.totalReferrals >= tier.referrals;
                  
                  return (
                    <motion.div
                      key={tier.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        isCurrentTier 
                          ? 'border-yellow-400 bg-gradient-to-br from-yellow-400/20 to-orange-500/20' 
                          : isUnlocked
                          ? 'border-green-400/50 bg-white/10'
                          : 'border-white/20 bg-white/5'
                      }`}
                    >
                      <div className="text-center">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${tier.color} flex items-center justify-center mx-auto mb-3`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="font-semibold text-white mb-1">{tier.name}</h4>
                        <div className="text-sm text-white/70 mb-2">{tier.referrals} referrals</div>
                        <div className="text-lg font-bold text-accent-400 mb-3">{tier.reward}</div>
                        <div className="space-y-1">
                          {tier.benefits.map((benefit, idx) => (
                            <div key={idx} className="text-xs text-white/80">• {benefit}</div>
                          ))}
                        </div>
                        {isCurrentTier && (
                          <div className="mt-2 text-xs bg-yellow-400 text-black px-2 py-1 rounded-full">
                            CURRENT
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Sharing Tools */}
              <div className="bg-white/10 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-semibold text-white mb-4">Share Your Referral Code</h3>
                
                {/* Referral Code */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex-1 bg-white/20 rounded-lg p-3 font-mono text-white">
                    {referralCode}
                  </div>
                  <button
                    onClick={copyReferralCode}
                    className="bg-primary-600 text-white px-4 py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
                  >
                    {copied ? <FaCheck /> : <FaCopy />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>

                {/* Social Share Buttons */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button
                    onClick={() => shareReferral('whatsapp')}
                    className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    WhatsApp
                  </button>
                  <button
                    onClick={() => shareReferral('facebook')}
                    className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Facebook
                  </button>
                  <button
                    onClick={() => shareReferral('twitter')}
                    className="bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600 transition-colors"
                  >
                    Twitter
                  </button>
                  <button
                    onClick={() => shareReferral('linkedin')}
                    className="bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition-colors"
                  >
                    LinkedIn
                  </button>
                </div>
              </div>

              {/* How It Works */}
              <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">How It Works</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <h4 className="font-medium text-white mb-1">Share Your Code</h4>
                    <p className="text-white/70 text-sm">Send your unique referral code to friends and family</p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <h4 className="font-medium text-white mb-1">They Sign Up</h4>
                    <p className="text-white/70 text-sm">Your friends join VANHSYA using your referral code</p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <h4 className="font-medium text-white mb-1">Earn Rewards</h4>
                    <p className="text-white/70 text-sm">Get cashback and climb tiers for bigger rewards</p>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <div className="text-center mt-6">
                <button
                  onClick={() => setIsExpanded(false)}
                  className="bg-white/20 text-white px-8 py-3 rounded-lg hover:bg-white/30 transition-colors"
                >
                  Close
                </button>
              </div>
            </GlassServiceCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
