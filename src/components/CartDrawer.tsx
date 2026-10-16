import React from "react";
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Leaf } from "lucide-react";
import { Product } from "../data/products";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onExplore: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onExplore,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#f2f2f2] text-[#0a0a0a] border-l-2 border-[#0a0a0a] shadow-[0_0_50px_rgba(0,0,0,0.3)] flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-[#0a0a0a] flex items-center justify-between bg-white">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#0a0a0a]/60 uppercase block">
                INVENTORY HOLD · REQUISITION [{totalItems}]
              </span>
              <h2 className="text-2xl font-anton tracking-tight mt-1">
                CART MANIFEST
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 border border-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-[#f2f2f2] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-12 h-12 mx-auto border-2 border-[#0a0a0a] flex items-center justify-center font-anton text-xl">
                  0
                </div>
                <p className="font-anton text-xl tracking-tight uppercase">
                  CART MANIFEST EMPTY
                </p>
                <p className="text-xs font-mono text-[#0a0a0a]/70 max-w-[240px] mx-auto">
                  Zero sustainable items currently reserved in this session.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onExplore();
                  }}
                  className="px-6 py-3 bg-[#0a0a0a] text-[#f2f2f2] font-mono text-xs uppercase tracking-wider hover:bg-[#dc2626] transition-colors"
                >
                  Explore Collection &rarr;
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}`}
                  className="border border-[#0a0a0a] bg-white p-4 flex gap-4 relative group"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover border border-[#0a0a0a]/20 bg-[#f2f2f2]"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-anton text-base tracking-tight leading-tight">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-[#0a0a0a]/50 hover:text-[#dc2626] transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-[11px] font-mono text-[#0a0a0a]/70 mt-1">
                        SPEC: {item.selectedSize} · {item.product.sku}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#0a0a0a]/10">
                      <div className="flex items-center border border-[#0a0a0a]">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="px-2 py-1 text-xs hover:bg-[#0a0a0a] hover:text-white transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-mono font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="px-2 py-1 text-xs hover:bg-[#0a0a0a] hover:text-white transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="font-mono font-bold text-sm">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t-2 border-[#0a0a0a] bg-white space-y-4">
              <div className="space-y-1.5 font-mono text-xs">
                <div className="flex justify-between text-[#0a0a0a]/70">
                  <span>RAW MATERIALS SUB:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#0a0a0a]/70">
                  <span>CARBON-NEUTRAL FREIGHT:</span>
                  <span className="text-[#0a0a0a] font-bold">FREE (PROMO)</span>
                </div>
                <div className="flex justify-between text-[#0a0a0a]/70">
                  <span>SOIL RECLAMATION OFFSET:</span>
                  <span className="text-[#0a0a0a] font-bold">INCLUDED</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#0a0a0a] pt-2 border-t border-[#0a0a0a]">
                  <span className="font-anton tracking-tight text-lg">TOTAL REQUISITION</span>
                  <span className="text-lg">${subtotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="p-2.5 bg-[#f2f2f2] border border-[#0a0a0a]/20 flex items-center gap-2 text-[11px] font-mono">
                <Leaf className="w-4 h-4 text-[#0a0a0a] shrink-0" />
                <span>Zero plastic packaging guarantee · 100% paper mailer</span>
              </div>

              <button
                onClick={() => {
                  alert("Order Requisition Initialized! Thank you for backing STICKS sustainable bamboo platform.");
                  onClose();
                }}
                className="w-full py-4 bg-[#0a0a0a] text-white font-anton text-lg tracking-wider flex items-center justify-center gap-3 hover:bg-[#dc2626] transition-colors shadow-[4px_4px_0px_#0a0a0a]"
              >
                <span>PROCEED TO REQUISITION</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="flex items-center justify-center gap-4 text-[10px] font-mono text-[#0a0a0a]/60">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#0a0a0a]" /> 10-YEAR DURABILITY
                </span>
                <span>·</span>
                <span>CASH ON DELIVERY OR CARDS</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
