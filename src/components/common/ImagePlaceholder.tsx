import React, { useState } from 'react';
import { Camera, Sparkles } from 'lucide-react';

interface ImagePlaceholderProps {
  src?: string;
  alt: string;
  className?: string;
  aspectRatio?: 'portrait' | 'landscape' | 'square' | 'video';
  label?: string;
  sublabel?: string;
  showHint?: boolean;
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = 'landscape',
  label = 'Khung ảnh của bạn',
  sublabel = 'Chèn ảnh tại graduationData.ts',
  showHint = true,
}) => {
  const [imageError, setImageError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const aspectClasses = {
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
    video: 'aspect-[16/9]',
    square: 'aspect-square',
  }[aspectRatio];

  // If a valid image URL is given and has not failed to load:
  if (src && src.trim() !== '' && !imageError) {
    return (
      <div className={`relative overflow-hidden group ${aspectClasses} ${className}`}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setImageError(true)}
          className={`w-full h-full object-cover transition-all duration-700 ${
            loaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-sm'
          } group-hover:scale-105`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-space-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    );
  }

  // Elegant Luxury Graduation Placeholder
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border-2 border-dashed border-champagne-500/30 bg-gradient-to-br from-space-800/60 via-space-900/80 to-space-950/90 flex flex-col items-center justify-center p-6 text-center transition-all duration-500 hover:border-champagne-500/60 hover:shadow-gold-glow group ${aspectClasses} ${className}`}
    >
      {/* Subtle background ambient light */}
      <div className="absolute -inset-1 bg-gradient-to-r from-champagne-500/10 via-transparent to-champagne-500/10 opacity-30 group-hover:opacity-60 blur-xl transition-all duration-700 pointer-events-none" />

      {/* Decorative corner accents */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-champagne-500/50 rounded-tl" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-champagne-500/50 rounded-tr" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-champagne-500/50 rounded-bl" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-champagne-500/50 rounded-br" />

      {/* Floating Sparkles & Icon */}
      <div className="relative mb-3 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-champagne-500/10 border border-champagne-500/30 flex items-center justify-center text-champagne-400 group-hover:scale-110 group-hover:border-champagne-500/60 transition-transform duration-500 shadow-inner">
          <Camera className="w-6 h-6 stroke-[1.5]" />
        </div>
        <Sparkles className="w-4 h-4 text-champagne-300 absolute -top-1 -right-1 animate-pulse" />
      </div>

      {/* Label and Guidance */}
      <div className="relative z-10 max-w-[85%]">
        <span className="inline-block text-[11px] font-semibold tracking-widest uppercase text-champagne-400/90 mb-1 px-2.5 py-0.5 rounded-full bg-champagne-500/10 border border-champagne-500/20">
          {label}
        </span>
        <p className="text-sm font-medium text-champagne-200 line-clamp-2 mt-1">
          {alt || 'Hình ảnh kỷ niệm'}
        </p>
        {showHint && (
          <p className="text-[11px] text-champagne-400/60 mt-1 italic">
            {sublabel}
          </p>
        )}
      </div>
    </div>
  );
};
