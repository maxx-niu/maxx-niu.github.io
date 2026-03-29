"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const size = Math.round(window.innerWidth / 2);
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    let phi = 0;
    let frameId: number;

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: size * 2,
      height: size * 2,
      phi: 0,
      theta: 0.25,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.15, 0.15, 0.2],
      markerColor: [0.75, 0.75, 1],
      glowColor: [0.18, 0.18, 0.75],
    });

    const loop = () => {
      phi += 0.003;
      globe.update({ phi });
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameId);
      globe.destroy();
    };
  }, []);

  return <canvas ref={canvasRef} />;
}
