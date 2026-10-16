import React from "react";
import { Shield, Sparkles, Wind, Cpu } from "lucide-react";

export const TechnicalInfoGrid: React.FC = () => {
  return (
    <section id="architecture" className="py-24 border-b-2 border-[#0a0a0a] bg-[#f2f2f2]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left 4 Columns: Sticky with Massive Headers & Left-border Accent */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-8">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#0a0a0a]/60 uppercase block">
                SECTION 03 // STRUCTURAL INTEGRITY
              </span>
              <h2 className="font-anton text-5xl md:text-7xl uppercase tracking-tighter leading-[0.85] text-[#0a0a0a] mt-2">
                MATERIAL
                <br />
                ARCHI
                <br />
                TECTURE.
              </h2>
            </div>

            {/* Left-border accent (border-l-2 border-[#0a0a0a] pl-4) */}
            <div className="border-l-2 border-[#0a0a0a] pl-5 space-y-4 font-mono text-xs text-[#0a0a0a]/80 leading-relaxed">
              <p>
                Bamboo is not wood—it is a giant arborescent grass possessing an
                interlocked silica-cellulose cellular matrix. Its tensile strength
                rivals structural mild steel (380–780 MPa) while maintaining superior
                vibration damping.
              </p>
              <p>
                Harvested strictly at year 5 when culm lignification peaks. Zero
                synthetic fertilizers, zero clear-cutting, and rapid continuous
                root regeneration.
              </p>
            </div>

            {/* Technical Metric Blocks */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#0a0a0a]/20">
              <div className="border border-[#0a0a0a] p-3 bg-white">
                <div className="font-mono text-[10px] text-[#0a0a0a]/60 uppercase">
                  GROWTH VELOCITY
                </div>
                <div className="font-anton text-2xl text-[#0a0a0a] mt-1">
                  91 CM/DAY
                </div>
                <div className="text-[10px] font-mono text-[#0a0a0a]/70">
                  Guinness verified speed
                </div>
              </div>

              <div className="border border-[#0a0a0a] p-3 bg-white">
                <div className="font-mono text-[10px] text-[#0a0a0a]/60 uppercase">
                  CO2 SEQUESTRATION
                </div>
                <div className="font-anton text-2xl text-[#dc2626] mt-1">
                  4X TIMBER
                </div>
                <div className="text-[10px] font-mono text-[#0a0a0a]/70">
                  35% more oxygen output
                </div>
              </div>

              <div className="border border-[#0a0a0a] p-3 bg-white">
                <div className="font-mono text-[10px] text-[#0a0a0a]/60 uppercase">
                  COMPRESSIVE MATRIX
                </div>
                <div className="font-anton text-2xl text-[#0a0a0a] mt-1">
                  84 MPa
                </div>
                <div className="text-[10px] font-mono text-[#0a0a0a]/70">
                  Exceeds C30 concrete
                </div>
              </div>

              <div className="border border-[#0a0a0a] p-3 bg-white">
                <div className="font-mono text-[10px] text-[#0a0a0a]/60 uppercase">
                  MICROPLASTICS
                </div>
                <div className="font-anton text-2xl text-[#0a0a0a] mt-1">
                  0.00 PPM
                </div>
                <div className="text-[10px] font-mono text-[#0a0a0a]/70">
                  Total soil reclamation
                </div>
              </div>
            </div>
          </div>

          {/* Right 8 Columns: Variety of image aspect ratios (4:5 and 1:1) showcasing macro details */}
          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Card 1: 4:5 aspect ratio */}
              <div className="relative border-2 border-[#0a0a0a] bg-white overflow-hidden group shadow-[4px_4px_0px_#0a0a0a]">
                <div className="aspect-4/5 overflow-hidden">
                  <img
                    src="/src/assets/images/sku_bamboo_bottle_1791950927542.jpg"
                    alt="Bamboo Water Bottle Macro Detail"
                    className="w-full h-full object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
                  />
                </div>
                {/* Detail Badge */}
                <div className="absolute top-4 right-4 bg-white border border-[#0a0a0a] px-2.5 py-1 z-10">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0a0a0a]">
                    DOUBLE-WALL THERMAL VACUUM
                  </span>
                </div>
                <div className="p-5 border-t-2 border-[#0a0a0a] bg-white">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#dc2626] font-bold">
                    SPEC 01 // CULM TURNING
                  </span>
                  <h3 className="font-anton text-2xl tracking-tight text-[#0a0a0a] mt-1">
                    SEAMLESS CYLINDRICAL CASING
                  </h3>
                  <p className="font-mono text-xs text-[#0a0a0a]/75 mt-2 leading-relaxed">
                    Lathe-milled from whole bamboo internodes with calibrated wall
                    thickness to insulate without toxic polyurethane resins.
                  </p>
                </div>
              </div>

              {/* Card 2: 1:1 aspect ratio */}
              <div className="relative border-2 border-[#0a0a0a] bg-white overflow-hidden group shadow-[4px_4px_0px_#0a0a0a] flex flex-col justify-between">
                <div className="aspect-square overflow-hidden">
                  <img
                    src="/src/assets/images/sku_bamboo_toothbrush_1791950928569.jpg"
                    alt="Bamboo Toothbrush Charcoal Bristle Detail"
                    className="w-full h-full object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
                  />
                </div>
                {/* Detail Badge */}
                <div className="absolute top-4 right-4 bg-white border border-[#0a0a0a] px-2.5 py-1 z-10">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0a0a0a]">
                    BINCHOTAN OAK CARBON
                  </span>
                </div>
                <div className="p-5 border-t-2 border-[#0a0a0a] bg-white">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#dc2626] font-bold">
                    SPEC 02 // MICRO-FILAMENTS
                  </span>
                  <h3 className="font-anton text-2xl tracking-tight text-[#0a0a0a] mt-1">
                    CHARCOAL BRISTLE REPAIR
                  </h3>
                  <p className="font-mono text-xs text-[#0a0a0a]/75 mt-2 leading-relaxed">
                    Activated microporous charcoal fibers neutralize acidic oral
                    bacteria through physical van der Waals adsorption.
                  </p>
                </div>
              </div>
            </div>

            {/* Wide Construction Macro Banner: 4:5 / Panoramic split */}
            <div className="border-2 border-[#0a0a0a] bg-white p-6 md:p-8 shadow-[6px_6px_0px_#0a0a0a]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#0a0a0a]">
                    <Shield className="w-4 h-4 text-[#dc2626]" />
                    <span>NATURAL "BAMBOO-KUN"</span>
                  </div>
                  <p className="font-mono text-[11px] text-[#0a0a0a]/75 leading-relaxed">
                    Raw bamboo naturally synthesizes an antimicrobial bio-agent
                    that inhibits 99.8% of mold and bacterial proliferation without chemicals.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#0a0a0a]">
                    <Wind className="w-4 h-4 text-[#dc2626]" />
                    <span>CELLULAR MICRO-PORES</span>
                  </div>
                  <p className="font-mono text-[11px] text-[#0a0a0a]/75 leading-relaxed">
                    Multi-chambered hollow fibers wick perspiration and moisture
                    40% faster than long-staple cotton textiles.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#0a0a0a]">
                    <Cpu className="w-4 h-4 text-[#dc2626]" />
                    <span>CIRCULAR RECLAMATION</span>
                  </div>
                  <p className="font-mono text-[11px] text-[#0a0a0a]/75 leading-relaxed">
                    When buried in garden compost, items degrade into organic nitrogen
                    and potassium rich loam in 180 days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalInfoGrid;
