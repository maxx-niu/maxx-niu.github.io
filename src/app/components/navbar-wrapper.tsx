"use client";

import { useEffect, useState } from "react";
import Navbar from "./navbar";

export default function NavbarWrapper() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const start = window.innerHeight * 0.3;
      const end = window.innerHeight * 0.8;
      const p = Math.min(
        Math.max((window.scrollY - start) / (end - start), 0),
        1,
      );
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <Navbar progress={progress} />;
}
