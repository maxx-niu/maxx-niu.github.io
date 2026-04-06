"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimate, useScroll, useTransform } from "motion/react";
import Landing from "./landing/landing";
import Navbar from "./navbar";

export default function PageClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [landingDone, setLandingDone] = useState(false);
  const landingContainerRef = useRef<HTMLDivElement>(null);
  const [glowScope, animateGlow] = useAnimate();

  const handleGlowReady = async () => {
    await animateGlow(
      glowScope.current,
      { opacity: 1 },
      { duration: 0.9, ease: "easeIn" },
    );
    animateGlow(
      "#glow-inner",
      { opacity: 0.55 },
      {
        duration: 2.8,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeIn",
      },
    );
  };

  useEffect(() => {
    history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    document.body.style.overflow = landingDone ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [landingDone]);

  const { scrollYProgress } = useScroll({
    target: landingContainerRef,
    offset: ["start start", "end end"],
  });

  const navProgress = useTransform(scrollYProgress, [0.5, 0.85, 1], [0, 1, 1]);
  const sectionOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.5, 1],
    [0, 1, 1],
  );
  const sectionY = useTransform(scrollYProgress, [0.1, 0.55, 1], [80, 0, 0]);

  return (
    <div style={{ position: "relative" }}>
      <motion.div
        ref={glowScope}
        id="glow"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "70vw",
          height: "70vw",
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0,
        }}
      >
        <div
          id="glow-inner"
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.3,
            background:
              "radial-gradient(circle at top right, rgba(47, 46, 190, 1), transparent 70%)",
          }}
        />
      </motion.div>

      <Navbar navProgress={navProgress} />

      <div
        ref={landingContainerRef}
        style={{ height: "300vh", position: "relative" }}
      >
        <Landing
          scrollYProgress={scrollYProgress}
          onGlowReady={handleGlowReady}
          onComplete={() => setLandingDone(true)}
        />
      </div>

      <motion.div
        style={{
          position: "relative",
          opacity: sectionOpacity,
          y: sectionY,
          marginTop: "-95vh",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
