'use client';

import { motion } from 'motion/react';

export function DesignSection() {
  return (
    <section id="design" className="py-20 md:py-32 bg-card border-t border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Engineering</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Modular Robot Design
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Our design philosophy centers on modularity and interoperability. Every component is engineered to function both as part of the complete humanoid platform and as an independent prosthetic device.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-4"
          >
            {[
              { label: 'Degrees of Freedom', value: '20+', desc: 'Complete bipedal frame with full-body articulation' },
              { label: 'Actuation System', value: 'Tendon-Driven', desc: 'Finger and joint actuation mimicking natural movement' },
              { label: 'Skeleton Material', value: '3D Print + Aluminum', desc: 'Open-source InMoov base with aluminum reinforcement' },
              { label: 'Interface Standard', value: 'Medical-Grade', desc: 'Standardized connections compatible with prosthetics standards' },
            ].map((spec, i) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-background border border-border rounded-lg p-5"
              >
                <div className="flex items-start justify-between mb-1">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">{spec.label}</span>
                  <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full">{spec.value}</span>
                </div>
                <p className="text-sm text-muted-foreground">{spec.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-4"
          >
            <div className="bg-background border border-border rounded-xl p-6 mb-4">
              <h3 className="font-display font-semibold text-base mb-4">Sensor Array</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" /> Intel RealSense depth cameras for spatial awareness</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" /> Force-sensitive resistors for touch and pressure feedback</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" /> Inertial measurement units (IMUs) for balance and orientation</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" /> Distributed tactile sensor arrays embedded in pseudoskin</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" /> Environmental sensors for heat, humidity, and proximity</li>
              </ul>
            </div>
            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="font-display font-semibold text-base mb-4">Compute Platform</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" /> NVIDIA Jetson Orin NX for AI vision and real-time control</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" /> Distributed microcontrollers per limb segment</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" /> ROS 2 / custom control stack</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" /> Brain-computer interface compatibility layer</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
