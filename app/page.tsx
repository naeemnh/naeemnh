"use client";

import { useState } from "react";
import { Header } from "@/components/organisms";
import { CLI, GUI } from "@/components/pages";

export default function Home() {
  const [isCLI, setIsCLI] = useState(false);

  return (
    <>
      <div className="h-screen font-sans">
        <Header isCLI={isCLI} setIsCLI={setIsCLI} />

        {isCLI ? (
          <CLI setIsCLI={setIsCLI} />
        ) : (
          <GUI />
        )}
      </div>
    </>
  );
}

// Contact Section Component
