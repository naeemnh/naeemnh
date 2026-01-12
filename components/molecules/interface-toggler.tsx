import { useState } from "react";

export const InterfaceToggler = () => {
  const [isCLI, setIsCLI] = useState(false);

  const handleToggle = () => {
    setIsCLI(!isCLI);
  };

  return (
    <div onClick={handleToggle} className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm border border-slate-200">
      <span className="text-sm text-slate-800 font-medium">GUI</span>
      <div className={`w-10 h-5 rounded-full relative cursor-pointer hover:bg-slate-300 transition-colors ${isCLI ? "bg-green-500" : "bg-slate-200"}`}>
        <div
          className={`absolute left-0.5 right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${
            isCLI ? "left-5 right-0" : "left-0 right-5"
          }`}
        />
      </div>
      <span className="text-sm text-slate-400 font-mono">CLI</span>
    </div>
  );
};
