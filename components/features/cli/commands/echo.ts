import { Command } from "../command-registry";

export const echoCommand: Command = {
  name: "echo",
  description: "Display text",
  usage: "echo <text>",
  handler: (args) => {
    return {
      output: args.join(" ") || "",
    };
  },
};
