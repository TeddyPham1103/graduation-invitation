import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  Download,
  MailOpen,
  Sparkles,
  Heart
} from 'lucide-react';
import type { GraduationConfig } from '../../types/graduation';
import { downloadIcsFile, getGoogleCalendarUrl } from '../../utils/calendar';

interface InvitationEnvelope3DProps {
  config: GraduationConfig;
  onOpenRsvp: () => void;
}

export const InvitationEnvelope3D: React.FC<InvitationEnvelope3DProps> = ({
  config,
  onOpenRsvp,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCalendarMenu, setShowCalendarMenu] = useState(false);

  const { profile, ceremony, invitationMessage } = config;

  const triggerCelebration = () => {
    // Champagne gold confetti burst
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#D4AF37', '#FFEAA7', '#F3E5AB', '#FFFFFF'],
      ticks: 200,
      gravity: 0.8,
      scalar: 0.9,
    });
  };

  const handleOpenEnvelope = () => {
    if (!isOpen) {
      setIsOpen(true);
      triggerCelebration();
    }
  };

  const googleCalUrl = getGoogleCalendarUrl(profile, ceremony);

  return (
    <div className="relative w-full max-w-4xl mx-auto py-10 px-4 flex flex-col items-center">
      {/* Interactive prompt above card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex items-center gap-2 px-4 py-1.5 rounded-full bg-champagne-500/10 border border-champagne-500/30 text-champagne-300 text-xs tracking-wider uppercase font-semibold"
      >
        <Sparkles className="w-3.5 h-3.5 text-champagne-400" />
        <span>{isOpen ? 'Thiệp Mời Đã Mở' : 'Chạm để mở thiệp 3D'}</span>
      </motion.div>

      {/* 3D Envelope & Card Container */}
      <div className="relative w-full max-w-2xl min-h-[540px] md:min-h-[580px] perspective-1000 flex justify-center items-center">
        
        {/* CLOSED ENVELOPE STATE */}
        <AnimatePresence mode="wait">
          {!isOpen && (
            <motion.div
              key="closed-envelope"
              initial={{ scale: 0.9, opacity: 0, rotateX: 10 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30, transition: { duration: 0.4 } }}
              whileHover={{ scale: 1.02, rotateX: -3 }}
              onClick={handleOpenEnvelope}
              className="w-full aspect-[7/5] max-w-lg cursor-pointer rounded-2xl p-1 bg-gradient-to-br from-champagne-400/40 via-champagne-600/20 to-champagne-900/60 shadow-2xl relative select-none group"
            >
              {/* Envelope Body */}
              <div className="w-full h-full rounded-2xl bg-gradient-to-b from-space-800 via-space-900 to-space-950 p-6 md:p-8 flex flex-col justify-between items-center relative overflow-hidden border border-champagne-500/40">
                {/* Triangular fold lines */}
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-champagne-500/10 to-transparent pointer-events-none" />
                
                {/* Gold geometric corner accents */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-champagne-400/70" />
                <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-champagne-400/70" />
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-champagne-400/70" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-champagne-400/70" />

                {/* Top Badge */}
                <div className="text-center z-10">
                  <p className="text-[11px] md:text-xs tracking-[0.3em] uppercase text-champagne-400 font-cinzel">
                    Official Invitation
                  </p>
                  <div className="w-12 h-[1px] bg-champagne-500/50 mx-auto mt-1" />
                </div>

                {/* Center Wax Seal */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="relative z-10 flex flex-col items-center justify-center my-auto"
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-tr from-champagne-700 via-champagne-500 to-champagne-300 p-1 shadow-gold-glow-lg flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-space-900/90 border border-champagne-400/80 flex flex-col items-center justify-center text-center">
                      <MailOpen className="w-6 h-6 md:w-8 md:h-8 text-champagne-300 mb-0.5 group-hover:scale-110 transition-transform" />
                      <span className="text-[9px] md:text-[10px] uppercase tracking-wider text-champagne-300 font-semibold">
                        Mở Thiệp
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-champagne-300/80 mt-3 font-medium tracking-wide">
                    Kính Mời Bạn
                  </span>
                </motion.div>

                {/* Bottom Sender Details */}
                <div className="text-center z-10">
                  <h3 className="font-serif text-lg md:text-xl font-bold text-gold-gradient tracking-wide">
                    {profile.name}
                  </h3>
                  <p className="text-[11px] md:text-xs text-champagne-300/70">
                    {profile.universityShort || profile.university} • {profile.cohort}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* OPENED LUXURY INVITATION CARD STATE */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="opened-card"
              initial={{ opacity: 0, y: 50, scale: 0.92, rotateX: -10 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full rounded-3xl p-1 bg-gradient-to-b from-champagne-400/50 via-champagne-600/30 to-champagne-800/60 shadow-2xl relative"
            >
              {/* Luxury Paper Card Inner */}
              <div className="w-full rounded-[22px] bg-gradient-to-b from-space-900 via-space-950 to-[#020409] p-6 md:p-10 text-center relative overflow-hidden border border-champagne-500/30">
                {/* Ambient gold glow watermark */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-champagne-500/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-champagne-500/5 rounded-full blur-3xl pointer-events-none" />

                {/* Re-fold button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 text-xs text-champagne-400/60 hover:text-champagne-300 transition-colors px-2 py-1 rounded-md border border-champagne-500/20"
                >
                  Đóng thiệp
                </button>

                {/* Header Crest */}
                <div className="mb-4">
                  <span className="text-[11px] md:text-xs uppercase tracking-[0.35em] text-champagne-400 font-cinzel font-semibold">
                    Lễ Tốt Nghiệp Đại Học
                  </span>
                  <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-champagne-500 to-transparent mx-auto mt-2" />
                </div>

                {/* Graduate Name & Title */}
                <div className="mb-6">
                  <p className="text-xs md:text-sm text-champagne-200/80 mb-1">
                    Trân trọng kính mời đến dự ngày tốt nghiệp của
                  </p>
                  <h2 className="font-serif text-2xl md:text-4xl font-extrabold text-gold-gradient tracking-wide mb-2">
                    {profile.name}
                  </h2>
                  <p className="text-sm md:text-base text-champagne-300 font-medium">
                    {profile.degree} — {profile.major}
                  </p>
                  <p className="text-xs md:text-sm text-champagne-400/70 mt-0.5">
                    {profile.university}
                  </p>
                </div>

                {/* Invitation Letter Body */}
                <div className="max-w-xl mx-auto my-6 p-4 md:p-6 rounded-2xl bg-space-800/40 border border-champagne-500/15 text-left text-xs md:text-sm text-champagne-200/90 leading-relaxed space-y-3 font-normal">
                  <p className="font-semibold text-champagne-300 text-sm">
                    {invitationMessage.greeting}
                  </p>
                  {invitationMessage.body.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                  <p className="font-serif italic text-champagne-400 text-right text-xs md:text-sm pt-1">
                    {invitationMessage.closing}
                  </p>
                </div>

                {/* Event Highlights (Date, Time, Location) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto text-left mb-8">
                  {/* Date & Time */}
                  <div className="p-4 rounded-xl bg-space-800/60 border border-champagne-500/25 flex items-start gap-3.5">
                    <div className="p-2.5 rounded-lg bg-champagne-500/10 text-champagne-400 shrink-0">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-champagne-400/80 font-medium">
                        Thời Gian
                      </p>
                      <p className="text-xs md:text-sm font-semibold text-champagne-100 mt-0.5">
                        {ceremony.dateDisplay}
                      </p>
                      <p className="text-xs text-champagne-300/80 flex items-center gap-1.5 mt-1">
                        <Clock className="w-3.5 h-3.5 text-champagne-400" />
                        {ceremony.timeDisplay}
                      </p>
                    </div>
                  </div>

                  {/* Location & Venue */}
                  <div className="p-4 rounded-xl bg-space-800/60 border border-champagne-500/25 flex items-start gap-3.5">
                    <div className="p-2.5 rounded-lg bg-champagne-500/10 text-champagne-400 shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-champagne-400/80 font-medium">
                        Địa Điểm
                      </p>
                      <p className="text-xs md:text-sm font-semibold text-champagne-100 mt-0.5">
                        {ceremony.venue}
                      </p>
                      <p className="text-xs text-champagne-300/80 line-clamp-2 mt-1">
                        {ceremony.address}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons: RSVP, Map, Add to Calendar */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  {/* RSVP Button */}
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onOpenRsvp}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-gradient-to-r from-champagne-600 via-champagne-500 to-champagne-400 text-space-950 font-bold text-sm shadow-gold-glow flex items-center justify-center gap-2 group transition-all"
                  >
                    <Heart className="w-4 h-4 fill-space-950 group-hover:scale-110 transition-transform" />
                    <span>XÁC NHẬN THAM DỰ</span>
                  </motion.button>

                  {/* Google Maps Button */}
                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    href={ceremony.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-3.5 rounded-full bg-space-800/80 hover:bg-space-700/80 border border-champagne-500/40 text-champagne-200 text-xs md:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <MapPin className="w-4 h-4 text-champagne-400" />
                    <span>XEM VỊ TRÍ GOOGLE MAPS</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                  </motion.a>

                  {/* Add to Calendar Button with Dropdown */}
                  <div className="relative w-full sm:w-auto">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setShowCalendarMenu(!showCalendarMenu)}
                      className="w-full sm:w-auto px-5 py-3.5 rounded-full bg-space-800/80 hover:bg-space-700/80 border border-champagne-500/40 text-champagne-200 text-xs md:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
                    >
                      <Calendar className="w-4 h-4 text-champagne-400" />
                      <span>THÊM VÀO LỊCH</span>
                    </motion.button>

                    {/* Calendar Dropdown Options */}
                    <AnimatePresence>
                      {showCalendarMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute right-0 bottom-full mb-2 w-52 p-2 rounded-xl bg-space-900 border border-champagne-500/40 shadow-2xl z-30 flex flex-col gap-1 text-left"
                        >
                          <a
                            href={googleCalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setShowCalendarMenu(false)}
                            className="px-3 py-2 rounded-lg text-xs text-champagne-200 hover:bg-champagne-500/20 flex items-center justify-between transition-colors"
                          >
                            <span>Google Calendar</span>
                            <ExternalLink className="w-3 h-3 text-champagne-400" />
                          </a>
                          <button
                            onClick={() => {
                              downloadIcsFile(profile, ceremony);
                              setShowCalendarMenu(false);
                            }}
                            className="px-3 py-2 rounded-lg text-xs text-champagne-200 hover:bg-champagne-500/20 flex items-center justify-between transition-colors w-full text-left"
                          >
                            <span>Apple / Outlook (.ics)</span>
                            <Download className="w-3 h-3 text-champagne-400" />
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {ceremony.receptionTime && (
                  <p className="mt-5 text-[11px] text-champagne-400/80 font-medium">
                    📸 {ceremony.receptionTime}
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
