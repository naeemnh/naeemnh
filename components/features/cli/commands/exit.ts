import { Command } from "../command-registry";

export const exitCommand: Command = {
  name: "exit",
  aliases: ["quit", "q"],
  description: "Exit CLI mode and return to GUI",
  usage: "exit",
  handler: () => {
    return {
      output: "Exiting CLI mode...",
      exit: true,
    };
  },
};
