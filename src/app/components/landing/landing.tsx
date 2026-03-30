"use client";

import Headline from "./widgets/headline";
import StatusMetadata from "./widgets/status-metadata";
import Globe from "./widgets/globe";
import { useState } from "react";
import { animate, useAnimate } from "motion/react";

const GRID_FADE = { duration: 0.9, ease: "easeIn" as const };
const GLOW_PULSE = {
  duration: 2.8,
  repeat: Infinity,
  repeatType: "reverse" as const,
  ease: "easeIn" as const,
};

function Landing({ onComplete }: { onComplete?: () => void }) {
  const [scope, animateScope] = useAnimate();
  const [headlineTrigger, setHeadlineTrigger] = useState(false);
  const [showWidgetBar, setShowWidgetBar] = useState(false);

  const onStatusComplete = async () => {
    await animateScope(
      "#grid",
      { opacity: 1, clipPath: "inset(0 0 0 0)" },
      GRID_FADE,
    );
    await animate("#glow", { opacity: 1 }, GRID_FADE);
    animateScope(
      "#globe-container",
      { opacity: 1 },
      { duration: 2, ease: "easeIn" },
    );
    animate("#glow-inner", { opacity: 0.55 }, GLOW_PULSE);
    setTimeout(() => {
      setHeadlineTrigger(true);
    }, 300);
  };

  return (
    <div ref={scope} className="relative min-h-screen overflow-hidden">
      {/* Grid background */}
      <div
        id="grid"
        style={{
          opacity: 0,
          clipPath: "inset(0 0 100% 0)",
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

      <div
        id="hero-content-container"
        className="relative w-full xl:max-w-[1700px] mx-auto px-6 md:px-12 lg:px-24 min-h-screen"
      >
        {/* Globe - desktop only */}
        <div
          id="globe-container"
          className="hidden xl:block absolute top-1/2 -right-20 -translate-y-1/2 pointer-events-none"
          style={{ opacity: 0 }}
        >
          <Globe />
        </div>

        {/* Hero */}
        <section className="relative z-10 flex flex-col justify-center py-20 min-h-screen">
          {/* Animate the BG grid and glow AFTER the status metadata animation completes */}
          <StatusMetadata
            onComplete={onStatusComplete}
            showWidgetBar={showWidgetBar}
          />

          <Headline
            trigger={headlineTrigger}
            onComplete={() =>
              setTimeout(() => {
                setShowWidgetBar(true);
                onComplete?.();
              }, 300)
            }
          />
        </section>
      </div>
    </div>
  );
}

export default Landing;
