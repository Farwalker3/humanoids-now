'use client';

import { motion } from 'motion/react';

interface ContactSectionProps {
  onWaitlistOpen: () => void;
  onPartnershipOpen: () => void;
}

export function ContactSection({ onWaitlistOpen, onPartnershipOpen }: ContactSectionProps) {
  return (
    <section id="contact" className="py-20 md:py-32 bg-background border-t border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">Ready to Collaborate?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you're a consumer interested in early access, a partner exploring investment opportunities, or a grant organization aligned with morphological freedom — we'd love to hear from you.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <button
            onClick={onWaitlistOpen}
            className="bg-accent text-accent-foreground font-semibold py-4 px-8 rounded-lg hover:bg-accent/90 transition text-lg font-display"
          >
            Join Waitlist
          </button>
          <button
            onClick={onPartnershipOpen}
            className="bg-background border-2 border-accent text-accent font-semibold py-4 px-8 rounded-lg hover:bg-accent/5 transition text-lg font-display"
          >
            Interested in Partnering?
          </button>
          <a
            href="https://shop.kodair.us/pages/humanoids-now"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-accent to-accent/80 text-accent-foreground font-semibold py-4 px-8 rounded-lg hover:from-accent/90 hover:to-accent/70 transition text-lg font-display text-center flex items-center justify-center"
          >
            Support the Project
          </a>
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
            <a href="https://www.linkedin.com/in/johncbarr/" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80 transition font-medium text-sm">LinkedIn</a>
            <div className="w-px h-4 bg-border" />
            <a href="https://x.com/farwalker3" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80 transition font-medium text-sm">X / Twitter</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
