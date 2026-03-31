"use client";

import Headline from "./widgets/headline";
import StatusMetadata from "./widgets/status-metadata";
import Globe from "./widgets/globe";
import { useState } from "react";
import {
  motion,
  useAnimate,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useVisitors } from "@/app/hooks/use-visitors";

const GRID_FADE = { duration: 0.9, ease: "easeIn" as const };

function Landing({
  onComplete,
  onGlowReady,
  scrollYProgress,
}: {
  onComplete?: () => void;
  onGlowReady?: () => Promise<void>;
  scrollYProgress: MotionValue<number>;
}) {
  const [scope, animateScope] = useAnimate();
  const [headlineTrigger, setHeadlineTrigger] = useState(false);
  const [showWidgetBar, setShowWidgetBar] = useState(false);
  const { markers } = useVisitors();

  const heroX = useTransform(scrollYProgress, [0, 0.8], ["0vw", "-110vw"]);
  const globeX = useTransform(scrollYProgress, [0, 0.8], ["0vw", "110vw"]);
  const exitOpacity = useTransform(scrollYProgress, [0.1, 0.75], [1, 0]);
  const gridY = useTransform(scrollYProgress, [0, 1], ["0vh", "-100%"]);

  const onStatusComplete = async () => {
    await animateScope(
      "#grid",
      { opacity: 1, clipPath: "inset(0 0 0 0)" },
      GRID_FADE,
    );
    await onGlowReady?.();
    animateScope(
      "#globe-container",
      { opacity: 1 },
      { duration: 2, ease: "easeIn" },
    );
    setTimeout(() => {
      setHeadlineTrigger(true);
    }, 300);
  };

  return (
    <div
      ref={scope}
      className="sticky top-0 h-screen overflow-hidden z-10"
      id="landing"
    >
      {/* Grid background */}
      <motion.div
        id="grid"
        style={{
          opacity: 0,
          clipPath: "inset(0 0 100% 0)",
          position: "absolute",
          top: 0,
          left: "50%",
          x: "-50%",
          y: gridY,
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
        <motion.div
          className="hidden xl:block absolute top-1/2 -right-20 -translate-y-1/2 z-20"
          style={{ x: globeX, opacity: exitOpacity }}
        >
          <div id="globe-container" style={{ opacity: 0 }}>
            <Globe markers={markers} />
          </div>
        </motion.div>

        {/* Hero */}
        <motion.section
          className="relative z-10 flex flex-col justify-center py-20 min-h-screen"
          style={{ x: heroX, opacity: exitOpacity }}
        >
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
        </motion.section>
      </div>
    </div>
  );
}

export default Landing;
