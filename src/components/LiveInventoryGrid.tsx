import React, { useState } from "react";
import { Plus, Check, Eye, AlertCircle } from "lucide-react";
import { PRODUCTS, Product } from "../data/products";

interface LiveInventoryGridProps {
  onAddToCart: (product: Product, size: string) => void;
  onExploreSku: (product: Product) => void;
}

export const LiveInventoryGrid: React.FC<LiveInventoryGridProps> = ({
  onAddToCart,
  onExploreSku,
}) => {
  const [addedItem, setAddedItem] = useState<string | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({
    "bamboo-water-bottle": "750ML",
    "bamboo-toothbrush": "PACK OF 4",
    "bamboo-shoes": "US 10",
    "bamboo-tissues": "BOX + 6 PACKS",
    "bamboo-sunglasses": "STANDARD 50MM",
    "bamboo-deskmat": "STUDIO 80×40",
  });

  const handleSelectSize = (productId: string, sizeLabel: string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: sizeLabel }));
  };

  const handleAdd = (product: Product) => {
    const size =
      selectedSizes[product.id] ||
      product.sizes.find((s) => s.available)?.label ||
      product.sizes[0].label;
    onAddToCart(product, size);
    setAddedItem(product.id);
    setTimeout(() => setAddedItem(null), 1800);
  };

  return (
    <section id="inventory" className="py-24 border-b-2 border-[#0a0a0a] bg-[#f2f2f2]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b-2 border-[#0a0a0a]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#0a0a0a] uppercase mb-2">
              <span className="w-2.5 h-2.5 bg-[#dc2626] rounded-full"></span>
              <span className="font-bold">SECTION 04 // LIVE INVENTORY MATRIX</span>
            </div>
            <h2 className="font-anton text-5xl md:text-7xl uppercase tracking-tighter leading-none text-[#0a0a0a]">
              ACTIVE REQUISITION [6 SKUS]
            </h2>
          </div>

          <div className="mt-4 md:mt-0 font-mono text-xs text-[#0a0a0a]/70 max-w-[280px] text-right">
            [REAL-TIME STOCK ALLOCATION // DIRECT SHIPMENT FROM PACIFIC BAMBOO FORGE]
          </div>
        </div>

        {/* Asymmetric 'Broken' Grid: staggered column spans & offsets */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          {PRODUCTS.map((product, idx) => {
            // Broken grid layout rules:
            // Item 0: col-span-12 md:col-span-7
            // Item 1: col-span-12 md:col-span-5 md:mt-16
            // Item 2: col-span-12 md:col-span-5
            // Item 3: col-span-12 md:col-span-7 md:-mt-8
            // Item 4: col-span-12 md:col-span-6
            // Item 5: col-span-12 md:col-span-6 md:mt-12
            let colSpan = "md:col-span-6";
            let topOffset = "";

            if (idx === 0) {
              colSpan = "md:col-span-7";
              topOffset = "";
            } else if (idx === 1) {
              colSpan = "md:col-span-5";
              topOffset = "md:mt-16";
            } else if (idx === 2) {
              colSpan = "md:col-span-5";
              topOffset = "";
            } else if (idx === 3) {
              colSpan = "md:col-span-7";
              topOffset = "md:-mt-12";
            } else if (idx === 4) {
              colSpan = "md:col-span-6";
              topOffset = "";
            } else if (idx === 5) {
              colSpan = "md:col-span-6";
              topOffset = "md:mt-8";
            }

            const currentSize =
              selectedSizes[product.id] ||
              product.sizes.find((s) => s.available)?.label ||
              product.sizes[0].label;

            return (
              <div
                key={product.id}
                id={`inventory-${product.id}`}
                className={`col-span-12 ${colSpan} ${topOffset} flex flex-col group border-2 border-[#0a0a0a] bg-white p-5 md:p-6 shadow-[5px_5px_0px_#0a0a0a] transition-all duration-300 hover:-translate-y-1 scroll-mt-28 target:border-[#dc2626] target:shadow-[6px_6px_0px_#dc2626]`}
              >
                {/* Image Container with detail badges */}
                <div className="relative aspect-4/3 overflow-hidden border border-[#0a0a0a] bg-[#f2f2f2]">
                  {/* Default Grayscale, 700ms transition to full color & 1.05x scale */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
                  />

                  {/* Top-Right Technical Detail Badge */}
                  <div className="absolute top-3 right-3 bg-white border border-[#0a0a0a] px-2.5 py-1 z-10 shadow-[2px_2px_0px_#0a0a0a]">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0a0a0a]">
                      {product.badge}
                    </span>
                  </div>

                  {/* Bottom-Left SKU Tag */}
                  <div className="absolute bottom-3 left-3 bg-[#0a0a0a] text-white px-2 py-0.5 z-10 font-mono text-[10px] uppercase tracking-widest">
                    {product.sku}
                  </div>
                </div>

                {/* Content Breakdown */}
                <div className="mt-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-mono tracking-widest text-[#0a0a0a]/60 uppercase">
                          CATEGORY // {product.category}
                        </span>
                        <h3 className="font-anton text-2xl md:text-3xl uppercase tracking-tight text-[#0a0a0a] mt-0.5 group-hover:text-[#dc2626] transition-colors">
                          {product.name}
                        </h3>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="font-mono font-bold text-xl text-[#0a0a0a]">
                          ${product.price}.00
                        </div>
                        {product.originalPrice && (
                          <div className="font-mono text-xs text-[#0a0a0a]/40 line-through">
                            ${product.originalPrice}.00
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="font-mono text-xs text-[#0a0a0a]/80 mt-3 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Size Availability in Strike-through Monospace for out-of-stock */}
                  <div className="pt-3 border-t border-[#0a0a0a]/15">
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#0a0a0a]/60 mb-2">
                      <span>SIZE / SPECIFICATION MATRIX:</span>
                      <span className="text-[#0a0a0a] font-bold">
                        CURRENT: {currentSize}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((sz) => {
                        const isAvailable = sz.available;
                        const isSelected = currentSize === sz.label;

                        return (
                          <button
                            key={sz.label}
                            disabled={!isAvailable}
                            onClick={() => handleSelectSize(product.id, sz.label)}
                            className={`px-3 py-1.5 text-xs font-mono border transition-all cursor-pointer ${
                              !isAvailable
                                ? "bg-[#e5e5e5] text-[#0a0a0a]/35 line-through border-[#0a0a0a]/20 cursor-not-allowed"
                                : isSelected
                                ? "bg-[#0a0a0a] text-white border-[#0a0a0a]"
                                : "bg-white text-[#0a0a0a] border-[#0a0a0a]/40 hover:border-[#0a0a0a]"
                            }`}
                            title={!isAvailable ? "Out of Stock" : "Available"}
                          >
                            {sz.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Actions: Add to Cart + Inspect */}
                  <div className="pt-2 flex gap-3">
                    <button
                      onClick={() => handleAdd(product)}
                      className={`flex-1 py-3 px-4 font-anton text-sm tracking-wider uppercase flex items-center justify-center gap-2 border-2 border-[#0a0a0a] transition-all cursor-pointer shadow-[2px_2px_0px_#0a0a0a] ${
                        addedItem === product.id
                          ? "bg-[#16a34a] text-white border-[#16a34a]"
                          : "bg-[#0a0a0a] text-white hover:bg-[#dc2626] hover:border-[#dc2626]"
                      }`}
                    >
                      {addedItem === product.id ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>REQUISITIONED</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>ADD TO CART · ${product.price}</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => onExploreSku(product)}
                      className="p-3 border-2 border-[#0a0a0a] bg-white text-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-white transition-colors cursor-pointer shadow-[2px_2px_0px_#0a0a0a]"
                      title="Inspect SKU Details"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
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

export default LiveInventoryGrid;
