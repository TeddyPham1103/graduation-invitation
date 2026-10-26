import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Timer, PartyPopper, CalendarClock, Bell } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { CeremonyDetails } from '../types/graduation';

interface CountdownSectionProps {
  ceremony: CeremonyDetails;
  graduateName: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  isValid: boolean;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({ ceremony, graduateName }) => {
  const calculateTimeLeft = (): TimeLeft => {
    if (!ceremony.dateIso) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false, isValid: false };
    }

    const target = new Date(ceremony.dateIso).getTime();
    if (isNaN(target)) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false, isValid: false };
    }

    const difference = target - Date.now();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true, isValid: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isExpired: false,
      isValid: true,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [ceremony.dateIso]);

  const celebrateNow = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#FFEAA7', '#FFFFFF', '#FFDF88'],
    });
  };

  const timeUnits = [
    { label: 'NGÀY', value: timeLeft.days },
    { label: 'GIỜ', value: timeLeft.hours },
    { label: 'PHÚT', value: timeLeft.minutes },
    { label: 'GIÂY', value: timeLeft.seconds },
  ];

  return (
    <section id="countdown" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Volumetric Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-champagne-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-champagne-500/10 border border-champagne-500/25 text-champagne-300 text-xs tracking-widest uppercase font-cinzel mb-4">
            <Timer className="w-3.5 h-3.5 text-champagne-400" />
            <span>Real-time Countdown</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-gold-gradient tracking-tight mb-4">
            Đếm Ngược Đến Giờ Khắc Trọng Đại
          </h2>
          <p className="text-sm sm:text-base text-champagne-300/80 leading-relaxed">
            Từng giây trôi qua đều đưa chúng ta đến gần hơn với ngày tốt nghiệp đáng nhớ.
          </p>
        </div>

        {/* TIME BLOCKS OR CELEBRATION */}
        {!timeLeft.isValid ? (
          /* Fallback when date is not configured */
          <div className="p-8 rounded-3xl bg-space-900/80 border border-champagne-500/30 max-w-md mx-auto shadow-glass">
            <CalendarClock className="w-10 h-10 text-champagne-400 mx-auto mb-3" />
            <p className="text-base font-semibold text-champagne-200">
              Ngày giờ sự kiện đang được cập nhật
            </p>
            <p className="text-xs text-champagne-400/70 mt-1">
              Vui lòng xem lại tại graduationData.ts &gt; ceremony.dateIso
            </p>
          </div>
        ) : timeLeft.isExpired ? (
          /* CELEBRATION STATE WHEN EVENT ARRIVED */
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-champagne-500/20 via-space-900/90 to-space-950 border border-champagne-400/50 shadow-gold-glow-lg max-w-2xl mx-auto"
          >
            <PartyPopper className="w-16 h-16 text-champagne-400 mx-auto mb-4 animate-bounce" />
            <h3 className="font-serif text-3xl sm:text-4xl font-extrabold text-gold-gradient mb-3">
              Chúc Mừng Ngày Tốt Nghiệp!
            </h3>
            <p className="text-sm sm:text-base text-champagne-200 leading-relaxed mb-6">
              Hôm nay là ngày vinh danh hành trình đại học của {graduateName}. Xin gửi những lời chúc tốt đẹp nhất cho chặng đường tươi sáng phía trước!
            </p>
            <button
              onClick={celebrateNow}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-champagne-600 to-champagne-400 text-space-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:scale-105 transition-all"
            >
              Bắn Pháo Hoa Chúc Mừng 🎊
            </button>
          </motion.div>
        ) : (
          /* 3D GLASSMORPHIC COUNTDOWN CARDS */
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
            {timeUnits.map((unit, index) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="rounded-3xl p-1 bg-gradient-to-b from-champagne-400/40 via-champagne-600/20 to-space-800 shadow-2xl relative group"
              >
                <div className="w-full rounded-[22px] bg-gradient-to-b from-space-900/90 via-space-950 to-space-950 border border-champagne-500/30 p-6 sm:p-8 flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-xl">
                  {/* Subtle inner gold shine line */}
                  <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-champagne-400 to-transparent opacity-80" />

                  {/* Digit Display */}
                  <span className="font-serif text-4xl sm:text-6xl font-black text-gold-gradient tracking-tight leading-none mb-2 tabular-nums">
                    {String(unit.value).padStart(2, '0')}
                  </span>

                  {/* Unit Label */}
                  <span className="text-[11px] sm:text-xs font-cinzel font-bold tracking-[0.25em] text-champagne-300 uppercase">
                    {unit.label}
                  </span>

                  {/* Bottom indicator dot */}
                  <div className="w-1.5 h-1.5 rounded-full bg-champagne-400/50 mt-3 group-hover:bg-champagne-400 transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Ceremony Date Reference */}
        <div className="mt-8 text-xs text-champagne-400/80 font-medium flex items-center justify-center gap-2">
          <Bell className="w-3.5 h-3.5 text-champagne-400" />
          <span>Thời điểm diễn ra: {ceremony.dateDisplay} ({ceremony.timeDisplay})</span>
        </div>

      </div>
    </section>
  );
};
