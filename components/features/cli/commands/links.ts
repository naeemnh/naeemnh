import { Command } from "../command-registry";
import { SOCIAL_LINKS } from "@/constants/cli-data";

export const linksCommand: Command = {
  name: "links",
  aliases: ["social"],
  description: "List all social links",
  usage: "links",
  handler: () => {
    const output = `Social Links:\n\n  GitHub:   ${SOCIAL_LINKS.github}\n  LinkedIn: ${SOCIAL_LINKS.linkedin}\n\nUse 'open <url>' to open links in your browser.`;

    return { output };
  },
};
