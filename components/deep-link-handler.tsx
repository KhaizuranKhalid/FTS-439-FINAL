"use client";

import { useDeepLinking } from "@/hooks/use-deep-linking";

export function DeepLinkHandler() {
  useDeepLinking();
  return null;
}
