'use client';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

const results = [
  {
    src: 'https://res.cloudinary.com/djzexkvyv/image/upload/v1779346399/Eye1_nuatbd.png',
    alt: 'Before and after pigmentation treatment result',
    imageClassName: 'object-cover object-center',
  },
  {
    src: 'https://res.cloudinary.com/djzexkvyv/image/upload/v1779346399/Eye2_qj1s4e.png',
    alt: 'Before and after skin brightening treatment result',
    imageClassName: 'object-cover object-center',
  },
  {
    src: 'https://res.cloudinary.com/djzexkvyv/image/upload/v1779346400/Eye3_jca6ik.png',
    alt: 'Before and after acne scar treatment side profile result',
    imageClassName: 'object-cover object-[center_38%]',
  },
  {
    src: 'https://res.cloudinary.com/djzexkvyv/image/upload/v1779346400/Eye4_ck61bm.png',
    alt: 'Before and after acne scar smoothing side profile result',
    imageClassName: 'object-cover object-[center_42%]',
  },
  {
    src: '/erblur.png',
    alt: 'Before and after face skin brightening treatment result',
    imageClassName: 'object-cover object-center',
  },
  {
    src: '/EyeBlurerode.png',
    alt: 'Before and after acne scar side profile treatment result',
    imageClassName: 'object-cover object-center',
  },
];

// Duplicate once → seamless loop: when first set scrolls out, second set is identical
const scrollItems = [...results, ...results];

// Track is 2× wider than the visible set (N images × 2 copies)
// 4 images visible at a time → track width = (totalItems / 4) × 100% of container
// = (12 / 4) × 100% = 300%
// translateX(-50%) moves by 150% of container = exactly 6 cards → back to start ✓
const TRACK_WIDTH_PERCENT = (scrollItems.length / 4) * 100; // 300
const CARD_WIDTH_PERCENT  = 100 / scrollItems.length;       // 8.333… of track = 25% of container

export function BeforeAfterSection() {
  /* ── mobile-only state ── */
  const [mobileCurrent, setMobileCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const timerRef    = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setMobileCurrent(c => (c + 1) % results.length);
    }, 3000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  const mobilePrev = () => { setMobileCurrent(c => (c - 1 + results.length) % results.length); startTimer(); };
  const mobileNext = () => { setMobileCurrent(c => (c + 1) % results.length);                  startTimer(); };

  return (
    <section id="showcase" className="bg-[#f4f3f1] px-4 py-10 sm:px-6 md:px-0 md:py-14 lg:py-20 xl:py-24">

      {/* ── Heading ── */}
      <AnimateOnScroll
        animation="fade-down"
        className="mx-auto mb-8 max-w-[1280px] px-4 text-center sm:px-6 md:px-[80px] md:mb-10 lg:mb-14"
      >
        <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#492e3b]">
          You can be next
        </span>
        <h2 className="mt-3 font-display text-[26px] font-medium leading-[1.2] text-[#1a1c1b] sm:text-[32px] md:text-[48px] md:font-semibold md:leading-[1.1] md:tracking-[-0.02em] lg:text-[64px]">
          Get Best Skin Treatments in Erode
        </h2>
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-in" delay={150}>

        {/* ══════════════════════════════
            MOBILE carousel  (< md)
        ══════════════════════════════ */}
        <div
          className="mx-auto max-w-[1400px] px-4 sm:px-6 md:hidden"
          onTouchStart={e => { touchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={e => {
            if (touchStartX.current === null) return;
            const diff = touchStartX.current - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 40) diff > 0 ? mobileNext() : mobilePrev();
            touchStartX.current = null;
          }}
        >
          <div className="overflow-hidden rounded-[0.75rem] bg-white shadow-xl">
            <div className="relative h-[320px] w-full overflow-hidden">
              <Image
                src={results[mobileCurrent].src}
                alt={results[mobileCurrent].alt}
                fill
                quality={100}
                sizes="100vw"
                className={results[mobileCurrent].imageClassName}
              />
            </div>
            <div className="px-3 py-3 text-center">
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#492e3b]">
                Result {mobileCurrent + 1}
              </span>
            </div>
          </div>

          {/* mobile controls */}
          <div className="mt-4 flex items-center justify-center gap-4">
            <button
              onClick={mobilePrev}
              className="btn-icon flex h-8 w-8 items-center justify-center rounded-full border border-[#492e3b] text-[#492e3b] hover:bg-[#492e3b] hover:text-white"
              aria-label="Previous result"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>

            <div className="flex gap-2">
              {results.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setMobileCurrent(i); startTimer(); }}
                  className={`h-2 rounded-full transition-all duration-300 ${i === mobileCurrent ? 'w-6 bg-[#492e3b]' : 'w-2 bg-[#c9b2ba]'}`}
                  aria-label={`Show result ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={mobileNext}
              className="btn-icon flex h-8 w-8 items-center justify-center rounded-full border border-[#492e3b] text-[#492e3b] hover:bg-[#492e3b] hover:text-white"
              aria-label="Next result"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>

        {/* ══════════════════════════════
            DESKTOP infinite scroll (≥ md)
            4 cards always visible, loops
            seamlessly with no empty space
        ══════════════════════════════ */}
        <div className="hidden overflow-hidden md:block">
          {/* scroll-track: pure CSS marquee, pauses on hover */}
          <div
            className="scroll-track flex"
            style={{ width: `${TRACK_WIDTH_PERCENT}%` }}
          >
            {scrollItems.map((result, i) => (
              <div
                key={i}
                className="flex-shrink-0 px-[6px]"
                style={{ width: `${CARD_WIDTH_PERCENT}%` }}
              >
                <div className="overflow-hidden rounded-[0.75rem] bg-white shadow-xl">
                  <div className="relative h-[240px] w-full overflow-hidden lg:h-[280px] xl:h-[320px]">
                    <Image
                      src={result.src}
                      alt={result.alt}
                      fill
                      quality={100}
                      sizes="(min-width: 1280px) 22vw, 24vw"
                      className={result.imageClassName}
                      priority={i < 4}
                    />
                  </div>
                  <div className="px-3 py-3 text-center">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#492e3b]">
                      Result {(i % results.length) + 1}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </AnimateOnScroll>
    </section>
  );
}
