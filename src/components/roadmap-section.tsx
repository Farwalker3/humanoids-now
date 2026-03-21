'use client';

import { motion } from 'motion/react';

export function RoadmapSection() {
  return (
    <section id="roadmap" className="py-20 md:py-32 bg-background border-t border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Development Plan</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Roadmap
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Our development follows a phased approach — from comprehensive 3D modeling to a full bipedal prototype with advanced AI systems.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border md:left-1/2" />

          {[
            {
              phase: 'Phase 1',
              period: 'Current',
              status: 'active',
              title: '3D Modeling & Simulation',
              deliverable: '$4,000 Grant Deliverable',
              items: [
                'Complete skeletal design with all joint mechanisms',
                'Muscle and tendon simulation across all limbs',
                'Pseudoskin design with integrated sensor layout',
                'Solar and saltwater energy harvesting specification',
                'Technical specifications and software architecture',
                'Freedom of Form Foundation grant model submission',
              ],
            },
            {
              phase: 'Phase 2',
              period: 'Q3 2026',
              status: 'upcoming',
              title: 'Upper Body Prototype',
              deliverable: null,
              items: [
                'Functional head, torso, and arms with basic sensors',
                'Animal-aesthetic skin prototypes with solar harvesting',
                'Initial motion control and vision processing',
                'Compute platform integration (Jetson Orin NX)',
              ],
            },
            {
              phase: 'Phase 3',
              period: 'Q4 2026',
              status: 'upcoming',
              title: 'Modular Prosthetic Testing',
              deliverable: null,
              items: [
                'Validation of prosthetic applications for arm components',
                'User testing of animal-aesthetic designs',
                'Refinement of skin sensors and energy systems',
                'Medical-standard interface certification trials',
              ],
            },
            {
              phase: 'Phase 4',
              period: '2027',
              status: 'upcoming',
              title: 'Full Bipedal Prototype',
              deliverable: null,
              items: [
                'Complete bipedal locomotion system',
                'Advanced AI control and adaptive movement',
                'Comprehensive sensor integration across all systems',
                'Final animal variant designs: fox, rabbit, raccoon, mouse',
              ],
            },
          ].map((phase, i) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              viewport={{ once: true, margin: '-80px' }}
              className={`relative flex gap-8 mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}
            >
              {/* Timeline node */}
              <div className="absolute left-6 w-3 h-3 rounded-full border-2 border-accent bg-background -translate-x-1/2 mt-1.5 z-10 md:left-1/2" />

              {/* Content */}
              <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                <div className="bg-card border border-border rounded-xl p-6 hover:border-accent/40 transition">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-accent">{phase.phase}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      phase.status === 'active'
                        ? 'bg-accent/20 text-accent'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {phase.period}
                    </span>
                    {phase.status === 'active' && (
                      <span className="flex items-center gap-1 text-xs text-green-400 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Active
                      </span>
                    )}
                  </div>
                  <h3 className="font-display font-bold text-lg mb-1">{phase.title}</h3>
                  {phase.deliverable && (
                    <div className="inline-block text-xs font-semibold text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-full mb-3">
                      {phase.deliverable}
                    </div>
                  )}
                  <ul className="space-y-1.5 mt-3">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent/50 flex-shrink-0 mt-1.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block md:w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
