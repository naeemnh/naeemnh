# Open Graph Data Usage Guide

This guide explains how to fetch and use Open Graph data from website links in your personal website.

## Overview

The Open Graph implementation uses native `fetch` and regex parsing, so **no additional packages are required**. It's fully compatible with Next.js and works in both server and client contexts.

## Overview

The Open Graph implementation provides three ways to fetch OG data:

1. **API Route** (`/api/og`) - Client or server-side fetch via HTTP
2. **Client-side Hook** (`useOpenGraph`) - React hook for client components
3. **Server-side Function** (`fetchOpenGraphDataServer`) - For Server Components and build time

## Usage Examples

### 1. Using the React Hook (Client Components)

```tsx
"use client";

import { useOpenGraph } from "@/hooks";
import { WorkCard } from "@/components/molecules";

export const WorkSection = () => {
  const projectUrl = "https://propwise.com";
  const { data, loading, error } = useOpenGraph(projectUrl);

  if (loading) return <div>Loading project data...</div>;
  if (error) return <div>Error loading project data</div>;

  return (
    <div>
      {data && (
        <div>
          <h3>{data.title || "Project"}</h3>
          <p>{data.description}</p>
          {data.image && <img src={data.image} alt={data.title} />}
        </div>
      )}
    </div>
  );
};
```

### 2. Using Server-side Function (Server Components)

```tsx
import { fetchOpenGraphDataServer } from "@/lib";
import { WorkCard } from "@/components/molecules";

export const WorkSection = async () => {
  const projectUrl = "https://propwise.com";
  const ogData = await fetchOpenGraphDataServer(projectUrl);

  return (
    <div>
      {ogData && (
        <div>
          <h3>{ogData.title || "Project"}</h3>
          <p>{ogData.description}</p>
          {ogData.image && <img src={ogData.image} alt={ogData.title} />}
        </div>
      )}
    </div>
  );
};
```

### 3. Fetching Multiple URLs at Once

```tsx
import { fetchMultipleOpenGraphDataServer } from "@/lib/og-server";

export const WorkSection = async () => {
  const projects = [
    { id: 1, link: "https://propwise.com" },
    { id: 2, link: "https://example.com" },
  ];

  const urls = projects.map((p) => p.link);
  const ogDataArray = await fetchMultipleOpenGraphDataServer(urls);

  return (
    <div>
      {projects.map((project, index) => {
        const ogData = ogDataArray[index];
        return (
          <div key={project.id}>
            <h3>{ogData?.title || project.title}</h3>
            <p>{ogData?.description || project.description}</p>
            {ogData?.image && <img src={ogData.image} alt={ogData.title} />}
          </div>
        );
      })}
    </div>
  );
};
```

### 4. Enriching Project Data with OG Data

```tsx
import { fetchOpenGraphDataServer } from "@/lib";
import { TProject } from "@/types";

async function enrichProjectWithOG(project: TProject): Promise<TProject> {
  const ogData = await fetchOpenGraphDataServer(project.link);

  return {
    ...project,
    // Use OG data as fallback or enhancement
    title: ogData?.title || project.title,
    description: ogData?.description || project.description,
    image: ogData?.image || project.image,
    ogData,
  };
}

export const WorkSection = async () => {
  const baseProjects: TProject[] = [
    {
      id: 1,
      title: "Propwise.com",
      description: "A Property Analytics Platform",
      techStack: ["Next.js", "TypeScript"],
      image: "/placeholder.jpg",
      link: "https://propwise.com",
    },
  ];

  // Enrich all projects with OG data
  const enrichedProjects = await Promise.all(baseProjects.map(enrichProjectWithOG));

  return (
    <div>
      {enrichedProjects.map((project) => (
        <WorkCard key={project.id} project={project} />
      ))}
    </div>
  );
};
```

### 5. Using the API Route Directly

```tsx
"use client";

async function fetchOGData(url: string) {
  const response = await fetch(`/api/og?url=${encodeURIComponent(url)}`);
  if (!response.ok) throw new Error("Failed to fetch");
  return response.json();
}

// Usage in a component
const handleFetch = async () => {
  const data = await fetchOGData("https://propwise.com");
  console.log(data);
};
```

## Data Structure

The Open Graph data returned has the following structure:

```typescript
interface OpenGraphData {
  title?: string; // og:title or twitter:title
  description?: string; // og:description or twitter:description or meta description
  image?: string; // og:image or twitter:image
  url?: string; // og:url or the requested URL
  siteName?: string; // og:site_name
}
```

## Best Practices

1. **Caching**: Consider caching OG data to avoid repeated fetches. You can use Next.js caching or a database.

2. **Error Handling**: Always handle cases where OG data might not be available or fetch might fail.

3. **Fallbacks**: Use OG data as enhancement, but always have fallback values for title, description, and image.

4. **Performance**: For multiple URLs, use `fetchMultipleOpenGraphDataServer` to fetch in parallel.

5. **Rate Limiting**: Be mindful of rate limits when fetching from external sites. Consider implementing request throttling.

## Example: Complete Work Section with OG Data

```tsx
import { fetchOpenGraphDataServer } from "@/lib";
import { WorkCard } from "@/components/molecules";
import { TProject } from "@/types";

const baseProjects: TProject[] = [
  {
    id: 0,
    title: "Propwise.com",
    description: "A Property Analytics Platform for Dubai.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    image: "/placeholder-project.jpg",
    link: "https://propwise.com",
  },
];

export const WorkSection = async () => {
  // Enrich projects with OG data
  const projects = await Promise.all(
    baseProjects.map(async (project) => {
      const ogData = await fetchOpenGraphDataServer(project.link);
      return {
        ...project,
        // Enhance with OG data, but keep original as fallback
        title: ogData?.title || project.title,
        description: ogData?.description || project.description,
        image: ogData?.image || project.image,
        ogData,
      };
    }),
  );

  return (
    <div className="px-6 max-w-5xl mx-auto py-24">
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">My Work</h2>
          <p className="text-gray-600 dark:text-gray-400">Things I&apos;ve built that I&apos;m not embarrassed to show you</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <WorkCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};
```
