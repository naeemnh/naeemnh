import { InterfaceToggler } from "@/components/molecules";
import { Env } from "@/config/env";
import { scrollToSection } from "@/lib/utils";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center bg-slate-50/80 backdrop-blur-sm">
      {/* Top Bar / Menu Bar - Fixed */}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection("home");
        }}
        className="text-slate-800 font-medium tracking-tight hover:text-slate-600 transition-colors"
      >
        Naeem Hussain
      </a>

      {/* Version Toggle */}
      {Env.CLI_ENABLED && <InterfaceToggler />}
    </header>
  );
};
