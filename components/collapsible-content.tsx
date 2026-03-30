"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollapsibleSection {
  id: string;
  level: number;
  title: string;
  content: ReactNode[];
  isExpanded: boolean;
}

interface CollapsibleContentProps {
  children: ReactNode;
  defaultExpanded?: boolean;
}

export function CollapsibleContent({
  children,
  defaultExpanded = true,
}: CollapsibleContentProps) {
  const [sections, setSections] = useState<CollapsibleSection[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const processContent = () => {
      const element = contentRef.current;
      if (!element) return;

      const newSections: CollapsibleSection[] = [];
      const children = Array.from(element.children);
      let currentSection: CollapsibleSection | null = null;

      children.forEach((child, _index) => {
        const tagName = child.tagName.toLowerCase();

        if (tagName.match(/^h[1-5]$/)) {
          if (currentSection) {
            newSections.push(currentSection);
          }

          const level = parseInt(tagName[1]);
          const title = child.textContent || "";
          const id =
            child.id ||
            title
              .toLowerCase()
              .replace(/[^\w\s-]/g, "")
              .replace(/\s+/g, "-");

          currentSection = {
            id,
            level,
            title,
            content: [],
            isExpanded: defaultExpanded,
          };
        } else if (currentSection) {
          currentSection.content.push(
            child.cloneNode(true) as unknown as ReactNode
          );
        } else {
          if (newSections.length === 0) {
            currentSection = {
              id: "intro",
              level: 0,
              title: "Introduction",
              content: [],
              isExpanded: defaultExpanded,
            };
          }
          if (currentSection) {
            currentSection.content.push(
              child.cloneNode(true) as unknown as ReactNode
            );
          }
        }
      });

      if (currentSection) {
        newSections.push(currentSection);
      }

      setSections(newSections);
    };

    const timer = setTimeout(processContent, 100);
    return () => clearTimeout(timer);
  }, [children, defaultExpanded]);

  const toggleSection = (sectionId: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? { ...section, isExpanded: !section.isExpanded }
          : section
      )
    );
  };

  const getHeadingStyles = (level: number) => {
    switch (level) {
      case 1:
        return "mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0";
      case 2:
        return "mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0";
      case 3:
        return "mt-8 scroll-m-20 text-xl font-semibold tracking-tight";
      case 4:
        return "mt-6 scroll-m-20 text-lg font-semibold tracking-tight";
      case 5:
        return "mt-6 scroll-m-20 text-base font-semibold tracking-tight";
      default:
        return "mt-6 scroll-m-20 text-lg font-semibold tracking-tight";
    }
  };

  const getHeadingTag = (level: number) => {
    if (level === 0) return "div";
    return `h${level}` as keyof React.JSX.IntrinsicElements;
  };

  return (
    <div ref={contentRef} className="collapsible-content-container">
      {sections.length > 0 ? (
        sections.map((section) => {
          const HeadingTag = getHeadingTag(section.level) as React.ElementType;

          return (
            <div key={section.id} className="collapsible-section">
              <HeadingTag
                id={section.id}
                className={cn(
                  "group flex items-center gap-2 cursor-pointer hover:bg-muted/50 rounded-md px-2 py-1 -mx-2 transition-colors",
                  getHeadingStyles(section.level)
                )}
                onClick={() => toggleSection(section.id)}
              >
                <button
                  className="flex-shrink-0 p-0.5 hover:bg-muted rounded transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSection(section.id);
                  }}
                  aria-label={
                    section.isExpanded ? "Collapse section" : "Expand section"
                  }
                >
                  {section.isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
                <span className="flex-1">{section.title}</span>
              </HeadingTag>

              <div
                className={cn(
                  "collapsible-content transition-all duration-200 ease-in-out overflow-hidden",
                  section.isExpanded
                    ? "max-h-none opacity-100"
                    : "max-h-0 opacity-0"
                )}
                style={{
                  display: section.isExpanded ? "block" : "none",
                }}
              >
                <div className="collapsible-content-inner">
                  {section.content}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="original-content">{children}</div>
      )}
    </div>
  );
}
