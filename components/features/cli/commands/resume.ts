import { Command } from "../command-registry";
import { Env } from "@/config/env";

function getResumeUrl(suffix: "0" | "1"): string {
  if (!Env.RESUME_URL) return "";

  // If URL ends with 0 or 1, replace it with the new suffix
  // Otherwise, append the suffix
  if (Env.RESUME_URL.endsWith("0") || Env.RESUME_URL.endsWith("1")) {
    return Env.RESUME_URL.slice(0, -1) + suffix;
  }
  return Env.RESUME_URL + suffix;
}

export const resumeCommand: Command = {
  name: "resume",
  aliases: ["cv"],
  description: "View or download resume",
  usage: "resume [download]",
  handler: (args) => {
    if (args.length > 0 && args[0].toLowerCase() === "download") {
      if (Env.RESUME_URL) {
        const downloadUrl = getResumeUrl("1");
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
