"use client";

import { useState } from "react";
import { Env } from "@/config/env";
import { Section } from "@/components/atoms";
import { AboutSection, BlogsSection, CanvasAnimation, ContactSection, Dock, Header, HeroSection, WorkSection, SettingsPanel } from "@/components/organisms";
import { scrollToSection } from "@/lib/utils";
import { AnimationPreferencesProvider } from "@/providers";

export const GUI = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <AnimationPreferencesProvider>
      {/* Canvas Animation */}
      <CanvasAnimation />

      {/* Header - Fixed */}
      <Header />

      {/* Bottom Dock / Taskbar - Fixed */}
      <Dock onSettingsClick={() => setIsSettingsOpen(true)} />

      {/* Settings Panel */}
      <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

      {/* </div> */}
      {/* Main Content - Scrollable Sections */}
      <main>
        {/* Home Section */}
        <Section id="home">
          <HeroSection onNavigate={(sectionId) => scrollToSection(sectionId)} />
        </Section>

        {/* Portfolio Section */}
        <Section id="work">
          <WorkSection />
        </Section>

        {/* Blog Section */}
        {Env.BLOGS_ENABLED && (
          <Section id="blog">
            <BlogsSection />
          </Section>
        )}

        {/* About Section */}
        <Section id="about">
          <AboutSection />
        </Section>

        {/* Contact Section */}
        <Section id="contact" className="pb-28 md:pb-36">
          <div className="px-6 max-w-4xl mx-auto py-24">
            <ContactSection />
          </div>
        </Section>
      </main>
    </AnimationPreferencesProvider>
  );
};