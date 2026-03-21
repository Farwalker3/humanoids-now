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

      {/* ─── Hero ────────────────────────────────────────────────── */}
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

      {/* ─── Project Vision ──────────────────────────────────────── */}
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

      {/* ─── Modular Robot Design ────────────────────────────────── */}
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

      {/* ─── Prosthetics Applications ────────────────────────────── */}
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

      {/* ─── Parts Inventory / Components ───────────────────────── */}
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

      {/* ─── Roadmap / Timeline ──────────────────────────────────── */}
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

      {/* ─── Partners ────────────────────────────────────────────── */}
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
                <img src="/logo.png" alt="Raccoon AI" className="max-w-full max-h-full object-contain" />
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

      {/* ─── Contact / CTA ───────────────────────────────────────── */}
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
              onClick={() => setWaitlistOpen(true)}
              className="bg-accent text-accent-foreground font-semibold py-4 px-8 rounded-lg hover:bg-accent/90 transition text-lg font-display"
            >
              Join Waitlist
            </button>
            <button
              onClick={() => setPartnershipOpen(true)}
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
