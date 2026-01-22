import { Command, CLIContext, CommandRegistry } from "../command-registry";

// We'll need to pass registry to help command
export const createHelpCommand = (registry: CommandRegistry): Command => ({
  name: "help",
  aliases: ["?"],
  description: "Display available commands and usage",
  usage: "help [command]",
  handler: (args, context: CLIContext) => {
    // If a specific command is requested, show its help
    if (args.length > 0) {
      const commandName = args[0].toLowerCase();
      const command = registry.findByNameOrAlias(commandName);
      
      if (command) {
        const aliases = command.aliases ? ` (aliases: ${command.aliases.join(", ")})` : "";
        const usage = command.usage ? `\nUsage: ${command.usage}` : "";
        return {
          output: `${command.name}${aliases}\n\n${command.description}${usage}`,
        };
      } else {
        return {
          error: `Command not found: ${commandName}`,
        };
      }
    }

    // Show all commands
    const allCommands = registry.getAll();
    const commands = [
      "Available Commands:",
      "",
      ...allCommands.map(cmd => {
        const aliases = cmd.aliases ? ` (${cmd.aliases.join(", ")})` : "";
        return `  ${cmd.name}${aliases.padEnd(20)} - ${cmd.description}`;
      }),
      "",
      "Type 'help <command>' for more information about a specific command.",
    ].join("\n");

    return { output: commands };
  },
});
