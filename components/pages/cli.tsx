"use client";

import { useReducer, useCallback, useEffect, useRef } from "react";
import { TerminalWindow, OutputLine, OutputLineType, CommandRegistry, parseCommand, VirtualFileSystem, initializeCommands } from "@/components/features/cli";
import { Env } from "@/config/env";
import { SOCIAL_LINKS } from "@/constants/cli-data";
import { useInterfaceMode } from "@/providers";

interface CLIState {
  output: OutputLine[];
  commandHistory: string[];
  currentDirectory: string;
  isProcessing: boolean;
}

type CLIAction =
  | { type: "ADD_OUTPUT"; payload: OutputLine[]; }
  | { type: "CLEAR_OUTPUT"; }
  | { type: "ADD_COMMAND"; payload: string; }
  | { type: "SET_DIRECTORY"; payload: string; }
  | { type: "SET_PROCESSING"; payload: boolean; };

function cliReducer(state: CLIState, action: CLIAction): CLIState {
  switch (action.type) {
    case "ADD_OUTPUT": {
      const newOutput = [...state.output, ...action.payload];
      // Limit to 1000 lines (performance optimization)
      const limited = newOutput.length > 1000
        ? newOutput.slice(-1000)
        : newOutput;
      return { ...state, output: limited };
    }
    case "CLEAR_OUTPUT":
      return { ...state, output: [] };
    case "ADD_COMMAND":
      return {
        ...state,
        commandHistory: [...state.commandHistory, action.payload],
      };
    case "SET_DIRECTORY":
      return { ...state, currentDirectory: action.payload };
    case "SET_PROCESSING":
      return { ...state, isProcessing: action.payload };
    default:
      return state;
  }
}

