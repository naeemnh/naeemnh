export const Env = {
  RESUME_URL: process.env.RESUME_URL || process.env.NEXT_PUBLIC_RESUME_URL,
  CLI_ENABLED: (process.env.CLI_ENABLED || process.env.NEXT_PUBLIC_CLI_ENABLED) === "true" || false,
  BLOGS_ENABLED: (process.env.BLOGS_ENABLED || process.env.NEXT_PUBLIC_BLOGS_ENABLED) === "true" || false,
  RESEND_API_KEY: process.env.RESEND_API_KEY || process.env.NEXT_PUBLIC_RESEND_API_KEY,
  CONTACT_FORM_RECIPIENT_EMAIL: process.env.CONTACT_FORM_RECIPIENT_EMAIL || process.env.NEXT_PUBLIC_CONTACT_FORM_RECIPIENT_EMAIL,
  RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL || process.env.NEXT_PUBLIC_RESEND_FROM_EMAIL,
};
