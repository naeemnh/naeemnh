"use client";

import { useEffect, useState } from "react";
import { WorkCard } from "@/components/molecules";
// import { fetchMultipleOpenGraphData } from "@/lib/og-utils";
import { TProject } from "@/types";
import { ContentCard } from "../atoms";

// TODO: Placeholder data - replace with actual projects
const baseProjects: TProject[] = [
  {
    id: 0,
    title: "Propwise.com",
    description: "A Property Analytics Platform for Dubai.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Golang", "Postgresql", "AWS", "Supabase", "Vercel", "Redis"],
    image: "/placeholder-project.jpg",
    link: "https://propwise.com",
  },
  {
    id: 1,
    title: "Sawa Entertainment",
    description: "A Entertainment Platform for UAE.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Laravel", "Postgresql", "AWS"],
    image: "/placeholder-project.jpg",
    link: "https://sawaentertainment.com",
  },
  {
    id: 2,
    title: "Sawa Rights Management",
    description: "",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Laravel", "Postgresql", "AWS"],
    image: "/placeholder-project.jpg",
    link: "https://srmtv.com",
  },
  {
    id: 3,
    title: "Sawa Technologies",
    description: "",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Laravel", "Postgresql", "AWS"],
    image: "/placeholder-project.jpg",
    link: "https://sawatechnologies.com",
  },
  {
    id: 4,
    title: "Celebration Event Management",
    description: "Celebration Event Management is a platform for managing events and their related activities.",
    techStack: ["WordPress", "Custom Theme", "PHP", "MySQL"],
    image: "/placeholder-project.jpg",
    link: "https://celebration.ae",
  },
];

export const WorkSection = () => {
  const [projects, setProjects] = useState<TProject[]>(baseProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchOGData = async () => {
      try {
        // const urls = baseProjects.map((p) => p.link);
        // const ogDataArray = await fetchMultipleOpenGraphData(urls);

        if (!isMounted) return;

        const enrichedProjects = baseProjects.map((project) => {
          // const ogData = ogDataArray[index];
          return {
            ...project,
            // ogData,
          };
        });

        setProjects(enrichedProjects);
      } catch (error) {
        console.error("Error fetching Open Graph data:", error);
        // Keep base projects if fetch fails
        setProjects(baseProjects);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchOGData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="px-6 max-w-5xl mx-auto py-24">
      <ContentCard className="space-y-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">My Work</h2>
          <p className="text-gray-600 dark:text-gray-400">Things I&apos;ve built that I&apos;m not embarrassed to show you</p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 gap-8">
            {baseProjects.map((project) => (
              <WorkCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <WorkCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {projects.length === 0 && (
          <div className="py-12 text-center text-gray-500">
            <p>Projects coming soon...</p>
          </div>
        )}
      </ContentCard>
    </div>
  );
};
