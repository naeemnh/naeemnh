import { AppWindow } from "@/components/molecules/app-window";
import { BookOpen } from "lucide-react";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Placeholder - replace with actual markdown file reading
async function getPost(slug: string) {
  // TODO: Implement markdown file reading
  const posts: Record<string, { title: string; content: string; date: string; readingTime: string }> = {
    "first-post": {
      title: "My First Blog Post",
      content: "# My First Blog Post\n\nThis is a sample blog post. Replace this with actual markdown content from your blog posts.",
      date: "2024-01-15",
      readingTime: "5 min read",
    },
    "second-post": {
      title: "Another Blog Post",
      content: "# Another Blog Post\n\nMore content here...",
      date: "2024-01-10",
      readingTime: "3 min read",
    },
  };

  return posts[slug] || null;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <AppWindow title="Blog" icon={<BookOpen className="h-4 w-4" />}>
      <article className="prose prose-lg dark:prose-invert max-w-none">
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
            <span>{new Date(post.date).toLocaleDateString()}</span>
            <span>•</span>
            <span>{post.readingTime}</span>
          </div>
        </div>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </article>
    </AppWindow>
  );
}
