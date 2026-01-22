"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface InterfaceModeContextType {
  isCLI: boolean;
  setIsCLI: (value: boolean) => void;
}

const InterfaceModeContext = createContext<InterfaceModeContextType | undefined>(undefined);

interface InterfaceModeProviderProps {
  children: ReactNode;
}

export function InterfaceModeProvider({ children }: InterfaceModeProviderProps) {
  const [isCLI, setIsCLI] = useState(false);

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
