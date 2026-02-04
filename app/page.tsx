import { FeatureSection } from "@/components/landing-page/feature-section";
import { HeroSection } from "@/components/landing-page/hero-section";
import { NavBar } from "@/components/landing-page/nav-bar";
import { Steps } from "@/components/landing-page/steps";
import { CTASection } from "@/components/landing-page/cta-section";
import { FAQSection } from "@/components/landing-page/faq-section";
import { Footer } from "@/components/landing-page/footer";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-background ">
      <NavBar />
      <main className="mb-0">
        <HeroSection />
        <FeatureSection />
        <Steps />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
