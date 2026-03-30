"use client";

import { useEffect } from "react";

export function useDeepLinking() {
  useEffect(() => {
    const handleDeepLink = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;

      const targetHeading = document.getElementById(hash);
      if (!targetHeading) return;

      const parentHeadings: HTMLElement[] = [];
      let currentElement = targetHeading.previousElementSibling;

      while (currentElement) {
        if (
          currentElement.tagName &&
          currentElement.tagName.match(/^H[1-5]$/)
        ) {
          const headingLevel = parseInt(currentElement.tagName[1]);
          const targetLevel = parseInt(targetHeading.tagName[1]);

          if (headingLevel < targetLevel) {
            parentHeadings.push(currentElement as HTMLElement);
          } else if (headingLevel >= targetLevel) {
            break;
          }
        }
        currentElement = currentElement.previousElementSibling;
      }

      parentHeadings.forEach((heading) => {
        const isExpanded = heading.getAttribute("data-expanded") === "true";
        if (!isExpanded) {
          const button = heading.querySelector(
            'button[aria-label*="Collapse"], button[aria-label*="Expand"]'
          );
          if (button) {
            (button as HTMLButtonElement).click();
          }
        }
      });

      setTimeout(() => {
        targetHeading.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }, 200);
    };

    const timer = setTimeout(handleDeepLink, 100);

    window.addEventListener("hashchange", handleDeepLink);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("hashchange", handleDeepLink);
    };
  }, []);
}
