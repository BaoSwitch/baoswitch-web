import { Hero } from "@/components/marketing/hero";
import { ServicesSection } from "@/components/marketing/services-section";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { WhyChooseUs } from "@/components/marketing/why-choose-us";
import { Testimonials } from "@/components/marketing/testimonials";
import { ProvidersMarquee } from "@/components/marketing/providers-marquee";
import { FaqSection } from "@/components/marketing/faq-section";
import { ClosingCta } from "@/components/marketing/closing-cta";

/** The LANDING PAGE frame, section for section. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <ProvidersMarquee />
      <FaqSection />
      <ClosingCta />
    </>
  );
}
