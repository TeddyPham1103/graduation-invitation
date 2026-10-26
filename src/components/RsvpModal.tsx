import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Check, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { GraduationConfig } from '../types/graduation';

interface RsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: GraduationConfig;
}

interface RsvpEntry {
  id: string;
  name: string;
  relationship: string;
  status: string;
  guestCount: number;
  message: string;
  timestamp: string;
}

export const RsvpModal: React.FC<RsvpModalProps> = ({ isOpen, onClose, config }) => {
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('Bạn bè');
  const [status, setStatus] = useState('tham-du');
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [savedEntries, setSavedEntries] = useState<RsvpEntry[]>([]);

  // Load existing RSVPs from localStorage
  useEffect(() => {
    const raw = localStorage.getItem('graduation_rsvp_list');
    if (raw) {
      try {
        setSavedEntries(JSON.parse(raw));
      } catch {
        // ignore parsing error
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newEntry: RsvpEntry = {
      id: Date.now().toString(),
      name: name.trim(),
      relationship,
      status,
      guestCount,
      message: message.trim(),
      timestamp: new Date().toLocaleString('vi-VN'),
    };

    const updated = [newEntry, ...savedEntries];
    setSavedEntries(updated);
    localStorage.setItem('graduation_rsvp_list', JSON.stringify(updated));

    setIsSubmitted(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#D4AF37', '#FFEAA7', '#E5C365'],
    });
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setName('');
    setMessage('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-space-950/85 backdrop-blur-md"
          />

          {/* Modal Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg rounded-3xl p-1 bg-gradient-to-b from-champagne-400/40 via-champagne-600/20 to-champagne-900/60 shadow-2xl z-10 my-8"
          >
            <div className="w-full rounded-[22px] bg-space-900 border border-champagne-500/30 p-6 sm:p-8 text-champagne-100 relative">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 p-2 rounded-full bg-space-800 text-champagne-300 hover:text-champagne-100 hover:bg-space-700 transition-colors"
                aria-label="Đóng"
              >
                <X className="w-5 h-5" />
              </button>

              {!isSubmitted ? (
                <>
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-champagne-500/15 border border-champagne-500/30 flex items-center justify-center text-champagne-400 mx-auto mb-3 shadow-gold-glow">
                      <Heart className="w-6 h-6 fill-champagne-500/20" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-gold-gradient">
                      Xác Nhận Tham Dự & Lời Chúc
                    </h3>
                    <p className="text-xs text-champagne-300/80 mt-1">
                      Gửi lời chúc mừng và báo trước số lượng người đến chung vui cùng {config.profile.name}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4 text-left">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-semibold text-champagne-300 uppercase tracking-wider mb-1.5">
                        Họ và tên của bạn <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ví dụ: Nguyễn Minh Tuấn"
                        className="w-full px-4 py-2.5 rounded-xl bg-space-800/80 border border-champagne-500/30 text-champagne-100 placeholder:text-champagne-400/40 text-sm focus:outline-none focus:border-champagne-400 focus:ring-1 focus:ring-champagne-400"
                      />
                    </div>

                    {/* Relationship & Status */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-champagne-300 uppercase tracking-wider mb-1.5">
                          Bạn là...
                        </label>
                        <select
                          value={relationship}
                          onChange={(e) => setRelationship(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-space-800/80 border border-champagne-500/30 text-champagne-100 text-sm focus:outline-none focus:border-champagne-400"
                        >
                          <option value="Bạn bè">Bạn bè</option>
                          <option value="Người thân / Gia đình">Người thân / Gia đình</option>
                          <option value="Thầy cô">Thầy cô</option>
                          <option value="Đồng nghiệp">Đồng nghiệp</option>
                          <option value="Khác">Khác</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-champagne-300 uppercase tracking-wider mb-1.5">
                          Trạng thái tham dự
                        </label>
                        <select
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-space-800/80 border border-champagne-500/30 text-champagne-100 text-sm focus:outline-none focus:border-champagne-400"
                        >
                          <option value="tham-du">Chắc chắn tham dự 🎉</option>
                          <option value="co-the">Có thể tham dự 🤔</option>
                          <option value="khong-the">Rất tiếc không thể đến 💌</option>
                        </select>
                      </div>
                    </div>

                    {/* Guests Count */}
                    <div>
                      <label className="block text-xs font-semibold text-champagne-300 uppercase tracking-wider mb-1.5">
                        Số lượng người đi cùng
                      </label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4].map((num) => (
                          <button
                            type="button"
                            key={num}
                            onClick={() => setGuestCount(num)}
                            className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all ${
                              guestCount === num
                                ? 'bg-champagne-500 text-space-950 border-champagne-400 shadow-gold-glow'
                                : 'bg-space-800/60 text-champagne-300 border-champagne-500/20 hover:border-champagne-500/40'
                            }`}
                          >
                            {num === 4 ? '4+ người' : `${num} người`}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Wish / Message */}
                    <div>
                      <label className="block text-xs font-semibold text-champagne-300 uppercase tracking-wider mb-1.5">
                        Lời chúc mừng gửi tân cử nhân
                      </label>
                      <textarea
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Chúc bạn tốt nghiệp rực rỡ, tương lai thênh thang..."
                        className="w-full px-4 py-2.5 rounded-xl bg-space-800/80 border border-champagne-500/30 text-champagne-100 placeholder:text-champagne-400/40 text-sm focus:outline-none focus:border-champagne-400 focus:ring-1 focus:ring-champagne-400 resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-champagne-600 via-champagne-500 to-champagne-400 text-space-950 font-bold text-sm shadow-gold-glow flex items-center justify-center gap-2 hover:brightness-110 transition-all mt-6"
                    >
                      <Send className="w-4 h-4" />
                      <span>GỬI XÁC NHẬN & LỜI CHÚC</span>
                    </button>
                  </form>
                </>
              ) : (
                /* Success View */
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-champagne-500/20 border-2 border-champagne-400 flex items-center justify-center text-champagne-300 mx-auto shadow-gold-glow">
                    <Check className="w-8 h-8 stroke-[2.5]" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-gold-gradient">
                    Cảm Ơn Bạn Rất Nhiều!
                  </h4>
                  <p className="text-sm text-champagne-200/90 max-w-sm mx-auto leading-relaxed">
                    Xác nhận và lời chúc của bạn đã được ghi nhận. {config.profile.name} rất mong được gặp và chụp ảnh cùng bạn tại buổi lễ!
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={resetForm}
                      className="px-6 py-2.5 rounded-xl bg-space-800 text-champagne-300 border border-champagne-500/30 text-xs font-semibold hover:bg-space-700 transition-colors"
                    >
                      Hoàn Tất
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
