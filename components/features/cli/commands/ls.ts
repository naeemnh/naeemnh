import { Command, CLIContext } from "../command-registry";
import { VirtualFileSystem } from "../virtual-fs";

export const createLsCommand = (vfs: VirtualFileSystem): Command => ({
  name: "ls",
  aliases: ["list", "dir"],
  description: "List available sections/content",
  usage: "ls [path]",
  handler: (args, context: CLIContext) => {
    const targetPath = args.length > 0 
      ? vfs.resolvePath(context.currentDirectory, args[0])
      : context.currentDirectory;

    if (!vfs.exists(targetPath)) {
      return {
        error: `No such file or directory: ${targetPath}`,
      };
    }

    const items = vfs.list(targetPath);
    
    if (items.length === 0) {
      return {
        output: "(empty)",
      };
    }

    // Format as columns (simple 2-column layout)
    const formatted = items.map(item => {
      const node = vfs.get(targetPath === "/" ? `/${item}` : `${targetPath}/${item}`);
      const suffix = node?.type === "directory" ? "/" : "";
      return `  ${item}${suffix}`;
    }).join("\n");

    return {
      output: formatted,
    };
  },
});
