export interface ParsedCommand {
  command: string;
  args: string[];
}

/**
 * Parse command input with support for quoted arguments
 * Example: `command arg1 "arg with spaces" arg3` -> { command: "command", args: ["arg1", "arg with spaces", "arg3"] }
 */
export function parseCommand(input: string): ParsedCommand {
  const trimmed = input.trim();
  if (!trimmed) {
    return { command: "", args: [] };
  }

  const parts: string[] = [];
  let current = "";
  let inQuotes = false;
  let quoteChar: '"' | "'" | null = null;

  for (let i = 0; i < trimmed.length; i++) {
    const char = trimmed[i];
    const nextChar = trimmed[i + 1];

    if (char === '"' || char === "'") {
      if (!inQuotes) {
        inQuotes = true;
        quoteChar = char;
      } else if (char === quoteChar) {
        inQuotes = false;
        quoteChar = null;
      } else {
        current += char;
      }
    } else if (char === "\\" && inQuotes && nextChar) {
      // Handle escape sequences
      current += nextChar;
      i++; // Skip next char
    } else if (char === " " && !inQuotes) {
      if (current) {
        parts.push(current);
        current = "";
      }
    } else {
      current += char;
    }
  }

  if (current) {
    parts.push(current);
  }

  if (parts.length === 0) {
    return { command: "", args: [] };
  }

  return {
    command: parts[0].toLowerCase(),
    args: parts.slice(1),
  };
}
