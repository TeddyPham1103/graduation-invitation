import React, { useEffect, useRef } from 'react';

export const SpaceDustCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle definition
    interface DustParticle {
      x: number;
      y: number;
      size: number;
      baseAlpha: number;
      alpha: number;
      vx: number;
      vy: number;
      hue: number;
      pulseSpeed: number;
      pulseOffset: number;
    }

    const particleCount = window.innerWidth < 768 ? 45 : 90;
    const particles: DustParticle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.6,
        baseAlpha: Math.random() * 0.5 + 0.15,
        alpha: 0.2,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -Math.random() * 0.35 - 0.1, // gently rising
        hue: Math.random() > 0.4 ? 43 : 210, // Champagne gold & subtle celestial blue
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.02;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around borders
        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Alpha pulsation
        p.alpha = p.baseAlpha + Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.25;
        p.alpha = Math.max(0.05, Math.min(0.9, p.alpha));

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        if (p.hue === 43) {
          // Gold / champagne
          ctx.fillStyle = `rgba(229, 195, 101, ${p.alpha})`;
          ctx.shadowColor = 'rgba(212, 175, 55, 0.6)';
          ctx.shadowBlur = p.size * 5;
        } else {
          // Celestial blue
          ctx.fillStyle = `rgba(164, 193, 238, ${p.alpha * 0.8})`;
          ctx.shadowColor = 'rgba(100, 150, 255, 0.4)';
          ctx.shadowBlur = p.size * 4;
        }

        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
      aria-hidden="true"
    />
  );
};
