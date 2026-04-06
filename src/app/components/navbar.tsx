"use client";

import { useState } from "react";
import { useMotionValueEvent, type MotionValue } from "motion/react";
import LiquidGlass from "./liquid-glass";

const Navbar = ({ navProgress }: { navProgress: MotionValue<number> }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  useMotionValueEvent(navProgress, "change", setProgress);

  const navLinks = [
    { name: "About", id: "about" },
    { name: "Experience", id: "experience" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <nav
      className="fixed top-6 left-0 right-0 z-40 flex justify-center px-4"
      style={{
        transform: `translateY(${(1 - progress) * -56}px)`,
        pointerEvents: progress > 0.5 ? "auto" : "none",
      }}
    >
      <LiquidGlass
        className="flex items-center justify-between w-full max-w-4xl h-14 px-8 rounded-full"
        extraStyle={{ opacity: progress }} // opacity needs to be placed here, instead of the ancestor element so that backdrop filter works properly
        radius={28}
        depth={10}
        strength={20}
        chromaticAberration={4}
        blur={4}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-headline text-on-surface font-bold tracking-tight text-lg hover:text-primary transition-colors cursor-pointer"
        >
          MAX NIU
        </button>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <button
                onClick={() => scrollTo(link.id)}
                className="font-mono text-xs tracking-widest uppercase text-secondary hover:text-primary transition-colors cursor-pointer"
              >
                {link.name}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-secondary hover:text-primary transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
      </LiquidGlass>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-20 left-4 right-4">
          <LiquidGlass className="rounded-2xl p-6">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <button
                  onClick={() => scrollTo(link.id)}
                  className="font-mono text-xs tracking-widest uppercase text-secondary hover:text-primary transition-colors cursor-pointer"
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
        </LiquidGlass>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
