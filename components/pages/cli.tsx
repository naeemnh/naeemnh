"use client";

import { useReducer, useCallback, useEffect, useRef } from "react";
import { TerminalWindow, OutputLine, OutputLineType, CommandRegistry, parseCommand, VirtualFileSystem, initializeCommands, getPrompt } from "@/components/features/cli";
import { Env } from "@/config/env";
import { SOCIAL_LINKS } from "@/constants/cli-data";
import { useInterfaceMode } from "@/providers";
import { isFormInProgress, getFormPrompt, resetFormState } from "@/components/features/cli/commands/form";

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
  | { type: "SET_PROCESSING"; payload: boolean; }
  | { type: "REMOVE_TEMPORARY"; };

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
    case "REMOVE_TEMPORARY":
      return { ...state, output: state.output.filter(line => !line.isTemporary) };
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

  const addOutputLine = useCallback((content: string | React.ReactNode, type: OutputLineType = "output", isTemporary: boolean = false) => {
    // Split content by newlines to handle multi-line output
    const contentStr = typeof content === "string" ? content : String(content);
    const lines = contentStr.split("\n");
    
    const outputLines: OutputLine[] = lines.map((lineContent, index) => {
      const isLastLine = index === lines.length - 1;
      return {
        id: `output-${outputIdCounter.current++}`,
        type,
        content: lineContent,
        timestamp: new Date(),
        isTemporary: isTemporary && isLastLine, // Only mark the last line as temporary
      };
    });
    
    dispatch({ type: "ADD_OUTPUT", payload: outputLines });
  }, []);

  const handleCommand = useCallback(async (input: string) => {
    if (!input.trim()) return;

    const trimmed = input.trim();

    // Parse command first
    const parsed = parseCommand(trimmed);

    // Check if form is in progress - if so, route input to form handler
    // Allow exit and cancel commands to work even during form
    if (isFormInProgress() && parsed.command !== "exit" && parsed.command !== "cancel") {
      // Remove temporary prompt lines before processing input
      dispatch({ type: "REMOVE_TEMPORARY" });

      // Add command to history
      dispatch({ type: "ADD_COMMAND", payload: trimmed });

      // Get form command and process input
      const registry = registryRef.current;
      if (registry) {
        const formCommand = registry.findByNameOrAlias("form");
        if (formCommand) {
          dispatch({ type: "SET_PROCESSING", payload: true });
          try {
            const context = {
              currentDirectory: state.currentDirectory,
              commandHistory: state.commandHistory,
              setIsCLI,
            };
            const result = await formCommand.handler([trimmed], context);

            if (result.error) {
              addOutputLine(result.error, "error");
              // Show prompt again if form is still in progress
              if (isFormInProgress()) {
                const prompt = getFormPrompt();
                if (prompt) {
                  addOutputLine(prompt, "output", true); // Mark as temporary
                }
              }
            } else if (result.output !== undefined && result.output !== "") {
              // Add output, marking last line as temporary if it's a prompt
              addOutputLine(result.output, "output", result.isTemporaryPrompt || false);
            }
          } catch (error) {
            addOutputLine(
              `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
              "error"
            );
          } finally {
            dispatch({ type: "SET_PROCESSING", payload: false });
          }
        }
      }
      return;
    }

    // Handle cancel command to exit form
    if (parsed.command === "cancel" && isFormInProgress()) {
      // Reset form state
      resetFormState();
      addOutputLine("Form cancelled.", "output");
      dispatch({ type: "ADD_COMMAND", payload: trimmed });
      return;
    }

    // Add command to history
    dispatch({ type: "ADD_COMMAND", payload: trimmed });

    // Add command line to output with prompt prefix
    addOutputLine(`${getPrompt(state.currentDirectory)}${trimmed}`, "command");

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
        addOutputLine(result.output, "output", result.isTemporaryPrompt || false);
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
