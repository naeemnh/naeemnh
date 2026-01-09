import { TBlogPost } from "@/types";
import { BlogCard } from "../molecules";

// Placeholder data - replace with actual blog posts
const blogPosts: TBlogPost[] = [
  {
    slug: "first-post",
    title: "My First Blog Post",
    excerpt: "This is a sample blog post excerpt. Replace this with your actual blog content.",
    date: "2024-01-15",
    readingTime: "5 min read",
  },
  {
    slug: "second-post",
    title: "Another Blog Post",
    excerpt: "Another example blog post to showcase the blog functionality.",
    date: "2024-01-10",
    readingTime: "3 min read",
  },
];

export const BlogsSection = () => {
  return (
    <div className="px-6 max-w-3xl mx-auto py-24">
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Blog</h2>
          <p className="text-gray-600 dark:text-gray-400">Writing — mostly about code, occasionally about everything else</p>
        </div>

        <div className="space-y-6">
          {blogPosts.map((post, index) => (
            <BlogCard key={`${post.slug}-${index}`} {...post} />
          ))}
        </div>

        {blogPosts.length === 0 && (
          <div className="py-12 text-center text-gray-500">
            <p>Blog posts coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};
