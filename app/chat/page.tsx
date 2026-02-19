import Link from "next/link";
import { ChatPanel } from "@/components/features/chat";
import { Section } from "@/components/atoms";
import { ArrowLeft } from "lucide-react";

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-background">
      <header className="sticky top-0 z-50 px-6 py-4 flex items-center gap-4 bg-slate-50/80 dark:bg-background/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-700 dark:text-foreground/80 hover:text-slate-900 dark:hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
        <span className="text-slate-500 dark:text-foreground/50">|</span>
        <span className="font-medium text-slate-900 dark:text-foreground">Chat</span>
      </header>

      <Section id="chat" className="px-6 pt-12 pb-24">
        <ChatPanel />
      </Section>
    </main>
  );
}
