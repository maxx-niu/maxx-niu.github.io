"use client";

import { useEffect } from "react";
import { useAnimate } from "motion/react";
import LiquidGlass from "../../liquid-glass";

const HIDDEN_CLIP = "inset(0 0 100% 0)";
const LINE_EASE = [0.16, 1, 0.3, 1] as const;

function Headline({
  trigger,
  onComplete,
}: {
  trigger: boolean;
  onComplete?: () => void;
}) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (!trigger) return;
    const run = async () => {
      animate(
        "#h1-line1",
        { clipPath: "inset(-4px 0 -4px 0)" },
        { duration: 1, ease: LINE_EASE },
      );
      animate(
        "#h1-line2",
        { clipPath: "inset(-4px 0 -4px 0)" },
        { duration: 1, ease: LINE_EASE, delay: 0.4 },
      );
      animate(
        "#h1-line3",
        { clipPath: "inset(-4px 0 -4px 0)" },
        { duration: 1, ease: LINE_EASE, delay: 0.8 },
      );
      animate(
        "#headline-p",
        { opacity: 1, y: 0 },
        { duration: 0.5, ease: "easeOut", delay: 1.2 },
      );
      await animate(
        "#headline-ctas",
        { opacity: 1, y: 0 },
        { duration: 0.5, ease: "easeOut", delay: 1.7 },
      );
      onComplete?.();
    };
    run();
  }, [trigger, animate, onComplete]);

  return (
    <div ref={scope}>
      <div className="max-w-4xl space-y-6">
        <h1 className="font-headline font-bold text-5xl md:text-7xl lg:text-8xl tracking-tighter text-on-surface">
          <span
            id="h1-line1"
            className="block"
            style={{ clipPath: HIDDEN_CLIP }}
          >
            I&apos;m Max Niu.
          </span>
          <span
            id="h1-line2"
            className="block"
            style={{ clipPath: HIDDEN_CLIP }}
          >
            I make systems
          </span>
          <span
            id="h1-line3"
            className="block"
            style={{ clipPath: HIDDEN_CLIP }}
          >
            that <span className="text-primary">scale.</span>
          </span>
        </h1>
        <p
          id="headline-p"
          className="font-body text-lg md:text-xl text-secondary max-w-2xl leading-relaxed"
          style={{ opacity: 0, transform: "translateY(16px)" }}
        >
          Let&apos;s build something together.
        </p>
      </div>

      <div
        id="headline-ctas"
        className="mt-12 flex flex-col sm:flex-row gap-6"
        style={{ opacity: 0, transform: "translateY(16px)" }}
      >
        <a href="#projects" className="glow-border-primary rounded-full group cursor-pointer">
          <LiquidGlass className="px-8 py-4 rounded-full bg-[#0e0e11] group-hover:bg-surface-container-high group-active:bg-surface-container-low transition-colors duration-150">
            <span className="font-headline font-bold uppercase tracking-tighter text-sm text-secondary group-hover:text-on-surface/60 transition-colors duration-150">
              VIEW PROJECTS
            </span>
          </LiquidGlass>
        </a>
        <a href="/resume/Resume - Maximus Niu.pdf" download className="glow-border-secondary rounded-full group cursor-pointer">
          <LiquidGlass className="px-8 py-4 rounded-full bg-[#0e0e11] group-hover:bg-surface-container-high group-active:bg-surface-container-low transition-colors duration-150">
            <span className="font-headline font-bold uppercase tracking-tighter text-sm text-secondary group-hover:text-on-surface/60 transition-colors duration-150">
              DOWNLOAD CV
            </span>
          </LiquidGlass>
        </a>
      </div>
    </div>
  );
}

export default Headline;
