'use client';
import Image from 'next/image';
import { useRef, useState, useEffect, useCallback } from 'react';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';

const treatments = [
  {
    number: '01',
    name: 'Laser Hair Reduction',
    description:
      'Reduce unwanted hair on the face, underarms, hands, legs, and body with Laser Hair Reduction in Erode. A clinic-based LHR treatment helps reduce frequent threading, waxing, shaving, razor bumps, and grooming discomfort with a doctor-guided session plan.',
    image: 'https://res.cloudinary.com/djzexkvyv/image/upload/v1779521620/laser-hair-removal_oii7ea.webp',
  },
  {
    number: '02',
    name: 'Glutathione IV',
    description:
      'Glutathione IV treatment in Erode is designed for people looking for brighter-looking, fresher, and more even-toned skin. At Le Thia Cares, the treatment is planned after skin assessment to support skin radiance, glow, and overall skin quality.',
    image: 'https://res.cloudinary.com/djzexkvyv/image/upload/v1779521620/Skin_whitening_pgtbvh.webp',
  },
  {
    number: '03',
    name: 'Chemical Peel Treatment',
    description:
      'Improve dull skin, tanning, pigmentation, acne marks, uneven skin tone, and rough texture with Chemical Peel Treatment in Erode. The peel type is selected based on your skin concern, helping support clearer, smoother, and more refreshed-looking skin.',
    image: 'https://res.cloudinary.com/djzexkvyv/image/upload/v1779521620/Chemical-Peel_hwqdai.jpg',
  },
  {
    number: '04',
    name: 'Carbon Laser Facial',
    description:
      'Carbon Laser Facial in Erode is a popular skin rejuvenation treatment for oily skin, dullness, open pores, tanning, and uneven texture. It helps refresh the skin, improve clarity, and support a cleaner, smoother appearance with clinic-based laser care.',
    image: 'https://res.cloudinary.com/djzexkvyv/image/upload/v1779521620/Laser-Carbon-Peel_fgal94.webp',
  },
  {
    number: '05',
    name: 'HydraFacial',
    description:
      'Get deep cleansing, hydration, and instant freshness with HydraFacial in Erode. This treatment is suitable for dull, tired, dehydrated, and congested skin, helping improve glow, skin freshness, and smoothness before events or as regular skin maintenance.',
    image: 'https://res.cloudinary.com/djzexkvyv/image/upload/v1779521620/Hydra-Facial-Price-in-India_mwsrxf.jpg',
  },
  {
    number: '06',
    name: 'Skin Whitening / Skin Brightening Treatment',
    description:
      'For dull skin, uneven tone, tanning, pigmentation, and lack of glow, Skin Whitening and Skin Brightening Treatment in Erode helps support a clearer, brighter-looking complexion. The treatment plan is customized after skin analysis for safer and more suitable results.',
    image: 'https://res.cloudinary.com/djzexkvyv/image/upload/v1779521620/skin-whitening_nu1tab.webp',
  },
    {
    number: '07',
    name: 'GFC Hair Treatment',
    description:
      'GFC Hair Treatment is a doctor-guided hair restoration therapy designed to support hair growth, improve hair density, and reduce hair fall in suitable candidates. It is recommended after scalp analysis to understand your hair fall stage and create a personalized treatment plan.',
    image: 'https://res.cloudinary.com/djzexkvyv/image/upload/v1781333037/gfc_fy0viw.jpg',
  },
  {
    number: '08',
    name: 'Hair Regrowth Therapy',
    description:
      'Hair Regrowth Therapy helps people dealing with hair fall, thinning hair, low hair density, and early-stage baldness. At the clinic, the treatment plan is suggested after proper scalp evaluation, helping you choose the right option instead of trying random products or home remedies.',
    image: 'https://res.cloudinary.com/djzexkvyv/image/upload/v1781333038/hairregrowth_gmsuvr.jpg',
  },
   {
    number: '09',
    name: 'Dandruff Treatment for Itchy Scalp',
    description:
      'Dandruff treatment helps manage scalp flaking, itching, dryness, oiliness, and recurring scalp irritation. A doctor-guided scalp check helps identify the cause of dandruff and suggests a suitable treatment plan for a cleaner, healthier scalp.',
    image: 'https://res.cloudinary.com/djzexkvyv/image/upload/v1781333040/Dandruff-and-Itchy-Scalp_vukrqf.png',
  },
];

