"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollapsibleHeadingProps {
  level: 1 | 2 | 3 | 4 | 5;
  id?: string;
  className?: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

const headingStyles = {
  1: "mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
  2: "mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0",
  3: "mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
  4: "mt-6 scroll-m-20 text-lg font-semibold tracking-tight",
  5: "mt-6 scroll-m-20 text-base font-semibold tracking-tight",
};

export function CollapsibleHeading({
  level,
  id,
  className,
  children,
  defaultExpanded = true,
}: CollapsibleHeadingProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [_hasContent, setHasContent] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const nextElement = contentRef.current.nextElementSibling;
      setHasContent(!!nextElement);
    }
  }, []);

  const HeadingTag = `h${level}` as React.ElementType;

  return (
    <div className="collapsible-heading-wrapper">
      <HeadingTag
        id={id}
        className={cn(
          "group flex items-center gap-2 cursor-pointer hover:bg-muted/50 rounded-md px-2 py-1 -mx-2 transition-colors",
          headingStyles[level],
          className
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <button
          className="flex-shrink-0 p-2 hover:bg-muted rounded transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          aria-label={isExpanded ? "Collapse section" : "Expand section"}
        >
          {isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
        <span className="flex-1">{children}</span>
      </HeadingTag>
      <div
        ref={contentRef}
        className={cn(
          "collapsible-content transition-all duration-200 ease-in-out overflow-hidden",
          isExpanded ? "max-h-none opacity-100" : "max-h-0 opacity-0"
        )}
        style={{
          display: isExpanded ? "block" : "none",
        }}
      ></div>
    </div>
  );
}

export function CollapsibleContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="collapsible-content-wrapper">{children}</div>;
}
