"use client";

import { CSSProperties, ReactNode, useRef, useState, useEffect } from "react";
import { getDisplacementFilter } from "./liquid-glass-utils";

interface LiquidGlassProps {
  children: ReactNode;
  className?: string;
  /** Border radius of the lens shape in the displacement map. Should match the element's CSS border-radius. */
  radius?: number;
  /** How many pixels inward from the edge the refraction extends. Higher = thicker glass edge. */
  depth?: number;
  /** Max pixel displacement at the edges. Higher = more visible refraction/warping. */
  strength?: number;
  /** How much R/G/B channels diverge to create rainbow color fringing. 0 = no color separation. */
  chromaticAberration?: number;
  /** Frosted glass blur amount in px. Applied twice: half before displacement, full after. */
  blur?: number;
}

export default function LiquidGlass({
  children,
  className = "",
  radius = 28,
  depth = 8,
  strength = 80,
  chromaticAberration = 3,
  blur = 2,
}: LiquidGlassProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  // use a resize observer to get the size of the element to get the element's actual pixel dimensions
  // to pass into the getDisplacementFilter function to generate the displacement map as a data URI, where
  // it is applied to the backdrop filter of the element
  useEffect(() => {
    if (!ref.current) return;
    const obs = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width: Math.round(width), height: Math.round(height) });
    });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const filterUrl =
    size.width > 0
      ? `url('${getDisplacementFilter(size.width, size.height, radius, depth, strength, chromaticAberration)}')`
      : "";

  const style: CSSProperties = {
    backdropFilter: `blur(${blur / 2}px) ${filterUrl} blur(${blur}px) brightness(1.1) saturate(1.5)`,
    WebkitBackdropFilter: `blur(${blur / 2}px) ${filterUrl} blur(${blur}px) brightness(1.1) saturate(1.5)`,
  };

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden shadow-[inset_0_0_2px_rgba(255,255,255,0.35)] ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
