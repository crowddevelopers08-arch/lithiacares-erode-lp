'use client';
import Image from 'next/image';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { WaveText } from '@/components/WaveText';
import { useState, useEffect, useRef } from 'react';

const offerImages = [
  { src: 'https://res.cloudinary.com/duq66ybkd/image/upload/v1780991182/erodeoffer1_mwjyxq.png', alt: 'Erode Offer 1' },
  { src: 'https://res.cloudinary.com/duq66ybkd/image/upload/v1780991182/erodeoffer2_t0wn5n.png', alt: 'Erode Offer 2' },
  { src: 'https://res.cloudinary.com/duq66ybkd/image/upload/v1780991182/erodeoffer3_rigwgw.png', alt: 'Erode Offer 3' },
];

const SIX_DAYS_MS = 6 * 24 * 60 * 60 * 1000;
const REFERENCE = new Date('2026-01-01T00:00:00').getTime();

function getRollingTarget() {
  const now = Date.now();
  const elapsed = now - REFERENCE;
  const cycle = Math.floor(elapsed / SIX_DAYS_MS);
  return new Date(REFERENCE + (cycle + 1) * SIX_DAYS_MS);
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

const OFFER_WORDS = ['🔥', 'Offer', 'Ends', 'Soon!'];

const FIRE_CSS = `
  @keyframes pulse-fire {
    0%, 100% { box-shadow: 0 0 10px 2px #ff6b0066, 0 4px 24px #ff450044; }
    50%       { box-shadow: 0 0 28px 8px #ff6b0099, 0 4px 40px #ff450077; }
  }
  @keyframes ember {
    0%   { transform: translateY(0) translateX(0) scale(1);   opacity: 0.9; }
    60%  { opacity: 0.6; }
    100% { transform: translateY(-180px) translateX(var(--dx)) scale(0.2); opacity: 0; }
  }
  @keyframes shimmer-fire {
    0%   { transform: translateX(-120%) skewX(-18deg); opacity: 0; }
    15%  { opacity: 1; }
    85%  { opacity: 1; }
    100% { transform: translateX(320%) skewX(-18deg); opacity: 0; }
  }
  @keyframes border-fire {
    0%, 100% { opacity: 0.5; }
    50%       { opacity: 1; }
  }
  @keyframes dot-fire {
    0%, 100% { opacity: 0.3; transform: scale(0.8); }
    50%       { opacity: 1;   transform: scale(1.2); }
  }
  @keyframes digit-flip {
    0%   { transform: translateY(-100%); opacity: 0; }
    100% { transform: translateY(0);     opacity: 1; }
  }
  .offer-badge-fire { animation: pulse-fire 1.8s ease-in-out infinite; }
  .cinema-shimmer-fire { animation: shimmer-fire 1.1s ease-in-out forwards; }
`;

const EMBERS = [
  { left: '8%',  delay: '0s',    dur: '3.2s', dx: '12px',  size: 5, color: '#ff6b00' },
  { left: '18%', delay: '0.7s',  dur: '2.8s', dx: '-8px',  size: 4, color: '#ffaa00' },
  { left: '30%', delay: '1.4s',  dur: '3.6s', dx: '18px',  size: 6, color: '#ff4500' },
  { left: '45%', delay: '0.3s',  dur: '2.5s', dx: '-14px', size: 3, color: '#ffcc00' },
  { left: '58%', delay: '1.1s',  dur: '3.9s', dx: '10px',  size: 5, color: '#ff6b00' },
  { left: '70%', delay: '0.5s',  dur: '2.9s', dx: '-18px', size: 4, color: '#ffaa00' },
  { left: '82%', delay: '1.8s',  dur: '3.3s', dx: '8px',   size: 6, color: '#ff4500' },
  { left: '92%', delay: '0.9s',  dur: '2.6s', dx: '-10px', size: 3, color: '#ffcc00' },
];

function OfferLabel() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount < OFFER_WORDS.length) {
      const t = setTimeout(() => setVisibleCount(c => c + 1), 340);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setVisibleCount(0), 1600);
    return () => clearTimeout(t);
  }, [visibleCount]);

  return (
    <div
      className="offer-badge-fire flex items-center gap-2 sm:gap-3 rounded-full px-5 py-2.5 sm:px-7 sm:py-3"
      style={{ background: 'linear-gradient(135deg, #b31000 0%, #ff6b00 60%, #ffaa00 100%)' }}
    >
      {OFFER_WORDS.map((word, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            opacity: i < visibleCount ? 1 : 0,
            transform: i < visibleCount ? 'translateY(0px) scale(1)' : 'translateY(12px) scale(0.8)',
            transition: 'opacity 0.35s cubic-bezier(0.34,1.56,0.64,1), transform 0.35s cubic-bezier(0.34,1.56,0.64,1)',
            fontSize: i === 0 ? '22px' : undefined,
          }}
          className={
            i === 0
              ? 'leading-none'
              : 'text-[15px] sm:text-[17px] font-extrabold tracking-[0.14em] text-white uppercase drop-shadow-sm'
          }
        >
          {word}
        </span>
      ))}
    </div>
  );
}

