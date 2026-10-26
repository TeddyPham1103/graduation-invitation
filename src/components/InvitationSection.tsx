import React from 'react';
import { Sparkles } from 'lucide-react';
import type { GraduationConfig } from '../types/graduation';
import { InvitationEnvelope3D } from './3d/InvitationEnvelope3D';

interface InvitationSectionProps {
  config: GraduationConfig;
  onOpenRsvp: () => void;
}

export const InvitationSection: React.FC<InvitationSectionProps> = ({ config, onOpenRsvp }) => {
  return (
    <section id="invitation" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background radial gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-champagne-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-champagne-500/10 border border-champagne-500/25 text-champagne-300 text-xs tracking-widest uppercase font-cinzel mb-4">
            <Sparkles className="w-3.5 h-3.5 text-champagne-400" />
            <span>Graduation Invitation</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-gold-gradient tracking-tight mb-4">
            Thiệp Mời Trân Trọng
          </h2>
          <p className="text-sm sm:text-base text-champagne-300/80 leading-relaxed">
            Khoảnh khắc đặc biệt sẽ trọn vẹn hơn khi có sự hiện diện và chúc phúc từ bạn. Chạm vào thiệp bên dưới để mở lời mời!
          </p>
        </div>

        {/* 3D Interactive Envelope & Card */}
        <InvitationEnvelope3D config={config} onOpenRsvp={onOpenRsvp} />

      </div>
    </section>
  );
};
