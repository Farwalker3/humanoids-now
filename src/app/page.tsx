'use client';

import { useEffect, useState } from 'react';
import { useMounted } from '@/hooks';
import { WaitlistModal } from '@/components/waitlist-modal';
import { PartnershipModal } from '@/components/partnership-modal';
import { HeroSection } from '@/components/hero-section';
import { VisionSection } from '@/components/vision-section';
import { DesignSection } from '@/components/design-section';
import { ProstheticsSection } from '@/components/prosthetics-section';
import { ComponentsSection } from '@/components/components-section';
import { RoadmapSection } from '@/components/roadmap-section';
import { PartnersSection } from '@/components/partners-section';
import { ContactSection } from '@/components/contact-section';

export default function Home() {
  const mounted = useMounted();
  const [fundsRaised, setFundsRaised] = useState(0);

  // Modal states
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [partnershipOpen, setPartnershipOpen] = useState(false);

  // Animate funds counter on mount
  useEffect(() => {
    if (!mounted) return;
    const duration = 2000;
    const startTime = Date.now();
    const animateFunds = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setFundsRaised(Math.round(progress * 0)); // Currently $0
      if (progress < 1) requestAnimationFrame(animateFunds);
    };
    animateFunds();
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ─── Navigation ─────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="font-display font-bold text-lg tracking-tight">Humanoids Now</div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#vision"      className="text-sm text-muted-foreground hover:text-foreground transition">Vision</a>
              <a href="#design"      className="text-sm text-muted-foreground hover:text-foreground transition">Design</a>
              <a href="#prosthetics" className="text-sm text-muted-foreground hover:text-foreground transition">Prosthetics</a>
              <a href="#components"  className="text-sm text-muted-foreground hover:text-foreground transition">Components</a>
              <a href="#roadmap"     className="text-sm text-muted-foreground hover:text-foreground transition">Roadmap</a>
              <a href="#partners"    className="text-sm text-muted-foreground hover:text-foreground transition">Partners</a>
              <a href="#contact"     className="text-sm text-muted-foreground hover:text-foreground transition">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      <HeroSection fundsRaised={fundsRaised} />
      <VisionSection />
      <DesignSection />
      <ProstheticsSection />
      <ComponentsSection />
      <RoadmapSection />
      <PartnersSection />
      <ContactSection
        onWaitlistOpen={() => setWaitlistOpen(true)}
        onPartnershipOpen={() => setPartnershipOpen(true)}
      />

      {/* ─── Footer ──────────────────────────────────────────────── */}
      <footer className="py-12 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="font-display font-bold text-sm text-muted-foreground">Humanoids Now — by John C. Barr</div>
            <p className="text-sm text-muted-foreground text-center md:text-right">
              Building morphological freedom through open-source robotics and prosthetics.
            </p>
          </div>
        </div>
      </footer>

      {/* ─── Modals ──────────────────────────────────────────────── */}
      <WaitlistModal open={waitlistOpen} onOpenChange={setWaitlistOpen} />
      <PartnershipModal open={partnershipOpen} onOpenChange={setPartnershipOpen} />
    </div>
  );
}
