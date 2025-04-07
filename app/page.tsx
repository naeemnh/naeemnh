"use client";

import { CanvasAnimation } from "@/components/organisms";

export default function Home() {
  return (
    <>
      <CanvasAnimation />
      <main className="w-full h-full min-h-[100vh] bg-black/5 flex flex-col justify-center items-center text-center gap-4 pl-2 pb-2">
        <h1 className="text-foreground dark text-3xl lg:text-5xl">
          Hello, My name is Naeem Hussain
        </h1>
        <p className="text-foreground dark italic lg:text-2xl max-w-[75%] lg:max-w-[700px]">
          I am a full stack developer, crafting digital solutions with a passion
          for innovation and a commitment to excellence.
        </p>
      </main>
    </>
  );
}
