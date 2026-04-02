"use client";

import Image from "next/image";
import { useState } from "react";

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
  const hasMultiple = images.length > 1;

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
              className="object-contain transition-all duration-700 ease-in-out"
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
    </div>
  );
}
