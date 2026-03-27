"use client";

function Landing() {
  return (
    <div className="relative min-h-screen">
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
    </div>
  );
}

export default Landing;
