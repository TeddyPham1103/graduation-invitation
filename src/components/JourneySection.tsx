import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, CheckCircle2, Quote } from 'lucide-react';
import type { JourneyMilestone } from '../types/graduation';
import { ImagePlaceholder } from './common/ImagePlaceholder';

interface JourneySectionProps {
  journey: JourneyMilestone[];
}

export const JourneySection: React.FC<JourneySectionProps> = ({ journey }) => {

  return (
    <section id="journey" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Section Glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-champagne-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-champagne-500/10 border border-champagne-500/25 text-champagne-300 text-xs tracking-widest uppercase font-cinzel mb-4">
            <Sparkles className="w-3.5 h-3.5 text-champagne-400" />
            <span>My Journey</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-gold-gradient tracking-tight mb-4">
            Hành Trình Trưởng Thành
          </h2>
          <p className="text-sm sm:text-base text-champagne-300/80 leading-relaxed">
            Từ những ngày đầu bỡ ngỡ bước chân vào cổng trường đại học cho đến khoảnh khắc thiêng liêng khoác lên mình chiếc áo cử nhân.
          </p>
        </div>

        {/* Interactive Story Timeline */}
        <div className="relative">
          {/* Central Vertical Golden Glow Line */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-champagne-500/10 via-champagne-500/40 to-champagne-500/10 -translate-x-1/2 hidden sm:block" />

          <div className="space-y-16 sm:space-y-24">
            {journey.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  className={`relative flex flex-col sm:flex-row items-center gap-8 md:gap-12 ${
                    isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
                >
                  {/* Central Node Badge */}
                  <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-space-950 border-2 border-champagne-400 shadow-gold-glow items-center justify-center z-20">
                    <span className="text-[11px] font-bold text-champagne-300 font-cinzel">
                      0{index + 1}
                    </span>
                  </div>

                  {/* LEFT / RIGHT: Story Card */}
                  <div className="w-full sm:w-1/2">
                    <div className="rounded-3xl p-1 bg-gradient-to-br from-champagne-400/25 via-champagne-600/10 to-transparent hover:from-champagne-400/40 transition-all duration-500 shadow-glass">
                      <div className="w-full rounded-[22px] bg-space-900/90 border border-champagne-500/20 p-6 sm:p-8 backdrop-blur-xl">
                        {/* Phase & Period */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-xs font-cinzel font-bold text-champagne-400 tracking-wider uppercase">
                            {item.phase}
                          </span>
                          <span className="text-xs text-champagne-300/80 flex items-center gap-1 bg-space-800/80 px-2.5 py-1 rounded-full border border-champagne-500/15">
                            <Calendar className="w-3 h-3 text-champagne-400" />
                            {item.period}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-champagne-100 mb-3">
                          {item.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-champagne-300/80 leading-relaxed mb-4">
                          {item.description}
                        </p>

                        {/* Quote if available */}
                        {item.quote && (
                          <div className="p-3 rounded-xl bg-champagne-500/10 border-l-2 border-champagne-400 mb-4 flex items-start gap-2.5">
                            <Quote className="w-4 h-4 text-champagne-400 shrink-0 mt-0.5" />
                            <p className="text-xs italic text-champagne-200 font-serif">
                              "{item.quote}"
                            </p>
                          </div>
                        )}

                        {/* Key Milestones List */}
                        <div className="space-y-1.5 pt-1">
                          {item.highlights.map((hl, hlIdx) => (
                            <div key={hlIdx} className="flex items-center gap-2 text-xs text-champagne-200/90">
                              <CheckCircle2 className="w-3.5 h-3.5 text-champagne-400 shrink-0" />
                              <span>{hl}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* OPPOSITE SIDE: Visual Memory Frame (Image or Luxury Placeholder) */}
                  <div className="w-full sm:w-1/2">
                    <div className="rounded-3xl p-1 bg-gradient-to-br from-champagne-500/20 to-transparent shadow-xl group">
                      <div className="rounded-[22px] overflow-hidden bg-space-900 border border-champagne-500/25 relative">
                        <ImagePlaceholder
                          src={item.imageUrl}
                          alt={item.title}
                          aspectRatio="landscape"
                          label={`Kỷ Niệm: ${item.phase}`}
                          sublabel="Cập nhật tại graduationData.ts > journey"
                          className="w-full min-h-[220px] sm:min-h-[260px]"
                        />

                        {/* Caption Tag */}
                        <div className="p-3 bg-space-950/90 border-t border-champagne-500/20 text-center">
                          <p className="text-xs text-champagne-300/90 italic">
                            {item.caption}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
