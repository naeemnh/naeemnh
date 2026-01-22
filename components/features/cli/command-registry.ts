import { OutputLine } from "./output-line";

export interface CLIContext {
  currentDirectory: string;
  commandHistory: string[];
  setIsCLI?: (value: boolean) => void;
}

export type CommandResult = {
  output: string | React.ReactNode;
  error?: string;
  exit?: boolean;
};

export interface Command {
  name: string;
  aliases?: string[];
  description: string;
  usage?: string;
  handler: (args: string[], context: CLIContext) => CommandResult | Promise<CommandResult>;
}

export class CommandRegistry {
  private commands: Map<string, Command> = new Map();

  register(command: Command): void {
    // Register main command name
    this.commands.set(command.name.toLowerCase(), command);

    // Register aliases
    if (command.aliases) {
      command.aliases.forEach((alias) => {
        this.commands.set(alias.toLowerCase(), command);
      });
    }
  }

  get(name: string): Command | undefined {
    return this.commands.get(name.toLowerCase());
  }

  findByNameOrAlias(input: string): Command | undefined {
    return this.commands.get(input.toLowerCase());
  }

  getAll(): Command[] {
    // Return unique commands (deduplicate by name)
    const seen = new Set<string>();
    const unique: Command[] = [];
    
    this.commands.forEach((command) => {
      if (!seen.has(command.name.toLowerCase())) {
        seen.add(command.name.toLowerCase());
        unique.push(command);
      }
    });

    return unique.sort((a, b) => a.name.localeCompare(b.name));
  }
}
