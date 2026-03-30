"use client";

import { useCallback, useEffect, useRef } from "react";
import createGlobe from "cobe";
import type { CountryMarker } from "@/app/hooks/use-visitors";

interface GlobeProps {
  markers?: CountryMarker[];
}

export default function Globe({ markers = [] }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);
  const markersRef = useRef(markers);

  // Drag state
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null);
  const dragOffset = useRef({ phi: 0, theta: 0 });
  const phiOffset = useRef(0);
  const thetaOffset = useRef(0);
  const velocity = useRef({ phi: 0, theta: 0 });
  const lastPointer = useRef<{ x: number; y: number; t: number } | null>(null);
  const isPaused = useRef(false);
  const speedRef = useRef(1);

  useEffect(() => {
    markersRef.current = markers;
  }, [markers]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY };
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
    isPaused.current = true;
  }, []);

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (pointerInteracting.current === null) return;

    const deltaX = e.clientX - pointerInteracting.current.x;
    const deltaY = e.clientY - pointerInteracting.current.y;
    dragOffset.current = { phi: deltaX / 300, theta: deltaY / 1000 };

    const now = Date.now();
    if (lastPointer.current) {
      const dt = Math.max(now - lastPointer.current.t, 1);
      const maxV = 0.15;
      velocity.current = {
        phi: Math.max(
          -maxV,
          Math.min(maxV, ((e.clientX - lastPointer.current.x) / dt) * 0.3),
        ),
        theta: Math.max(
          -maxV,
          Math.min(maxV, ((e.clientY - lastPointer.current.y) / dt) * 0.08),
        ),
      };
    }
    lastPointer.current = { x: e.clientX, y: e.clientY, t: now };
  }, []);

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffset.current += dragOffset.current.phi;
      thetaOffset.current += dragOffset.current.theta;
      dragOffset.current = { phi: 0, theta: 0 };
      lastPointer.current = null;
    }
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
    isPaused.current = false;
  }, []);

  // Window-level pointer events for drag continuation outside canvas
  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  // Create the globe
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    const size = 620;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    let phi = 0;
    let frameId: number;
    let visible = true;

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: size * dpr,
      height: size * dpr,
      phi: 0,
      theta: 0.35,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 10000,
      mapBrightness: 6,
      baseColor: [0.15, 0.15, 0.2],
      markerColor: [0.75, 0.75, 1],
      glowColor: [0.18, 0.18, 0.75],
      markerElevation: 0.01,
      markers: [],
    });
    globeRef.current = globe;

    const loop = () => {
      if (visible) {
        if (!isPaused.current) {
          phi += 0.003 * speedRef.current;

          // Apply momentum with decay
          if (
            Math.abs(velocity.current.phi) > 0.0001 ||
            Math.abs(velocity.current.theta) > 0.0001
          ) {
            phiOffset.current += velocity.current.phi;
            thetaOffset.current += velocity.current.theta;
            velocity.current.phi *= 0.95;
            velocity.current.theta *= 0.95;
          }

          // Soft spring-back for theta bounds
          const thetaMin = -0.4;
          const thetaMax = 0.4;
          if (thetaOffset.current < thetaMin) {
            thetaOffset.current += (thetaMin - thetaOffset.current) * 0.1;
          } else if (thetaOffset.current > thetaMax) {
            thetaOffset.current += (thetaMax - thetaOffset.current) * 0.1;
          }
        }

        globe.update({
          phi: phi + phiOffset.current + dragOffset.current.phi,
          theta: 0.35 + thetaOffset.current + dragOffset.current.theta,
          markers: markersRef.current.map((m) => ({
            location: [m.lat, m.lng] as [number, number],
            size: 0,
            id: m.country.toLowerCase(),
          })),
        });
      }
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      globe.destroy();
      globeRef.current = null;
    };
  }, []);

  const totalCount = markers.reduce((sum, m) => sum + m.count, 0);

  return (
    <div className="relative">
      {/* Header */}
      <div
        className="font-mono text-[14px] tracking-wide mb-2 space-y-0.5"
        style={{ color: "var(--color-on-surface-variant)" }}
      >
        <div className="flex items-center gap-2">
          <span>
            <span style={{ color: "var(--color-tertiary)" }}>&gt;</span>{" "}
            VISITOR_LOG{" "}
            <span style={{ color: "var(--color-secondary)" }}>{"|"}</span>
          </span>
        </div>
        <div className="pl-[18px]">
          {" "}
          TOTAL_VISITS ={" "}
          <span style={{ color: "var(--color-primary)" }}>{totalCount}</span>
        </div>
      </div>

      {/* Globe canvas */}
      <canvas
        ref={canvasRef}
        style={{ cursor: "grab" }}
        onPointerDown={handlePointerDown}
        onPointerEnter={() => {
          speedRef.current = 0.8;
        }}
        onPointerLeave={() => {
          speedRef.current = 1;
        }}
      />

      {/* CSS-anchored labels */}
      {markers.map((m) => {
        const id = m.country.toLowerCase();
        const dotColor = m.isCurrent
          ? "var(--color-tertiary)"
          : "var(--color-primary)";

        return (
          <div
            key={m.country}
            className="flex items-center gap-1.5 pointer-events-none"
            style={
              {
                position: "absolute",
                positionAnchor: `--cobe-${id}`,
                bottom: "anchor(top)",
                left: "anchor(center)",
                translate: "-50% 0",
                marginBottom: "8px",
                opacity: `var(--cobe-visible-${id}, 0)`,
                filter: `blur(var(--cobe-visible-${id}, 10px))`,
                transition: "opacity 0.8s, filter 0.8s",
              } as React.CSSProperties
            }
          >
            {/* Pulsing live dot */}
            <span className="relative flex h-2 w-2 shrink-0">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: dotColor }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ backgroundColor: dotColor }}
              />
            </span>

            {/* Terminal-style label */}
            <span
              className="font-mono text-[11px] tracking-wide whitespace-nowrap"
              style={{ color: "var(--color-on-surface-variant)" }}
            >
              <span style={{ color: dotColor }}>{m.country}</span>
              {" // "}
              <span style={{ color: "var(--color-secondary)" }}>VISITS = </span>
              <span style={{ color: "var(--color-on-surface)" }}>
                {m.count}
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
}
