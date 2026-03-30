"use client";

import { cn } from "@/lib/utils";

interface ProgressiveBlurProps {
  className?: string;
  size?: string;
  position?: "left" | "right" | "both" | "top" | "bottom";
  blurLevels?: number[];
  orientation?: "horizontal" | "vertical";
}

export function ProgressiveBlur({
  className,
  size = "30%",
  position = "both",
  blurLevels = [0.5, 1, 2, 4, 8, 16, 32],
  orientation = "horizontal",
}: ProgressiveBlurProps) {
  const isHorizontal = orientation === "horizontal";

  const common = cn(
    "pointer-events-none absolute inset-0 z-10 flex",
    isHorizontal ? "justify-between" : "flex-col justify-between",
    className
  );

  const renderSide = (side: "left" | "right" | "top" | "bottom") => {
    const _isStart = side === "left" || side === "top";
    const layers = blurLevels.map((b, i) => {
      const style: React.CSSProperties = isHorizontal
        ? {
            width: `calc(${size} / ${i + 1})`,
            height: "100%",
            [side]: 0,
            position: "absolute",
            backdropFilter: `blur(${b}px)` as any,
            WebkitBackdropFilter: `blur(${b}px)` as any,
            background:
              side === "left"
                ? "linear-gradient(to right, var(--background), transparent)"
                : "linear-gradient(to left, var(--background), transparent)",
          }
        : {
            height: `calc(${size} / ${i + 1})`,
            width: "100%",
            [side]: 0,
            position: "absolute",
            backdropFilter: `blur(${b}px)` as any,
            WebkitBackdropFilter: `blur(${b}px)` as any,
            background:
              side === "top"
                ? "linear-gradient(to bottom, var(--background), transparent)"
                : "linear-gradient(to top, var(--background), transparent)",
          };
      return <div key={`${side}-${i}`} style={style} />;
    });

    return <div className="relative">{layers}</div>;
  };

  return (
    <div className={common} aria-hidden>
      {((isHorizontal && (position === "left" || position === "both")) ||
        (!isHorizontal && (position === "top" || position === "both"))) &&
        renderSide(isHorizontal ? "left" : "top")}
      {((isHorizontal && (position === "right" || position === "both")) ||
        (!isHorizontal && (position === "bottom" || position === "both"))) &&
        renderSide(isHorizontal ? "right" : "bottom")}
    </div>
  );
}
