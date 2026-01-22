"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";

interface TerminalInputProps {
  currentDirectory: string;
  commandHistory: string[];
  onCommand: (command: string) => void;
  onExit?: () => void;
}

export const TerminalInput = ({ 
  currentDirectory, 
  commandHistory, 
  onCommand,
  onExit 
}: TerminalInputProps) => {
  const [input, setInput] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on mount and when clicking in terminal area
  useEffect(() => {
    const handleClick = () => {
      inputRef.current?.focus();
    };

    document.addEventListener("click", handleClick);
    inputRef.current?.focus();

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const command = input.trim();
      if (command) {
        onCommand(command);
        setInput("");
        setHistoryIndex(-1);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Autocomplete will be implemented in Phase 5
    } else if (e.key === "Escape") {
      setInput("");
      setHistoryIndex(-1);
    }
  };

  const getPrompt = () => {
    const dir = currentDirectory === "/" ? "~" : currentDirectory;
    return `user@portfolio:${dir}$ `;
  };

  return (
    <div className="flex items-center px-4 py-3 bg-slate-900 border-t border-slate-700">
      <span className="text-slate-400 font-mono text-sm mr-2 select-none">
        {getPrompt()}
      </span>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setHistoryIndex(-1);
        }}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent text-slate-100 font-mono text-sm outline-none caret-slate-100"
        style={{ caretColor: "#f1f5f9" }}
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck="false"
        aria-label="Command input"
      />
    </div>
  );
};
