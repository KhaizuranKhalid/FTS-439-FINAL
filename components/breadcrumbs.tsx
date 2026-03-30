"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BreadcrumbItem } from "@/lib/types";
import { cn } from "@/lib/utils";

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollLeft = el.scrollWidth - el.clientWidth;
  }, [items]);

  if (items.length <= 1) return null;

  return (
    <div className={cn("relative mb-2 md:mb-6", className)}>
      <div
        ref={scrollerRef}
        className="relative w-full overflow-x-auto overflow-y-hidden scrollbar-none pb-3"
      >
        <nav
          className="flex w-max items-center space-x-1 text-sm text-muted-foreground pr-6"
          aria-label="Breadcrumb"
        >
          {items.map((item, index) => (
            <div key={item.href} className="flex items-center">
              {index > 0 && (
                <ChevronRight
                  className="mx-2 h-4 w-4 shrink-0"
                  aria-hidden="true"
                />
              )}
              {item.isLast ? (
                <span
                  className="font-medium text-foreground"
                  aria-current="page"
                >
                  {item.title}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-foreground transition-colors whitespace-nowrap"
                >
                  {item.title}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
