import { cn } from "@/lib/utils";

export type OutputLineType = "command" | "output" | "error";

export interface OutputLine {
  id: string;
  type: OutputLineType;
  content: string | React.ReactNode;
  timestamp?: Date;
  isTemporary?: boolean; // Marks prompt lines that should be removed when user provides input
}

interface OutputLineProps {
  line: OutputLine;
}

export const OutputLineComponent = ({ line }: OutputLineProps) => {
  const baseStyles = "font-mono text-sm whitespace-pre-wrap break-words";
  
  const typeStyles = {
    command: "text-slate-400",
    output: "text-slate-100",
    error: "text-red-400",
  };

  return (
    <div className={cn(baseStyles, typeStyles[line.type])}>
      {line.content}
    </div>
  );
};
