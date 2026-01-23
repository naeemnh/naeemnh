import { FC } from "react";
import { TProject } from "@/types";
import { cn } from "@/lib/utils";

type WorkCardProps = {
  project: TProject;
};

export const WorkCard: FC<WorkCardProps> = ({ project }) => {
  return (
    <div className="group bg-white dark:bg-background rounded-2xl overflow-hidden border border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600 hover:shadow-xl transition-all duration-300 cursor-pointer">
      <div
        className={cn("aspect-video bg-linear-to-br relative overflow-hidden", {
          "from-blue-500 to-indigo-600": project.id % 4 === 0,
          "from-emerald-500 to-teal-600": project.id % 4 === 1,
          "from-orange-500 to-rose-600": project.id % 4 === 2,
          "from-violet-500 to-purple-600": project.id % 4 === 3,
        })}
        style={project.ogData?.image ? { backgroundImage: `url(${project.ogData?.image})` } : {}}
      >
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        <div className="absolute bottom-4 left-4 text-white/80 text-sm font-mono">{project.id + 1}</div>
        {/* Decorative elements */}
        {/* TODO: use these variants based on project.id % 4 */}
        <div
          className={cn("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", {
            "w-16 h-16 border-2 border-white/30 rounded-xl rotate-12 group-hover:rotate-45 transition-transform duration-500": project.id % 4 === 0,
            "w-16 h-16 border-2 border-white/30 rounded-full group-hover:scale-125 transition-transform duration-500": project.id % 4 === 1,
            "w-12 h-12 border-2 border-white/30 rotate-45 group-hover:rotate-90 transition-transform duration-500": project.id % 4 === 2,
            "w-20 h-8 border-2 border-white/30 rounded-full group-hover:w-8 group-hover:h-20 transition-all duration-500": project.id % 4 === 3,
          })}
        ></div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-foreground/80 mb-2 group-hover:text-blue-600 transition-colors">{project.title}</h3>
        <p className="text-slate-600 dark:text-foreground/40 mb-4 leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech) => (
            <span key={tech} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-foreground/60 rounded-full text-sm border border-slate-200 dark:border-slate-700">
              {tech}
            </span>
          ))}
        </div>
        <a href={project.link} className="inline-flex items-center gap-2 text-slate-900 dark:text-foreground/80 font-medium group-hover:gap-3 transition-all">
          View Project <span>→</span>
        </a>
      </div>
    </div>
  );
};
