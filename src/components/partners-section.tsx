'use client';

import Image from 'next/image';
import { motion } from 'motion/react';

export function PartnersSection() {
  return (
    <section id="partners" className="py-20 md:py-32 bg-card border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-2">Our Partners</h2>
          <p className="text-muted-foreground text-lg">Building with visionary organizations</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true, margin: '-100px' }}
            className="bg-background border border-border rounded-lg p-8 flex flex-col items-center text-center hover:border-accent/50 transition"
          >
            <div className="w-40 h-24 flex items-center justify-center mb-6">
              <Image
                src="/logo.png"
                alt="Raccoon AI"
                width={160}
                height={96}
                className="object-contain w-full h-full"
              />
            </div>
            <h3 className="font-display font-semibold text-lg mb-2">Raccoon AI</h3>
            <p className="text-sm text-muted-foreground">Leveraging AI and automation expertise</p>
            <a href="https://raccoonai.tech" target="_blank" rel="noopener noreferrer" className="mt-4 text-sm text-accent hover:text-accent/80 transition font-medium">Visit →</a>
          </motion.div>
          {[1, 2].map((n) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 * (n + 1) }}
              viewport={{ once: true, margin: '-100px' }}
              className="bg-background border border-dashed border-border rounded-lg p-8 flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center mb-6">
                <span className="text-3xl text-muted-foreground">+</span>
              </div>
              <h3 className="font-display font-semibold text-lg mb-2 text-muted-foreground">Your Organization</h3>
              <p className="text-sm text-muted-foreground">Join our partnership program</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
