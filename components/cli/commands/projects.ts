import { Command } from "../command-registry";
import { PROJECTS } from "@/constants/cli-data";

export const projectsCommand: Command = {
  name: "projects",
  aliases: ["portfolio"],
  description: "List or view projects",
  usage: "projects [name]",
  handler: (args) => {
    if (args.length > 0) {
      // Show specific project
      const projectName = args.join(" ").toLowerCase();
      const project = PROJECTS.find(p => 
        p.title.toLowerCase().includes(projectName)
      );

      if (!project) {
        return {
          error: `Project not found: ${args.join(" ")}`,
        };
      }

      return {
        output: `${project.title}\n\n${project.description || "No description"}\n\nTech Stack: ${project.techStack.join(", ")}\nLink: ${project.link}`,
      };
    }

    // List all projects
    const output = PROJECTS.map((p, i) => 
      `${i + 1}. ${p.title}\n   ${p.description || "No description"}\n   Tech: ${p.techStack.join(", ")}\n   Link: ${p.link}`
    ).join("\n\n");

    return { output };
  },
};
