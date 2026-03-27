 "use client";
 
 import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
 import { Sparkles, Timer, Rocket, Coins, CreditCard, Atom, Globe2 } from "lucide-react";
 
 type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };
 
function Countdown({ target }: Readonly<{ target: Date }>) {
   const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
   useEffect(() => {
     const update = () => {
       const now = Date.now();
       const diff = Math.max(0, target.getTime() - now);
       setTimeLeft({
         days: Math.floor(diff / (1000 * 60 * 60 * 24)),
         hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
         minutes: Math.floor((diff / (1000 * 60)) % 60),
         seconds: Math.floor((diff / 1000) % 60),
       });
     };
     update();
    const id = globalThis.setInterval(update, 1000);
    return () => globalThis.clearInterval(id);
   }, [target]);
 
   return (
     <div className="flex gap-3 justify-center md:justify-start">
       {[
         { label: "Days", value: timeLeft.days },
         { label: "Hours", value: timeLeft.hours },
         { label: "Mins", value: timeLeft.minutes },
         { label: "Secs", value: timeLeft.seconds },
       ].map((u) => (
         <div key={u.label} className="flex flex-col items-center px-3 py-2 bg-white/5 border border-white/10 rounded-xl min-w-[70px]">
           <motion.span key={u.value} initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-2xl font-extrabold text-amber-400">
             {String(u.value).padStart(2, "0")}
           </motion.span>
           <span className="text-[10px] uppercase tracking-widest text-slate-400 mt-1">{u.label}</span>
         </div>
       ))}
     </div>
   );
 }
 
 export default function ComingSoonShowcase() {
   const target = new Date();
   target.setDate(target.getDate() + 90);
 
   const items = [
     {
       icon: <Atom className="w-6 h-6 text-indigo-300" />,
       title: "Quantum AI Tools",
       desc: "Next-gen decision engines for eligibility, risk and route optimization.",
     },
     {
       icon: <CreditCard className="w-6 h-6 text-purple-300" />,
       title: "EMI Systems",
       desc: "Flexible, transparent payment schedules with milestone-based releases.",
     },
     {
       icon: <Sparkles className="w-6 h-6 text-pink-300" />,
       title: "Lottery Functionality",
       desc: "Engagement rewards and fair-win mechanics for active community members.",
     },
     {
       icon: <Coins className="w-6 h-6 text-amber-300" />,
       title: "Crypto Payments",
       desc: "Multi-chain acceptance with institutional-grade compliance.",
     },
     {
       icon: <Globe2 className="w-6 h-6 text-cyan-300" />,
       title: "Vanhsya Exchange",
       desc: "Cross-border value rails for services, rewards and real-time settlement.",
     },
   ];
 
   return (
     <section className="relative py-20 bg-slate-950">
       <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 via-transparent to-purple-900/10 pointer-events-none" />
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
         <div className="flex flex-col lg:flex-row gap-12 items-center">
           <div className="flex-1">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 header-blur-vanhsya">
               <Timer className="w-4 h-4 text-amber-300" />
               <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/70">Coming Soon</span>
             </div>
             <h2 className="mt-6 text-3xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent">
               Future Systems, Built for Global Leadership
             </h2>
             <p className="mt-4 text-lg text-slate-300 max-w-2xl">
               VANHSYA is engineering the next decade of global migration infrastructure. From quantum-grade AI to flexible payments and compliant crypto rails, our platform is built to lead worldwide.
             </p>
             <div className="mt-8">
               <Countdown target={target} />
             </div>
             <div className="mt-6 text-[10px] text-white/60">No credit card required • Transparent roadmap • Enterprise-grade security</div>
           </div>
 
           <div className="flex-1 w-full">
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
               {items.map((it, idx) => (
                 <motion.div
                   key={it.title}
                   initial={{ opacity: 0, y: 18 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.6, delay: idx * 0.08 }}
                   className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 header-blur-vanhsya hover:bg-white/[0.06] transition-colors"
                 >
                   <div className="flex items-center gap-3">
                     <div className="p-2 rounded-xl bg-black/40 border border-white/10">{it.icon}</div>
                     <h3 className="text-white font-bold">{it.title}</h3>
                   </div>
                   <p className="mt-3 text-slate-300 text-sm">{it.desc}</p>
                   <div className="mt-4 inline-flex items-center gap-2 text-[10px] text-white/60">
                     <Rocket className="w-4 h-4" />
                     <span>Enterprise preview launching soon</span>
                   </div>
                 </motion.div>
               ))}
             </div>
           </div>
         </div>
       </div>
     </section>
   );
 }
