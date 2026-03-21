'use client';

import { motion } from 'motion/react';

export function ComponentsSection() {
  return (
    <section id="components" className="py-20 md:py-32 bg-card border-t border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Components</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Parts Inventory
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Our design incorporates best-in-class components across every subsystem — chosen for performance, open availability, and long-term community support.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              category: 'Structural',
              color: 'from-blue-500/10 to-blue-500/5 border-blue-500/20',
              accent: 'text-blue-400',
              items: [
                'Open-source InMoov base skeleton',
                'Custom animal-aesthetic outer shells',
                'Aluminum reinforcement rods and brackets',
                '3D-printed joint mechanisms',
              ],
            },
            {
              category: 'Actuation',
              color: 'from-orange-500/10 to-orange-500/5 border-orange-500/20',
              accent: 'text-orange-400',
              items: [
                'DAMIAO harmonic joint motors',
                'PYTCHER harmonic drive actuators',
                'Tendon cables and routing pulleys',
                'Servo controllers per limb segment',
              ],
            },
            {
              category: 'Computation',
              color: 'from-green-500/10 to-green-500/5 border-green-500/20',
              accent: 'text-green-400',
              items: [
                'NVIDIA Jetson Orin NX (AI + vision)',
                'Distributed microcontrollers (STM32)',
                'CAN bus inter-segment communication',
                'ROS 2 control stack',
              ],
            },
            {
              category: 'Sensing',
              color: 'from-purple-500/10 to-purple-500/5 border-purple-500/20',
              accent: 'text-purple-400',
              items: [
                'Intel RealSense depth cameras',
                'Force-sensitive resistors (FSR)',
                'Inertial measurement units (IMU)',
                'Distributed tactile sensor arrays',
              ],
            },
            {
              category: 'Skin & Energy',
              color: 'from-yellow-500/10 to-yellow-500/5 border-yellow-500/20',
              accent: 'text-yellow-400',
              items: [
                'Ecoflex silicone outer skin',
                'Thin-film photovoltaic solar layer',
                'Saltwater energy harvesting cells',
                'TENG integration (future phase)',
              ],
            },
            {
              category: 'Connectivity',
              color: 'from-pink-500/10 to-pink-500/5 border-pink-500/20',
              accent: 'text-pink-400',
              items: [
                'Medical-standard limb interfaces',
                'Brain-computer interface (BCI) layer',
                'Wi-Fi / Bluetooth module',
                'Embedded sensor data bus',
              ],
            },
          ].map((section, i) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              viewport={{ once: true, margin: '-80px' }}
              className={`bg-gradient-to-br ${section.color} border rounded-xl p-6`}
            >
              <h3 className={`font-display font-bold text-sm uppercase tracking-widest mb-4 ${section.accent}`}>
                {section.category}
              </h3>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-1 h-1 rounded-full bg-current flex-shrink-0 mt-2 opacity-50" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
