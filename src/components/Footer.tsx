import React from "react";
import BambooLogo from "./BambooLogo";

interface FooterProps {
  onExplore: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onExplore }) => {
  return (
    <footer className="bg-[#0a0a0a] text-white pt-20 pb-8 border-t-2 border-[#0a0a0a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Brand & Manifesto Strip */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between pb-12 border-b border-white/20 gap-8">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-white text-[#0a0a0a]">
              <BambooLogo className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-anton text-3xl uppercase tracking-tighter">
                STICKS SUSTAINABLE CO.
              </h3>
              <p className="font-mono text-xs text-white/60 uppercase tracking-widest mt-1">
                HEAVYWEIGHT BAMBOO ARCHITECTURE · EST. 2024 · NEW YORK / KYOTO
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onExplore}
              className="px-6 py-3 bg-white text-[#0a0a0a] font-anton text-sm uppercase tracking-wider hover:bg-[#dc2626] hover:text-white transition-colors cursor-pointer"
            >
              EXPLORE COLLECTION 001 &rarr;
            </button>
            <a
              href="#hero"
              className="font-mono text-xs text-white/70 hover:text-white uppercase heavy-link tracking-widest"
            >
              [BACK TO TOP &uarr;]
            </a>
          </div>
        </div>

        {/* 6-Column Organized Links Grid as specified */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 py-16 border-b border-white/15 font-mono text-xs">
          {/* Column 1: SKUs */}
          <div className="space-y-3">
            <div className="text-[10px] tracking-widest text-[#dc2626] uppercase font-bold">
              01 // REQUISITIONS
            </div>
            <ul className="space-y-2 text-white/70">
              <li><a href="#inventory" className="hover:text-white heavy-link">Water Bottle</a></li>
              <li><a href="#inventory" className="hover:text-white heavy-link">Toothbrush Pack</a></li>
              <li><a href="#inventory" className="hover:text-white heavy-link">Bamboo Sneakers</a></li>
              <li><a href="#inventory" className="hover:text-white heavy-link">Refill Tissues</a></li>
              <li><a href="#inventory" className="hover:text-white heavy-link">Polarized Shades</a></li>
              <li><a href="#inventory" className="hover:text-white heavy-link">Desk Mat Monolith</a></li>
            </ul>
          </div>

          {/* Column 2: Science */}
          <div className="space-y-3">
            <div className="text-[10px] tracking-widest text-white/40 uppercase font-bold">
              02 // BOTANICAL
            </div>
            <ul className="space-y-2 text-white/70">
              <li><span className="hover:text-white cursor-pointer heavy-link">Moso Regeneration</span></li>
              <li><span className="hover:text-white cursor-pointer heavy-link">Silica Nodes</span></li>
              <li><span className="hover:text-white cursor-pointer heavy-link">Lignin Hardening</span></li>
              <li><span className="hover:text-white cursor-pointer heavy-link">Bamboo-Kun Agent</span></li>
              <li><span className="hover:text-white cursor-pointer heavy-link">Charcoal Pyrolysis</span></li>
            </ul>
          </div>

          {/* Column 3: Logistics */}
          <div className="space-y-3">
            <div className="text-[10px] tracking-widest text-white/40 uppercase font-bold">
              03 // DISPATCH
            </div>
            <ul className="space-y-2 text-white/70">
              <li><span className="hover:text-white cursor-pointer heavy-link">Carbon-Free Shipping</span></li>
              <li><span className="hover:text-white cursor-pointer heavy-link">Cash on Delivery</span></li>
              <li><span className="hover:text-white cursor-pointer heavy-link">Kraft Paper Mailers</span></li>
              <li><span className="hover:text-white cursor-pointer heavy-link">Track Manifest</span></li>
              <li><span className="hover:text-white cursor-pointer heavy-link">Bulk Corporate B2B</span></li>
            </ul>
          </div>

          {/* Column 4: Standards */}
          <div className="space-y-3">
            <div className="text-[10px] tracking-widest text-white/40 uppercase font-bold">
              04 // AUDIT
            </div>
            <ul className="space-y-2 text-white/70">
              <li><span className="hover:text-white cursor-pointer heavy-link">FSC Chain of Custody</span></li>
              <li><span className="hover:text-white cursor-pointer heavy-link">Zero Chlorine Cert</span></li>
              <li><span className="hover:text-white cursor-pointer heavy-link">Biodegradable ASTM</span></li>
              <li><span className="hover:text-white cursor-pointer heavy-link">Life Cycle Analysis</span></li>
              <li><span className="hover:text-white cursor-pointer heavy-link">Soil Loam Test</span></li>
            </ul>
          </div>

          {/* Column 5: Legal */}
          <div className="space-y-3">
            <div className="text-[10px] tracking-widest text-white/40 uppercase font-bold">
              05 // PROTOCOL
            </div>
            <ul className="space-y-2 text-white/70">
              <li><span className="hover:text-white cursor-pointer heavy-link">Zero Plastic Pledge</span></li>
              <li><span className="hover:text-white cursor-pointer heavy-link">Terms of Supply</span></li>
              <li><span className="hover:text-white cursor-pointer heavy-link">Privacy Safeguards</span></li>
              <li><span className="hover:text-white cursor-pointer heavy-link">10-Year Repair Rule</span></li>
              <li><span className="hover:text-white cursor-pointer heavy-link">Whistleblower Line</span></li>
            </ul>
          </div>

          {/* Column 6: Coordinates */}
          <div className="space-y-3">
            <div className="text-[10px] tracking-widest text-white/40 uppercase font-bold">
              06 // NETWORK
            </div>
            <div className="text-white/60 space-y-1 text-[11px]">
              <div>NYC FORGE // 40.7128 N</div>
              <div>ZHEJIANG GROVE // 28.198 N</div>
              <div className="text-[#dc2626] font-bold mt-2">
                SYSTEM: ALL HARVESTS ACTIVE
              </div>
              <div className="text-white/40 text-[10px] mt-1">
                UTC {new Date().toISOString().slice(11, 19)}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-white/50 gap-4">
          <div>
            &copy; {new Date().getFullYear()} STICKS BAMBOO SYSTEM INC. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <span>PRINTED ON DIGITAL CONCRETE</span>
            <span>·</span>
            <span>HEAVYWEIGHT SUSTAINABILITY</span>
          </div>
        </div>

        {/* Oversized 'STICKS' Display Text (10vw) in Low-Opacity White (text-white/10) as structural anchor */}
        <div className="w-full text-center select-none pointer-events-none mt-8 overflow-hidden">
          <div className="font-anton text-[11vw] leading-[0.75] tracking-tighter text-white/10 uppercase whitespace-nowrap">
            STICKS
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
