import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Share2 } from 'lucide-react';
import type { GraduationProfile } from '../types/graduation';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: GraduationProfile;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, profile }) => {
  const [copied, setCopied] = useState(false);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://graduation-invitation.vercel.app';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareText = `Trân trọng kính mời bạn tham dự Lễ Tốt Nghiệp của ${profile.name}!`;

  // Direct Social Share URLs
  const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
  const zaloShareUrl = `https://zalo.me/share?url=${encodeURIComponent(currentUrl)}`;
  const teleShareUrl = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`;

  // Quick QR code image
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(currentUrl)}&color=050814&bgcolor=FDFBF7`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-space-950/80 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-md rounded-3xl p-1 bg-gradient-to-b from-champagne-400/40 via-champagne-600/20 to-champagne-900/60 shadow-2xl z-10"
          >
            <div className="w-full rounded-[22px] bg-space-900 border border-champagne-500/30 p-6 text-center text-champagne-100 relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-space-800 text-champagne-300 hover:text-champagne-100 transition-colors"
                aria-label="Đóng"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-12 h-12 rounded-full bg-champagne-500/10 border border-champagne-500/30 flex items-center justify-center text-champagne-400 mx-auto mb-3 shadow-gold-glow">
                <Share2 className="w-6 h-6" />
              </div>

              <h3 className="font-serif text-xl font-bold text-gold-gradient">
                Chia Sẻ Thiệp Mời
              </h3>
              <p className="text-xs text-champagne-300/80 mt-1 mb-5">
                Gửi link thiệp mời tốt nghiệp đến người thân & bạn bè
              </p>

              {/* QR Code */}
              <div className="mb-5 p-3 rounded-2xl bg-white max-w-[170px] mx-auto shadow-gold-glow">
                <img
                  src={qrCodeUrl}
                  alt="QR Code Thiệp Mời"
                  className="w-full h-full object-contain rounded-lg"
                  loading="lazy"
                />
                <span className="text-[10px] text-space-950 font-medium block mt-1">
                  Quét mã để mở thiệp
                </span>
              </div>

              {/* Copy Link Input */}
              <div className="flex items-center gap-2 p-1.5 rounded-xl bg-space-800 border border-champagne-500/30 mb-5">
                <input
                  type="text"
                  readOnly
                  value={currentUrl}
                  className="w-full bg-transparent px-3 text-xs text-champagne-200 outline-none truncate"
                />
                <button
                  onClick={handleCopy}
                  className="px-3 py-2 rounded-lg bg-champagne-500 text-space-950 font-bold text-xs flex items-center gap-1.5 hover:bg-champagne-400 transition-colors shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Đã chép</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Sao chép</span>
                    </>
                  )}
                </button>
              </div>

              {/* Social Buttons */}
              <div className="grid grid-cols-3 gap-2">
                <a
                  href={fbShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-space-800/80 hover:bg-blue-600/20 border border-champagne-500/20 hover:border-blue-500/50 text-xs font-medium text-champagne-200 transition-colors"
                >
                  Facebook
                </a>
                <a
                  href={zaloShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-space-800/80 hover:bg-blue-500/20 border border-champagne-500/20 hover:border-blue-400/50 text-xs font-medium text-champagne-200 transition-colors"
                >
                  Zalo
                </a>
                <a
                  href={teleShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-space-800/80 hover:bg-sky-500/20 border border-champagne-500/20 hover:border-sky-400/50 text-xs font-medium text-champagne-200 transition-colors"
                >
                  Telegram
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
