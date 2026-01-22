import { Command } from "../command-registry";

export const dateCommand: Command = {
  name: "date",
  aliases: ["time"],
  description: "Show current date/time",
  usage: "date",
  handler: () => {
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const timeStr = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    return {
      output: `${dateStr}\n${timeStr}`,
    };
  },
};
