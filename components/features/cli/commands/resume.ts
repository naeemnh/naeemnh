import { Command } from "../command-registry";
import { Env } from "@/config/env";
import { getResumeDownloadUrl } from "@/lib/resume-url";

export const resumeCommand: Command = {
  name: "resume",
  aliases: ["cv"],
  description: "View or download resume",
  usage: "resume [download]",
  handler: (args) => {
    if (args.length > 0 && args[0].toLowerCase() === "download") {
      if (Env.RESUME_URL) {
        const downloadUrl = getResumeDownloadUrl();
        // Return special output that will trigger download
        return {
          output: `Downloading resume: ${downloadUrl}`,
        };
      } else {
        return {
          error: "Resume URL not configured",
        };
      }
    }

    if (Env.RESUME_URL) {
      return {
        output: `Resume available at: ${Env.RESUME_URL}\n\nUse 'resume download' to download, or 'open resume' to open in browser.`,
      };
    } else {
      return {
        output: "Resume URL not configured. Please contact me directly.",
      };
    }
  },
};
