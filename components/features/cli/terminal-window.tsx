"use client";

import { TerminalOutput } from "./terminal-output";
import { TerminalInput } from "./terminal-input";
import { OutputLine } from "./output-line";
import { InterfaceModeButton } from "@/components/molecules";

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
    <div className="h-screen flex flex-col bg-slate-950 text-slate-100 font-mono overflow-hidden relative">
      {/* Exit Button - Top Right */}
      {onExit && (
        <div className="absolute top-4 right-4 z-10">
          <InterfaceModeButton
            mode="cli"
            onClick={onExit}
            className="bg-slate-800/80 backdrop-blur-sm border-slate-700 hover:bg-slate-700/80 text-slate-300 hover:text-slate-100"
          />
        </div>
      )}

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
