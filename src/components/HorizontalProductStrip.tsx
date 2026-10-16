import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, Plus, Eye } from "lucide-react";
import { PRODUCTS, Product } from "../data/products";

interface HorizontalProductStripProps {
  onAddToCart: (product: Product, size: string) => void;
  onExploreSku: (product: Product) => void;
}

export const HorizontalProductStrip: React.FC<HorizontalProductStripProps> = ({
  onAddToCart,
  onExploreSku,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 380;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="essentials" className="py-20 border-b-2 border-[#0a0a0a] bg-[#f2f2f2]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#0a0a0a]">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#0a0a0a]/60 uppercase block">
              SECTION 02 // ESSENTIALS STRIP
            </span>
            <h2 className="font-anton text-4xl md:text-6xl text-[#0a0a0a] uppercase tracking-tight mt-1">
              CIRCULAR ESSENTIALS
            </h2>
          </div>

          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span className="text-xs font-mono text-[#0a0a0a]/70 uppercase hidden sm:inline">
              [DRAG OR SCROLL HORIZONTALLY]
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                className="p-3 border-2 border-[#0a0a0a] bg-white hover:bg-[#0a0a0a] hover:text-white transition-colors cursor-pointer shadow-[2px_2px_0px_#0a0a0a]"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="p-3 border-2 border-[#0a0a0a] bg-white hover:bg-[#0a0a0a] hover:text-white transition-colors cursor-pointer shadow-[2px_2px_0px_#0a0a0a]"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Track */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-6 pt-2"
        >
          {PRODUCTS.map((product) => {
            const firstAvailableSize =
              product.sizes.find((s) => s.available)?.label || product.sizes[0].label;

            return (
              <div
                key={product.id}
                className="snap-start shrink-0 w-[280px] sm:w-[320px] md:w-[340px] flex flex-col group"
              >
                {/* 3:4 Aspect Ratio Product Card */}
                <div className="relative aspect-3/4 overflow-hidden border-2 border-[#0a0a0a] bg-white shadow-[4px_4px_0px_#0a0a0a]">
                  {/* Default Grayscale Image, 700ms transition to full color & 1.05x scale on hover */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
                  />

                  {/* Secondary Technical Specs Overlay that fades in on hover */}
                  <div className="absolute inset-0 bg-[#0a0a0a]/85 text-white p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between pointer-events-none group-hover:pointer-events-auto">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-[#dc2626] uppercase font-bold block">
                        ARCHITECTURE // {product.sku}
                      </span>
                      <h4 className="font-anton text-2xl tracking-tight text-white mt-1">
                        {product.name}
                      </h4>
                      <p className="text-xs font-mono text-white/80 mt-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-white/20">
                      <div className="text-[11px] font-mono text-white/70">
                        {product.specs.slice(0, 2).map((s, idx) => (
                          <div key={idx}>· {s}</div>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => onAddToCart(product, firstAvailableSize)}
                          className="flex-1 py-2 bg-white text-[#0a0a0a] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#dc2626] hover:text-white transition-colors cursor-pointer"
                        >
                          + ADD TO CART
                        </button>
                        <button
                          onClick={() => onExploreSku(product)}
                          className="p-2 border border-white text-white hover:bg-white hover:text-[#0a0a0a] transition-colors cursor-pointer"
                          title="Inspect SKU"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Technical Detail Badge */}
                  <div className="absolute top-3 right-3 bg-white border border-[#0a0a0a] px-2 py-0.5 z-10">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0a0a0a]">
                      {product.badge}
                    </span>
                  </div>

                  {/* SKU Identifier */}
                  <div className="absolute bottom-3 left-3 bg-[#0a0a0a] text-white px-2 py-0.5 z-10 font-mono text-[9px] uppercase tracking-widest">
                    {product.sku}
                  </div>
                </div>

                {/* Metadata Below Image */}
                <div className="mt-3 flex items-start justify-between">
                  <div>
                    <h3 className="font-anton text-xl tracking-tight text-[#0a0a0a] group-hover:text-[#dc2626] transition-colors uppercase">
                      {product.name}
                    </h3>
                    <div className="text-[11px] font-mono text-[#0a0a0a]/60 uppercase mt-0.5">
                      {product.category} · {product.weight}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-mono font-bold text-base text-[#0a0a0a] font-mono-numbers">
                      ${product.price}.00
                    </div>
                    {product.originalPrice && (
                      <div className="text-xs font-mono text-[#0a0a0a]/40 line-through">
                        ${product.originalPrice}.00
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Add Button */}
                <button
                  onClick={() => onAddToCart(product, firstAvailableSize)}
                  className="mt-2 w-full py-2 bg-transparent hover:bg-[#0a0a0a] hover:text-white text-[#0a0a0a] border border-[#0a0a0a] font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>ADD TO CART · ${product.price}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HorizontalProductStrip;
