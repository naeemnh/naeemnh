import { CommandRegistry } from "../command-registry";
import { VirtualFileSystem } from "../virtual-fs";
import { createHelpCommand } from "./help";
import { clearCommand } from "./clear";
import { exitCommand } from "./exit";
import { echoCommand } from "./echo";
import { dateCommand } from "./date";
import { createLsCommand } from "./ls";
import { createCdCommand } from "./cd";
import { pwdCommand } from "./pwd";
import { createCatCommand } from "./cat";
import { whoamiCommand } from "./whoami";
import { skillsCommand } from "./skills";
import { experienceCommand } from "./experience";
import { projectsCommand } from "./projects";
import { contactCommand } from "./contact";
import { resumeCommand } from "./resume";
import { githubCommand } from "./github";
import { linkedinCommand } from "./linkedin";
import { linksCommand } from "./links";
import { openCommand } from "./open";
import { historyCommand } from "./history";
import { blogCommand } from "./blog";
import { readCommand } from "./read";
import { createRunCommand } from "./run";
import { createFormCommand } from "./form";
import { Env } from "@/config/env";

export function initializeCommands(vfs: VirtualFileSystem): CommandRegistry {
  const registry = new CommandRegistry();

  // Core commands (help needs registry, so register it after creating others)
  // We'll register help at the end
  registry.register(clearCommand);
  registry.register(exitCommand);
  registry.register(echoCommand);
  registry.register(dateCommand);

  // Navigation commands
  registry.register(createLsCommand(vfs));
  registry.register(createCdCommand(vfs));
  registry.register(pwdCommand);
  registry.register(createCatCommand(vfs));
  registry.register(createRunCommand(vfs));
  registry.register(createFormCommand());

  // Information commands
  registry.register(whoamiCommand);
  registry.register(skillsCommand);
  registry.register(experienceCommand);
  registry.register(projectsCommand);
  registry.register(contactCommand);
  registry.register(resumeCommand);

  // Social & Links
  registry.register(githubCommand);
  registry.register(linkedinCommand);
  registry.register(linksCommand);
  registry.register(openCommand);

  // Utility commands
  registry.register(historyCommand);

  // Blog commands (if enabled)
  if (Env.BLOGS_ENABLED) {
    registry.register(blogCommand);
    registry.register(readCommand);
  }

  // Register help command last (it needs access to the full registry)
  registry.register(createHelpCommand(registry));

  return registry;
}
