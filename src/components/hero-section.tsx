'use client';

import { useRef } from 'react';
import { motion } from 'motion/react';

interface HeroSectionProps {
  fundsRaised: number;
}

export function HeroSection({ fundsRaised }: HeroSectionProps) {
  const videoRef = useRef<HTMLIFrameElement>(null);

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden pt-16">
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
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-12 gap-4">
          <motion.div
            className="col-span-12 md:col-span-7"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="inline-block bg-accent/20 border border-accent/40 text-accent text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-6">
              Freedom of Form Foundation Grant Applicant
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-light tracking-tight mb-4 text-white">
              The Future of<br />
              <span className="font-bold text-accent">Human-Robot</span><br />
              Collaboration
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed">
              Bipedal humanoid robots with animal-inspired designs — built from the ground up as both autonomous companions and modular prosthetic systems.
            </p>
          </motion.div>
          <motion.div
            className="col-span-12 md:col-span-5 flex flex-col items-start md:items-end justify-center pt-8 md:pt-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            <div className="bg-black/40 backdrop-blur-xl border border-accent/20 rounded-lg p-8 w-full md:max-w-xs">
              <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-2">Capital Raised</p>
              <div className="font-display text-5xl font-bold text-white mb-4">${fundsRaised.toLocaleString()}</div>
              <p className="text-sm text-gray-300">Building the infrastructure for tomorrow's robotics revolution.</p>
            </div>
          </motion.div>
        </div>
      </div>
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
  );
}
