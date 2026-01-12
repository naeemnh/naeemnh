import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export interface ContentCardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const ContentCard = ({ children, className, ...props }: ContentCardProps) => {
  return (
    <div className={cn("backdrop-blur-sm bg-white/20 rounded-2xl p-6 border border-slate-200", className)} {...props}>
      {children}
    </div>
  );
};
