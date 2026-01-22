import { Command, CLIContext } from "../command-registry";

export const historyCommand: Command = {
  name: "history",
  description: "Show command history",
  usage: "history",
  handler: (args, context: CLIContext) => {
    if (context.commandHistory.length === 0) {
      return {
        output: "No command history",
      };
    }

    const output = context.commandHistory
      .map((cmd, index) => `${index + 1}  ${cmd}`)
      .join("\n");

    return { output };
  },
};
