"use client";

import { Section } from "@/components/atoms";
import { AboutSection, BlogsSection, ContactSection, Dock, Header, HeroSection, WorkSection } from "@/components/organisms";
import { Env } from "@/config/env";
import { scrollToSection } from "@/lib/utils";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-slate-50 font-sans">
        {/* Wallpaper */}
        {/* <div className="fixed inset-0 bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" /> */}

        {/* Desktop Interface */}
        <Header />

        {/* Bottom Dock / Taskbar - Fixed */}
        <Dock />

        {/* </div> */}
        {/* Main Content - Scrollable Sections */}
        <main>
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
      </div>
    </>
  );
}

// Contact Section Component
