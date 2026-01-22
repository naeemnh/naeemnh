import { Command } from "../command-registry";
import { Env } from "@/config/env";

export const readCommand: Command = {
  name: "read",
  description: "Read a blog post",
  usage: "read <slug>",
  handler: (args) => {
    if (!Env.BLOGS_ENABLED) {
      return {
        error: "Blog feature is not enabled",
      };
    }

    if (args.length === 0) {
      return {
        error: "Usage: read <slug>",
      };
    }

    const slug = args[0];
    return {
      output: `Reading blog post: ${slug}\n\nBlog post content will be displayed here.\n(Feature coming soon...)`,
    };
  },
};
