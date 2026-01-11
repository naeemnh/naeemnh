"use client";

import { useRef } from "react";
import { gsap } from "gsap";

interface AppIconProps {
  name: string;
  sectionId?: string;
  href?: string;
  onClick?: () => void;
  icon: React.ReactNode;
  color?: string;
}

export function AppIcon({ name, sectionId, href, onClick, icon, color = "bg-blue-500" }: AppIconProps) {
  const iconRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        const elementTop = element.offsetTop;
        window.scrollTo({
          top: elementTop,
          behavior: "smooth",
        });
      }
    } else if (href) {
      window.location.href = href;
    }
  };

  const handleMouseEnter = () => {
    gsap.to(iconRef.current, {
      scale: 1.05,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(iconRef.current, {
      scale: 1,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const handleMouseDown = () => {
    gsap.to(iconRef.current, {
      scale: 0.95,
      duration: 0.1,
      ease: "power2.out",
    });
  };

  const handleMouseUp = () => {
    gsap.to(iconRef.current, {
      scale: 1.05,
      duration: 0.1,
      ease: "power2.out",
    });
  };

  return (
    <button onClick={handleClick} className="group" aria-label={`Navigate to ${name}`}>
      <div
        ref={iconRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        className="flex flex-col items-center gap-2"
      >
        <div className={`${color} flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg transition-shadow group-hover:shadow-xl sm:h-20 sm:w-20`}>
          {icon}
        </div>
        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{name}</span>
      </div>
    </button>
  );
}
