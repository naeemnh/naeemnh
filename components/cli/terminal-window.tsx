"use client";

import { TerminalOutput } from "./terminal-output";
import { TerminalInput } from "./terminal-input";
import { OutputLine } from "./output-line";

interface TerminalWindowProps {
  output: OutputLine[];
  currentDirectory: string;
  commandHistory: string[];
  onCommand: (command: string) => void;
  onExit?: () => void;
}

export const TerminalWindow = ({
  output,
  currentDirectory,
  commandHistory,
  onCommand,
  onExit,
}: TerminalWindowProps) => {
  return (
    <div className="h-screen flex flex-col bg-slate-950 text-slate-100 font-mono overflow-hidden">
      {/* Terminal Output Area */}
      <TerminalOutput output={output} />

      {/* Terminal Input Area - Fixed at Bottom */}
      <TerminalInput
        currentDirectory={currentDirectory}
        commandHistory={commandHistory}
        onCommand={onCommand}
        onExit={onExit}
      />
    </div>
  );
};
