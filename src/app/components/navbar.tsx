"use client";

import { useState } from "react";
import LiquidGlass from "./liquid-glass";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
  ];

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <LiquidGlass
        className="flex items-center justify-between w-full max-w-4xl h-14 px-8 rounded-full"
        radius={28}
        depth={10}
        strength={20}
        chromaticAberration={4}
        blur={4}
      >
        {/* Logo */}
        <a
          href="#"
          className="font-headline text-on-surface font-bold tracking-tight text-lg hover:text-primary transition-colors"
        >
          MAX NIU
        </a>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="font-mono text-xs tracking-widest uppercase text-secondary hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            </li>
          ))}
          <li>
            <a
              href="mailto:maxniu444@gmail.com"
              className="font-mono text-xs tracking-widest uppercase text-on-surface-variant bg-primary-container/30 hover:bg-primary-container/50 px-4 py-1.5 rounded-full transition-colors"
            >
              Contact
            </a>
          </li>
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
        <LiquidGlass className="md:hidden absolute top-20 left-4 right-4 rounded-2xl p-6">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-mono text-xs tracking-widest uppercase text-secondary hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li>
              <a
                href="mailto:maxniu444@gmail.com"
                className="font-mono text-xs tracking-widest uppercase text-on-surface-variant"
              >
                Contact
              </a>
            </li>
          </ul>
        </LiquidGlass>
      )}
    </nav>
  );
};

export default Navbar;
