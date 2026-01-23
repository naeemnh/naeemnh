"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface InterfaceModeContextType {
  isCLI: boolean;
  setIsCLI: (value: boolean) => void;
}

const InterfaceModeContext = createContext<InterfaceModeContextType | undefined>(undefined);

interface InterfaceModeProviderProps {
  children: ReactNode;
}

export function InterfaceModeProvider({ children }: InterfaceModeProviderProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  // Initialize from URL query parameter or default to false
  const [isCLI, setIsCLIState] = useState(() => {
    const mode = searchParams.get("mode");
    return mode === "cli";
  });

  // Update URL when mode changes
  const setIsCLI = useCallback(
    (value: boolean) => {
      setIsCLIState(value);
      
      const params = new URLSearchParams(searchParams.toString());
      
      if (value) {
        params.set("mode", "cli");
      } else {
        params.delete("mode");
      }
      
      // Use push to add to browser history for shareable URLs
      const newUrl = params.toString() 
        ? `${pathname}?${params.toString()}` 
        : pathname;
      
      router.push(newUrl, { scroll: false });
    },
    [searchParams, pathname, router]
  );

  // Sync with URL changes (browser back/forward and initial load)
  useEffect(() => {
    const mode = searchParams.get("mode");
    const shouldBeCLI = mode === "cli";
    
    // Only update if different to avoid unnecessary re-renders
    if (shouldBeCLI !== isCLI) {
      setIsCLIState(shouldBeCLI);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]); // Only sync when URL changes, not when state changes

  return (
    <InterfaceModeContext.Provider value={{ isCLI, setIsCLI }}>
      {children}
    </InterfaceModeContext.Provider>
  );
}

export function useInterfaceMode() {
  const context = useContext(InterfaceModeContext);
  if (context === undefined) {
    throw new Error("useInterfaceMode must be used within an InterfaceModeProvider");
  }
  return context;
}
