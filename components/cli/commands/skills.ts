import { Command } from "../command-registry";
import { SKILLS } from "@/constants/cli-data";

export const skillsCommand: Command = {
  name: "skills",
  aliases: ["tech"],
  description: "List skills and technologies",
  usage: "skills",
  handler: () => {
    // Format as columns (3 columns)
    const columns = 3;
    const itemsPerColumn = Math.ceil(SKILLS.length / columns);
    const formatted: string[] = [];

    for (let i = 0; i < itemsPerColumn; i++) {
      const row: string[] = [];
      for (let j = 0; j < columns; j++) {
        const index = i + j * itemsPerColumn;
        if (index < SKILLS.length) {
          row.push(SKILLS[index].padEnd(20));
        }
      }
      formatted.push(row.join("  "));
    }

    return {
      output: formatted.join("\n"),
    };
  },
};
