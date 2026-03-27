"use client";

import { useMemo } from "react";

function SessionHash() {
  // use useMemo to memoize the hash so it doesn't re-render on every render
  const hash = useMemo(
    () =>
      Array.from(crypto.getRandomValues(new Uint8Array(4)))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")
        .toUpperCase(),
    [],
  );

  return <span suppressHydrationWarning>CURRENT_SESSION: 0x{hash}</span>;
}

export default SessionHash;
