import { Command, CLIContext } from "../command-registry";
import { VirtualFileSystem } from "../virtual-fs";
import { ABOUT_TEXT, EXPERIENCE, PROJECTS, SKILLS } from "@/constants/cli-data";

export const createCatCommand = (vfs: VirtualFileSystem): Command => ({
  name: "cat",
  aliases: ["view", "read", "show"],
  description: "Display content of a file/section",
  usage: "cat <file> or cat <section>",
  handler: (args, context: CLIContext) => {
    if (args.length === 0) {
      return {
        error: "Usage: cat <file> or cat <section>",
      };
    }

    const targetPath = vfs.resolvePath(context.currentDirectory, args[0]);
    const node = vfs.get(targetPath);

    if (!node) {
      return {
        error: `No such file or directory: ${targetPath}`,
      };
    }

    // Handle different paths
    if (targetPath === "/about" || targetPath.endsWith("/about")) {
      return {
        output: ABOUT_TEXT,
      };
    } else if (targetPath === "/work/projects" || targetPath.endsWith("/projects")) {
      const projectsList = PROJECTS.map((p, i) => 
        `${i + 1}. ${p.title}\n   ${p.description || "No description"}\n   Tech: ${p.techStack.join(", ")}\n   Link: ${p.link}`
      ).join("\n\n");
      return {
        output: projectsList,
      };
    } else if (targetPath === "/work/experience" || targetPath.endsWith("/experience")) {
      const expList = EXPERIENCE.map((exp) => 
        `${exp.title} at ${exp.company}\n${exp.period}\n${exp.points?.map(p => `  • ${p}`).join("\n") || ""}`
      ).join("\n\n");
      return {
        output: expList,
      };
    } else if (targetPath.startsWith("/work/projects/")) {
      // Try to find a project by name
      const projectName = targetPath.split("/").pop()?.toLowerCase();
      const project = PROJECTS.find(p => 
        p.title.toLowerCase().replace(/\s+/g, "-") === projectName ||
        p.title.toLowerCase() === projectName
      );
      
      if (project) {
        return {
          output: `${project.title}\n\n${project.description || "No description"}\n\nTech Stack: ${project.techStack.join(", ")}\nLink: ${project.link}`,
        };
      }
    }

    // Default: show path info
    return {
      output: `Path: ${targetPath}\nType: ${node.type}`,
    };
  },
});
