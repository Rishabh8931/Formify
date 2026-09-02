import { Navbar } from "@/app/components/layout/Navbar";

import { Hero } from "@/app/components/hero/Hero";
import { ProductShowcase } from "./components/productShowcase/ProductShowcase";
import { SocialProof } from "./components/socialProoves/Socailproof";
import { ProblemSection } from "./components/problems/Problems";
import { BuildSection } from "./components/build/BuildSection";
import { ShareSection } from "./components/share/ShareSection";
import { UnderstandSection } from "./components/understand/UnderstandSection";
import { UseCases } from "./components/useCases/UseCasese";
import { PricingSection } from "./components/pricing/Pricing";
import { Footer } from "./components/footer/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen">
        <Hero />

        {/* Mix Hero → Product boundary */}
        <div
          className="
            pointer-events-none
            absolute inset-x-0 bottom-0
            h-40
            bg-gradient-to-b
            from-transparent
            via-primary/5
            to-surface-muted
          "
        />
      </section>

      {/* Product */}
      <section className="bg-surface-muted">
        <ProductShowcase />
      </section>

      {/* Social Proof */}
      <SocialProof />

      {/* Problem */}
      <ProblemSection />

      {/* Build */}
      <section className="relative bg-surface-muted">
        <BuildSection />

        {/* Mix Build → next section */}
        <div
          className="
            pointer-events-none
            absolute inset-x-0 bottom-0
            h-32
            bg-gradient-to-b
            from-transparent
            via-primary/5
            to-background
          "
        />
      </section>

      {/* Share */}
      <ShareSection />
      <UnderstandSection />
      <section className="relative bg-surface-muted">
        <UseCases />
        {/* Mix Build → Footer */}
        <div
          className="
            pointer-events-none
            absolute inset-x-0 bottom-0
            h-32
            bg-gradient-to-b
            from-transparent
            via-primary/5
            to-background
          "
        />
      </section>

      <PricingSection />

      {/* Footer */}
      <section className="relative bg-surface-muted">
        <Footer />
      </section>
    </main>
  );
}
