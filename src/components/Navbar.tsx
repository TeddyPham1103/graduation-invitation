import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Share2, Heart, Award } from 'lucide-react';
import type { GraduationConfig } from '../types/graduation';

interface NavbarProps {
  config: GraduationConfig;
  onOpenRsvp: () => void;
  onOpenShare: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ config, onOpenRsvp, onOpenShare }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Giới Thiệu', href: '#hero' },
    { label: 'Hành Trình', href: '#journey' },
    { label: 'Thiệp Mời', href: '#invitation' },
    { label: 'Đếm Ngược', href: '#countdown' },
    { label: 'Kỷ Niệm', href: '#memories' },
    { label: 'Lời Cảm Ơn', href: '#thankyou' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-space-950/80 backdrop-blur-xl border-b border-champagne-500/20 shadow-glass'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Monogram */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 text-champagne-200 group transition-transform hover:scale-105"
          >
            <div className="w-8 h-8 rounded-lg bg-champagne-500/15 border border-champagne-400/50 flex items-center justify-center text-champagne-400 shadow-gold-glow">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <span className="font-cinzel text-sm sm:text-base font-bold tracking-widest text-gold-gradient block">
                {config.profile.name}
              </span>
              <span className="text-[10px] text-champagne-400/70 tracking-wider block -mt-1 uppercase">
                {config.profile.graduationYear} Graduation
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-xs uppercase tracking-widest text-champagne-200/80 hover:text-champagne-400 transition-colors py-1 relative group font-medium"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-champagne-400 transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Quick Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenShare}
              className="p-2 rounded-full bg-space-800/80 border border-champagne-500/20 text-champagne-300 hover:text-champagne-100 hover:border-champagne-400 transition-colors shadow-sm"
              title="Chia sẻ thiệp mời"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenRsvp}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-champagne-600 via-champagne-500 to-champagne-400 text-space-950 font-bold text-xs shadow-gold-glow flex items-center gap-1.5 hover:brightness-110 transition-all"
            >
              <Heart className="w-3.5 h-3.5 fill-space-950" />
              <span>Xác Nhận Tham Dự</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenShare}
              className="p-2 rounded-full bg-space-800/80 border border-champagne-500/20 text-champagne-300"
              aria-label="Chia sẻ"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-space-800/80 border border-champagne-500/20 text-champagne-200"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-30 p-4 md:hidden"
          >
            <div className="rounded-2xl bg-space-950/95 backdrop-blur-2xl border border-champagne-500/30 p-5 shadow-2xl space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-champagne-200 hover:bg-champagne-500/15 hover:text-champagne-400 transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-2 border-t border-champagne-500/20">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenRsvp();
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-champagne-600 via-champagne-500 to-champagne-400 text-space-950 font-bold text-xs shadow-gold-glow flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4 fill-space-950" />
                  <span>XÁC NHẬN THAM DỰ DỰ LỄ</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
