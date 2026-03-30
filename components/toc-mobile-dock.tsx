"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { TableOfContents } from "@/components/sidebar/table-of-contents";
import { cn } from "@/lib/utils";
import { ListTree, X } from "lucide-react";
import { Button } from "./ui/button";

export function TocMobileDock({ content }: { content: string }) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [canShowFull, setCanShowFull] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onResize = () => {
      setCanShowFull(window.innerWidth >= 1024);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  if (!mounted) return null;

  if (canShowFull) return null;

  return createPortal(
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/40 transition-opacity",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setOpen(false)}
      />

      <div
        className={cn(
          "fixed bottom-20 right-4 z-50 w-[85vw] max-w-sm overflow-hidden rounded-2xl border bg-background/95 shadow-xl backdrop-blur transition-transform",
          open ? "translate-y-0" : "translate-y-[200%]"
        )}
        role="dialog"
        aria-label="On this page"
      >
        <div className="flex items-center justify-between border-b px-4 py-3 text-sm font-medium">
          <div className="flex flex-col">
            <h3 className="font-semibold text-lg text-foreground">
              On This Page
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Jump to any section
            </p>
          </div>
          <button
            className="rounded p-1 hover:bg-muted"
            onClick={() => setOpen(false)}
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-4">
          <TableOfContents content={content} />
        </div>
      </div>

      <div className="fixed bottom-4 right-4 z-50 md:hidden">
        <Button
          onClick={() => setOpen((v) => !v)}
          aria-label="Open ToC"
          variant="secondary"
          className="h-12 w-12 rounded-lg dark:bg-white/20 bg-black/20 backdrop-blur"
          size="icon"
        >
          <ListTree className="h-8 w-8 dark:text-white text-black" />
        </Button>
      </div>
    </>,
    document.body
  );
}
