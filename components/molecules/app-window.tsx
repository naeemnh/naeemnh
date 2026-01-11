"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { X, Minus, Square } from "lucide-react";
import { useRouter } from "next/navigation";

interface AppWindowProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function AppWindow({ title, children, icon }: AppWindowProps) {
  const router = useRouter();
  const windowRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (windowRef.current) {
      gsap.fromTo(
        windowRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <div
      ref={windowRef}
      className="fixed inset-4 z-50 flex flex-col overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-900 sm:inset-8"
    >
      {/* Window Title Bar */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-800">
        <div className="flex items-center gap-3">
          {icon && <div className="flex h-4 w-4 items-center justify-center">{icon}</div>}
          <h2 className="text-sm font-medium">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded p-1 hover:bg-gray-200 dark:hover:bg-gray-700">
            <Minus className="h-4 w-4" />
          </button>
          <button className="rounded p-1 hover:bg-gray-200 dark:hover:bg-gray-700">
            <Square className="h-4 w-4" />
          </button>
          <button onClick={() => router.push("/")} className="rounded p-1 hover:bg-red-100 dark:hover:bg-red-900/30">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-y-auto p-6">{children}</div>
    </div>
  );
}
