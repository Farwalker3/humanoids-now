'use client';

import { motion } from 'motion/react';

export function VisionSection() {
  return (
    <section id="vision" className="py-20 md:py-32 bg-background border-t border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Project Vision</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Bridging Biology and Machine
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12 max-w-3xl">
            Humanoids Now is developing revolutionary bipedal humanoid robots with animal-inspired designs — fox, rabbit, raccoon, and mouse variants — that serve a dual purpose as both autonomous companion robots and modular prosthetic components.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: '🦾',
              title: 'Modular Limb Design',
              desc: 'Every arm, hand, and leg component functions both as part of a complete humanoid and as a standalone prosthetic — detachable and independently functional.',
            },
            {
              icon: '⚡',
              title: 'Energy-Harvesting Pseudoskin',
              desc: 'Outer skin integrates thin-film solar photovoltaics and saltwater energy harvesting, reducing or eliminating battery charging requirements for prosthetic users.',
            },
            {
              icon: '🧬',
              title: 'Bio-Inspired Mechanics',
              desc: 'Full skeletal, muscular, and sensory systems that closely mimic biological counterparts — tendon-driven joints, embedded proprioception, and tactile feedback.',
            },
            {
              icon: '🔓',
              title: 'Open-Source Development',
              desc: 'All hardware designs and software are open-source. Built on the InMoov framework with custom animal-aesthetic shells designed for community contribution.',
            },
            {
              icon: '🦊',
              title: 'Character-Driven Design',
              desc: 'Animal aesthetics create emotional connection and enable species-affirming expression — a core pillar of morphological freedom for users with prosthetics.',
            },
            {
              icon: '🤖',
              title: 'Brain-Computer Interface Ready',
              desc: 'Designed from the ground up for BCI compatibility, enabling intuitive control via neural input for both the autonomous robot and prosthetic applications.',
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              viewport={{ once: true, margin: '-80px' }}
              className="bg-card border border-border rounded-xl p-6 hover:border-accent/40 transition"
            >
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="font-display font-semibold text-base mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
