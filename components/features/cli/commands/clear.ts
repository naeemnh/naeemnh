import { Command } from "../command-registry";

export const clearCommand: Command = {
  name: "clear",
  aliases: ["cls"],
  description: "Clear the terminal screen",
  usage: "clear [--keep N]",
  handler: (args) => {
    // The actual clearing will be handled by the CLI component
    // This command just signals that clear was called
    return {
      output: "",
      // Special flag to indicate clear action
    };
  },
};
