import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import type { GraduationConfig } from '../types/graduation';
import { GraduationCap3D } from './3d/GraduationCap3D';

interface OpeningScreenProps {
  config: GraduationConfig;
  onEnter: () => void;
}

export const OpeningScreen: React.FC<OpeningScreenProps> = ({ config, onEnter }) => {
  const [isZooming, setIsZooming] = useState(false);
  const { profile } = config;

  const handleStartJourney = () => {
    setIsZooming(true);
    // Smooth cinematic transition timing
    setTimeout(() => {
      onEnter();
    }, 900);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-50 bg-[#02040a] flex flex-col items-center justify-between overflow-hidden select-none"
      >
        {/* Subtle Ambient Vignette & Golden Flare */}
        <div className="absolute inset-0 bg-radial-gradient pointer-events-none z-10 opacity-70" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-champagne-500/10 rounded-full blur-[140px] pointer-events-none z-0" />

        {/* Top Header Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-20 pt-8 sm:pt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-champagne-500/10 border border-champagne-500/25 text-champagne-300 text-xs tracking-[0.3em] uppercase font-cinzel font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-champagne-400" />
            <span>Interactive 3D Experience</span>
          </div>
        </motion.div>

        {/* Center 3D Scene */}
        <div className="relative w-full h-[52vh] sm:h-[58vh] z-10 flex items-center justify-center">
          <GraduationCap3D isZoomingIn={isZooming} interactive={!isZooming} />

          {/* Touch/Mouse hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-2 text-center text-[10px] uppercase tracking-widest text-champagne-400/60 pointer-events-none"
          >
            Xoay hoặc chạm để tương tác 3D
          </motion.div>
        </div>

        {/* Bottom Callout & Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative z-20 pb-12 sm:pb-16 px-4 text-center max-w-xl mx-auto"
        >
          <p className="text-xs sm:text-sm uppercase tracking-[0.4em] text-champagne-400/90 font-cinzel mb-2 font-medium">
            A new chapter begins...
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-gold-gradient tracking-wide mb-3">
            {profile.name}
          </h1>
          <p className="text-xs sm:text-sm text-champagne-300/80 mb-8 max-w-md mx-auto line-clamp-2">
            {profile.university} • {profile.major}
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleStartJourney}
            className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-champagne-600 via-champagne-500 to-champagne-400 text-space-950 font-bold text-sm tracking-wider uppercase shadow-gold-glow flex items-center gap-3 mx-auto transition-all"
          >
            <span>BẮT ĐẦU HÀNH TRÌNH</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </motion.div>

        {/* Subtle Bottom Glow Line */}
        <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-champagne-500/30 to-transparent" />
      </motion.div>
    </AnimatePresence>
  );
};