function CountdownTimer() {
  const target = useRef(getRollingTarget());
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    function calc() {
      const now = Date.now();
      if (now >= target.current.getTime()) target.current = getRollingTarget();
      const diff = target.current.getTime() - now;
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTimeLeft({
        days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: 'Days',  value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Mins',  value: timeLeft.minutes },
    { label: 'Secs',  value: timeLeft.seconds },
  ];

  return (
    <div className="mb-8 md:mb-10 lg:mb-14 flex flex-col items-center gap-4">
      <OfferLabel />
      <div className="flex items-center gap-2 sm:gap-3">
        {units.map((u, i) => (
          <div key={u.label} className="flex items-center gap-2 sm:gap-3">
            <div className="flex flex-col items-center">
              <div
                className="w-14 sm:w-16 md:w-[72px] rounded-lg py-2 sm:py-3 text-center"
                style={{
                  background: 'linear-gradient(135deg, #b31000, #ff4500)',
                  boxShadow: '0 0 18px 4px rgba(255,100,0,0.5), 0 4px 16px rgba(180,30,0,0.4)',
                }}
              >
                <span className="block text-xl sm:text-2xl md:text-3xl font-bold tabular-nums text-white leading-none"
                  style={{ textShadow: '0 0 10px rgba(255,200,0,0.8)' }}>
                  {pad(u.value)}
                </span>
              </div>
              <span className="mt-1 text-[10px] sm:text-[11px] font-semibold tracking-[0.08em] text-[#ffaa66] uppercase">
                {u.label}
              </span>
            </div>
            {i < units.length - 1 && (
              <span className="mb-4 text-xl sm:text-2xl font-bold" style={{ color: '#ff6b00', textShadow: '0 0 8px #ff6b00' }}>:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function OfferCardsGrid() {
  const [activeCard, setActiveCard] = useState(0);
  const [shimmerKey, setShimmerKey] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function startAutoPlay() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveCard(prev => (prev + 1) % offerImages.length);
      setShimmerKey(k => k + 1);
    }, 3000);
  }

  useEffect(() => {
    startAutoPlay();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleManualNav(index: number) {
    setActiveCard(index);
    setShimmerKey(k => k + 1);
    startAutoPlay(); // reset timer on manual interaction
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    touchStartX.current = null;
    if (Math.abs(diff) < 40) return; // ignore tiny taps
    if (diff > 0) {
      handleManualNav((activeCard + 1) % offerImages.length);   // swipe left → next
    } else {
      handleManualNav((activeCard - 1 + offerImages.length) % offerImages.length); // swipe right → prev
    }
  }

  return (
    <div className="mx-auto mb-8 max-w-[960px] md:mb-10 lg:mb-14">

      {/* ── Mobile carousel (hidden on sm+) ── */}
      <div className="sm:hidden px-4">
        <div
          className="relative overflow-hidden rounded-xl"
          style={{
            boxShadow: '0 0 0 2.5px #ff6b00, 0 0 20px 6px rgba(255,107,0,0.55), 0 0 40px 10px rgba(255,69,0,0.3)',
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Shimmer sweep on the visible frame */}
          <div
            key={shimmerKey}
            className="cinema-shimmer-fire pointer-events-none absolute inset-0 z-10"
            style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,160,60,0.35) 50%, transparent 70%)' }}
          />

          {/* Sliding track */}
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeCard * 100}%)` }}
          >
            {offerImages.map((img, index) => (
              <div key={index} className="min-w-full">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={600}
                  className="h-auto w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dot / pill indicators */}
        <div className="mt-4 flex justify-center gap-2">
          {offerImages.map((_, di) => (
            <button
              key={di}
              onClick={() => handleManualNav(di)}
              aria-label={`Go to slide ${di + 1}`}
              style={{
                width: di === activeCard ? 22 : 8,
                height: 8,
                borderRadius: 4,
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                background: di === activeCard ? '#ff6b00' : 'rgba(255,255,255,0.25)',
                boxShadow: di === activeCard ? '0 0 6px 2px #ff6b00' : 'none',
                transition: 'all 0.35s ease',
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Desktop 3-col grid (hidden below sm) ── */}
      <div className="hidden sm:grid grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {offerImages.map((img, index) => {
          const isActive = index === activeCard;
          return (
            <div
              key={index}
              style={{
                position: 'relative',
                borderRadius: '0.75rem',
                overflow: 'hidden',
                transform: isActive ? 'scale(1.06)' : 'scale(1)',
                filter: isActive ? 'brightness(1.15)' : 'brightness(1)',
                transition: 'transform 0.5s cubic-bezier(0.34,1.28,0.64,1), filter 0.5s ease, box-shadow 0.5s ease',
                zIndex: isActive ? 2 : 1,
                boxShadow: isActive
                  ? '0 0 0 2.5px #ff6b00, 0 0 20px 6px rgba(255,107,0,0.55), 0 0 40px 10px rgba(255,69,0,0.3)'
                  : '0 0 0 2.5px transparent',
              }}
            >
              {isActive && (
                <div
                  key={shimmerKey}
                  className="cinema-shimmer-fire"
                  style={{
                    position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none',
                    background: 'linear-gradient(105deg, transparent 30%, rgba(255,160,60,0.35) 50%, transparent 70%)',
                  }}
                />
              )}
              <div style={{
                position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
                display: 'flex', gap: 5, zIndex: 20, pointerEvents: 'none',
              }}>
                {offerImages.map((_, di) => (
                  <span key={di} style={{
                    display: 'block', width: 6, height: 6, borderRadius: '50%',
                    background: di === activeCard ? '#ff6b00' : 'rgba(255,255,255,0.4)',
                    boxShadow: di === activeCard ? '0 0 6px 2px #ff6b00' : 'none',
                    animation: di === activeCard ? 'dot-fire 1s ease-in-out infinite' : 'none',
                    transition: 'background 0.4s ease',
                  }} />
                ))}
              </div>
              <Image src={img.src} alt={img.alt} width={600} height={600} className="h-auto w-full object-cover" />
            </div>
          );
        })}
      </div>

    </div>
  );
}

export function OffersSection() {
  return (
    <section
      id="services-offers"
      className="relative overflow-hidden px-4 py-10 sm:px-6 md:px-[80px] md:py-14 lg:py-20 xl:py-24"
      style={{ background: 'linear-gradient(180deg, #0e0608 0%, #1e0c0e 50%, #150709 100%)' }}
    >
      <style>{FIRE_CSS}</style>

      {/* Floating ember particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {EMBERS.map((e, i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              bottom: '5%',
              left: e.left,
              width: e.size,
              height: e.size,
              borderRadius: '50%',
              background: e.color,
              boxShadow: `0 0 ${e.size * 2}px ${e.color}`,
              ['--dx' as string]: e.dx,
              animation: `ember ${e.dur} ${e.delay} ease-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Fire glow at bottom edge */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32" style={{
        background: 'linear-gradient(to top, rgba(180,40,0,0.25) 0%, transparent 100%)',
      }} aria-hidden />

      <AnimateOnScroll animation="fade-down" className="mx-auto mb-8 max-w-[1280px] text-center md:mb-10">
        <h2
          className="font-display text-[28px] font-medium leading-[1.2] sm:text-[32px] md:text-[40px] lg:text-[48px]"
          style={{
            background: 'linear-gradient(135deg, #ff6b00 0%, #ffcc00 40%, #ff4500 70%, #ff9500 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 18px rgba(255,100,0,0.5))',
          }}
        >
          Exclusive Treatment Packages
        </h2>
      </AnimateOnScroll>

      <div className="mx-auto max-w-[1280px] flex justify-center">
        <CountdownTimer />
      </div>

      <AnimateOnScroll animation="fade-up" delay={150}>
        <OfferCardsGrid />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" delay={300} className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
        <a href="#consultation" className="btn-primary w-full rounded-[0.5rem] px-10 py-4 text-center text-[12px] font-semibold tracking-[0.08em] text-white sm:w-auto"
          style={{ background: 'linear-gradient(135deg, #b31000, #ff4500)', boxShadow: '0 4px 20px rgba(255,69,0,0.5)' }}>
          <WaveText>BOOK YOUR APPOINTMENT</WaveText>
        </a>
        <a href="tel:+919342369259" className="btn-outline flex w-full items-center justify-center gap-2 rounded-[0.5rem] border-2 px-10 py-4 text-[12px] font-semibold tracking-[0.08em] sm:w-auto"
          style={{ borderColor: '#ff6b00', color: '#ff9955' }}>
          <span className="material-symbols-outlined text-sm">call</span>
          <WaveText>CALL NOW</WaveText>
        </a>
      </AnimateOnScroll>

    </section>
  );
}
