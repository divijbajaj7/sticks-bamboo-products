import React from "react";
import { ArrowRight, Compass } from "lucide-react";

interface HeroSectionProps {
  onExplore: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplore }) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full pt-32 pb-16 md:py-0 md:min-h-[920px] flex items-center overflow-hidden border-b-2 border-[#0a0a0a]"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center md:items-stretch justify-between">
        {/* Left Side: 42% width as specified in layout */}
        <div className="w-full md:w-[42%] flex flex-col justify-end pt-8 md:pt-40 pb-12 z-20">
          {/* Live Status indicator in red #dc2626 */}
          <div className="flex items-center gap-2 mb-4 text-[11px] font-mono tracking-widest text-[#0a0a0a]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#dc2626] animate-ping" />
            <span className="font-bold">SEASON HARVEST 2026 // LIVE INVENTORY ACTIVE</span>
          </div>

          {/* Massive Display Headline */}
          <h1 className="font-anton text-7xl sm:text-8xl md:text-9xl text-[#0a0a0a] uppercase tracking-tighter leading-[0.85] select-none">
            HEAVY
            <br />
            WEIGHT
            <br />
            BAMBOO.
          </h1>

          {/* Sub-paragraph (max-w 320px as specified) */}
          <div className="mt-8 max-w-[320px] space-y-3 font-mono text-xs text-[#0a0a0a]/80 leading-relaxed tracking-wide">
            <p>
              High-tensile organic <span className="text-[#0a0a0a] font-bold">Phyllostachys edulis</span>.
              Engineered against synthetic waste. 0% microplastics. 100% soil-reclaimable monoliths.
            </p>
            <div className="text-[10px] text-[#0a0a0a]/60 uppercase tracking-widest pt-2 border-t border-[#0a0a0a]/20">
              TENSILE: 780 MPa · HARDNESS: 14.5 JANKA
            </div>
          </div>

          {/* Minimalist Underline CTA + Explore Button */}
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              onClick={onExplore}
              className="px-8 py-4 bg-[#0a0a0a] text-[#f2f2f2] font-anton text-xl tracking-wider uppercase flex items-center gap-3 hover:bg-[#dc2626] transition-colors shadow-[4px_4px_0px_#0a0a0a] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer group"
            >
              <Compass className="w-5 h-5 text-white group-hover:rotate-45 transition-transform" />
              <span>EXPLORE</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#inventory"
              className="font-mono text-xs uppercase font-bold tracking-widest text-[#0a0a0a] heavy-link py-3 border-b-2 border-[#0a0a0a]"
            >
              [INSPECT ALL 6 SKUS &darr;]
            </a>
          </div>
        </div>

        {/* Right Side: 65% width absolute/staggered hero imagery with partial off-screen crop */}
        <div className="w-full md:w-[62%] md:absolute md:right-0 md:top-0 md:bottom-0 flex items-center justify-end overflow-hidden pt-8 md:pt-0">
          <div className="relative w-full h-[450px] md:h-full md:w-[94%] overflow-hidden group">
            {/* Grayscale by default with 700ms transition to full color and 1.05x scale on hover */}
            <img
              src="/src/assets/images/hero_bamboo_craft_1791950926991.jpg"
              alt="Raw sculpted sustainable bamboo craft on concrete"
              className="w-full h-full object-cover object-left grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
            />

            {/* Vertical section label: rotated -90 degrees at the bottom-left */}
            <div className="absolute bottom-12 left-2 origin-bottom-left -rotate-90 pointer-events-none select-none z-20">
              <span className="font-mono text-xs uppercase font-bold tracking-[0.3em] bg-[#0a0a0a] text-white px-3 py-1">
                COLLECTION 001 // RAW HARVEST
              </span>
            </div>

            {/* Detail Badge: Small sharp-cornered white rectangle with technical specs */}
            <div className="absolute top-8 right-8 bg-white border border-[#0a0a0a] px-2.5 py-1 z-20 shadow-[2px_2px_0px_#0a0a0a]">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0a0a0a]">
                100% VEGETAL DENSITY · ZERO CO2
              </span>
            </div>

            {/* Bottom-right macro coordinate stamp */}
            <div className="absolute bottom-8 right-8 hidden sm:block bg-[#0a0a0a]/90 text-white font-mono text-[10px] px-3 py-1.5 uppercase tracking-widest">
              LAT 28.198 · LON 119.824 // WILD CLUSTER
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
