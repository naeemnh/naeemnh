"use client";

import { useInterfaceMode } from "@/providers";
import { Header } from "@/components/organisms";
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
            <Header />
            <GUI />
          </>
        )}
      </div>
    </>
  );
}

// Contact Section Component
