import { Command } from "../command-registry";
import { SOCIAL_LINKS } from "@/constants/cli-data";

export const githubCommand: Command = {
  name: "github",
  aliases: ["gh"],
  description: "Open GitHub profile",
  usage: "github",
  handler: () => {
    return {
      output: `Opening GitHub: ${SOCIAL_LINKS.github}\n\nUse 'open ${SOCIAL_LINKS.github}' to open in browser.`,
    };
  },
};
