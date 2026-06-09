'use client';
import { useState } from 'react';
import { WaveText } from '@/components/WaveText';

const navLinks = [
  { label: 'Treatments', href: '#services-offers' },
  { label: 'Results',    href: '#showcase' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Reviews',   href: '#reviews' },
  { label: 'FAQ',       href: '#faq' },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-[#d2c3c74d] bg-[#faf9f7f2] shadow-sm backdrop-blur-sm transition-all duration-300">
      <nav className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-4 py-4 sm:px-6 md:px-[80px] md:py-5">
        <div className="flex items-center gap-3">
          <img
            alt="Le Thia Cares Logo"
            className="h-12 w-auto object-contain md:h-14"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDULIs-D-ozw3cg59e8NKcZgP0C881paksA5k47FsOo62Tk72Ypf-eio4E5T74wI_YC8dzsLzv-Y1aWbCFh3g9iyEDYkZn8_Ww13KuqSH7lh1Hk7vLV-N5V5M0dqMu5kq8LoOReSG7LdVN8YjETzcY6dIK_KcxI0sFMRUBPrlvdSq5rpnlQ0sSt-IMWysouG-pMsUyXi5kr3vzLc1Xmke-OS-mqw3BEzj-MBZBYtHmtag2yqU8P1U-scdpDtndb4nyImNF9Yo2NGKfo"
          />
        </div>

        {/* Desktop nav links */}
        <div className="hidden gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              className="relative py-2 text-[12px] font-semibold tracking-[0.08em] text-[#71594e] transition-colors duration-300 hover:text-[#492e3b]"
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA buttons + hamburger */}
        <div className="flex items-center gap-2 sm:gap-4 md:gap-5">
          <a
            href="tel:+919342369259"
            className="btn-outline hidden items-center gap-2 rounded-[0.5rem] border border-[#492e3b4d] px-4 py-2 text-[11px] font-semibold tracking-[0.08em] text-[#492e3b] hover:bg-[#492e3b0d] sm:flex md:px-6 md:py-2.5 md:text-[12px]"
          >
            <span className="material-symbols-outlined text-sm">call</span>
            <WaveText>CALL NOW</WaveText>
          </a>
          <a
            href="#consultation"
            className="btn-primary rounded-[0.5rem] bg-[#492e3b] px-3 py-2 text-[10px] font-semibold tracking-[0.06em] text-white hover:bg-[#492e3be6] sm:px-5 sm:py-2.5 sm:text-[11px] sm:tracking-[0.08em] md:px-8 md:py-3 md:text-[12px]"
          >
            <WaveText>BOOK APPOINTMENT</WaveText>
          </a>
          {/* Hamburger – visible below lg */}
          <button
            className="flex h-8 w-8 items-center justify-center rounded-md text-[#492e3b] transition-colors hover:bg-[#492e3b0d] lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-[22px]">
              {menuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="border-t border-[#d2c3c74d] bg-[#faf9f7] px-4 pb-4 pt-2 sm:px-6 lg:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block rounded-md px-3 py-2.5 text-[14px] font-semibold tracking-[0.06em] text-[#71594e] transition-colors hover:bg-[#492e3b0d] hover:text-[#492e3b]"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:+919342369259"
              className="mt-1 flex items-center gap-2 rounded-md px-3 py-2.5 text-[14px] font-semibold tracking-[0.06em] text-[#492e3b] hover:bg-[#492e3b0d]"
              onClick={() => setMenuOpen(false)}
            >
              <span className="material-symbols-outlined text-base">call</span>
              CALL NOW
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
