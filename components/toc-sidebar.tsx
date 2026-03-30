"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { TableOfContents } from "@/components/sidebar/table-of-contents";
import { BlurFade } from "@/components/magic-ui/blur-fade";

interface TocSidebarProps {
  content: string;
}

export function TocSidebar({ content }: TocSidebarProps) {
  const [mounted, setMounted] = useState(false);
  const [tocContainer, setTocContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);

    const container = document.getElementById("toc-sidebar");
    setTocContainer(container);

    if (process.env.NODE_ENV === 'development') {
      console.log("TocSidebar mounted:", {
        mounted: true,
        containerFound: !!container,
        contentLength: content?.length || 0,
      });
    }

    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [content]);

  if (!mounted || !tocContainer) {
    return null;
  }

  return createPortal(
    <div className="h-full py-6 px-4">
      <BlurFade delay={0.5} inView>
        <TableOfContents content={content} />
      </BlurFade>
    </div>,
    tocContainer
  );
}
