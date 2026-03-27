"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

type TimeUnitProps = {
  value: number;
  label: string;
};

function TimeUnit({ value, label }: TimeUnitProps) {
  return (
    <div className="flex flex-col items-center p-3 sm:p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl min-w-[70px] sm:min-w-[90px]">
      <motion.span
        key={value}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-2xl sm:text-3xl font-bold text-amber-400"
      >
        {value.toString().padStart(2, '0')}
      </motion.span>
      <span className="text-[10px] sm:text-xs uppercase tracking-widest text-slate-400 mt-1">{label}</span>
    </div>
  );
}

export default function CardCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const raf = window.requestAnimationFrame(() => setMounted(true));
    // Set launch date to 30 days from now for demo
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });

      if (distance < 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => {
      window.cancelAnimationFrame(raf);
      clearInterval(timer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex gap-3 sm:gap-4 justify-center lg:justify-start">
      <TimeUnit value={timeLeft.days} label="Days" />
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <TimeUnit value={timeLeft.minutes} label="Mins" />
      <TimeUnit value={timeLeft.seconds} label="Secs" />
    </div>
  );
}
