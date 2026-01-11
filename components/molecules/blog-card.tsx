import Link from "next/link";
import { TBlogPost } from "@/types";
import { FC } from "react";

type BlogCardProps = TBlogPost;

export const BlogCard: FC<BlogCardProps> = ({ slug, title, excerpt, date, readingTime }) => {
  return (
    <Link
      key={slug}
      href={`/blog/${slug}`}
      className="block rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg dark:border-gray-800 dark:bg-gray-800"
    >
      <h2 className="mb-2 text-xl font-semibold">{title}</h2>
      <p className="mb-4 text-gray-600 dark:text-gray-400">{excerpt}</p>
      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
        <span>{new Date(date).toLocaleDateString()}</span>
        <span>•</span>
        <span>{readingTime}</span>
      </div>
    </Link>
  );
};
