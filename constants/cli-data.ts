import { TExperience, TProject } from "@/types";

// Personal Information
export const PERSONAL_INFO = {
  name: "Naeem Hussain",
  tagline: "I turn caffeine and ambiguous requirements into working software.",
  subtitle: "Full stack engineer — frontend to database, and everything that breaks in between.",
  available: true,
  availabilityText: "Open to opportunities",
};

// Skills
export const SKILLS = [
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

// Experience
export const EXPERIENCE: TExperience[] = [
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

// Projects
export const PROJECTS: TProject[] = [
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

// Social Links
export const SOCIAL_LINKS = {
  github: "https://github.com/naeemnh",
  linkedin: "https://linkedin.com/in/naeemnh",
};

// About Text
export const ABOUT_TEXT = `I'm a full stack engineer who genuinely enjoys the whole stack — yes, even debugging CSS.

I learn fast, ship faster, and care about writing code that the next developer (often future me) won't curse at. I'm drawn to teams building something meaningful, where quality matters and "it works on my machine" isn't an acceptable answer.`;
