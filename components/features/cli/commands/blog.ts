import { Command } from "../command-registry";
import { Env } from "@/config/env";

export const blogCommand: Command = {
  name: "blog",
  description: "List blog posts or navigate to blog section",
  usage: "blog [slug]",
  handler: (args) => {
    if (!Env.BLOGS_ENABLED) {
      return {
        error: "Blog feature is not enabled",
      };
    }

    if (args.length > 0) {
      const slug = args[0];
      return {
        output: `Reading blog post: ${slug}\n\nUse 'read ${slug}' to read the full post.`,
      };
    }

    return {
      output: "Blog posts:\n\n(Use 'read <slug>' to read a specific post)\n\nBlog feature coming soon...",
    };
  },
};
