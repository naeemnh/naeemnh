import { Command } from "../command-registry";
import { EXPERIENCE } from "@/constants/cli-data";

export const experienceCommand: Command = {
  name: "experience",
  aliases: ["exp", "work"],
  description: "Display work experience",
  usage: "experience [company]",
  handler: (args) => {
    if (args.length > 0) {
      // Filter by company
      const companyName = args.join(" ").toLowerCase();
      const filtered = EXPERIENCE.filter(exp => 
        exp.company.toLowerCase().includes(companyName)
      );

      if (filtered.length === 0) {
        return {
          error: `No experience found for: ${args.join(" ")}`,
        };
      }

      const output = filtered.map((exp) => 
        `${exp.title} at ${exp.company}\n${exp.period}\n${exp.points?.map(p => `  • ${p}`).join("\n") || ""}`
      ).join("\n\n");

      return { output };
    }

    // Show all experience
    const output = EXPERIENCE.map((exp) => 
      `${exp.title} at ${exp.company}\n${exp.period}\n${exp.points?.map(p => `  • ${p}`).join("\n") || ""}`
    ).join("\n\n");

    return { output };
  },
};
