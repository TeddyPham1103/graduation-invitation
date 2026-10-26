import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Maximize2, X, Calendar } from 'lucide-react';
import type { MemoryPhoto } from '../types/graduation';
import { ImagePlaceholder } from './common/ImagePlaceholder';

interface MemoriesSectionProps {
  memories: MemoryPhoto[];
}

export const MemoriesSection: React.FC<MemoriesSectionProps> = ({ memories }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryPhoto | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Tất Cả Kỷ Niệm' },
    { id: 'ky-niem', label: 'Lễ Tốt Nghiệp' },
    { id: 'hoc-tap', label: 'Học Tập & Đồ Án' },
    { id: 'ban-be', label: 'Bạn Bè' },
    { id: 'hoat-dong', label: 'Hoạt Động' },
  ];

  const filteredMemories =
    activeCategory === 'all'
      ? memories
      : memories.filter((item) => item.category === activeCategory);

  return (
    <section id="memories" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Section Ambient Light */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-champagne-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-champagne-500/10 border border-champagne-500/25 text-champagne-300 text-xs tracking-widest uppercase font-cinzel mb-4">
            <Sparkles className="w-3.5 h-3.5 text-champagne-400" />
            <span>Memories Gallery</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-gold-gradient tracking-tight mb-4">
            Những Khoảnh Khắc Đáng Nhớ
          </h2>
          <p className="text-sm sm:text-base text-champagne-300/80 leading-relaxed">
            Mỗi bức ảnh là một lát cắt quý giá lưu giữ tiếng cười, giọt mồ hôi và những kỷ niệm không thể nào quên của thanh xuân đại học.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-champagne-500 text-space-950 shadow-gold-glow scale-105'
                  : 'bg-space-800/60 text-champagne-300 hover:text-champagne-100 hover:bg-space-700/60 border border-champagne-500/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry / Asymmetric Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredMemories.map((photo, index) => (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -6 }}
              onClick={() => setSelectedPhoto(photo)}
              className="group cursor-pointer rounded-3xl p-1 bg-gradient-to-b from-champagne-500/20 via-transparent to-champagne-500/10 hover:from-champagne-500/50 hover:to-champagne-500/30 transition-all duration-500 shadow-glass"
            >
              <div className="rounded-[22px] overflow-hidden bg-space-900 border border-champagne-500/25 relative flex flex-col h-full">
                
                {/* Photo or Placeholder with Hover Zoom */}
                <div className="relative overflow-hidden">
                  <ImagePlaceholder
                    src={photo.imageUrl}
                    alt={photo.title}
                    aspectRatio={index % 3 === 0 ? 'portrait' : 'landscape'}
                    label={photo.categoryLabel}
                    sublabel="Cập nhật tại graduationData.ts > memories"
                    className="w-full"
                  />

                  {/* Hover Overlay with Maximize Icon */}
                  <div className="absolute inset-0 bg-space-950/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <div className="w-11 h-11 rounded-full bg-champagne-500/20 border border-champagne-400 text-champagne-300 flex items-center justify-center shadow-gold-glow transform scale-75 group-hover:scale-100 transition-transform">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Photo Details Card */}
                <div className="p-5 flex-1 flex flex-col justify-between bg-gradient-to-b from-space-900 to-space-950 border-t border-champagne-500/15">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-champagne-400/80 mb-1.5">
                      <span className="font-semibold uppercase tracking-wider">
                        {photo.categoryLabel}
                      </span>
                      {photo.date && (
                        <span className="flex items-center gap-1 text-champagne-300/60">
                          <Calendar className="w-3 h-3" />
                          {photo.date}
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-champagne-100 group-hover:text-champagne-300 transition-colors">
                      {photo.title}
                    </h3>
                  </div>

                  <p className="text-xs text-champagne-300/70 mt-2 line-clamp-2 leading-relaxed">
                    {photo.caption}
                  </p>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 bg-space-950/90 backdrop-blur-xl"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              className="relative w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden bg-space-900 border border-champagne-500/40 shadow-2xl z-10 flex flex-col my-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-space-950/80 border border-champagne-500/30 text-champagne-200 hover:text-champagne-100 transition-colors"
                aria-label="Đóng"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Photo Area */}
              <div className="relative flex-1 bg-black/60 flex items-center justify-center min-h-[300px] sm:min-h-[420px]">
                <ImagePlaceholder
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.title}
                  aspectRatio="landscape"
                  label={selectedPhoto.categoryLabel}
                  sublabel="Cập nhật tại graduationData.ts"
                  className="max-h-[65vh] w-auto"
                />
              </div>

              {/* Details Footer */}
              <div className="p-6 bg-space-900 border-t border-champagne-500/20 text-left">
                <div className="flex items-center justify-between text-xs text-champagne-400 mb-1">
                  <span className="font-semibold uppercase tracking-wider">
                    {selectedPhoto.categoryLabel}
                  </span>
                  {selectedPhoto.date && <span>{selectedPhoto.date}</span>}
                </div>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-gold-gradient mb-1">
                  {selectedPhoto.title}
                </h4>
                <p className="text-sm text-champagne-200/90 leading-relaxed">
                  {selectedPhoto.caption}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
