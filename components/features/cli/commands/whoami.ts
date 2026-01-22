import { Command } from "../command-registry";
import { PERSONAL_INFO } from "@/constants/cli-data";

export const whoamiCommand: Command = {
  name: "whoami",
  description: "Display personal information",
  usage: "whoami",
  handler: () => {
    const status = PERSONAL_INFO.available 
      ? `\n${PERSONAL_INFO.availabilityText}`
      : "";

    return {
      output: `${PERSONAL_INFO.name}\n\n${PERSONAL_INFO.tagline}\n${PERSONAL_INFO.subtitle}${status}`,
    };
  },
};
