import { Command } from "../command-registry";
import { SOCIAL_LINKS } from "@/constants/cli-data";

export const linkedinCommand: Command = {
  name: "linkedin",
  aliases: ["li"],
  description: "Open LinkedIn profile",
  usage: "linkedin",
  handler: () => {
    return {
      output: `Opening LinkedIn: ${SOCIAL_LINKS.linkedin}\n\nUse 'open ${SOCIAL_LINKS.linkedin}' to open in browser.`,
    };
  },
};
