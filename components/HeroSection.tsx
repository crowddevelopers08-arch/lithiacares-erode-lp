'use client';
import { useState, useRef } from 'react';
import { WaveText } from '@/components/WaveText';

const HERO_VIDEO_URL =
  'https://res.cloudinary.com/dthj7fakc/video/upload/v1781258221/lathia-vi-1_dktwbi.mp4';

export function HeroSection() {
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    const next = !muted;
    if (mobileVideoRef.current) mobileVideoRef.current.muted = next;
    if (desktopVideoRef.current) desktopVideoRef.current.muted = next;
    setMuted(next);
  };

  const togglePlay = () => {
    const next = !playing;
    if (next) {
      mobileVideoRef.current?.play();
      desktopVideoRef.current?.play();
    } else {
      mobileVideoRef.current?.pause();
      desktopVideoRef.current?.pause();
    }
    setPlaying(next);
  };

  const VideoControls = () => (
    <div className="absolute bottom-3 right-3 z-10 flex gap-2">
      <button
        onClick={togglePlay}
        aria-label={playing ? 'Pause video' : 'Play video'}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70"
      >
        <span className="material-symbols-outlined text-[20px]">
          {playing ? 'pause' : 'play_arrow'}
        </span>
      </button>
      <button
        onClick={toggleMute}
        aria-label={muted ? 'Unmute video' : 'Mute video'}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70"
      >
        <span className="material-symbols-outlined text-[20px]">
          {muted ? 'volume_off' : 'volume_up'}
        </span>
      </button>
    </div>
  );

  return (
    <section
      id="services"
      className="relative overflow-hidden px-4 pb-8 pt-10 sm:px-6 md:px-[80px] md:pb-24 md:pt-16 lg:pb-16 lg:pt-10 xl:pb-20 xl:pt-12"
    >
      {/* Mobile background (portrait) */}
      <div
        className="absolute inset-0 md:hidden"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/djzexkvyv/image/upload/v1779346395/bgmobthis_c4hunu.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
        }}
      />
      {/* Desktop background (landscape) */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/djzexkvyv/image/upload/v1779346395/bgthia_edzoyj.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-[1] mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">

        {/* Left column */}
        <div className="flex flex-col items-center text-center space-y-4 md:items-start md:text-left md:space-y-6">
          <span className="hero-anim-label text-[12px] font-semibold uppercase tracking-[0.08em] text-[#492e3b]">
            Book your appointments at
          </span>
          <h1 className="hero-anim-title font-display text-[28px] font-medium leading-[1.2] text-[#1a1c1b] sm:text-[36px] md:text-[52px] md:font-semibold md:leading-[1.1] md:tracking-[-0.02em] lg:text-[64px]">
            Best Skin Clinic in Erode
          </h1>
          <p className="hero-anim-desc mx-auto max-w-lg text-[16px] font-normal leading-[1.6] text-[#4e4448] md:mx-0 md:text-[18px]">
            we provide quality skin treatments at affordable prices without compromising on care and safety.
          </p>

          {/* Video — mobile only */}
          <div className="hero-anim-video md:hidden w-full">
            <div className="relative w-full aspect-[9/16] overflow-hidden rounded-2xl bg-black shadow-2xl">
              <video
                ref={mobileVideoRef}
                src={HERO_VIDEO_URL}
                autoPlay
                loop
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <VideoControls />
            </div>
          </div>

          <div className="hero-anim-badges flex flex-wrap justify-center gap-3 pt-2 md:justify-start md:gap-4 md:pt-4">
            {[
              ['verified_user', 'US FDA Machines'],
              ['health_and_safety', '100% Safe'],
              ['groups', '1,00,000+ Happy Clients'],
            ].map(([icon, label]) => (
              <div key={label} className="glass-card flex items-center gap-2 rounded-[0.5rem] p-2.5 md:p-3">
                <span
                  className="material-symbols-outlined text-[20px] text-[#71594e] md:text-[24px]"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  {icon}
                </span>
                <span className="text-[11px] font-semibold leading-[1] tracking-[0.08em] md:text-[12px]">
                  {label}
                </span>
              </div>
            ))}
          </div>
          <div className="hero-anim-ctas flex flex-wrap justify-center gap-3 pt-2 md:justify-start">
            <a
              href="#consultation"
              className="btn-primary inline-flex items-center justify-center rounded-[0.5rem] bg-[#492e3b] px-6 py-3 text-[12px] font-semibold tracking-[0.08em] text-white hover:bg-[#492e3be6]"
            >
              <WaveText>BOOK YOUR APPOINTMENT</WaveText>
            </a>
            <a
              href="tel:+919342369259"
              className="btn-outline flex items-center gap-2 rounded-[0.5rem] border border-[#492e3b4d] px-6 py-3 text-[12px] font-semibold tracking-[0.08em] text-[#492e3b] hover:bg-[#492e3b0d]"
            >
              <span className="material-symbols-outlined text-sm">call</span>
              <WaveText>CALL NOW</WaveText>
            </a>
          </div>
        </div>

        {/* Right column – video (desktop only) */}
        <div className="hero-anim-video group relative hidden md:flex md:items-center md:justify-center">
          <div className="relative mx-auto w-[320px] overflow-hidden rounded-[1.5rem] border-4 border-white bg-black shadow-2xl" style={{ height: '560px' }}>
            <video
              ref={desktopVideoRef}
              src={HERO_VIDEO_URL}
              autoPlay
              loop
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            <VideoControls />
          </div>
        </div>

      </div>
    </section>
  );
}
