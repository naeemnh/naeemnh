import { Command } from "../command-registry";
import { SOCIAL_LINKS } from "@/constants/cli-data";

export const contactCommand: Command = {
  name: "contact",
  description: "Display contact information",
  usage: "contact",
  handler: () => {
    const output = `Get In Touch\n\nWant to build something together? Have an interesting problem? I read everything.\n\nSocial Links:\n  GitHub: ${SOCIAL_LINKS.github}\n  LinkedIn: ${SOCIAL_LINKS.linkedin}\n\nUse 'open <url>' to open links in your browser.`;

    return { output };
  },
};
