import { AppWindow } from "@/components/molecules/app-window";
import { Briefcase } from "lucide-react";
import Image from "next/image";

// Placeholder data - replace with actual projects
const projects = [
  {
    id: 1,
    title: "Project 1",
    description: "A description of your first project. Showcase what you built and the technologies used.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    image: "/placeholder-project.jpg",
    link: "https://example.com",
  },
  {
    id: 2,
    title: "Project 2",
    description: "Another project description highlighting your skills and achievements.",
    techStack: ["React", "Node.js", "MongoDB"],
    image: "/placeholder-project.jpg",
    link: "https://example.com",
  },
];

export default function PortfolioPage() {
  return (
    <AppWindow title="Portfolio" icon={<Briefcase className="h-4 w-4" />}>
      <div className="space-y-8">
        <div>
          <h1 className="mb-2 text-3xl font-bold">My Work</h1>
          <p className="text-gray-600 dark:text-gray-400">A collection of projects I&apos;ve built and contributed to.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-lg dark:border-gray-800 dark:bg-gray-800"
            >
              <div className="relative h-48 w-full bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                {project.image && project.image !== "/placeholder-project.jpg" ? (
                  <Image src={project.image} alt={project.title} fill className="object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span className="text-gray-400 dark:text-gray-500">Project Image</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold">{project.title}</h3>
                <p className="mb-4 text-gray-600 dark:text-gray-400">{project.description}</p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                      {tech}
                    </span>
                  ))}
                </div>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">
                  View Project →
                </a>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="py-12 text-center text-gray-500">
            <p>Projects coming soon...</p>
          </div>
        )}
      </div>
    </AppWindow>
  );
}