function TreatmentCard({ t }: { t: typeof treatments[0] }) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-[0.75rem] border border-[#d2c3c74d] bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative h-[200px] w-full overflow-hidden">
        <Image
          src={t.image}
          alt={t.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold tracking-[0.1em] text-[#492e3b]">
          {t.number}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <h3 className="mb-3 font-display text-[16px] font-medium leading-[1.4] text-[#1a1c1b] md:text-[17px]">
          {t.name}
        </h3>
        <p className="flex-1 text-[13px] leading-[1.7] text-[#4e4448]">
          {t.description}
        </p>
        <div className="mt-5 border-t border-[#d2c3c74d] pt-5">
          <a
            href="#consultation"
            className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#492e3b] transition-opacity hover:opacity-70"
          >
            Book Consultation →
          </a>
        </div>
      </div>
    </div>
  );
}

export function TreatmentsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollTo = useCallback((index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.offsetWidth;
    el.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
    setActiveIndex(index);
  }, []);

  const prev = () => scrollTo(Math.max(activeIndex - 1, 0));
  const next = () => scrollTo(Math.min(activeIndex + 1, treatments.length - 1));

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const cardWidth = el.offsetWidth;
      if (cardWidth > 0)
        setActiveIndex(Math.round(el.scrollLeft / cardWidth));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  // Auto-advance every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => {
        const next = current < treatments.length - 1 ? current + 1 : 0;
        const el = scrollRef.current;
        if (el) el.scrollTo({ left: el.offsetWidth * next, behavior: 'smooth' });
        return next;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-[#fdf6f0] py-12 md:px-[80px] md:py-16 lg:py-20">
      <AnimateOnScroll animation="fade-up" className="mx-auto max-w-[1280px]">

        {/* Header — centered */}
        <div className="mb-10 px-4 text-center sm:px-6 md:mb-14">
          <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#492e3b]">
            Treatments
          </span>
          <h2 className="mt-3 font-display text-[24px] font-medium leading-[1.3] text-[#1a1c1b] md:text-[32px] lg:text-[40px]">
            Advanced Skin Treatments in Erode
          </h2>
        </div>

        {/* ── Mobile carousel ── */}
        <div className="sm:hidden">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-hide"
            style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
          >
            {treatments.map((t) => (
              <div
                key={t.number}
                className="w-full flex-shrink-0 px-4"
                style={{ scrollSnapAlign: 'start' }}
              >
                <TreatmentCard t={t} />
              </div>
            ))}
          </div>

          {/* Controls: prev · dots · next */}
          <div className="mt-6 flex items-center justify-center gap-4 px-4">
            {/* Prev */}
            <button
              onClick={prev}
              disabled={activeIndex === 0}
              aria-label="Previous treatment"
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-[#492e3b] text-[#492e3b] transition-all disabled:opacity-30 hover:bg-[#492e3b] hover:text-white"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {treatments.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  aria-label={`Go to treatment ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeIndex === i ? 'w-6 bg-[#492e3b]' : 'w-2 bg-[#492e3b40]'
                  }`}
                />
              ))}
            </div>

            {/* Next */}
            <button
              onClick={next}
              disabled={activeIndex === treatments.length - 1}
              aria-label="Next treatment"
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-[#492e3b] text-[#492e3b] transition-all disabled:opacity-30 hover:bg-[#492e3b] hover:text-white"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Desktop grid ── */}
        <div className="hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {treatments.map((t) => (
            <AnimateOnScroll key={t.number} animation="fade-up">
              <TreatmentCard t={t} />
            </AnimateOnScroll>
          ))}
        </div>

      </AnimateOnScroll>
    </section>
  );
}
