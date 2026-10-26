import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import type { GraduationConfig } from '../types/graduation';

interface AudioPlayerProps {
  audioConfig: GraduationConfig['audio'];
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioConfig }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const customAudioRef = useRef<HTMLAudioElement | null>(null);
  const synthIntervalRef = useRef<number | null>(null);

  // Notes for a peaceful, uplifting cinematic graduation theme (Pentatonic Major: C4, D4, E4, G4, A4, C5, D5, E5)
  const notes = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25];

  const playGenerativeChime = (ctx: AudioContext) => {
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const note = notes[Math.floor(Math.random() * notes.length)];
      osc.type = 'sine';
      osc.frequency.setValueAtTime(note, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.0);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 3.0);
    } catch {
      // AudioContext state error handler
    }
  };

  const startGenerativeAmbient = () => {
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioContextRef.current = new AudioCtx();
    }
    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // Play immediate chime
    playGenerativeChime(ctx);

    // Schedule gentle gentle chimes
    synthIntervalRef.current = window.setInterval(() => {
      playGenerativeChime(ctx);
    }, 1800);
  };

  const stopGenerativeAmbient = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state === 'running') {
      audioContextRef.current.suspend();
    }
  };

  const toggleAudio = () => {
    if (isPlaying) {
      // Stop
      if (customAudioRef.current) {
        customAudioRef.current.pause();
      }
      stopGenerativeAmbient();
      setIsPlaying(false);
    } else {
      // Start
      if (audioConfig.customAudioUrl) {
        if (!customAudioRef.current) {
          customAudioRef.current = new Audio(audioConfig.customAudioUrl);
          customAudioRef.current.loop = true;
          customAudioRef.current.volume = 0.5;
        }
        customAudioRef.current.play().catch(() => {
          // If custom file fails to play, fallback to generative ambient
          startGenerativeAmbient();
        });
      } else {
        startGenerativeAmbient();
      }
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      stopGenerativeAmbient();
      if (customAudioRef.current) {
        customAudioRef.current.pause();
      }
    };
  }, []);

  if (!audioConfig.enabled) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={toggleAudio}
        className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full backdrop-blur-xl border transition-all duration-300 shadow-glass group ${
          isPlaying
            ? 'bg-champagne-500/20 border-champagne-400 text-champagne-300 shadow-gold-glow'
            : 'bg-space-900/80 border-champagne-500/20 text-champagne-400/70 hover:text-champagne-300 hover:border-champagne-500/40'
        }`}
        aria-label={isPlaying ? 'Tắt nhạc nền' : 'Bật nhạc nền'}
        title={isPlaying ? 'Tắt nhạc nền' : 'Bật giai điệu tốt nghiệp'}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-4 h-4 text-champagne-400 animate-pulse" />
            <span className="text-xs font-medium pr-1 flex items-center gap-1">
              <span>Nhạc nền</span>
              <span className="flex gap-0.5 items-end h-3">
                <span className="w-0.5 h-full bg-champagne-400 animate-[bounce_0.8s_infinite]" />
                <span className="w-0.5 h-2/3 bg-champagne-400 animate-[bounce_0.6s_infinite_0.2s]" />
                <span className="w-0.5 h-4/5 bg-champagne-400 animate-[bounce_0.7s_infinite_0.4s]" />
              </span>
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4" />
            <span className="text-xs font-medium pr-1 hidden group-hover:inline">
              Bật nhạc
            </span>
          </>
        )}
      </button>
    </div>
  );
};
