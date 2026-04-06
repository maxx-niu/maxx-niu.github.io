"use client";

import Image from "next/image";
import { motion } from "motion/react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

function About() {
  return (
    <div className="w-full bg-surface" id="about">
      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-32 pb-24">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start md:items-stretch">
          {/* Header — visible only on mobile, above photo */}
          <motion.header className="md:hidden" {...fadeUp}>
            <p className="font-mono text-[10px] text-primary tracking-[0.3em] uppercase mb-2">
              SYSTEM_LOG // PROFILE
            </p>
            <h1 className="font-headline text-5xl font-bold tracking-tighter uppercase text-on-surface">
              About Me
            </h1>
            <div className="h-px w-24 bg-primary mt-6" />
          </motion.header>

          {/* Photo */}
          <motion.div
            className="w-full md:w-1/2 self-center"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="aspect-3419/2148 relative overflow-hidden border border-outline-variant/40 rounded-none">
              <Image
                src="/about/portrait.jpg"
                alt="Portrait"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-center"
                priority
              />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            className="w-full md:w-1/2 flex flex-col justify-center"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          >
            {/* Header — visible only on desktop */}
            <header className="hidden md:block mb-10">
              <p className="font-mono text-[10px] text-primary tracking-[0.3em] uppercase mb-2">
                SYSTEM_LOG // PROFILE
              </p>
              <h1 className="font-headline text-5xl md:text-6xl font-bold tracking-tighter uppercase text-on-surface">
                About Me
              </h1>
              <div className="h-px w-24 bg-primary mt-6" />
            </header>

            {/* Status */}
            <div className="flex items-center space-x-3 mb-8">
              <span className="w-2 h-2 bg-tertiary rounded-full shadow-[0_0_6px_2px_var(--color-tertiary)]" />
              <span className="font-mono text-[14px] uppercase tracking-widest text-secondary">
                STATUS: <span className="text-on-surface">OPEN TO WORK</span>
              </span>
            </div>

            <p className="text-secondary text-md leading-relaxed mb-8">
              I&apos;m a software engineer who&apos;s worked across the stack
              &mdash; from serverless cloud backends to large-scale frontend
              builds &mdash; with a focus on React and TypeScript. I care about
              shipping things that are scalable, thoughtfully designed, and
              actually used by people.
            </p>

            <div className="mt-3 font-mono text-[12px] uppercase tracking-widest text-outline flex items-center gap-4">
              <span>Waterloo, ON, Canada</span>
              <span className="text-outline-variant">{"//"}</span>
              <span>BASc Computer Engineering</span>
              <span className="text-outline-variant">{"//"}</span>
              <span>UWaterloo &apos;24</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default About;
