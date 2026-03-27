"use client";

import { ReactNode, useRef, useEffect, useState } from "react";
import Location from "./subwidgets/location";
import { UserTimeDisplay, MyTimeDisplay } from "./subwidgets/time-display";
import SessionHash from "./subwidgets/session-hash";
import SystemSpecs from "./subwidgets/system-specs";

const SEPARATOR = <span className="text-outline-variant">{"//"}</span>;

function TickerItem({ children }: { children: ReactNode }) {
  return <span className="inline-block px-4">{children}</span>;
}

function WidgetSet() {
  return (
    <>
      <TickerItem>
        <Location />
      </TickerItem>
      <TickerItem>{SEPARATOR}</TickerItem>
      <TickerItem>
        <UserTimeDisplay />
      </TickerItem>
      <TickerItem>{SEPARATOR}</TickerItem>
      <TickerItem>
        <MyTimeDisplay />
      </TickerItem>
      <TickerItem>{SEPARATOR}</TickerItem>
      <TickerItem>
        <SessionHash />
      </TickerItem>
      <TickerItem>{SEPARATOR}</TickerItem>
      <TickerItem>
        <SystemSpecs />
      </TickerItem>
      <TickerItem>{SEPARATOR}</TickerItem>
    </>
  );
}

function WidgetBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new ResizeObserver(([entry]) => {
      setWidth(entry.borderBoxSize[0].inlineSize);
    });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="relative w-full overflow-hidden font-mono text-[12px] uppercase tracking-widest text-outline">
      {width > 0 && (
        <style>{`
          @keyframes ticker {
            from { transform: translateX(0); }
            to { transform: translateX(-${width}px); }
          }
        `}</style>
      )}

      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Two identical copies. Translates exactly one copy's pixel width,
          so copy B seamlessly replaces copy A with no snap. */}
      <div
        className="flex whitespace-nowrap"
        style={{ animation: width > 0 ? "ticker 30s linear infinite" : "none" }}
      >
        <div ref={ref} className="flex items-center shrink-0">
          <WidgetSet />
        </div>
        <div className="flex items-center shrink-0" aria-hidden>
          <WidgetSet />
        </div>
      </div>
    </div>
  );
}

export default WidgetBar;
