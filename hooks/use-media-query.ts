"use client";

import { useSyncExternalStore } from "react";

export function useMediaQuery(query: string): boolean {
  const getSnapshot = () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  };

  const subscribe = (callback: () => void) => {
    if (typeof window === "undefined") return () => {};
    const media = window.matchMedia(query);
    const listener = () => callback();
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  };

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

export function useIsDesktop(): boolean {
  return useMediaQuery("(min-width: 768px)");
}

export function useIsMobile(): boolean {
  return !useMediaQuery("(min-width: 768px)");
}

