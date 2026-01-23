/**
 * Generates the CLI prompt string based on the current directory.
 * @param currentDirectory - The current directory path
 * @returns The formatted prompt string (e.g., "user@portfolio:/home$ ")
 */
export const getPrompt = (currentDirectory: string): string => {
  const dir = currentDirectory === "/" ? "~" : currentDirectory;
  return `user@portfolio:${dir}$ `;
};
