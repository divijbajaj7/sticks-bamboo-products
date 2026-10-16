import React from "react";
import { ShoppingBag } from "lucide-react";
import { SparklesText } from "@/registry/magicui/sparkles-text";
import BambooLogo from "./BambooLogo";

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onExplore: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onExplore,
}) => {
  return (
    <>
      {/* Fixed Non-Standard Header */}
      <header className="fixed top-0 left-0 w-full z-40 pointer-events-none p-6 md:p-8 flex justify-between items-start">
        {/* Top-Left Brand Anchor */}
        <div className="pointer-events-auto flex items-start gap-3">
          <div className="p-1 bg-[#0a0a0a] text-white">
            <BambooLogo className="w-8 h-8" />
          </div>

          <div className="flex flex-col">
            <a href="#" className="flex items-center gap-2 group">
              <span className="font-anton text-3xl md:text-4xl uppercase tracking-tighter leading-none text-[#0a0a0a]">
                <SparklesText
                  text="STICKS"
                  sparklesCount={8}
                  colors={{ first: "#0a0a0a", second: "#dc2626" }}
                >
                  STICKS
                </SparklesText>
              </span>
            </a>
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#0a0a0a]/70 uppercase mt-1">
              EST. 2024 / NYC · 100% SUSTAINABLE BAMBOO
            </span>
          </div>
        </div>

        {/* Right-Shifted Navigation Column (mr-32 on desktop as specified) */}
        <div className="pointer-events-auto hidden md:flex flex-col items-end gap-1.5 mr-28 lg:mr-36 text-right">
          <a
            href="#hero"
            className="text-xs font-mono uppercase font-semibold text-[#0a0a0a] heavy-link tracking-widest"
          >
            01 // ARCHIVE
          </a>
          <a
            href="#essentials"
            className="text-xs font-mono uppercase font-semibold text-[#0a0a0a] heavy-link tracking-widest"
          >
            02 // ESSENTIALS
          </a>
          <a
            href="#architecture"
            className="text-xs font-mono uppercase font-semibold text-[#0a0a0a] heavy-link tracking-widest"
          >
            03 // ARCHITECTURE
          </a>
          <a
            href="#inventory"
            className="text-xs font-mono uppercase font-semibold text-[#0a0a0a] heavy-link tracking-widest"
          >
            04 // INVENTORY
          </a>
          <a
            href="#proof"
            className="text-xs font-mono uppercase font-semibold text-[#0a0a0a] heavy-link tracking-widest"
          >
            05 // AUDIT & REVIEWS
          </a>
          <button
            onClick={onExplore}
            className="mt-1 text-xs font-mono uppercase font-bold text-[#dc2626] heavy-link tracking-widest flex items-center gap-1 cursor-pointer"
          >
            [EXPLORE CATALOG &rarr;]
          </button>
        </div>
      </header>

      {/* Floating Action Cart: 64px x 64px isolated high-z-index top-right button */}
      <div className="fixed top-6 right-6 md:top-8 md:right-8 z-45">
        <button
          onClick={onOpenCart}
          className="relative w-16 h-16 rounded-full bg-white text-[#0a0a0a] border-2 border-[#0a0a0a] flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-[4px_4px_0px_#0a0a0a] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer group"
          aria-label={`Shopping cart containing ${cartCount} items`}
        >
          <ShoppingBag className="w-6 h-6 stroke-[1.8] group-hover:scale-110 transition-transform" />
          
          {/* Notification Badge in Red (#dc2626) with white 10px text */}
          <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-[#dc2626] text-white text-[10px] font-mono font-bold rounded-full flex items-center justify-center border-2 border-white shadow-xs">
            {cartCount}
          </span>
        </button>
      </div>
    </>
  );
};

export default Header;
