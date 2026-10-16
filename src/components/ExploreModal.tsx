import React, { useState } from "react";
import { X, ArrowRight, Check, Compass, Layers, Sparkles } from "lucide-react";
import { PRODUCTS, Product } from "../data/products";

interface ExploreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => void;
}

export const ExploreModal: React.FC<ExploreModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [selectedSku, setSelectedSku] = useState<Product>(PRODUCTS[0]);
  const [selectedSize, setSelectedSize] = useState<string>(
    PRODUCTS[0].sizes.find((s) => s.available)?.label || PRODUCTS[0].sizes[0].label
  );
  const [added, setAdded] = useState(false);

  if (!isOpen) return null;

  const handleSelectProduct = (product: Product) => {
    setSelectedSku(product);
    const availableSize =
      product.sizes.find((s) => s.available)?.label || product.sizes[0].label;
    setSelectedSize(availableSize);
    setAdded(false);
  };

  const handleAddToCart = () => {
    onAddToCart(selectedSku, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0a0a0a]/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-[#f2f2f2] text-[#0a0a0a] border-2 border-[#0a0a0a] shadow-[8px_8px_0px_#0a0a0a] z-10 max-h-[92vh] flex flex-col overflow-hidden">
        {/* Modal Top Bar */}
        <div className="p-4 md:p-6 bg-[#0a0a0a] text-white flex items-center justify-between border-b-2 border-[#0a0a0a]">
          <div className="flex items-center gap-3">
            <Compass className="w-5 h-5 text-[#dc2626]" />
            <div>
              <span className="text-[10px] font-mono tracking-widest text-white/60 uppercase block">
                STAGE 01 · COLLECTION ARCHIVE & EXPLORATION
              </span>
              <h3 className="font-anton text-2xl tracking-tight text-white uppercase">
                EXPLORE STICKS ESSENTIALS [6 SKUS]
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 border border-white/30 text-white hover:bg-white hover:text-[#0a0a0a] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Next Iteration Notice Banner */}
        <div className="bg-[#f2f2f2] border-b border-[#0a0a0a] px-4 md:px-6 py-2.5 flex flex-wrap items-center justify-between text-xs font-mono gap-2">
          <div className="flex items-center gap-2 text-[#0a0a0a]">
            <span className="w-2 h-2 rounded-full bg-[#dc2626] animate-pulse"></span>
            <span className="font-bold">NEXT ITERATION ROADMAP:</span>
            <span className="text-[#0a0a0a]/80">
              Interactive 3D configurator, custom laser bamboo engraving & bulk B2B zero-waste quoting.
            </span>
          </div>
          <div className="text-[11px] text-[#dc2626] font-bold">
            6 ACTIVE PROTOTYPE SKUS
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x-2 divide-[#0a0a0a]">
          {/* Left Column: SKU Quick Selector */}
          <div className="lg:col-span-5 p-4 md:p-6 space-y-3 bg-[#e8e8e8]/50 overflow-y-auto max-h-[400px] lg:max-h-none">
            <div className="text-[11px] font-mono tracking-widest text-[#0a0a0a]/60 uppercase mb-2">
              SELECT CATALOG SKU TO INSPECT:
            </div>
            {PRODUCTS.map((prod, idx) => {
              const isSelected = selectedSku.id === prod.id;
              return (
                <button
                  key={prod.id}
                  onClick={() => handleSelectProduct(prod)}
                  className={`w-full text-left p-3 border transition-all flex items-center gap-3 ${
                    isSelected
                      ? "bg-[#0a0a0a] text-white border-[#0a0a0a] shadow-[4px_4px_0px_#dc2626]"
                      : "bg-white text-[#0a0a0a] border-[#0a0a0a]/30 hover:border-[#0a0a0a]"
                  }`}
                >
                  <span className="font-mono text-xs font-bold opacity-60">
                    0{idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-anton text-sm tracking-tight truncate">
                      {prod.name}
                    </div>
                    <div className="text-[10px] font-mono opacity-80">
                      {prod.category} · {prod.badge}
                    </div>
                  </div>
                  <div className="font-mono font-bold text-sm shrink-0">
                    ${prod.price}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed SKU Blueprint */}
          <div className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-between space-y-6 bg-[#f2f2f2]">
            <div className="space-y-6">
              {/* Image & Header Split */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="relative group border border-[#0a0a0a] bg-white overflow-hidden aspect-3/4">
                  <img
                    src={selectedSku.image}
                    alt={selectedSku.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 bg-[#0a0a0a] text-white px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest">
                    {selectedSku.sku}
                  </div>
                  <div className="absolute bottom-2 right-2 bg-white text-[#0a0a0a] px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest border border-[#0a0a0a]">
                    {selectedSku.badge}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#0a0a0a]/60 uppercase">
                      SERIES 01 // {selectedSku.category}
                    </span>
                    <h4 className="font-anton text-3xl tracking-tight leading-none text-[#0a0a0a] mt-1">
                      {selectedSku.name}
                    </h4>
                    <div className="mt-2 flex items-baseline gap-3">
                      <span className="text-2xl font-mono font-bold text-[#0a0a0a]">
                        ${selectedSku.price}.00
                      </span>
                      {selectedSku.originalPrice && (
                        <span className="text-sm font-mono line-through text-[#0a0a0a]/50">
                          ${selectedSku.originalPrice}.00
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs font-mono text-[#0a0a0a]/80 leading-relaxed">
                    {selectedSku.description}
                  </p>

                  {/* Size selection */}
                  <div>
                    <div className="text-[10px] font-mono text-[#0a0a0a]/60 tracking-wider uppercase mb-1.5">
                      SPECIFICATION / SIZE VARIANT:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedSku.sizes.map((sz) => (
                        <button
                          key={sz.label}
                          disabled={!sz.available}
                          onClick={() => setSelectedSize(sz.label)}
                          className={`px-3 py-1.5 text-xs font-mono border transition-all ${
                            sz.available
                              ? selectedSize === sz.label
                                ? "bg-[#0a0a0a] text-white border-[#0a0a0a]"
                                : "bg-white text-[#0a0a0a] border-[#0a0a0a]/40 hover:border-[#0a0a0a]"
                              : "bg-[#e5e5e5] text-[#0a0a0a]/30 line-through border-[#0a0a0a]/20 cursor-not-allowed"
                          }`}
                        >
                          {sz.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Blueprint specs */}
              <div className="border border-[#0a0a0a] p-4 bg-white space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold border-b border-[#0a0a0a]/20 pb-1.5">
                  <Layers className="w-4 h-4 text-[#dc2626]" />
                  <span>MATERIAL SPECIFICATIONS:</span>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs font-mono text-[#0a0a0a]/80">
                  <div>
                    <span className="text-[#0a0a0a]/50">DIMENSIONS:</span>{" "}
                    {selectedSku.dimensions}
                  </div>
                  <div>
                    <span className="text-[#0a0a0a]/50">WEIGHT:</span>{" "}
                    {selectedSku.weight}
                  </div>
                  <div className="col-span-2">
                    <span className="text-[#0a0a0a]/50">COMPOSITION:</span>{" "}
                    {selectedSku.material}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[#0a0a0a] flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3.5 px-6 font-anton text-base tracking-wider flex items-center justify-center gap-2 transition-all shadow-[4px_4px_0px_#0a0a0a] ${
                  added
                    ? "bg-[#16a34a] text-white"
                    : "bg-[#0a0a0a] text-white hover:bg-[#dc2626]"
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>ADDED TO SESSION MANIFEST</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-white" />
                    <span>ADD TO CART · ${selectedSku.price}.00</span>
                  </>
                )}
              </button>

              <button
                onClick={onClose}
                className="py-3.5 px-6 font-mono text-xs uppercase tracking-wider border-2 border-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-white transition-colors"
              >
                Back To Overview
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreModal;
