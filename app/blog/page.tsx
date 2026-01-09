import { AppWindow } from "@/components/molecules/app-window";
import { BookOpen } from "lucide-react";
import Link from "next/link";

// Placeholder data - replace with actual blog posts from markdown files
const blogPosts = [
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

export default function BlogPage() {
  return (
    <AppWindow title="Blog" icon={<BookOpen className="h-4 w-4" />}>
      <div className="space-y-8">
        <div>
          <h1 className="mb-2 text-3xl font-bold">Blog</h1>
          <p className="text-gray-600 dark:text-gray-400">Thoughts, tutorials, and insights on web development and technology.</p>
        </div>

        <div className="space-y-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg dark:border-gray-800 dark:bg-gray-800"
            >
              <h2 className="mb-2 text-xl font-semibold">{post.title}</h2>
              <p className="mb-4 text-gray-600 dark:text-gray-400">{post.excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
                <span>{new Date(post.date).toLocaleDateString()}</span>
                <span>•</span>
                <span>{post.readingTime}</span>
              </div>
            </Link>
          ))}
        </div>

        {blogPosts.length === 0 && (
          <div className="py-12 text-center text-gray-500">
            <p>Blog posts coming soon...</p>
          </div>
        )}
      </div>
    </AppWindow>
  );
}
