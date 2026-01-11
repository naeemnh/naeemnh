"use client";

// import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
// import { gsap } from "gsap";
// import { useInView } from "react-intersection-observer";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id: string;
  children: React.ReactNode;
  triggerOnce?: boolean;
}

export const Section = ({ id, children, className, ...props }: SectionProps) => {
  // const { ref, inView } = useInView({
  //   threshold: 0.5,
  //   triggerOnce: triggerOnce,
  // });
  // const contentRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (contentRef.current) {
  //     if (inView) {
  //       gsap.to(contentRef.current, {
  //         opacity: 1,
  //         y: 0,
  //         duration: 0.6,
  //         ease: "power2.out",
  //       });
  //     } else if (!triggerOnce) {
  //       gsap.to(contentRef.current, {
  //         opacity: 0,
  //         y: 20,
  //         duration: 0.6,
  //         ease: "power2.out",
  //       });
  //     }
  //   }
  // }, [inView, triggerOnce]);

  return (
    <section
      // ref={ref}
      id={id}
      data-section-id={id}
      className={cn("", className)}
      {...props}
    >
      <div
      // ref={contentRef}
      // style={{ opacity: 0, transform: "translateY(20px)" }}
      >
        {children}
      </div>
    </section>
  );
};
