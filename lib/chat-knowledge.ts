import {
  PERSONAL_INFO,
  SKILLS,
  EXPERIENCE,
  PROJECTS,
  SOCIAL_LINKS,
  ABOUT_TEXT,
} from "@/constants/cli-data";
import { SystemPrompt } from "@/constants/persona";

/**
 * Builds the system prompt for the chat assistant so it answers only from
 * the provided facts about Naeem (who he is, what he does, skills, experience, etc.).
 */
export function getChatSystemPrompt(): string {
  const experienceBlock = EXPERIENCE.map(
    (exp) =>
      `- ${exp.title} at ${exp.company} (${exp.period}): ${exp.points?.join(" ") ?? ""}`,
  ).join("\n");

  const projectsBlock = PROJECTS.map(
    (p) =>
      `- ${p.title}${p.description ? `: ${p.description}` : ""} ${p.link ? `(${p.link})` : ""} [${p.techStack?.join(", ") ?? ""}]`,
  ).join("\n");

  const prompt = `${SystemPrompt}

## Who he is
- Name: ${PERSONAL_INFO.name}
- Tagline: ${PERSONAL_INFO.tagline}
- Subtitle: ${PERSONAL_INFO.subtitle}
- Availability: ${PERSONAL_INFO.available ? PERSONAL_INFO.availabilityText : "Not currently open to opportunities"}

## About
${ABOUT_TEXT}

## Skills & technologies
${SKILLS.join(", ")}

## Experience
${experienceBlock}

## Projects
${projectsBlock}

## Links
- GitHub: ${SOCIAL_LINKS.github}
- LinkedIn: ${SOCIAL_LINKS.linkedin}
`;
  return prompt;
}
