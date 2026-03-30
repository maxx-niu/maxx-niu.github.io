"use client";

import { useState, useEffect } from "react";
import Experiences from "./components/experiences";
import Landing from "./components/landing/landing";
import NavbarWrapper from "./components/navbar-wrapper";

export default function Home() {
  const [landingDone, setLandingDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = landingDone ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [landingDone]);

  return (
    <>
      {landingDone && <NavbarWrapper />}

      {/* Wrapper ties the glow to the landing section without clipping it */}
      <div style={{ position: "relative" }}>
        <div
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
        </div>

        <Landing onComplete={() => setLandingDone(true)} />
      </div>
      {landingDone && <Experiences />}
    </>
  );
}
