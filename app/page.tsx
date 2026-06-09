import { BeforeAfterSection } from '@/components/BeforeAfterSection';
import { FAQSection } from '@/components/FAQSection';
import { Footer } from '@/components/Footer';
import { GoogleReviewsSection } from '@/components/GoogleReviewsSection';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { LeadCaptureSection } from '@/components/LeadCaptureSection';
import { MapSection } from '@/components/MapSection';
import { OffersSection } from '@/components/OffersSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { TreatmentsSection } from '@/components/TreatmentsSection';

export default function Home() {
  return (
    <>
      <Header />
      <main className="mt-[70px] md:mt-20">
        <HeroSection />
        <LeadCaptureSection />
        <TreatmentsSection />
        <BeforeAfterSection />
        <OffersSection />
        <TestimonialsSection />
        <GoogleReviewsSection />
        <FAQSection />
        <MapSection />
      </main>
      <Footer />
    </>
  );
}
