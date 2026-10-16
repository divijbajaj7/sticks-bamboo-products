import React from "react";
import { Star, MessageSquare } from "lucide-react";
import { REVIEWS } from "../data/products";

export const CustomerFeedbacks: React.FC = () => {
  return (
    <section id="proof" className="py-24 border-b-2 border-[#0a0a0a] bg-[#f2f2f2] overflow-hidden">
      {/* Section Title */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#0a0a0a] uppercase mb-2">
          <MessageSquare className="w-4 h-4 text-[#dc2626]" />
          <span className="font-bold">SECTION 05 // FIELD AUDITS & PATRON TESTIMONIALS</span>
        </div>
        <h2 className="font-anton text-5xl md:text-7xl uppercase tracking-tighter text-[#0a0a0a]">
          CUSTOMER FEEDBACK
        </h2>
        <p className="font-mono text-xs text-[#0a0a0a]/70 uppercase tracking-wider mt-2">
          UNFILTERED DISPATCHES FROM MATERIAL SCIENTISTS, ARCHITECTS, & PATRONS
        </p>
      </div>

      {/* Marquee Effect Track 1: Leftward */}
      <div className="w-full overflow-hidden border-y-2 border-[#0a0a0a] bg-white py-4 mb-4">
        <div className="animate-marquee-left flex items-center gap-8">
          {[...REVIEWS, ...REVIEWS].map((item, idx) => (
            <div
              key={`marquee-1-${idx}`}
              className="flex items-center gap-4 shrink-0 px-6 py-2 border-r border-[#0a0a0a]/30"
            >
              <div className="flex items-center gap-1 text-[#dc2626]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#dc2626]" />
                ))}
              </div>
              <span className="font-mono text-xs font-bold uppercase text-[#0a0a0a]">
                "{item.quote.slice(0, 68)}..."
              </span>
              <span className="font-mono text-[11px] text-[#0a0a0a]/60">
                — {item.author} ({item.company})
              </span>
              <span className="bg-[#0a0a0a] text-white px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest">
                {item.product}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Effect Track 2: Rightward */}
      <div className="w-full overflow-hidden border-b-2 border-[#0a0a0a] bg-[#0a0a0a] py-3 text-white mb-16">
        <div className="animate-marquee-right flex items-center gap-8">
          {[
            "ZERO PLASTIC · ZERO SYNTHETIC POLYMERS · 10-YEAR LONGEVITY · RAPID 91CM/DAY REGROWTH · SOIL BIODEGRADABLE",
            "100% MOSO BAMBOO · VERIFIED HEAVYWEIGHT CANVASES · FSC CERTIFIED GUM RUBBER · JAPANESE BINCHOTAN CHARCOAL",
            "TESTED TO 780 MPa TENSILE STRENGTH · 4X TIMBER CO2 SEQUESTRATION · SHIP DIRECT IN PAPER MAILERS",
            "NATURAL BAMBOO-KUN ANTIMICROBIAL PROPERTIES · ZERO PETROLEUM RESINS · BRUTALIST SUSTAINABILITY",
          ].map((text, i) => (
            <div key={i} className="flex items-center gap-6 shrink-0">
              <span className="font-anton text-lg tracking-wider text-[#f2f2f2]">
                {text}
              </span>
              <span className="w-2 h-2 rounded-full bg-[#dc2626]" />
            </div>
          ))}
        </div>
      </div>

      {/* Masonry Social Proof: 3-column layout with rotated poster cards */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {REVIEWS.map((rev, index) => {
            const isSolid = index % 2 === 0;

            return (
              <div
                key={rev.id}
                className={`break-inside-avoid p-6 transition-transform duration-300 hover:rotate-0 hover:scale-[1.02] cursor-default ${rev.rotation} ${
                  isSolid
                    ? "bg-[#f2f2f2] border-2 border-[#0a0a0a] shadow-[4px_4px_0px_#0a0a0a]"
                    : "bg-white border-2 border-[#0a0a0a] shadow-[6px_6px_0px_#dc2626]"
                }`}
              >
                {/* Poster Pin Top Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#0a0a0a]/20 mb-4">
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#0a0a0a]/70">
                    <span className="w-2 h-2 rounded-full bg-[#0a0a0a] inline-block" />
                    <span className="font-bold">@{rev.author.toLowerCase().replace(" ", "_")}</span>
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 bg-[#0a0a0a] text-white">
                    {rev.tag}
                  </span>
                </div>

                {/* Star rating */}
                <div className="flex items-center gap-1 text-[#0a0a0a] mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#0a0a0a]" />
                  ))}
                </div>

                {/* Monospace Quote */}
                <blockquote className="font-mono text-xs text-[#0a0a0a] leading-relaxed mb-4">
                  "{rev.quote}"
                </blockquote>

                {/* Product reference & Author info */}
                <div className="pt-3 border-t border-[#0a0a0a]/15 flex items-end justify-between font-mono">
                  <div>
                    <div className="text-xs font-bold text-[#0a0a0a]">
                      {rev.author}
                    </div>
                    <div className="text-[10px] text-[#0a0a0a]/60">
                      {rev.role} · {rev.company}
                    </div>
                  </div>
                  <div className="text-[10px] text-[#dc2626] font-bold">
                    {rev.product}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CustomerFeedbacks;
