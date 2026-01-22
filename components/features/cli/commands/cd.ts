import { Command, CLIContext } from "../command-registry";
import { VirtualFileSystem } from "../virtual-fs";

export const createCdCommand = (vfs: VirtualFileSystem): Command => ({
  name: "cd",
  aliases: ["navigate"],
  description: "Navigate to a section",
  usage: "cd <section>",
  handler: (args, context: CLIContext) => {
    if (args.length === 0) {
      return {
        output: "",
        // Special: return home directory
      };
    }

    const targetPath = vfs.resolvePath(context.currentDirectory, args[0]);

    if (!vfs.exists(targetPath)) {
      return {
        error: `No such file or directory: ${targetPath}`,
      };
    }

    const node = vfs.get(targetPath);
    if (node?.type !== "directory") {
      return {
        error: `Not a directory: ${targetPath}`,
      };
    }

    // Return the new path - the CLI component will update currentDirectory
    return {
      output: targetPath,
    };
  },
});
