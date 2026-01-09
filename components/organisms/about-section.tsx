import { TExperience } from "@/types";

// TODO: Placeholder data - replace with actual information
const skills = [
  "Golang",
  "Rust",
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "Tailwind CSS",
  "D3.js",
  "PHP",
  "Laravel",
  "AWS",
  "MongoDB",
  "MySQL",
  "PostgreSQL",
  "Redis",
  "Firebase",
  "Vercel",
  "Git",
];
const experience: TExperience[] = [
  {
    title: "Full Stack Developer",
    company: "Propwise.com",
    period: "Dec. 2023 - Present",
    points: [
      "Built and scaled Golang microservices (auth, reporting subscriptions, analytics), reducing API latency by ~85% (300ms → 40-50ms) through schema redesign, SQL optimization, caching, and selective auth calls",
      "Designed and migrated to a full RBAC authentication system (JWT, refresh tokens, Redis), enabling secure internal tools and granular permission control across the platform.",
      "Developed interactive dashboards and analytics views, including price trends, volume analysis, ROI comparisons, and timeline-based insights.",
      "Implemented custom D3.js visualisations, optimising rendering with SVG and Canvas for large datasets.",
      "Collaborated closely with product and backend engineers to translate complex data and business logic into intuitive UI.",
      "Shipped 30+ major product updates, contributing to UI consistency, stability, and improved user experience.",
    ],
  },
  {
    title: "Tech And Digial Associate",
    company: "Mehan Limited",
    period: "Dec. 2021 - Dec. 2023",
    points: [
      "Developed user-facing features for a social-professional platform using Next.js, focusing on responsive UI and real-time interaction.",
      "Collaborated with designers and product stakeholders to improve UX flows.",
      "Supported a migration to a custom WordPress frontend, improving maintainability and performance.",
    ],
  },
  {
    title: "Full Stack Developer",
    company: "Reidis Interactive",
    period: "Jul. 2021 — Dec. 2021",
    points: [
      "Built and maintained 10+ responsive websites, ensuring cross-browser compatibility and accessibility.",
      "Created reusable frontend templates, reducing new project setup time by ~30%.",
      "Debugged and optimised legacy frontend codebases, improving load times and usability.",
    ],
  },
];

export const AboutSection = () => {
  return (
    <div className="px-6 max-w-3xl mx-auto py-24">
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">About Me</h2>
          <p className="text-gray-600 dark:text-gray-400">
            I&apos;m a full stack engineer who genuinely enjoys the whole stack — yes, even debugging CSS. hire.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            I learn fast, ship faster, and care about writing code that the next developer (often future me) wont curse at. I&apos;m drawn to teams building
            something meaningful, where quality matters and &quot;it works on my machine&quot; isn&apos;t an acceptable answer.
          </p>
        </div>

        {/* Skills */}
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Skills & Technologies</h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span key={skill} className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium dark:bg-gray-800">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Experience</h2>
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <div key={index} className="relative pl-8">
                <div className="absolute left-0 top-2 h-3 w-3 rounded-full bg-blue-500" />
                <div className="border-l-2 border-gray-200 pl-6 dark:border-gray-800">
                  <h3 className="text-lg font-semibold">{exp.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {exp.company} • {exp.period}
                  </p>
                  {exp.description && <p className="mt-2 text-gray-700 dark:text-gray-300">{exp.description}</p>}
                  {exp.points && exp.points.length > 0 && (
                    <ul className="list-disc ml-4">
                      {exp.points.map((p, i) => (
                        <li key={`${exp.company}-${index}-${i}`}>{p}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
