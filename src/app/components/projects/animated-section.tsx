"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

export function AnimatedHeader({ children }: { children: ReactNode }) {
  return (
    <motion.header
      className="mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" as const }}
    >
      {children}
    </motion.header>
  );
}

export function AnimatedCard({
  children,
  index,
  className,
}: {
  children: ReactNode;
  index: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ margin: "-50px" }}
      transition={{
        duration: 0.5,
        ease: "easeOut" as const,
        delay: index * 0.1,
      }}
    >
      {children}
    </motion.div>
  );
}
