import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { BookOpen, Mail, Briefcase, User, Settings, HomeIcon } from "lucide-react";

import { useIsDesktop } from "@/hooks";
import { AppIcon } from "../atoms";

export const Dock = () => {
  const isDesktop = useIsDesktop();
  const dockContainerRef = useRef<HTMLDivElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const settingsButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dockContainerRef.current) {
      gsap.to(dockContainerRef.current, {
        paddingBottom: isDesktop ? 24 : 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    if (dockRef.current) {
      gsap.to(dockRef.current, {
        borderRadius: isDesktop ? 16 : 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [isDesktop]);

  const handleSettingsMouseEnter = () => {
    if (settingsButtonRef.current) {
      gsap.to(settingsButtonRef.current, {
        scale: 1.05,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  const handleSettingsMouseLeave = () => {
    if (settingsButtonRef.current) {
      gsap.to(settingsButtonRef.current, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  const handleSettingsMouseDown = () => {
    if (settingsButtonRef.current) {
      gsap.to(settingsButtonRef.current, {
        scale: 0.95,
        duration: 0.1,
        ease: "power2.out",
      });
    }
  };

  const handleSettingsMouseUp = () => {
    if (settingsButtonRef.current) {
      gsap.to(settingsButtonRef.current, {
        scale: 1.05,
        duration: 0.1,
        ease: "power2.out",
      });
    }
  };

  return (
    <div ref={dockContainerRef} className={`fixed bottom-0 left-0 right-0 z-50 flex ${isDesktop ? "justify-center" : "justify-stretch"}`}>
      <div
        ref={dockRef}
        className={`
              flex items-center justify-center gap-2
              bg-white/80 backdrop-blur-xl dark:bg-gray-800/80
              px-6 py-3
              ${isDesktop ? "shadow-lg shadow-black/10 dark:shadow-black/30" : "w-full shadow-sm"}
            `}
        style={{
          overflow: "hidden",
        }}
      >
        <AppIcon name="" sectionId="home" icon={<HomeIcon className="h-6 w-6 text-black dark:text-white" />} color="bg-transparent" />
        <AppIcon name="" sectionId="work" icon={<Briefcase className="h-6 w-6 text-black dark:text-white" />} color="bg-transparent" />
        <AppIcon name="" sectionId="blog" icon={<BookOpen className="h-6 w-6 text-black dark:text-white" />} color="bg-transparent" />
        <AppIcon name="" sectionId="about" icon={<User className="h-6 w-6 text-black dark:text-white" />} color="bg-transparent" />
        <AppIcon name="" sectionId="contact" icon={<Mail className="h-6 w-6 text-black dark:text-white" />} color="bg-transparent" />

        <div className="mx-2 h-8 w-px bg-gray-300 dark:bg-gray-600" />

        <button className="group flex items-center justify-center" aria-label="Connect With Me">
          <div
            ref={settingsButtonRef}
            onMouseEnter={handleSettingsMouseEnter}
            onMouseLeave={handleSettingsMouseLeave}
            onMouseDown={handleSettingsMouseDown}
            onMouseUp={handleSettingsMouseUp}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-gray-400 to-gray-500 shadow-lg transition-shadow group-hover:shadow-xl dark:from-gray-600 dark:to-gray-700"
          >
            <Settings className="h-6 w-6 text-white" />
          </div>
        </button>
      </div>
    </div>
  );
};
