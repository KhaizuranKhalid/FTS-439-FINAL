"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { TableOfContentsItem } from "@/lib/types";

interface TableOfContentsProps {
  content: string;
  className?: string;
}

export function TableOfContents({ content, className }: TableOfContentsProps) {
  const [toc, setToc] = useState<TableOfContentsItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const headings: TableOfContentsItem[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const title = match[2].trim();
      const id = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");

      headings.push({ id, title, level });
    }
    setToc(headings);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -66%",
        threshold: 0,
      }
    );

    const headingElements = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    headingElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      window.history.pushState(null, "", `#${id}`);
    }
  };

  if (toc.length === 0) {
    return null;
  }

  return (
    <div className={cn("h-full flex flex-col md:pb-3 pb-1", className)}>
      <div className="pb-4 flex-shrink-0 hidden md:block">
        <h3 className="font-semibold text-lg text-foreground">On This Page</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Jump to any section
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto space-y-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted pr-4">
        {toc.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => handleClick(e, item.id)}
            className={cn(
              "block text-sm transition-all duration-200 py-1 md:px-3 px-2.5 rounded-lg border-transparent hover:border-primary/30 hover:bg-muted/50 hover:text-foreground",
              {
                "text-primary font-medium border-primary bg-primary/5":
                  activeId === item.id,
                "text-muted-foreground": activeId !== item.id,
                "ml-0 pb-0": item.level === 1,
                "ml-3": item.level === 2,
                "ml-6": item.level === 3,
                "ml-9": item.level === 4,
                "ml-12": item.level === 5,
                "ml-15": item.level === 6,
              }
            )}
          >
            <span className="line-clamp-2 leading-relaxed">{item.title}</span>
            {item.level === 1 && <div className="w-full h-px bg-border mt-1" />}
          </a>
        ))}
      </nav>

      {toc.length > 3 && (
        <div className="text-xs text-muted-foreground md:pt-2 pt-4 flex-shrink-0">
          {toc.length} sections
        </div>
      )}
    </div>
  );
}
