"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollapsibleSectionProps {
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

export function CollapsibleSection({
  level,
  id,
  className,
  children,
  defaultExpanded = true,
}: CollapsibleSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      const heading = sectionRef.current.querySelector("h1, h2, h3, h4, h5");
      if (heading) {
        const contentContainer = sectionRef.current.querySelector(
          ".collapsible-content"
        );
        if (contentContainer) {
          let nextElement = heading.nextElementSibling;
          while (nextElement) {
            const currentElement = nextElement;
            nextElement = nextElement.nextElementSibling;

            if (
              currentElement.tagName &&
              currentElement.tagName.match(/^H[1-5]$/)
            ) {
              const nextHeadingLevel = parseInt(currentElement.tagName[1]);
              if (nextHeadingLevel <= level) {
                break;
              }
            }

            contentContainer.appendChild(currentElement);
          }
        }
      }
    }
  }, [level]);

  const HeadingTag = `h${level}` as React.ElementType;

  return (
    <div ref={sectionRef} className="collapsible-section-wrapper">
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
          className="flex-shrink-0 p-0.5 hover:bg-muted rounded transition-colors"
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
