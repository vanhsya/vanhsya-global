'use client';

import { motion } from 'framer-motion';
import { COMPANY } from '@/lib/company';

export default function YouTubeSubscribeSection() {
  return (
    <section className="section-padding bg-gradient-to-r from-red-50 to-white">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="heading-lg mb-4">Subscribe to VANHSYA Live</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Daily visa updates, scam alerts, and AI migration tips — straight from Dubai.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-xl"
        >
          <iframe
            src="https://www.youtube.com/embed/Vanhsya_live?rel=0&showinfo=0"
            title="VANHSYA Live YouTube Channel"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full aspect-video"
          />
        </motion.div>
        <div className="text-center mt-6">
          <a
            href={COMPANY.social.youtubeSubscribe}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.01 3.01 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.01 3.01 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.01 3.01 0 0 0 2.122 2.136c1.871.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.01 3.01 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Subscribe on YouTube
          </a>
        </div>
      </div>
    </section>
  );
}
