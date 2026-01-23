import { CommandResult } from "./command-registry";
import { ABOUT_TEXT, EXPERIENCE, PROJECTS } from "@/constants/cli-data";
import { Env } from "@/config/env";

export interface VirtualFSNode {
  type: "directory" | "file" | "executable";
  name: string;
  path: string;
  content?: string | (() => Promise<string>);
  children?: VirtualFSNode[];
  executable?: (args: string[], context: { currentDirectory: string }) => Promise<CommandResult>;
}

export class VirtualFileSystem {
  private root: VirtualFSNode;

  constructor() {
    // Generate readme content
    const homeReadme = `Welcome to my portfolio CLI!

Available directories:
  /home      - Home directory (you are here)
  /about     - About me
  /work      - Work experience and projects
  /blog      - Blog posts
  /contact   - Contact information and form

Quick commands:
  ls         - List files in current directory
  cd <dir>   - Change directory
  cat <file> - View file contents
  help       - Show all available commands

Type 'help' to see all available commands.`;

    const aboutReadme = ABOUT_TEXT;

    const projectsReadme = `Projects Overview

${PROJECTS.map((p, i) => 
  `${i + 1}. ${p.title}\n   ${p.description || "No description"}\n   Tech: ${p.techStack.join(", ")}\n   Link: ${p.link}`
).join("\n\n")}

Use 'projects' command to see more details.`;

    const experienceReadme = `Work Experience

${EXPERIENCE.map((exp) => 
  `${exp.title} at ${exp.company}\n${exp.period}\n${exp.points?.map(p => `  • ${p}`).join("\n") || ""}`
).join("\n\n")}

Use 'experience' command to see more details.`;

    const blogReadme = Env.BLOGS_ENABLED 
      ? `Blog Posts

Use 'blog' to list all blog posts.
Use 'read <slug>' to read a specific post.

Blog feature is enabled.`
      : `Blog Posts

Blog feature is currently disabled.`;

    this.root = {
      type: "directory",
      name: "/",
      path: "/",
      children: [
        {
          type: "directory",
          name: "home",
          path: "/home",
          children: [
            {
              type: "file",
              name: "readme.md",
              path: "/home/readme.md",
              content: homeReadme,
            },
          ],
        },
        {
          type: "directory",
          name: "about",
          path: "/about",
          children: [
            {
              type: "file",
              name: "readme.md",
              path: "/about/readme.md",
              content: aboutReadme,
            },
          ],
        },
        {
          type: "directory",
          name: "work",
          path: "/work",
          children: [
            {
              type: "directory",
              name: "projects",
              path: "/work/projects",
              children: [
                {
                  type: "file",
                  name: "readme.md",
                  path: "/work/projects/readme.md",
                  content: projectsReadme,
                },
              ],
            },
            {
              type: "directory",
              name: "experience",
              path: "/work/experience",
              children: [
                {
                  type: "file",
                  name: "readme.md",
                  path: "/work/experience/readme.md",
                  content: experienceReadme,
                },
              ],
            },
          ],
        },
        {
          type: "directory",
          name: "blog",
          path: "/blog",
          children: [
            {
              type: "file",
              name: "readme.md",
              path: "/blog/readme.md",
              content: blogReadme,
            },
          ],
        },
        {
          type: "directory",
          name: "contact",
          path: "/contact",
          children: [
            {
              type: "executable",
              name: "form.exe",
              path: "/contact/form.exe",
              executable: async (args, context) => {
                // This will be handled by the form command handler
                return {
                  output: "Starting interactive form...\nUse 'form' command to fill out the contact form.",
                };
              },
            },
          ],
        },
      ],
    };
  }

  resolvePath(currentPath: string, targetPath: string): string {
    // Handle ~ (home)
    if (targetPath === "~" || targetPath.startsWith("~/")) {
      targetPath = targetPath.replace("~", "/home");
    }

    // Handle absolute paths
    if (targetPath.startsWith("/")) {
      return this.normalizePath(targetPath);
    }

    // Handle relative paths
    if (targetPath === "..") {
      const parts = currentPath.split("/").filter(Boolean);
      if (parts.length > 1) {
        parts.pop();
        return "/" + parts.join("/");
      }
      return "/";
    }

    if (targetPath.startsWith("../")) {
      const parts = currentPath.split("/").filter(Boolean);
      const targetParts = targetPath.split("/").filter(Boolean);
      
      for (const part of targetParts) {
        if (part === "..") {
          if (parts.length > 0) parts.pop();
        } else {
          parts.push(part);
        }
      }
      
      return "/" + parts.join("/");
    }

    // Simple relative path
    const resolved = currentPath === "/" 
      ? `/${targetPath}`
      : `${currentPath}/${targetPath}`;
    
    return this.normalizePath(resolved);
  }

  private normalizePath(path: string): string {
    const parts = path.split("/").filter(Boolean);
    const normalized: string[] = [];

    for (const part of parts) {
      if (part === ".") {
        continue;
      } else if (part === "..") {
        if (normalized.length > 0) {
          normalized.pop();
        }
      } else {
        normalized.push(part);
      }
    }

    return "/" + normalized.join("/");
  }

  get(path: string): VirtualFSNode | null {
    if (path === "/") {
      return this.root;
    }

    const parts = path.split("/").filter(Boolean);
    let current: VirtualFSNode = this.root;

    for (const part of parts) {
      if (!current.children) {
        return null;
      }

      const found = current.children.find((child) => child.name === part);
      if (!found) {
        return null;
      }

      current = found;
    }

    return current;
  }

  list(path: string): string[] {
    const node = this.get(path);
    if (!node) {
      return [];
    }

    if (node.type === "file") {
      return [node.name];
    }

    if (!node.children) {
      return [];
    }

    return node.children.map((child) => child.name);
  }

  exists(path: string): boolean {
    return this.get(path) !== null;
  }

  getRoot(): VirtualFSNode {
    return this.root;
  }
}
