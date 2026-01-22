"use client";

import { useEffect, useRef } from "react";
import { OutputLine, OutputLineComponent } from "./output-line";

interface TerminalOutputProps {
  output: OutputLine[];
}

const MAX_OUTPUT_LINES = 1000;

export const TerminalOutput = ({ output }: TerminalOutputProps) => {
  const outputEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new output
  useEffect(() => {
    if (outputEndRef.current) {
      outputEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [output]);

  // Limit output to MAX_OUTPUT_LINES (performance optimization)
  const displayOutput = output.length > MAX_OUTPUT_LINES 
    ? output.slice(-MAX_OUTPUT_LINES)
    : output;

  return (
    <div
      ref={containerRef}
      className="terminal-output flex-1 overflow-y-auto p-4 space-y-1"
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "#475569 transparent",
      }}
    >
      {displayOutput.length === 0 ? (
        <div className="text-slate-500 font-mono text-sm">
          Type 'help' to see available commands.
        </div>
      ) : (
        <>
          {displayOutput.map((line) => (
            <OutputLineComponent key={line.id} line={line} />
          ))}
          <div ref={outputEndRef} />
        </>
      )}
    </div>
  );
};
