import { Command } from "../command-registry";
import { SOCIAL_LINKS, PROJECTS } from "@/constants/cli-data";
import { Env } from "@/config/env";

export const openCommand: Command = {
  name: "open",
  description: "Open a URL in new tab",
  usage: "open <url>",
  handler: (args) => {
    if (args.length === 0) {
      return {
        error: "Usage: open <url> or open <project-name>",
      };
    }

    const input = args.join(" ");
    let url = input;

    // Check if it's "resume"
    if (input.toLowerCase() === "resume") {
      if (Env.RESUME_URL) {
        // For open, ensure URL ends with "0"
        // If URL ends with 0 or 1, replace it with "0"
        // Otherwise, append "0"
        if (Env.RESUME_URL.endsWith("0") || Env.RESUME_URL.endsWith("1")) {
          url = Env.RESUME_URL.slice(0, -1) + "0";
        } else {
          url = Env.RESUME_URL + "0";
        }
      } else {
        return {
          error: "Resume URL not configured",
        };
      }
    } else if (input === "github" || input === "gh") {
      url = SOCIAL_LINKS.github;
    } else if (input === "linkedin" || input === "li") {
      url = SOCIAL_LINKS.linkedin;
    } else {
      // Check if it's a project name
      const project = PROJECTS.find(p => 
        p.title.toLowerCase().replace(/\s+/g, "-") === input.toLowerCase() ||
        p.title.toLowerCase() === input.toLowerCase()
      );

      if (project) {
        url = project.link;
      } else if (!url.startsWith("http://") && !url.startsWith("https://")) {
        // Try to add https://
        url = `https://${url}`;
      }
    }

    // Open in new tab (this will be handled by the CLI component)
    return {
      output: `Opening: ${url}`,
    };
  },
};
