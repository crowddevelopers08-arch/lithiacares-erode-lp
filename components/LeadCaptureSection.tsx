'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { WaveText } from '@/components/WaveText';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';

const fields = [
  { key: 'name',     label: 'NAME',     placeholder: 'Your full name',   type: 'text', required: true  },
  { key: 'phone',    label: 'NUMBER',   placeholder: '+91 00000 00000',  type: 'tel',  required: true  },
  { key: 'location', label: 'LOCATION', placeholder: 'Preferred location', type: 'text', required: false },
] as const;

const SKIN_CONCERNS = [
  'Acne',
  'Acne Scar',
  'Pigmentation',
  'Melasma',
  'Body Hair',
  'Hair fall',
];

function isValidIndianPhone(raw: string) {
  const cleaned = raw.replace(/[\s\-\(\)]/g, '').replace(/^\+91/, '');
  return /^[6-9]\d{9}$/.test(cleaned);
}

export function LeadCaptureSection() {
  const router = useRouter();
  const [form, setForm]       = useState({ name: '', phone: '', location: '', skinConcern: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim())  { setError('Please enter your name.');         return; }
    if (!form.phone.trim()) { setError('Please enter your phone number.'); return; }
    if (!isValidIndianPhone(form.phone)) {
      setError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, treatment: form.skinConcern, pageUrl: window.location.href }),
      });
      router.push('/thank-you');
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <section
      id="consultation"
      className="bg-[#f4f3f1] px-4 pb-4 pt-10 sm:px-6 md:px-[80px] md:pb-6 md:pt-14 max-[470px]:pb-0 lg:pb-8 lg:pt-20 xl:pb-10 xl:pt-24"
    >
      <AnimateOnScroll
        animation="fade-up"
        className="glass-card mx-auto max-w-[1280px] rounded-[0.5rem] border border-[#d2c3c74d] p-6 shadow-sm sm:p-8 md:p-12 lg:p-16"
      >
        <div className="mb-8 text-center md:mb-10">
          <h2 className="font-display text-[24px] font-medium leading-[1.3] text-[#1a1c1b] md:text-[28px] lg:text-[34px]">
            Schedule Your Consultation
          </h2>
          <p className="mt-2 text-[15px] font-normal leading-[1.6] text-[#4e4448] md:text-[16px]">
            Start your journey to luminous skin today with Le Thia Cares.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 md:gap-8">
            {fields.map(({ key, label, placeholder, type, required }) => (
              <div key={key} className="flex flex-col space-y-2">
                <label className="text-[12px] font-semibold leading-[1] tracking-[0.08em] text-[#4e4448]">
                  {label}
                  {required && <span className="ml-1 text-[#492e3b]">*</span>}
                </label>
                <input
                  className="border-b-2 border-[#d2c3c7] bg-transparent px-1 py-3 text-[16px] font-normal leading-[1.6] text-[#1a1c1b] outline-none transition-all placeholder:text-[#80747880] focus:border-[#492e3b]"
                  placeholder={placeholder}
                  type={type}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  required={required}
                />
              </div>
            ))}

            {/* Skin Concern */}
            <div className="flex flex-col space-y-2">
              <label className="text-[12px] font-semibold leading-[1] tracking-[0.08em] text-[#4e4448]">
                SKIN CONCERN
              </label>
              <div className="relative">
                <select
                  value={form.skinConcern}
                  onChange={(e) => setForm({ ...form, skinConcern: e.target.value })}
                  className="w-full appearance-none border-b-2 border-[#d2c3c7] bg-transparent px-1 py-3 text-[16px] font-normal leading-[1.6] text-[#1a1c1b] outline-none transition-all focus:border-[#492e3b]"
                  style={{ color: form.skinConcern ? '#1a1c1b' : '#80747880' }}
                >
                  <option value="" disabled hidden style={{ color: '#1a1c1b' }}>Select concern</option>
                  {SKIN_CONCERNS.map((c) => (
                    <option key={c} value={c} style={{ color: '#1a1c1b' }}>{c}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-[#492e3b] text-[10px]">▼</span>
              </div>
            </div>
          </div>

          {error && (
            <p className="mt-4 text-center text-[13px] font-semibold text-red-600">{error}</p>
          )}

          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary rounded-[0.5rem] bg-[#492e3b] px-10 py-4 text-[12px] font-semibold tracking-[0.08em] text-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'SUBMITTING…' : <WaveText>BOOK YOUR APPOINTMENT</WaveText>}
            </button>
          </div>
        </form>
      </AnimateOnScroll>
    </section>
  );
}
