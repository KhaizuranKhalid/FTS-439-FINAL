"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface HighlighterProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  variant?: "destructive" | "success";
  animationDuration?: number;
  delay?: number;
}

export function Highlighter({
  children,
  className,
  color,
  variant,
  animationDuration = 0.8,
  delay = 0,
}: HighlighterProps) {
  const presetColor = (() => {
    if (color) return color;
    if (variant === "destructive") {
      return "hsl(0 84% 60% / 0.25)";
    }
    if (variant === "success") {
      return "hsl(142 71% 45% / 0.25)";
    }
    return "hsl(50 100% 50% / 0.35)";
  })();
  return (
    <span className={cn("relative inline-block", className)}>
      <motion.span
        className="absolute inset-0 -z-10 rounded-sm"
        style={{ backgroundColor: presetColor, transformOrigin: "left center" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          duration: animationDuration,
          delay,
          ease: "easeInOut",
        }}
      />
      <span className="relative z-10 px-1">{children}</span>
    </span>
  );
}
