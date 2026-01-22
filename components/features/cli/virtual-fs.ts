export interface VirtualFSNode {
  type: "directory" | "file";
  name: string;
  path: string;
  content?: string | (() => Promise<string>);
  children?: VirtualFSNode[];
}

export class VirtualFileSystem {
  private root: VirtualFSNode;

  constructor() {
    this.root = {
      type: "directory",
      name: "/",
      path: "/",
      children: [
        {
          type: "directory",
          name: "home",
          path: "/home",
          children: [],
        },
        {
          type: "directory",
          name: "about",
          path: "/about",
          children: [],
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
              children: [],
            },
            {
              type: "directory",
              name: "experience",
              path: "/work/experience",
              children: [],
            },
          ],
        },
        {
          type: "directory",
          name: "blog",
          path: "/blog",
          children: [],
        },
        {
          type: "directory",
          name: "contact",
          path: "/contact",
          children: [],
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
