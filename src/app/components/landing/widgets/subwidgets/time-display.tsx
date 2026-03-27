"use client";

import { useState, useEffect } from "react";

function formatTime(time: Date, timeZone: string) {
  const date = time
    .toLocaleDateString("en-CA", { timeZone })
    .replace(/-/g, ".");
  const clock = time.toLocaleTimeString("en-US", { timeZone });
  const utcOffset =
    new Intl.DateTimeFormat("en", { timeZone, timeZoneName: "shortOffset" })
      .formatToParts(time)
      .find((p) => p.type === "timeZoneName")
      ?.value?.replace("GMT", "") || "+0";
  return `${date} ${clock} (UTC${utcOffset})`;
}

function useTime() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  return time;
}

export function UserTimeDisplay() {
  const time = useTime();
  const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return (
    <span suppressHydrationWarning>USER_TIME: {formatTime(time, userTz)}</span>
  );
}

export function MyTimeDisplay() {
  const time = useTime();
  return (
    <span suppressHydrationWarning>
      MY_TIME: {formatTime(time, "America/New_York")}
    </span>
  );
}
