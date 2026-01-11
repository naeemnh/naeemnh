export const InterfaceToggler = () => {
  return (
    <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm border border-slate-200">
      <span className="text-sm text-slate-800 font-medium">GUI</span>
      <div className="w-10 h-5 bg-slate-200 rounded-full relative cursor-pointer hover:bg-slate-300 transition-colors">
        <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all" />
      </div>
      <span className="text-sm text-slate-400 font-mono">CLI</span>
    </div>
  );
};
