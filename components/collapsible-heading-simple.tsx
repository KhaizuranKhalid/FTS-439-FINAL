"use client";

import { useState, useEffect } from "react";
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

  useEffect(() => {
    const headingElement = document.getElementById(id || "");
    if (headingElement) {
      headingElement.setAttribute("data-collapsible", "true");
      headingElement.setAttribute("data-expanded", isExpanded.toString());
    }
  }, [id, isExpanded]);

  useEffect(() => {
    const checkHashAndExpand = () => {
      const hash = window.location.hash.slice(1);
      if (hash && id === hash && !isExpanded) {
        setIsExpanded(true);
      }
    };

    checkHashAndExpand();

    window.addEventListener("hashchange", checkHashAndExpand);

    return () => {
      window.removeEventListener("hashchange", checkHashAndExpand);
    };
  }, [id, isExpanded]);

  const _toggleExpanded = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);

    const headingElement = document.getElementById(id || "");
    if (headingElement) {
      headingElement.setAttribute("data-expanded", newExpanded.toString());

      const nextElements: Element[] = [];
      let nextElement = headingElement.nextElementSibling;

      while (nextElement) {
        if (nextElement.tagName && nextElement.tagName.match(/^H[1-5]$/)) {
          const nextHeadingLevel = parseInt(nextElement.tagName[1]);
          if (nextHeadingLevel <= level) {
            break;
          }
        }

        nextElements.push(nextElement);
        nextElement = nextElement.nextElementSibling;
      }

      nextElements.forEach((element) => {
        const htmlElement = element as HTMLElement;
        if (newExpanded) {
          htmlElement.style.display = "";
          htmlElement.style.opacity = "1";
        } else {
          htmlElement.style.display = "none";
          htmlElement.style.opacity = "0";
        }
      });
    }
  };

  const handleAnchorClick = () => {
    if (id) {
      window.history.pushState(null, "", `#${id}`);

      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const HeadingTag = `h${level}` as React.ElementType;

  return (
    <HeadingTag
      id={id}
      className={cn(
        "group flex items-center transition-colors",
        headingStyles[level],
        className
      )}
    >
      <div className="flex items-center">
        {/* <button
          className="flex-shrink-0 p-1 rounded transition-all duration-200 opacity-0 translate-x-[-8px] group-hover:opacity-100 group-hover:translate-x-0"
          onClick={toggleExpanded}
          aria-label={isExpanded ? "Collapse section" : "Expand section"}
        >
          {isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button> */}
        {/* {id && (
          <button
            className="flex-shrink-0 p-1 rounded transition-all duration-200 opacity-0 translate-x-[-8px] group-hover:opacity-100 group-hover:translate-x-0 hover:bg-muted"
            onClick={handleAnchorClick}
            aria-label="Copy link to this section"
            title="Copy link to this section"
          >
            <Link className="h-4 w-4" />
          </button>
        )} */}
        <span className="flex-1 cursor-pointer" onClick={handleAnchorClick}>
          {children}
        </span>
      </div>
    </HeadingTag>
  );
}
