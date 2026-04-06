"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";

interface ImageCarouselProps {
  images: string[];
  title: string;
  isFeatured?: boolean;
}

export default function ImageCarousel({
  images,
  title,
  isFeatured,
}: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const hasMultiple = images.length > 1;

  useEffect(() => {
    if (!fullscreen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullscreen(false);
      if (e.key === "ArrowLeft")
        setCurrent((c) => (c - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") setCurrent((c) => (c + 1) % images.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [fullscreen, images.length]);

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrent((c) => (c - 1 + images.length) % images.length);
  };
  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrent((c) => (c + 1) % images.length);
  };

  return (
    <div
      className={`relative overflow-hidden bg-surface-container-lowest ${isFeatured ? "aspect-video lg:aspect-auto lg:w-3/5" : "aspect-video"}`}
    >
      {images.map((src, i) => {
        const isActive = i === current;
        return (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-700 ${isActive ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            style={{ zIndex: 1 }}
          >
            {/* Blurred backdrop */}
            <Image
              src={src}
              alt=""
              aria-hidden
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover scale-110 blur-xl opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-700"
            />
            {/* Main image */}
            <Image
              src={src}
              alt={`${title} screenshot ${i + 1}`}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-contain transition-all duration-700 ease-in-out cursor-zoom-in"
              onClick={(e) => {
                e.preventDefault();
                setFullscreen(true);
              }}
            />
          </div>
        );
      })}

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[100%_2px,3px_100%]"
        style={{ zIndex: 2 }}
      />

      {hasMultiple && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 cursor-pointer top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center bg-surface/60 border border-outline-variant/40 text-on-surface hover:bg-primary hover:text-on-primary hover:border-primary transition-all font-mono text-xs"
            style={{ zIndex: 3 }}
            aria-label="Previous image"
          >
            ←
          </button>
          <button
            onClick={next}
            className="absolute right-2 cursor-pointer top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center bg-surface/60 border border-outline-variant/40 text-on-surface hover:bg-primary hover:text-on-primary hover:border-primary transition-all font-mono text-xs"
            style={{ zIndex: 3 }}
            aria-label="Next image"
          >
            →
          </button>
          <div
            className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5"
            style={{ zIndex: 3 }}
          >
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrent(i);
                }}
                className={`w-1.5 h-1.5 transition-all ${i === current ? "bg-primary" : "bg-outline/50"} cursor-pointer`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}

      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {fullscreen && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setFullscreen(false)}
              />

              {/* Image container — scale + fade */}
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={current}
                    className="relative w-full h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Image
                      src={images[current]}
                      alt={`${title} screenshot ${current + 1}`}
                      fill
                      sizes="100vw"
                      className="object-contain p-8 cursor-zoom-out"
                      onClick={() => setFullscreen(false)}
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Controls */}
              <div className="fixed inset-0 z-50 pointer-events-none">
                <button
                  onClick={() => setFullscreen(false)}
                  className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-surface/60 border border-outline-variant/40 text-on-surface hover:bg-primary hover:text-on-primary hover:border-primary transition-all font-mono text-sm cursor-pointer pointer-events-auto"
                  aria-label="Close fullscreen"
                >
                  ✕
                </button>

                {hasMultiple && (
                  <>
                    <button
                      onClick={() =>
                        setCurrent(
                          (c) => (c - 1 + images.length) % images.length,
                        )
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-surface/60 border border-outline-variant/40 text-on-surface hover:bg-primary hover:text-on-primary hover:border-primary transition-all font-mono text-sm cursor-pointer pointer-events-auto"
                      aria-label="Previous image"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => setCurrent((c) => (c + 1) % images.length)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-surface/60 border border-outline-variant/40 text-on-surface hover:bg-primary hover:text-on-primary hover:border-primary transition-all font-mono text-sm cursor-pointer pointer-events-auto"
                      aria-label="Next image"
                    >
                      →
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrent(i)}
                          className={`w-2 h-2 transition-all ${i === current ? "bg-primary" : "bg-outline/50"} cursor-pointer pointer-events-auto`}
                          aria-label={`Go to image ${i + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  );
}
