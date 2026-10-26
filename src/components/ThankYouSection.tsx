import React from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  ArrowUp,
  Share2,
  Mail,
  Phone,
  Sparkles
} from 'lucide-react';
import type { GraduationConfig } from '../types/graduation';

// Clean SVG Brand Icons
const FacebookIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

interface ThankYouSectionProps {
  config: GraduationConfig;
  onOpenShare: () => void;
}

export const ThankYouSection: React.FC<ThankYouSectionProps> = ({ config, onOpenShare }) => {
  const { profile, thankYouMessage, socials } = config;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="thankyou" className="relative pt-24 pb-16 overflow-hidden">
      {/* Deep Space Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-champagne-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Heart Emblem */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className="w-16 h-16 rounded-full bg-champagne-500/15 border border-champagne-500/30 flex items-center justify-center text-champagne-400 mx-auto mb-6 shadow-gold-glow"
        >
          <Heart className="w-8 h-8 fill-champagne-500/30 text-champagne-400" />
        </motion.div>

        {/* Section Title */}
        <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-gold-gradient tracking-tight mb-4">
          {thankYouMessage.title}
        </h2>
        
        <p className="font-cinzel text-xs sm:text-sm uppercase tracking-[0.35em] text-champagne-400 font-semibold mb-10">
          "Thank you for being part of my journey."
        </p>

        {/* Heartfelt Thank You Card */}
        <div className="rounded-3xl p-1 bg-gradient-to-b from-champagne-400/30 via-champagne-600/10 to-transparent shadow-2xl mb-12">
          <div className="rounded-[22px] bg-space-900/90 border border-champagne-500/25 p-8 sm:p-12 text-left space-y-5 leading-relaxed text-sm sm:text-base text-champagne-200/90 backdrop-blur-xl">
            {thankYouMessage.body.map((paragraph, idx) => (
              <p key={idx} className="font-normal">
                {paragraph}
              </p>
            ))}

            {/* Signature */}
            <div className="pt-6 border-t border-champagne-500/20 text-right">
              <p className="font-serif italic text-champagne-400 text-base sm:text-lg whitespace-pre-line font-medium">
                {thankYouMessage.signatures}
              </p>
              <p className="text-xs text-champagne-300/60 mt-1">
                {profile.university} • {profile.cohort}
              </p>
            </div>
          </div>
        </div>

        {/* Social / Contact Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          {socials.facebook && (
            <a
              href={socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-space-800/80 border border-champagne-500/20 text-champagne-300 hover:text-champagne-100 hover:border-champagne-400 hover:scale-110 transition-all shadow-sm"
              title="Facebook"
            >
              <FacebookIcon />
            </a>
          )}
          {socials.instagram && (
            <a
              href={socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-space-800/80 border border-champagne-500/20 text-champagne-300 hover:text-champagne-100 hover:border-champagne-400 hover:scale-110 transition-all shadow-sm"
              title="Instagram"
            >
              <InstagramIcon />
            </a>
          )}
          {socials.linkedin && (
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-space-800/80 border border-champagne-500/20 text-champagne-300 hover:text-champagne-100 hover:border-champagne-400 hover:scale-110 transition-all shadow-sm"
              title="LinkedIn"
            >
              <LinkedinIcon />
            </a>
          )}
          {socials.email && (
            <a
              href={`mailto:${socials.email}`}
              className="p-3 rounded-full bg-space-800/80 border border-champagne-500/20 text-champagne-300 hover:text-champagne-100 hover:border-champagne-400 hover:scale-110 transition-all shadow-sm"
              title="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          )}
          {socials.phone && (
            <a
              href={`tel:${socials.phone}`}
              className="p-3 rounded-full bg-space-800/80 border border-champagne-500/20 text-champagne-300 hover:text-champagne-100 hover:border-champagne-400 hover:scale-110 transition-all shadow-sm"
              title="Điện thoại"
            >
              <Phone className="w-5 h-5" />
            </a>
          )}
        </div>

        {/* Action Buttons: Share & Back to top */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onOpenShare}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-champagne-600 via-champagne-500 to-champagne-400 text-space-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow flex items-center justify-center gap-2 hover:brightness-110 transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span>Chia Sẻ Website</span>
          </button>

          <button
            onClick={scrollToTop}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-space-800/80 hover:bg-space-700/80 border border-champagne-500/30 text-champagne-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
          >
            <ArrowUp className="w-4 h-4 text-champagne-400" />
            <span>Quay Lại Đầu Trang</span>
          </button>
        </div>

        {/* Footer Credit Note */}
        <div className="pt-8 border-t border-champagne-500/15 text-xs text-champagne-400/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} {profile.name} — Personal Graduation Experience.</p>
          <p className="flex items-center gap-1.5">
            <span>Made with passion &amp; gratitude</span>
            <Sparkles className="w-3.5 h-3.5 text-champagne-400" />
          </p>
        </div>

      </div>
    </footer>
  );
};
