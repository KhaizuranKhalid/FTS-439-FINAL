"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

interface DockProps {
  className?: string;
  children: React.ReactNode;
  iconSize?: number;
  iconMagnification?: number;
  iconDistance?: number;
  direction?: "left" | "middle" | "right";
  disableMagnification?: boolean;
}

export function Dock({
  className,
  children,
  iconSize = 40,
  iconMagnification = 60,
  iconDistance = 140,
  direction = "middle",
  disableMagnification = true,
}: DockProps) {
  return (
    <div
      className={cn(
        "flex items-end gap-2 rounded-2xl border bg-background/90 p-2 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/70",
        className
      )}
      role="toolbar"
      aria-label="Dock"
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child as any, {
          size: iconSize,
          magnification: iconMagnification,
          distance: iconDistance,
          direction,
          disableMagnification,
        });
      })}
    </div>
  );
}

interface DockIconProps {
  size?: number;
  magnification?: number;
  distance?: number;
  direction?: "left" | "middle" | "right";
  _disableMagnification?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  "aria-label"?: string;
}

export function DockIcon({
  size = 40,
  className,
  children,
  _disableMagnification = true,
  onClick,
  "aria-label": ariaLabel,
}: DockIconProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-xl border bg-muted/70 text-foreground shadow-sm hover:bg-muted",
        className
      )}
      style={{ width: size, height: size }}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  );
}
