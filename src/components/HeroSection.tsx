import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Mail, Award, BookOpen, Sparkles, MapPin, Calendar } from 'lucide-react';
import type { GraduationConfig } from '../types/graduation';
import { ImagePlaceholder } from './common/ImagePlaceholder';

interface HeroSectionProps {
  config: GraduationConfig;
  onOpenInvitation: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ config, onOpenInvitation }) => {
  const { profile, ceremony } = config;
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePos({
      x: (clientX / innerWidth - 0.5) * 20,
      y: (clientY / innerHeight - 0.5) * 20,
    });
  };

  const scrollToJourney = () => {
    const elem = document.querySelector('#journey');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden"
    >
      {/* Background Volumetric Depth Lights */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-champagne-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Typography & Story Hook */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Tagline / Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-champagne-500/10 border border-champagne-500/25 text-champagne-300 text-xs tracking-widest uppercase font-cinzel"
            >
              <Sparkles className="w-3.5 h-3.5 text-champagne-400" />
              <span>{profile.tagline || 'One journey ends. Another begins.'}</span>
            </motion.div>

            {/* Graduate Name */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-2">
                <span className="block text-champagne-200/90 font-light text-2xl sm:text-3xl font-sans mb-1">
                  Lễ Tốt Nghiệp Của
                </span>
                <span className="text-gold-gradient block">
                  {profile.name}
                </span>
              </h1>
              {profile.englishName && (
                <p className="font-cinzel text-sm sm:text-base text-champagne-400/80 tracking-widest mt-1">
                  [{profile.englishName}]
                </p>
              )}
            </motion.div>

            {/* Academic Credentials Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-3 pt-2"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-space-800/80 border border-champagne-500/20 text-champagne-200 text-xs sm:text-sm">
                <Award className="w-4 h-4 text-champagne-400 shrink-0" />
                <span>
                  <strong className="text-champagne-300">{profile.degree}</strong> — {profile.major}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs text-champagne-300/80">
                <span className="flex items-center gap-1.5 bg-space-800/50 px-3 py-1.5 rounded-lg border border-champagne-500/10">
                  <BookOpen className="w-3.5 h-3.5 text-champagne-400" />
                  {profile.university}
                </span>
                <span className="bg-champagne-500/15 text-champagne-300 font-semibold px-3 py-1.5 rounded-lg border border-champagne-500/30">
                  {profile.cohort}
                </span>
              </div>
            </motion.div>

            {/* Quick Ceremony Snapshot */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="p-4 rounded-2xl bg-space-900/80 border border-champagne-500/20 max-w-lg mx-auto lg:mx-0 flex items-center justify-between gap-4 text-left shadow-glass"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-champagne-500/10 border border-champagne-500/30 flex items-center justify-center text-champagne-400 shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-champagne-400/80 font-medium">
                    Ngày Trọng Đại
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-champagne-100">
                    {ceremony.dateDisplay}
                  </p>
                </div>
              </div>
              <div className="hidden sm:block text-right">
                <p className="text-[11px] uppercase tracking-wider text-champagne-400/80 font-medium">
                  Thời Gian
                </p>
                <p className="text-xs sm:text-sm text-champagne-200">
                  {ceremony.timeDisplay}
                </p>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
            >
              <button
                onClick={scrollToJourney}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-champagne-600 via-champagne-500 to-champagne-400 text-space-950 font-bold text-xs sm:text-sm tracking-wider uppercase shadow-gold-glow flex items-center justify-center gap-2 hover:brightness-110 transition-all"
              >
                <span>KHÁM PHÁ HÀNH TRÌNH</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenInvitation}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-space-800/80 hover:bg-space-700/80 border border-champagne-500/40 text-champagne-200 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm group"
              >
                <Mail className="w-4 h-4 text-champagne-400 group-hover:scale-110 transition-transform" />
                <span>BẠN ĐƯỢC MỜI — MỞ THIỆP</span>
              </button>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Graduate Artistic Portrait Placeholder with Parallax */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x * 0.4}deg) rotateX(${-mousePos.y * 0.4}deg)`,
              }}
              transition={{ type: 'spring', damping: 20 }}
              className="relative w-full max-w-sm sm:max-w-md"
            >
              {/* Outer Decorative Floating Ring */}
              <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-tr from-champagne-500/20 via-transparent to-champagne-400/20 blur-xl opacity-70 animate-pulse-glow pointer-events-none" />

              {/* Luxury Frame Container */}
              <div className="relative rounded-3xl p-1.5 bg-gradient-to-b from-champagne-400/50 via-champagne-600/30 to-champagne-900/60 shadow-2xl">
                <div className="rounded-[22px] overflow-hidden bg-space-900 border border-champagne-500/30">
                  <ImagePlaceholder
                    src={profile.portraitUrl}
                    alt={`Chân dung tốt nghiệp - ${profile.name}`}
                    aspectRatio="portrait"
                    label="Ảnh Chân Dung Của Bạn"
                    sublabel="Cập nhật tại graduationData.ts > profile.portraitUrl"
                    className="w-full h-auto min-h-[420px] sm:min-h-[480px]"
                  />
                </div>
              </div>

              {/* Floating Badge: Class of 2025 */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 px-4 py-2.5 rounded-2xl bg-space-950/90 border border-champagne-400/60 shadow-gold-glow backdrop-blur-xl flex items-center gap-2.5"
              >
                <div className="w-7 h-7 rounded-full bg-champagne-500/20 flex items-center justify-center text-champagne-400">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-champagne-400/80 font-bold">
                    Tân Cử Nhân
                  </p>
                  <p className="text-xs font-bold text-champagne-100">
                    Class of {profile.graduationYear}
                  </p>
                </div>
              </motion.div>

              {/* Floating Badge: University */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -top-4 -right-4 sm:-top-5 sm:-right-5 px-4 py-2 rounded-2xl bg-space-950/90 border border-champagne-400/60 shadow-gold-glow backdrop-blur-xl hidden sm:flex items-center gap-2"
              >
                <MapPin className="w-3.5 h-3.5 text-champagne-400" />
                <span className="text-xs font-semibold text-champagne-200">
                  {profile.universityShort || 'Graduation Day'}
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
