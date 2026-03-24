import React from "react";

function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-background border-b border-outline-variant/20 flex justify-between items-center px-6 py-4">
      <div className="text-primary font-headline font-bold tracking-tighter uppercase">
        MAXX Niu&apos;s Portfolio
      </div>
      <nav className="hidden md:flex items-center gap-8 font-headline tracking-tighter uppercase text-sm font-bold">
        <a className="text-primary border-b-2 border-primary pb-1" href="#">
          TIMELINE
        </a>
        <a
          className="text-outline-variant hover:text-primary transition-colors"
          href="#"
        >
          COMPACT
        </a>
        <a
          className="text-outline-variant hover:text-primary transition-colors"
          href="#"
        >
          SUMMARY
        </a>
      </nav>
      <div className="flex items-center gap-4 text-primary">
        <button className="p-2 hover:bg-surface-container-high transition-all duration-150 rounded">
          <span className="material-symbols-outlined">terminal</span>
        </button>
        <button className="p-2 hover:bg-surface-container-high transition-all duration-150 rounded">
          <span className="material-symbols-outlined">settings</span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
