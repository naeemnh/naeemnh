import { ContentCard } from "../atoms";

export const HeroSection = ({ onNavigate }: { onNavigate: (sectionId: string) => void; }) => (
  <div className="min-h-screen flex items-center px-6 max-w-4xl mx-auto pt-16">
    <ContentCard className="space-y-6">
      <p className="text-slate-500 dark:text-foreground/50 text-lg">Hey, I&apos;m</p>

      <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-foreground tracking-tight">Naeem Hussain</h1>

      <p className="text-xl md:text-2xl text-slate-600 dark:text-foreground/50 leading-relaxed">I turn caffeine and ambiguous requirements into working software.</p>
      <p className="text-xl md:text-2xl text-slate-600 dark:text-foreground/50 leading-relaxed">Full stack engineer — frontend to database, and everything that breaks in between.</p>

      <div className="flex items-center gap-2 text-slate-500 dark:text-foreground/50">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>
        <span>Open to opportunities</span>
      </div>

      <div className="flex flex-wrap gap-4 pt-4">
        <button onClick={() => onNavigate("work")} className="px-6 py-3 bg-slate-900 dark:bg-foreground text-white dark:text-background rounded-xl font-medium hover:bg-slate-800 dark:hover:bg-foreground/80 transition-colors">
          View My Work
        </button>
        <button
          onClick={() => onNavigate("contact")}
          className="px-6 py-3 bg-white dark:bg-background text-slate-700 dark:text-foreground rounded-xl font-medium border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-background/80 transition-colors"
        >
          Get In Touch
        </button>
      </div>

      <div className="pt-12 text-slate-400 dark:text-foreground/50 text-sm animate-bounce cursor-pointer" onClick={() => onNavigate("work")}>
        ↓ Scroll to explore
      </div>
    </ContentCard>
  </div>
);
