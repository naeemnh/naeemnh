import { NextResponse } from "next/server";
import { Env } from "@/config/env";
import { getChatSystemPrompt } from "@/lib/chat-knowledge";

const GROQ_CHAT_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";
const GROQ_REQUEST_TIMEOUT_MS = 8000;

type Message = { role: "user" | "assistant"; content: string; };

function isValidMessages(value: unknown): value is Message[] {
  if (!Array.isArray(value) || value.length === 0) return false;
  return value.every(
    (m) =>
      m &&
      typeof m === "object" &&
      (m.role === "user" || m.role === "assistant") &&
      typeof m.content === "string",
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!isValidMessages(body.messages)) {
      return NextResponse.json(
        { error: "messages must be a non-empty array of { role, content }" },
        { status: 400 },
      );
    }

    if (!Env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "Chat service is not configured." },
        { status: 503 },
      );
    }

    const systemPrompt = getChatSystemPrompt();
    const messages = [
      { role: "system" as const, content: systemPrompt },
      ...body.messages,
    ];

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), GROQ_REQUEST_TIMEOUT_MS);
    const res = await fetch(GROQ_CHAT_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        max_tokens: 1024,
        temperature: 0.7,
      }),
      signal: controller.signal,
    }).finally(() => {
      clearTimeout(timeoutId);
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Groq API error:", res.status, err);
      return NextResponse.json(
        { error: "Failed to get a response from the assistant." },
        { status: 502 },
      );
    }

    const data = (await res.json()) as {
      choices?: Array<{ message?: { content?: string; }; }>;
    };
    const content =
      data.choices?.[0]?.message?.content?.trim() ?? "I couldn't generate a response.";

    return NextResponse.json({ content });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      console.error("Groq API request timed out.");
      return NextResponse.json(
        { error: "The assistant took too long to respond. Please try again." },
        { status: 504 },
      );
    }

    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process your message." },
      { status: 500 },
    );
  }
}
