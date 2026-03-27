"use client";

import LiquidGlass from "../liquid-glass";
import WidgetBar from "./widgets/widget-bar";
import { motion } from "motion/react";

const BG_FADE = { duration: 0.9, ease: "easeIn" as const };
const GLOW_DELAY = BG_FADE.duration + 0.5;
const GLOW_PULSE = {
  duration: 2.8,
  repeat: Infinity,
  repeatType: "reverse" as const,
  ease: "easeIn" as const,
};

function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Grid background */}
      <motion.div
        initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
        animate={{ opacity: 1, clipPath: "inset(0 0 0 0)" }}
        transition={BG_FADE}
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: -1,
          height: "100%",
          width: "100%",
          pointerEvents: "none",
          background:
            "linear-gradient(90deg, #474750 1px, transparent 1px) center / 80px 80px, linear-gradient(#474750 1px, transparent 1px) center / 80px 80px",
          WebkitMask: "linear-gradient(-360deg, transparent 40%, white)",
          mask: "linear-gradient(-360deg, transparent 40%, white)",
        }}
      />
      {/* Radial glow: outer fades in, inner loops opacity so repeat does not replay the entrance */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ...BG_FADE, delay: GLOW_DELAY, duration: 1.5 }}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <motion.div
          aria-hidden
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 0.55 }}
          transition={{
            ...GLOW_PULSE,
            delay: GLOW_DELAY,
          }}
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at top right, rgba(47, 46, 190, 1), transparent 60%)",
          }}
        />
      </motion.div>

      {/* 
      // Hero 
      <section className="relative z-10 flex flex-col justify-center px-6 md:px-12 lg:px-24 py-20 max-w-7xl min-h-screen">
        // Status metadata 
        <div className="flex flex-col space-y-2 mb-12">
          <div className="flex items-center space-x-3">
            <span className="w-2 h-2 bg-tertiary rounded-full animate-pulse shadow-[0_0_6px_2px_var(--color-tertiary)]" />
            <span className="font-mono text-[14px] uppercase tracking-widest text-secondary">
              SYSTEM_STATUS: OPERATIONAL
            </span>
          </div>
          <WidgetBar />
        </div>

        // Headline 
        <div className="max-w-4xl space-y-6">
          <h1 className="font-headline font-bold text-5xl md:text-7xl lg:text-8xl tracking-tighter text-on-surface">
            I&apos;m Max Niu.
            <br />
            I build systems <br />
            that <span className="text-primary">scale.</span>
          </h1>
          <p className="font-body text-lg md:text-xl text-secondary max-w-2xl leading-relaxed">
            Let&apos;s build something together.
          </p>
        </div>

        // CTA
        <div className="mt-12 flex flex-col sm:flex-row gap-6">
          <div className="glow-border-primary rounded-full group cursor-pointer">
            <LiquidGlass className="px-8 py-4 rounded-full bg-[#0e0e11] group-hover:bg-surface-container-high group-active:bg-surface-container-low transition-colors duration-150">
              <span className="font-headline font-bold uppercase tracking-tighter text-sm text-secondary group-hover:text-on-surface/60 transition-colors duration-150">
                VIEW PROJECTS
              </span>
            </LiquidGlass>
          </div>
          <div className="glow-border-secondary rounded-full group cursor-pointer">
            <LiquidGlass className="px-8 py-4 rounded-full bg-[#0e0e11] group-hover:bg-surface-container-high group-active:bg-surface-container-low transition-colors duration-150">
              <span className="font-headline font-bold uppercase tracking-tighter text-sm text-secondary group-hover:text-on-surface/60 transition-colors duration-150">
                DOWNLOAD CV
              </span>
            </LiquidGlass>
          </div>
        </div>
      </section>
      */}
    </div>
  );
}

export default Landing;
