"use client";

import { Phone, ShieldCheck, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';
import { COMPANY } from '@/lib/company';

export default function TrustRibbon() {
  return (
    <div className="w-full bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-700 text-white text-sm">
      <div className="container-max px-4 sm:px-6 lg:px-8 py-2 flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <span className="inline-flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" />
            <span className="opacity-90">UAE Partnerships</span>
          </span>
          <span className="hidden sm:inline opacity-40">•</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span className="opacity-90">{COMPANY.uae.availability}</span>
          </span>
          <span className="hidden sm:inline opacity-40">•</span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span className="opacity-90">7 Emirates: {COMPANY.uae.emirates.join(' • ')}</span>
          </span>
        </div>
        <Link
          href={`tel:${COMPANY.phoneE164}`}
          className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-full px-3 py-1 transition-colors"
        >
          <Phone className="w-4 h-4" />
          <span className="font-semibold">{COMPANY.phoneDisplay}</span>
        </Link>
      </div>
    </div>
  );
}
