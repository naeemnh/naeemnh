import { Command, CLIContext } from "../command-registry";

export const pwdCommand: Command = {
  name: "pwd",
  description: "Show current directory/section",
  usage: "pwd",
  handler: (args, context: CLIContext) => {
    const displayPath = context.currentDirectory === "/" ? "~" : context.currentDirectory;
    return {
      output: displayPath,
    };
  },
};
