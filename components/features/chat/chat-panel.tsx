"use client";

import { useState, useRef, useEffect } from "react";
import { ContentCard } from "@/components/atoms";
import { cn } from "@/lib/utils";

type ChatMessage = { role: "user" | "assistant"; content: string };

export function ChatPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo(0, listRef.current.scrollHeight);
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    setError(null);
    const userMessage: ChatMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error ?? "Something went wrong.");
        return;
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.content ?? "" }]);
    } catch {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContentCard className="flex flex-col h-[70vh] min-h-[320px] max-w-2xl mx-auto">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-foreground/80">Ask about Naeem</h2>
        <p className="text-sm text-gray-600 dark:text-foreground/60 mt-1">
          Questions about his experience, projects, skills, or how to get in touch.
        </p>
      </div>

      <div
        ref={listRef}
        className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 min-h-0"
      >
        {messages.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Send a message to start. Try &quot;What does Naeem do?&quot; or &quot;What are his skills?&quot;
          </p>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={cn(
              "rounded-lg px-4 py-2.5 max-w-[85%]",
              m.role === "user"
                ? "ml-auto bg-blue-600 text-white dark:bg-blue-700"
                : "mr-auto bg-gray-100 dark:bg-gray-800 text-slate-800 dark:text-foreground/90",
            )}
          >
            <p className="text-sm whitespace-pre-wrap">{m.content}</p>
          </div>
        ))}
        {loading && (
          <div className="mr-auto rounded-lg px-4 py-2.5 max-w-[85%] bg-gray-100 dark:bg-gray-800 text-slate-600 dark:text-foreground/70">
            <p className="text-sm">Thinking...</p>
          </div>
        )}
      </div>

      {error && (
        <p className="text-red-600 dark:text-red-400 text-sm mb-2" role="alert">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          disabled={loading}
          className="flex-1 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-slate-900 dark:text-foreground placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          aria-label="Chat message"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          Send
        </button>
      </form>
    </ContentCard>
  );
}
