'use client';
import { useState } from 'react';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { WaveText } from '@/components/WaveText';

const faqItems = [
  {
    question: 'Which skin treatment is best for dull and tired-looking skin?',
    answer:
      'If your skin looks dull, dry, or tired even after regular skincare, treatments like HydraFacial, skin glow treatment, chemical peel, or skin rejuvenation treatment may help. At our skin clinic, the treatment is suggested after checking your skin type, concern, and sensitivity, so you get a proper glow plan instead of a random facial.',
  },
  {
    question: 'Can pigmentation and dark spots be reduced with skin treatments?',
    answer:
      'Yes, pigmentation treatment, chemical peels, laser toning, and skin brightening treatments can help improve the appearance of dark spots, tanning, patchy skin, and uneven skin tone. Pigmentation often comes back when treated only with creams, so a doctor-guided pigmentation correction plan is better for long-term skin improvement.',
  },
  {
    question: 'Is chemical peel good for acne marks and uneven skin tone?',
    answer:
      'A chemical peel treatment can help with acne marks, mild pigmentation, tanning, rough texture, and uneven skin tone. Many people try home remedies or parlour facials first, but acne marks often need a clinic-based approach. The peel type should be selected based on your skin concern, not used randomly.',
  },
  {
    question: 'What is the best skin treatment before a wedding or function?',
    answer:
      'For brides, grooms, and event-ready skin, a bridal glow treatment, HydraFacial, chemical peel, tan removal treatment, or skin brightening treatment can be planned based on the event date. It is better to start your pre-wedding skin treatment at least 30–60 days before the function for a safer and more planned skin prep.',
  },
  {
    question: 'How do I know which skin treatment is suitable for me?',
    answer:
      'The right skin treatment depends on your concern—pigmentation, acne marks, dull skin, tanning, open pores, facial hair, or uneven texture. A proper skin analysis at a skin clinic near you helps identify whether you need a chemical peel, HydraFacial, LHR, glutathione, or a customized skin correction plan.',
  },
  {
    question: 'Can laser hair reduction help reduce repeated threading and waxing?',
    answer:
      'Yes, laser hair reduction treatment can help reduce the need for repeated threading, waxing, and shaving. It is commonly preferred for facial hair, underarms, hands, legs, and full-body grooming. If you are facing razor bumps, skin irritation, or last-minute grooming stress, LHR treatment at a skin clinic can be a practical option.',
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-[#faf9f7] px-4 py-10 sm:px-6 md:px-[80px] md:py-14 lg:py-20 xl:py-24">
      {/* ── Content ── */}
      <div className="mx-auto max-w-3xl">
        <AnimateOnScroll animation="fade-down">
          <h2 className="mb-8 text-center font-display text-[26px] font-medium leading-[1.2] text-[#1a1c1b] sm:text-[32px] md:mb-10 md:text-[40px] lg:text-[48px]">
            Frequently Asked Questions
          </h2>
        </AnimateOnScroll>

        <AnimateOnScroll animation="fade-up" delay={150}>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={item.question}
                className="border-b border-[#d2c3c7] py-3 md:py-4"
              >
                <button
                  className="group flex w-full items-start justify-between gap-4 text-left"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  aria-expanded={openIndex === index}
                >
                  <span className="text-[16px] font-bold leading-[1.5] text-[#1a1c1b] transition-colors group-hover:text-[#492e3b] md:text-[18px] md:leading-[1.6]">
                    {item.question}
                  </span>
                  <span
                    className="material-symbols-outlined flex-shrink-0 text-[#492e3b] transition-transform duration-300"
                    style={{ transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)' }}
                  >
                    add
                  </span>
                </button>
                {openIndex === index && (
                  <div className="mt-3 text-[15px] leading-[1.7] text-[#4e4448] md:mt-4 md:text-[16px]">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll animation="fade-up" delay={300} className="mt-10 flex justify-center md:mt-12 lg:mt-16">
          <a
            href="#consultation"
            className="btn-primary rounded-[0.5rem] bg-[#492e3b] px-10 py-4 text-[12px] font-semibold tracking-[0.08em] text-white hover:bg-[#492e3be6]"
          >
            <WaveText>BOOK YOUR APPOINTMENT</WaveText>
          </a>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
