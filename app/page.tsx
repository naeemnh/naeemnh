"use client";

import { useInterfaceMode } from "@/providers";
import { CLI, GUI } from "@/components/pages";

export default function Home() {
  const { isCLI } = useInterfaceMode();

  return (
    <>
      <div className="h-screen font-sans">
        {isCLI ? (
          <CLI />
        ) : (
          <>
            <GUI />
          </>
        )}
      </div>
    </>
  );
}

// Contact Section Component
