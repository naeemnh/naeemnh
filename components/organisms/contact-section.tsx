import { useState } from "react";
import { LinkedinInIcon, GithubInvertocatIcon } from "../icons";
import { Env } from "@/config/env";
import { ContentCard } from "../atoms";

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error: unknown) {
      console.error(error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContentCard className="space-y-8">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-foreground/80 mb-3">Get In Touch</h2>
        <p className="text-gray-600 dark:text-foreground/60">Want to build something together? Have an interesting problem? I read everything.</p>
      </div>

      <div className="grid md:grid-cols-5 gap-12">
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="md:col-span-3 space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-foreground/40 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="What should I call you?"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-slate-400 dark:focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-100 dark:focus:ring-slate-800 transition-all bg-white dark:bg-background text-slate-900 dark:text-foreground"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-foreground/40 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              placeholder="Where can I reach you?"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-slate-400 dark:focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-100 dark:focus:ring-slate-800 transition-all bg-white dark:bg-background text-slate-900 dark:text-foreground"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-foreground/40 mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
              placeholder="What's this about?"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-slate-400 dark:focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-100 dark:focus:ring-slate-800 transition-all bg-white dark:bg-background text-slate-900 dark:text-foreground"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-foreground/40 mb-2">
              Message
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={6}
              placeholder="Tell me everything (or just a little)"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-slate-400 dark:focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-100 dark:focus:ring-slate-800 transition-all bg-white dark:bg-background text-slate-900 dark:text-foreground"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-3.5 bg-slate-900 dark:bg-foreground text-white dark:text-background rounded-xl font-medium hover:bg-slate-800 dark:hover:bg-foreground/80 active:scale-[0.98] transition-all"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>

          {submitStatus === "success" && <p className="text-sm text-green-600 dark:text-green-400">Message sent successfully!</p>}
          {submitStatus === "error" && <p className="text-sm text-red-600 dark:text-red-400">Failed to send message. Please try again.</p>}
        </form>

        {/* Social Links */}
        <div className="md:col-span-2 space-y-8">
          <div>
            <h2 className="text-sm font-semibold text-slate-400 dark:text-foreground/40 uppercase tracking-wider mb-4">Connect</h2>
            <div className="space-y-4">
              <a
                href="https://linkedin.com/in/naeemnh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-foreground/10 p-4 transition-shadow hover:shadow-md text-slate-900 dark:text-foreground"
              >
                <LinkedinInIcon fill="currentColor" className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/naeemnh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-foreground/10 p-4 transition-shadow hover:shadow-md text-slate-900 dark:text-foreground"
              >
                <GithubInvertocatIcon fill="currentColor" className="h-6 w-6 text-slate-900 dark:text-foreground" />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-400 dark:text-foreground/40 uppercase tracking-wider mb-4">Resume</h2>
            <a
              href={Env.RESUME_URL || ""}
              download
              className="flex items-center gap-3 px-5 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl text-slate-700 dark:text-foreground/80 font-medium transition-colors group"
            >
              <span>Download PDF</span>
              <span className="group-hover:translate-y-0.5 transition-transform">↓</span>
            </a>
          </div>

          <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 mb-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-medium text-sm">Available for work</span>
            </div>
            <p className="text-emerald-600 dark:text-emerald-400 text-sm">Open to full-time roles and interesting projects</p>
          </div>
        </div>
      </div>
    </ContentCard>
  );
};
