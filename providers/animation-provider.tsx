"use client";

import { createContext, useCallback, useContext, useSyncExternalStore, ReactNode } from "react";

interface AnimationPreferencesContextType {
  isAnimationEnabled: boolean;
  setIsAnimationEnabled: (value: boolean) => void;
}

const AnimationPreferencesContext = createContext<AnimationPreferencesContextType | undefined>(undefined);

interface AnimationPreferencesProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = "animation-enabled";
const DEFAULT_ANIMATION_ENABLED = true;

function readAnimationEnabledFromStorage(): boolean {
  if (typeof window === "undefined") return DEFAULT_ANIMATION_ENABLED;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === null) return DEFAULT_ANIMATION_ENABLED;
    return stored === "true";
  } catch {
    return DEFAULT_ANIMATION_ENABLED;
  }
}

function subscribeToAnimationPreferenceChanges(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};

  const handler = () => callback();

  // Fires for changes in other tabs/windows
  window.addEventListener("storage", handler);
  // Fires for changes in the current tab (we dispatch this event)
  window.addEventListener("animation-preference-change", handler as EventListener);

  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener("animation-preference-change", handler as EventListener);
  };
}

export function AnimationPreferencesProvider({ children }: AnimationPreferencesProviderProps) {
  const isAnimationEnabled = useSyncExternalStore(
    subscribeToAnimationPreferenceChanges,
    readAnimationEnabledFromStorage,
    () => DEFAULT_ANIMATION_ENABLED
  );

  const setIsAnimationEnabled = useCallback((value: boolean) => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, String(value));
    window.dispatchEvent(new Event("animation-preference-change"));
  }, []);

  return (
    <AnimationPreferencesContext.Provider value={{ isAnimationEnabled, setIsAnimationEnabled }}>
      {children}
    </AnimationPreferencesContext.Provider>
  );
}

export function useAnimationPreferences() {
  const context = useContext(AnimationPreferencesContext);
  if (context === undefined) {
    throw new Error("useAnimationPreferences must be used within an AnimationPreferencesProvider");
  }
  return context;
}
