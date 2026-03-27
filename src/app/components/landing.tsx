"use client";

import LiquidGlass from "./liquid-glass";

function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Grid background */}
      <div
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
          opacity: 0,
          animation: "grid-fade-in 1.7s ease-out forwards",
        }}
      />

      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at top right, rgba(47, 46, 190, 0.15), transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Hero */}
      <section className="relative z-10 flex flex-col justify-center px-6 md:px-12 lg:px-24 py-20 max-w-7xl min-h-screen">
        {/* Status metadata */}
        <div className="flex flex-col space-y-2 mb-12">
          <div className="flex items-center space-x-3">
            <span className="w-2 h-2 bg-tertiary rounded-full animate-pulse" />
            <span className="font-mono text-[14px] uppercase tracking-widest text-secondary">
              SYSTEM_STATUS: OPERATIONAL
            </span>
          </div>
          {/* Penny's <3 */}
          <div className="font-mono text-[14px] uppercase tracking-widest text-outline">
            LOCATION: 43.47674° N, -80.52545° W // WATERLOO_ON
          </div>
        </div>

        {/* Headline */}
        <div className="max-w-4xl space-y-6">
          <h1 className="font-headline font-bold text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.9] text-on-surface">
            I'm Max Niu.
            <br />
            I build systems <br />
            that <span className="text-primary">scale.</span>
          </h1>
          <p className="font-body text-lg md:text-xl text-secondary max-w-2xl leading-relaxed">
            Full-stack engineer specializing in high-concurrency architectures
            and minimalist interface design. Bridging the gap between raw
            technical performance and editorial precision.
          </p>
        </div>

        {/* CTA */}
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
                DOWNLOAD_CV
              </span>
            </LiquidGlass>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Landing;
