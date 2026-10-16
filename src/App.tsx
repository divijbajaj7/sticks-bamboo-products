import { useState } from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { HorizontalProductStrip } from "./components/HorizontalProductStrip";
import { TechnicalInfoGrid } from "./components/TechnicalInfoGrid";
import { LiveInventoryGrid } from "./components/LiveInventoryGrid";
import { CustomerFeedbacks } from "./components/CustomerFeedbacks";
import { Footer } from "./components/Footer";
import { CartDrawer, CartItem } from "./components/CartDrawer";
import { ExploreModal } from "./components/ExploreModal";
import { StickyCharacter } from "./components/StickyCharacter";
import { StickyChatbot } from "./components/StickyChatbot";
import { PRODUCTS, Product } from "./data/products";

export default function App() {
  // Initial cart with sample sustainable bamboo selection
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0], // Bamboo Water Bottle
      quantity: 1,
      selectedSize: "750ML",
    },
    {
      product: PRODUCTS[1], // Bamboo Toothbrush
      quantity: 1,
      selectedSize: "PACK OF 4",
    },
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);

  // Sticky AI Chatbot States
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInitialQuery, setChatInitialQuery] = useState<string | undefined>(undefined);

  // Cart Management
  const handleAddToCart = (product: Product, size: string) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += 1;
        return next;
      }
      return [...prev, { product, quantity: 1, selectedSize: size }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleOpenExplore = () => {
    setIsExploreOpen(true);
  };

  const handleExploreSku = (_product: Product) => {
    setIsExploreOpen(true);
  };

  // Nudge handler from floating Sticky mascot
  const handleNudgeClick = (nudgeText: string) => {
    setChatInitialQuery(nudgeText);
    setIsChatOpen(true);
  };

  // Navigate directly to SKU from Chat or Links
  const handleNavigateToSku = (skuId: string) => {
    setIsChatOpen(false);
    const targetElement = document.getElementById(`inventory-${skuId}`);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
      // Temporary flash highlight
      targetElement.classList.add("ring-4", "ring-[#dc2626]");
      setTimeout(() => {
        targetElement.classList.remove("ring-4", "ring-[#dc2626]");
      }, 2200);
    }
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#f2f2f2] text-[#0a0a0a] relative selection:bg-[#0a0a0a] selection:text-[#f2f2f2]">
      {/* Persistent 4% Opacity Noise Grain Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-50 bg-grain opacity-4"
        aria-hidden="true"
      />

      {/* Non-Standard Fixed Brutalist Header with SparklesText & 64x64 Floating Cart */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onExplore={handleOpenExplore}
      />

      {/* Main Content Sections */}
      <main>
        {/* Asymmetric Hero Section */}
        <HeroSection onExplore={handleOpenExplore} />

        {/* Horizontal Essentials Strip */}
        <HorizontalProductStrip
          onAddToCart={handleAddToCart}
          onExploreSku={handleExploreSku}
        />

        {/* Technical Architecture Info Grid */}
        <TechnicalInfoGrid />

        {/* Live Inventory Matrix for all 6 SKUs */}
        <LiveInventoryGrid
          onAddToCart={handleAddToCart}
          onExploreSku={handleExploreSku}
        />

        {/* Customer Feedbacks with Marquee Effect & Masonry Proof */}
        <CustomerFeedbacks />
      </main>

      {/* Utility Footer with Oversized 10vw Anchor Display */}
      <Footer onExplore={handleOpenExplore} />

      {/* Slide-out Cart Manifest Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onExplore={handleOpenExplore}
      />

      {/* Explore Collection Roadmap & Blueprint Modal */}
      <ExploreModal
        isOpen={isExploreOpen}
        onClose={() => setIsExploreOpen(false)}
        onAddToCart={handleAddToCart}
      />

      {/* Live Animated Mascot: Sticky (Bottom-Right, Blinking, Cursor Tracking, Nudges) */}
      <StickyCharacter
        isOpen={isChatOpen}
        onClick={() => {
          setChatInitialQuery(undefined);
          setIsChatOpen((prev) => !prev);
        }}
        onNudgeClick={handleNudgeClick}
      />

      {/* Sticky AI Chatbot Modal with Multi-Turn Memory & Product Links */}
      <StickyChatbot
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onAddToCart={handleAddToCart}
        initialQuery={chatInitialQuery}
        onNavigateToSku={handleNavigateToSku}
      />
    </div>
  );
}
