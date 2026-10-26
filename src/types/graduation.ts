export interface GraduationProfile {
  name: string;
  englishName?: string;
  tagline: string;
  university: string;
  universityShort?: string;
  faculty: string;
  major: string;
  degree: string;
  cohort: string;
  graduationYear: string;
  portraitUrl: string; // URL or empty string for placeholder
}

export interface CeremonyDetails {
  dateIso: string; // e.g. "2026-11-20T08:30:00"
  dateDisplay: string; // e.g. "Chủ Nhật, ngày 20 tháng 11 năm 2026"
  timeDisplay: string; // e.g. "08:00 — 11:30"
  venue: string; // e.g. "Hội trường A5 — Tòa nhà Trung tâm"
  address: string; // e.g. "268 Lý Thường Kiệt, Phường 14, Quận 10, TP. Hồ Chí Minh"
  googleMapsUrl: string;
  dressCode?: string;
  receptionTime?: string;
}

export interface JourneyMilestone {
  id: string;
  phase: string;
  period: string;
  title: string;
  description: string;
  quote?: string;
  highlights: string[];
  imageUrl: string; // Empty string for placeholder
  caption: string;
}

export interface MemoryPhoto {
  id: string;
  title: string;
  category: 'ban-be' | 'hoc-tap' | 'hoat-dong' | 'ky-niem';
  categoryLabel: string;
  imageUrl: string; // Empty string for placeholder
  caption: string;
  date?: string;
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  email?: string;
  phone?: string;
}

export interface GraduationConfig {
  profile: GraduationProfile;
  ceremony: CeremonyDetails;
  invitationMessage: {
    greeting: string;
    body: string[];
    closing: string;
  };
  thankYouMessage: {
    title: string;
    body: string[];
    signatures: string;
  };
  journey: JourneyMilestone[];
  memories: MemoryPhoto[];
  socials: SocialLinks;
  audio: {
    enabled: boolean;
    customAudioUrl?: string; // Optional custom mp3 URL
    soundEffects: boolean;
  };
}
