'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useMounted } from '@/hooks';
import { WaitlistModal } from '@/components/waitlist-modal';
import { PartnershipModal } from '@/components/partnership-modal';

export default function Home() {
  const mounted = useMounted();
  const [fundsRaised, setFundsRaised] = useState(0);
  const videoRef = useRef<HTMLIFrameElement>(null);
  
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
      
      if (progress < 1) {
        requestAnimationFrame(animateFunds);
      }
    };
    
    animateFunds();
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="font-display font-bold text-lg tracking-tight">
              Prosthetic Companion
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#vision" className="text-sm text-muted-foreground hover:text-foreground transition">
                Vision
              </a>
              <a href="#partners" className="text-sm text-muted-foreground hover:text-foreground transition">
                Partners
              </a>
              <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition">
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section with Video Background */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Video Background Container */}
        <div className="absolute inset-0 w-full h-full bg-black/40">
          <iframe
            ref={videoRef}
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/RoFu0ROP6oU?autoplay=1&mute=1&loop=1&playlist=RoFu0ROP6oU&controls=0&modestbranding=1&rel=0"
            title="Industrial Robotics"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full object-cover"
            style={{ pointerEvents: 'none' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-12 gap-4">
            {/* Left side - Main copy */}
            <motion.div
              className="col-span-12 md:col-span-7"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <h1 className="font-display text-5xl md:text-7xl font-light tracking-tight mb-4 text-white">
                The Future of
                <br />
                <span className="font-bold text-accent">Human-Robot</span>
                <br />
                Collaboration
              </h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed">
                Building intelligent prosthetic companions that enhance human capability. Coming soon to transform how we work and live.
              </p>
            </motion.div>

            {/* Right side - Funds counter */}
            <motion.div
              className="col-span-12 md:col-span-5 flex flex-col items-start md:items-end justify-center pt-8 md:pt-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            >
              <div className="bg-black/40 backdrop-blur-xl border border-accent/20 rounded-lg p-8 w-full md:max-w-xs">
                <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-2">
                  Capital Raised
                </p>
                <div className="font-display text-5xl font-bold text-white mb-4">
                  ${fundsRaised.toLocaleString()}
                </div>
                <p className="text-sm text-gray-300">
                  Building the infrastructure for tomorrow's robotics revolution.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-accent rounded-full flex items-center justify-center">
            <div className="w-1 h-2 bg-accent rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Vision/Pitch Section */}
      <section id="vision" className="py-20 md:py-32 bg-background border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-8 tracking-tight">
              Bridging Human and Machine
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                We're developing intelligent prosthetic companions designed to augment human capabilities. Our approach combines cutting-edge robotics, AI, and ergonomic design to create tools that feel natural, intuitive, and genuinely useful.
              </p>
              <p>
                Unlike speculative visions, we're focused on achievable innovation. Each milestone is grounded in practical application, rigorous testing, and real-world feedback from users and partners who understand the space.
              </p>
              <p>
                We're looking for partners who share this vision—investors, researchers, and organizations committed to advancing human-machine collaboration responsibly and sustainably.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="py-20 md:py-32 bg-card border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className="mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-2">
              Our Partners
            </h2>
            <p className="text-muted-foreground text-lg">
              Building with visionary organizations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Partner Card - Raccoon AI */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true, margin: '-100px' }}
              className="bg-background border border-border rounded-lg p-8 flex flex-col items-center text-center hover:border-accent/50 transition"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-accent to-accent/50 rounded-lg flex items-center justify-center mb-6">
                <span className="font-display font-bold text-lg text-accent-foreground">RA</span>
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">Raccoon AI</h3>
              <p className="text-sm text-muted-foreground">
                Leveraging AI and automation expertise
              </p>
              <a
                href="https://raccoonai.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-sm text-accent hover:text-accent/80 transition font-medium"
              >
                Visit →
              </a>
            </motion.div>

            {/* Empty Partner Slots */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, margin: '-100px' }}
              className="bg-background border border-dashed border-border rounded-lg p-8 flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center mb-6">
                <span className="text-3xl text-muted-foreground">+</span>
              </div>
              <h3 className="font-display font-semibold text-lg mb-2 text-muted-foreground">Your Organization</h3>
              <p className="text-sm text-muted-foreground">
                Join our partnership program
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true, margin: '-100px' }}
              className="bg-background border border-dashed border-border rounded-lg p-8 flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center mb-6">
                <span className="text-3xl text-muted-foreground">+</span>
              </div>
              <h3 className="font-display font-semibold text-lg mb-2 text-muted-foreground">Your Organization</h3>
              <p className="text-sm text-muted-foreground">
                Join our partnership program
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="contact" className="py-20 md:py-32 bg-background border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Ready to Collaborate?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you're a consumer interested in early access or a partner exploring investment opportunities, we'd love to hear from you.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          >
            {/* Join Waitlist Button */}
            <button 
              onClick={() => setWaitlistOpen(true)}
              className="bg-accent text-accent-foreground font-semibold py-4 px-8 rounded-lg hover:bg-accent/90 transition text-lg font-display"
            >
              Join Waitlist
            </button>

            {/* Partner Inquiry Button */}
            <button 
              onClick={() => setPartnershipOpen(true)}
              className="bg-background border-2 border-accent text-accent font-semibold py-4 px-8 rounded-lg hover:bg-accent/5 transition text-lg font-display"
            >
              Interested in Partnering?
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center space-y-4"
          >
            <p className="text-muted-foreground">Connect directly on social</p>
            <div className="flex items-center justify-center gap-6">
              <a
                href="https://www.linkedin.com/in/johncbarr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent/80 transition font-medium text-sm"
              >
                LinkedIn
              </a>
              <div className="w-px h-4 bg-border" />
              <a
                href="https://x.com/farwalker3"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent/80 transition font-medium text-sm"
              >
                X / Twitter
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="font-display font-bold text-sm text-muted-foreground mb-4 md:mb-0">
              Prosthetic Companion Project
            </div>
            <p className="text-sm text-muted-foreground text-center md:text-right">
              Building intelligent, human-centered robotics solutions.
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <WaitlistModal open={waitlistOpen} onOpenChange={setWaitlistOpen} />
      <PartnershipModal open={partnershipOpen} onOpenChange={setPartnershipOpen} />
    </div>
  );
}
