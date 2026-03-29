import WidgetBar from "./widget-bar";
import { motion, useAnimate } from "motion/react";
import { useEffect, useState } from "react";

function StatusMetadata({ onComplete, showWidgetBar }: { onComplete?: () => void; showWidgetBar?: boolean }) {
  const [scope, animate] = useAnimate();
  const [part1Done, setPart1Done] = useState(false);
  const [isTextDone, setIsTextDone] = useState(false);

  const PART1 = "SYSTEM_STATUS:";
  const PART2 = "\u00a0OPERATIONAL";
  const PAUSE = 1;

  useEffect(() => {
    const run = async () => {
      await animate("#status-indicator", { opacity: 1 }, { duration: 0.8 });
      await animate(
        "#part1",
        { width: "fit-content" },
        {
          duration: PART1.length * 0.07,
          ease: (t) => Math.round(t * PART1.length) / PART1.length,
        },
      );
      setPart1Done(true);
    };
    run();
  }, [animate]);

  return (
    <motion.div className="flex flex-col space-y-2 mb-12" ref={scope}>
      <div className="flex items-center space-x-3">
        <motion.span
          id="status-indicator"
          className="w-2 h-2 bg-tertiary rounded-full shadow-[0_0_6px_2px_var(--color-tertiary)] opacity-0"
        />
        <div
          className="flex items-center font-mono text-[14px]"
          id="status-text"
        >
          <span
            id="part1"
            className="uppercase tracking-widest text-secondary overflow-hidden whitespace-nowrap block"
            style={{ width: 0 }}
          >
            {PART1}
          </span>

          {part1Done && (
            <motion.span
              className="uppercase tracking-widest text-secondary overflow-hidden whitespace-nowrap block"
              initial={{ width: 0 }}
              animate={{ width: "fit-content" }}
              transition={{
                delay: PAUSE,
                duration: PART2.length * 0.07,
                ease: (t) => Math.round(t * PART2.length) / PART2.length,
              }}
              onAnimationComplete={() => {
                setIsTextDone(true);
                onComplete?.();
              }}
            >
              {PART2}
            </motion.span>
          )}

          <motion.span
            className="inline-block w-[1ch] h-[1.2em] bg-secondary ml-[2px] align-middle"
            animate={isTextDone ? { opacity: [1, 0] } : { opacity: 1 }}
            transition={
              isTextDone
                ? {
                    duration: 1.8,
                    repeat: Infinity,
                    ease: (t) => Math.round(t),
                  }
                : {}
            }
          />
        </div>
      </div>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: showWidgetBar ? "auto" : 0, opacity: showWidgetBar ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ overflow: "hidden" }}
      >
        {showWidgetBar && <WidgetBar />}
      </motion.div>
    </motion.div>
  );
}

export default StatusMetadata;
