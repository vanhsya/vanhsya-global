"use client";

import React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiShield, FiZap, FiGlobe, FiLayers, FiCreditCard, FiSmartphone, FiGift } from 'react-icons/fi';
import { FaBitcoin, FaEthereum, FaWallet } from 'react-icons/fa';
import CardCountdown from '@/components/card/CardCountdown';
import CardWaitlist from '@/components/card/CardWaitlist';
import NavigationPremium from '@/components/NavigationPremium';
import Footer from '@/components/Footer';
import GlassCard from '@/components/GlassCard';

export default function VanhsyaCardPage() {
  const [mounted, setMounted] = React.useState(false);
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      title: "Universal Crypto Access",
      desc: "Spend BTC, ETH, and other major assets directly at over 60 million merchants worldwide.",
      icon: <FiGlobe className="w-6 h-6" />,
      color: "from-blue-500/20 to-indigo-500/20"
    },
    {
      title: "Zero Fees On FX",
      desc: "Enjoy interbank exchange rates with zero hidden markups on international transactions.",
      icon: <FiZap className="w-6 h-6" />,
      color: "from-amber-500/20 to-orange-500/20"
    },
    {
      title: "Institutional Security",
      desc: "Multi-sig protection, biometric verification, and instant card freeze through the app.",
      icon: <FiShield className="w-6 h-6" />,
      color: "from-emerald-500/20 to-teal-500/20"
    },
    {
      title: "Real-time Rewards",
      desc: "Earn up to 5% crypto cashback on every purchase, credited instantly to your wallet.",
      icon: <FiGift className="w-6 h-6" />,
      color: "from-purple-500/20 to-pink-500/20"
    }
  ];

  return (
    <div className="min-h-screen text-white selection:bg-amber-500/30 selection:text-amber-200">
      <NavigationPremium variant="neo" />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-600/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] animate-pulse delay-700" />
            
            {/* Parallax particles */}
            {mounted && (
              <>
                <motion.div style={{ y: y1 }} className="absolute top-1/3 left-1/4 w-2 h-2 bg-amber-400 rounded-full blur-[2px]" />
                <motion.div style={{ y: y2 }} className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-purple-400 rounded-full blur-[3px]" />
              </>
            )}
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Content Column */}
              <div className="text-center lg:text-left space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-amber-500/10 border border-amber-400/20 rounded-full text-amber-300 text-sm font-medium backdrop-blur-md"
                >
                  <FiCreditCard className="w-4 h-4" />
                  <span>The Future of Spending is Here</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]"
                >
                  <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                    Introducing the
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent">
                    VANHSYA Card
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
                >
                  Experience the world's most premium Web3 debit card. 
                  Bridge the gap between your digital assets and real-world spending 
                  with zero-fee currency conversion and institutional-grade security.
                </motion.p>

                {/* Countdown */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="space-y-4"
                >
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Official Launch In</p>
                  <CardCountdown />
                </motion.div>

                {/* Waitlist Form */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="pt-4"
                >
                  <CardWaitlist />
                </motion.div>

                {/* Social Proof */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.2 }}
                  className="pt-10 flex flex-wrap justify-center lg:justify-start gap-8 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500"
                >
                  <div className="flex items-center space-x-2">
                    <FaBitcoin className="w-6 h-6" />
                    <span className="text-xs font-bold uppercase tracking-wider">Bitcoin Ready</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaEthereum className="w-6 h-6" />
                    <span className="text-xs font-bold uppercase tracking-wider">Ethereum Support</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaWallet className="w-6 h-6" />
                    <span className="text-xs font-bold uppercase tracking-wider">Web3 Integrated</span>
                  </div>
                </motion.div>
              </div>

              {/* Visual Column */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.5, type: "spring" }}
                className="relative group perspective-1000"
              >
                {/* Image Wrapper */}
                <div className="relative z-10 w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10 group-hover:rotate-y-12 transition-transform duration-700">
                  <Image
                    src="https://raw.githubusercontent.com/vyshnav-v/vanhsya-assets/main/card-preview.png"
                    alt="Vanhsya Card Preview"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                </div>
                
                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-10 -right-10 w-24 h-24 bg-amber-500/20 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center shadow-xl z-20"
                >
                  <FiZap className="w-10 h-10 text-amber-400" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-10 -left-10 w-20 h-20 bg-purple-500/20 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center shadow-xl z-20"
                >
                  <FiShield className="w-8 h-8 text-purple-400" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-slate-950/50 relative">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent">
                Why Choose VANHSYA?
              </h2>
              <p className="text-slate-400 text-lg">
                We've combined the security of institutional finance with the freedom of Web3.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <GlassCard className={`h-full p-8 flex flex-col space-y-6 bg-gradient-to-br ${feature.color} border-white/5 hover:border-amber-400/20 group transition-all duration-500`}>
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors duration-500">
                      {feature.icon}
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold">{feature.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Web3 Integration Preview */}
        <section className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[3rem] p-12 md:p-20 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-500/5 to-transparent pointer-events-none" />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                    Full Control From <br />
                    <span className="text-amber-400">Your Pocket</span>
                  </h2>
                  <p className="text-slate-400 text-lg leading-relaxed">
                    Manage your assets, track spending, and control your security 
                    settings with the Vanhsya Mobile App. 
                    Available for iOS and Android on launch.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-2xl border border-white/10 group hover:border-amber-400/30 transition-all cursor-not-allowed opacity-60">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <FiLayers className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Coming to</p>
                        <p className="font-bold">Apple Store</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-2xl border border-white/10 group hover:border-amber-400/30 transition-all cursor-not-allowed opacity-60">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <FiSmartphone className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Coming to</p>
                        <p className="font-bold">Google Play</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                   <div className="w-full aspect-square bg-gradient-to-br from-amber-500/20 via-transparent to-purple-500/20 rounded-full blur-[80px] absolute inset-0 animate-pulse" />
                   <div className="relative z-10 bg-slate-950/50 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 shadow-2xl">
                      <div className="space-y-6">
                        <div className="flex items-center justify-between border-b border-white/5 pb-6">
                          <span className="text-slate-400 font-medium">Card Status</span>
                          <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-bold rounded-lg border border-green-500/20 uppercase tracking-wider">Active</span>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                                <FaBitcoin className="w-4 h-4 text-orange-500" />
                              </div>
                              <span className="font-bold">Bitcoin</span>
                            </div>
                            <span className="font-mono">1.248 BTC</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                <FaEthereum className="w-4 h-4 text-blue-500" />
                              </div>
                              <span className="font-bold">Ethereum</span>
                            </div>
                            <span className="font-mono">15.82 ETH</span>
                          </div>
                        </div>

                        <div className="pt-6">
                          <div className="w-full py-4 bg-amber-400 text-slate-950 font-bold rounded-xl text-center shadow-lg shadow-amber-500/20 cursor-not-allowed opacity-80">
                            Simulated Interface
                          </div>
                        </div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
