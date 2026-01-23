"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { X, Sun, Moon, Monitor, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";
import { useIsDesktop } from "@/hooks";
import { useAnimationPreferences } from "@/providers";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsPanel = ({ isOpen, onClose }: SettingsPanelProps) => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { isAnimationEnabled, setIsAnimationEnabled } = useAnimationPreferences();
  const isDesktop = useIsDesktop();
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when panel is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Animate panel open/close
  useEffect(() => {
    if (!overlayRef.current || !panelRef.current) return;

    if (isOpen) {
      // Open animation
      gsap.set(overlayRef.current, { display: "flex" });
      gsap.set(panelRef.current, { display: "block" });
      gsap.set(panelRef.current, { clearProps: "transform" });

      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      if (isDesktop) {
        gsap.set(panelRef.current, { y: 0 });
        // Desktop: scale and fade in from center
        gsap.fromTo(
          panelRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
        );
      } else {
        gsap.set(panelRef.current, { opacity: 1, scale: 1 });
        // Mobile: slide up from bottom
        gsap.fromTo(
          panelRef.current,
          { y: "100%" },
          { y: 0, duration: 0.3, ease: "power2.out" }
        );
      }
    } else {
      // Close animation
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(overlayRef.current, { display: "none" });
          gsap.set(panelRef.current, { display: "none" });
        },
      });

      if (isDesktop) {
        gsap.to(panelRef.current, {
          opacity: 0,
          scale: 0.95,
          duration: 0.2,
          ease: "power2.in",
        });
      } else {
        gsap.to(panelRef.current, {
          y: "100%",
          duration: 0.2,
          ease: "power2.in",
        });
      }
    }
  }, [isOpen, isDesktop]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  const themeOptions = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ];

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className={`fixed inset-0 z-[100] hidden bg-black/50 backdrop-blur-sm ${isDesktop ? "items-center justify-center" : "items-end justify-stretch"}`}
      style={{ opacity: 0 }}
    >
      <div
        ref={panelRef}
        className={`
          ${isDesktop ? "max-w-md w-full mx-4 rounded-2xl" : "w-full rounded-t-2xl"}
          bg-white/95 backdrop-blur-xl dark:bg-gray-800/95
          shadow-2xl
          ${isDesktop ? "max-h-[80vh]" : "max-h-[85vh]"}
          flex flex-col
        `}
        style={{ display: "none" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Settings</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close settings"
          >
            <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Theme Section */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Theme</h3>
            <div className="space-y-2">
              {themeOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = theme === option.value || (option.value === "system" && theme === undefined);
                return (
                  <button
                    key={option.value}
                    onClick={() => setTheme(option.value)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-xl
                      transition-all duration-200
                      ${isSelected
                        ? "bg-blue-500 text-white shadow-md"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }
                    `}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="flex-1 text-left font-medium">{option.label}</span>
                    {isSelected && (
                      <div className="h-2 w-2 rounded-full bg-white" />
                    )}
                  </button>
                );
              })}
            </div>
            {theme === "system" && resolvedTheme && (
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Currently using {resolvedTheme === "dark" ? "dark" : "light"} mode
              </p>
            )}
          </div>

          {/* Animation Section */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Animation</h3>
            <div className="flex items-center justify-between p-4 rounded-xl bg-gray-100 dark:bg-gray-700">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Background Animation</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Enable starfield animation</p>
                </div>
              </div>
              <button
                onClick={() => setIsAnimationEnabled(!isAnimationEnabled)}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                  ${isAnimationEnabled ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-600"}
                `}
                role="switch"
                aria-checked={isAnimationEnabled}
                aria-label="Toggle background animation"
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                    ${isAnimationEnabled ? "translate-x-6" : "translate-x-1"}
                  `}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
