"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Experiences from "./components/experiences";
import Landing from "./components/landing/landing";
import NavbarWrapper from "./components/navbar-wrapper";

export default function Home() {
  const [landingDone, setLandingDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = landingDone ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [landingDone]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const glowY = useTransform(scrollYProgress, [0, 1], ["0vh", "-20vh"]);

  return (
    <>
      {landingDone && <NavbarWrapper />}

      <div ref={containerRef} style={{ height: "300vh", position: "relative" }}>
        {/* Glow effect tied to the landing section */}
        <motion.div
          id="glow"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: "-60vh",
            pointerEvents: "none",
            zIndex: 0,
            opacity: 0,
            y: glowY,
          }}
        >
          <div
            id="glow-inner"
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.2,
              background:
                "radial-gradient(circle at top right, rgba(47, 46, 190, 1), transparent 60%)",
            }}
          />
        </motion.div>

        <Landing
          scrollYProgress={scrollYProgress}
          onComplete={() => setLandingDone(true)}
        />
      </div>
      {landingDone && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0 }}
          style={{ marginTop: "-100vh", position: "relative", zIndex: 1 }}
        >
          <Experiences />
        </motion.div>
      )}
    </>
  );
}