export const CLI = () => {
  const { setIsCLI } = useInterfaceMode();
  const vfsRef = useRef(new VirtualFileSystem());
  const registryRef = useRef<CommandRegistry | null>(null);
  const outputIdCounter = useRef(0);

  const [state, dispatch] = useReducer(cliReducer, {
    output: [],
    commandHistory: [],
    currentDirectory: "/home",
    isProcessing: false,
  });

  // Initialize command registry
  useEffect(() => {
    if (!registryRef.current) {
      registryRef.current = initializeCommands(vfsRef.current);

      // Add welcome message
      const welcomeLine: OutputLine = {
        id: `output-${outputIdCounter.current++}`,
        type: "output",
        content: "Welcome to the CLI interface!\nType 'help' to see available commands.",
      };
      dispatch({ type: "ADD_OUTPUT", payload: [welcomeLine] });
    }
  }, []);

  const addOutputLine = useCallback((content: string | React.ReactNode, type: OutputLineType = "output") => {
    const line: OutputLine = {
      id: `output-${outputIdCounter.current++}`,
      type,
      content,
      timestamp: new Date(),
    };
    dispatch({ type: "ADD_OUTPUT", payload: [line] });
  }, []);

  const handleCommand = useCallback(async (input: string) => {
    if (!input.trim()) return;

    const trimmed = input.trim();

    // Add command to history
    dispatch({ type: "ADD_COMMAND", payload: trimmed });

    // Add command line to output
    addOutputLine(trimmed, "command");

    // Parse command
    const parsed = parseCommand(trimmed);

    if (!parsed.command) {
      return;
    }

    // Handle special commands
    if (parsed.command === "exit") {
      setIsCLI(false);
      return;
    }

    // Get command from registry
    const registry = registryRef.current;
    if (!registry) {
      addOutputLine("Command registry not initialized", "error");
      return;
    }

    const command = registry.findByNameOrAlias(parsed.command);

    if (!command) {
      addOutputLine(`Command not found: ${parsed.command}\nType 'help' to see available commands.`, "error");
      return;
    }

    // Handle clear command (works for both 'clear' and 'cls' alias)
    if (command.name === "clear") {
      dispatch({ type: "CLEAR_OUTPUT" });
      return;
    }

    // Execute command
    dispatch({ type: "SET_PROCESSING", payload: true });

    try {
      const context = {
        currentDirectory: state.currentDirectory,
        commandHistory: state.commandHistory,
        setIsCLI,
      };

      const result = await command.handler(parsed.args, context);

      // Handle special command results
      if (result.exit) {
        setIsCLI(false);
        return;
      }

      // Handle resume download - must be before other result handling
      if (parsed.command === "resume" && parsed.args[0] === "download" && Env.RESUME_URL) {
        // Extract URL from command output (which has the modified URL with "1")
        let downloadUrl: string;
        if (result.output && typeof result.output === "string") {
          const urlMatch = result.output.match(/Downloading resume: (.+)/);
          if (urlMatch) {
            downloadUrl = urlMatch[1];
          } else {
            // Fallback: construct URL with "1" suffix
            downloadUrl = Env.RESUME_URL.endsWith("0") || Env.RESUME_URL.endsWith("1")
              ? Env.RESUME_URL.slice(0, -1) + "1"
              : Env.RESUME_URL + "1";
          }
        } else {
          // Fallback: construct URL with "1" suffix
          downloadUrl = Env.RESUME_URL.endsWith("0") || Env.RESUME_URL.endsWith("1")
            ? Env.RESUME_URL.slice(0, -1) + "1"
            : Env.RESUME_URL + "1";
        }
        window.open(downloadUrl, "_blank", "noopener,noreferrer");
        addOutputLine(`Downloading resume...`, "output");
        return;
      }

      // Handle cd command - update directory
      if (parsed.command === "cd") {
        if (result.error) {
          addOutputLine(result.error, "error");
        } else if (result.output && typeof result.output === "string" && result.output.startsWith("/")) {
          dispatch({ type: "SET_DIRECTORY", payload: result.output });
          // Don't output the path, just change directory silently
          return;
        } else if (parsed.args.length === 0) {
          // cd with no args goes to home
          dispatch({ type: "SET_DIRECTORY", payload: "/home" });
          return;
        }
      }

      // Handle open command - open URL in new tab
      if (parsed.command === "open" && result.output && typeof result.output === "string") {
        const urlMatch = result.output.match(/Opening: (.+)/);
        if (urlMatch) {
          const url = urlMatch[1];
          window.open(url, "_blank", "noopener,noreferrer");
          // Show user-friendly message for resume, otherwise show URL
          const friendlyMessage = parsed.args[0]?.toLowerCase() === "resume"
            ? "Opened resume"
            : `Opened: ${url}`;
          addOutputLine(friendlyMessage, "output");
          return;
        }
      }

      // Handle github/linkedin commands - open URLs
      if (parsed.command === "github" || parsed.command === "gh") {
        window.open(SOCIAL_LINKS.github, "_blank", "noopener,noreferrer");
        addOutputLine(`Opened GitHub: ${SOCIAL_LINKS.github}`, "output");
        return;
      }

      if (parsed.command === "linkedin" || parsed.command === "li") {
        window.open(SOCIAL_LINKS.linkedin, "_blank", "noopener,noreferrer");
        addOutputLine(`Opened LinkedIn: ${SOCIAL_LINKS.linkedin}`, "output");
        return;
      }

      // Display result
      if (result.error) {
        addOutputLine(result.error, "error");
      } else if (result.output !== undefined && result.output !== "") {
        addOutputLine(result.output, "output");
      }
    } catch (error) {
      addOutputLine(
        `Error executing command: ${error instanceof Error ? error.message : "Unknown error"}`,
        "error"
      );
    } finally {
      dispatch({ type: "SET_PROCESSING", payload: false });
    }
  }, [state.currentDirectory, state.commandHistory, addOutputLine, setIsCLI]);

  const handleExit = useCallback(() => {
    setIsCLI(false);
  }, [setIsCLI]);

  return (
    <div className="h-screen">
      <TerminalWindow
        output={state.output}
        currentDirectory={state.currentDirectory}
        commandHistory={state.commandHistory}
        onCommand={handleCommand}
        onExit={handleExit}
      />
    </div>
  );
};
