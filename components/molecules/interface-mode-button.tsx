"use client";

import { Terminal, Monitor } from "lucide-react";
import { useInterfaceMode } from "@/providers";
import { cn } from "@/lib/utils";

interface InterfaceModeButtonProps {
  mode: "gui" | "cli";
  onClick?: () => void;
  className?: string;
}

export const InterfaceModeButton = ({ mode, onClick, className }: InterfaceModeButtonProps) => {
  const { setIsCLI } = useInterfaceMode();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      if (mode === "gui") {
        setIsCLI(true);
      } else {
        setIsCLI(false);
      }
    }
  };

  const isGuiMode = mode === "gui";

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex items-center justify-center",
        "w-9 h-9 rounded-lg",
        "bg-white/80 backdrop-blur-sm",
        "border border-slate-200 dark:border-slate-700",
        "shadow-sm hover:shadow-md",
        "transition-all duration-200",
        "hover:bg-white dark:hover:bg-slate-800",
        "focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2",
        "active:scale-95",
        className
      )}
      aria-label={isGuiMode ? "Switch to CLI mode" : "Exit CLI mode and return to GUI"}
      title={isGuiMode ? "Switch to CLI mode" : "Exit CLI mode"}
    >
      {isGuiMode ? (
        <Terminal className="w-4 h-4 text-slate-700 dark:text-slate-300" />
      ) : (
        <Monitor className="w-4 h-4 text-slate-300 hover:text-slate-100" />
      )}
    </button>
  );
};
