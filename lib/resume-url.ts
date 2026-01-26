import { Env } from "@/config/env";

export function isDropboxResumeUrl(url: string): boolean {
  return typeof url === "string" && url.includes("dropbox.com");
}

/** View in browser: dl=0. Only applies to Dropbox; others return as-is. */
export function getResumeViewUrl(): string {
  if (!Env.RESUME_URL) return "";
  if (!isDropboxResumeUrl(Env.RESUME_URL)) {
    return Env.RESUME_URL;
  }
  try {
    const u = new URL(Env.RESUME_URL);
    u.searchParams.set("dl", "0");
    return u.toString();
  } catch {
    return Env.RESUME_URL;
  }
}

/** Direct download: dl=1. Only applies to Dropbox; others return as-is. */
export function getResumeDownloadUrl(): string {
  if (!Env.RESUME_URL) return "";
  if (!isDropboxResumeUrl(Env.RESUME_URL)) {
    return Env.RESUME_URL;
  }
  try {
    const u = new URL(Env.RESUME_URL);
    u.searchParams.set("dl", "1");
    return u.toString();
  } catch {
    return Env.RESUME_URL;
  }
}
