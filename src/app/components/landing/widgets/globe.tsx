"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    });

    const loop = () => {
      if (visible) {
        phi += 0.003;
        globe.update({ phi });
      }
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);

    // pause the globe when it is not visible
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
    };
  }, []);

  return <canvas ref={canvasRef} />;
}
