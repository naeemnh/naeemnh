import { Command, CLIContext } from "../command-registry";
import { VirtualFileSystem } from "../virtual-fs";
import { createFormCommand } from "./form";

export const createRunCommand = (vfs: VirtualFileSystem): Command => ({
  name: "run",
  aliases: [],
  description: "Execute an executable file",
  usage: "run <executable> or ./<executable>",
  handler: async (args, context: CLIContext) => {
    if (args.length === 0) {
      return {
        error: "Usage: run <executable> or ./<executable>",
      };
    }

    const executableName = args[0];
    const targetPath = vfs.resolvePath(context.currentDirectory, executableName);
    const node = vfs.get(targetPath);

    if (!node) {
      return {
        error: `No such file or directory: ${targetPath}`,
      };
    }

    if (node.type !== "executable") {
      return {
        error: `${targetPath} is not an executable file.`,
      };
    }

    if (!node.executable) {
      return {
        error: `${targetPath} has no executable handler.`,
      };
    }

    // Special handling for form.exe
    if (node.name === "form.exe") {
      const formCommand = createFormCommand();
      return await formCommand.handler([], context);
    }

    // Execute the executable
    try {
      return await node.executable(args.slice(1), context);
    } catch (error) {
      return {
        error: `Error executing ${executableName}: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  },
});
