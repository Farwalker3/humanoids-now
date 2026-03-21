'use client';

import { motion } from 'motion/react';

export function ProstheticsSection() {
  return (
    <section id="prosthetics" className="py-20 md:py-32 bg-background border-t border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Dual Purpose</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Next-Generation Prosthetics
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Beyond robotics, Humanoids Now components are designed as next-generation prosthetics. Our animal-inspired aesthetic enables morphological freedom — the ability to express species-affirming identity while maintaining or enhancing human capability.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: '-80px' }}
            className="bg-card border border-border rounded-xl p-8"
          >
            <h3 className="font-display font-semibold text-lg mb-4">Morphological Freedom</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Our animal-inspired designs offer users aesthetic choices beyond traditional prosthetics. Components are designed to maintain or enhance human capability while allowing meaningful self-expression through form.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-1.5" /> Fox, rabbit, raccoon, and mouse aesthetic variants</li>
              <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-1.5" /> Species-affirming expression for non-human identity</li>
              <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-1.5" /> Emotional connection through character-driven design</li>
              <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-1.5" /> Customizable outer shell designs via open-source files</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true, margin: '-80px' }}
            className="bg-card border border-border rounded-xl p-8"
          >
            <h3 className="font-display font-semibold text-lg mb-4">Technical Prosthetic Features</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Medical-standard interfaces ensure compatibility with existing prosthetics infrastructure, while advanced sensory integration provides enhanced proprioception.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-1.5" /> Modular wrist, elbow, and ankle disconnects</li>
              <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-1.5" /> Medical-standard connection interfaces</li>
              <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-1.5" /> Tactile feedback for enhanced proprioception</li>
              <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-1.5" /> Adaptive learning algorithms personalized to each user</li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          viewport={{ once: true, margin: '-80px' }}
          className="bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 rounded-xl p-8"
        >
          <h3 className="font-display font-semibold text-lg mb-3">Energy Independence</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Energy-harvesting pseudoskin integrates thin-film photovoltaic solar cells and saltwater energy harvesting into the outer surface — significantly reducing or eliminating battery charging for prosthetic users in everyday conditions. Future integration with triboelectric nanogenerator (TENG) technology will further enhance ambient energy capture from movement and friction.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
