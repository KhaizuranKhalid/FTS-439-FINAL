"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import mermaid from "mermaid";
import { useTheme } from "next-themes";

type MermaidProps = {
  code: string;
  className?: string;
};

export default function Mermaid({ code, className }: MermaidProps) {
  const { theme, systemTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  const resolvedTheme = useMemo(() => {
    const current = theme === "system" ? systemTheme : theme;
    return current === "dark" ? "dark" : "default";
  }, [theme, systemTheme]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "loose",
      theme: resolvedTheme,
    });

    let cancelled = false;
    const render = async () => {
      try {
        const { svg } = await mermaid.render(
          `mermaid-${Math.random().toString(36).slice(2)}`,
          code
        );
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch {
        if (!cancelled && containerRef.current) {
          containerRef.current.textContent = code;
        }
      }
    };

    render();
    return () => {
      cancelled = true;
    };
  }, [code, resolvedTheme, mounted]);

  return (
    <div
      ref={containerRef}
      className={
        className ||
        "my-6 overflow-x-auto rounded-lg border bg-[#f6f8fa] dark:bg-[#212121] border-[#e1e4e8] dark:border-[#30363d] p-4"
      }
    />
  );
}
