import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Send,
  Trash2,
  Sparkles,
  RefreshCw,
  ExternalLink,
  ShoppingBag,
  Info,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PRODUCTS, Product } from "../data/products";

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: number;
  recommendedSkuIds?: string[];
}

interface StickyChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => void;
  initialQuery?: string;
  onNavigateToSku: (skuId: string) => void;
}

const STORAGE_KEY = "sticks_sticky_chat_history_v1";

const STARTER_PROMPTS = [
  "How much CO₂ does the Bamboo Water Bottle save?",
  "Tell me about the woven Bamboo Shoes",
  "Are the Bamboo Toothbrushes 100% compostable?",
  "What is the environmental impact of Bamboo Tissues?",
];

// Fallback intelligent answers aligned with the 6-prompt formula if server is initializing
function getKnowledgeResponse(input: string): { text: string; recommendedSkuIds: string[] } {
  const query = input.toLowerCase();

  if (query.includes("bottle") || query.includes("water") || query.includes("flask") || query.includes("drink")) {
    return {
      text: "Our **Bamboo Water Bottle** ($48) features a solid Moso bamboo shell with a double-wall food-grade 18/8 stainless steel core. It keeps drinks cold for 24h and hot for 12h.\n\n🌱 **CO₂ Impact:** Over 5 years of daily use, it replaces roughly 1,460 single-use plastic bottles, preventing **82.8 kg of CO₂ emissions**.\n\nCheck it out here: [#inventory-bamboo-water-bottle]",
      recommendedSkuIds: ["bamboo-water-bottle"],
    };
  }

  if (query.includes("tooth") || query.includes("brush") || query.includes("hygiene") || query.includes("charcoal")) {
    return {
      text: "The **Bamboo Toothbrush** ($18 for a 4-pack) is crafted with a hand-turned raw bamboo handle and Japanese oak binchotan charcoal bristles.\n\n🌱 **CO₂ & Waste Impact:** The handle is 100% backyard compostable in 180 days. Switching eliminates ~1.2 kg of indestructible petroleum plastic per household annually.\n\nTake a look: [#inventory-bamboo-toothbrush]",
      recommendedSkuIds: ["bamboo-toothbrush"],
    };
  }

  if (query.includes("shoe") || query.includes("sneaker") || query.includes("footwear") || query.includes("wear")) {
    return {
      text: "Our **Bamboo Shoes** ($145) are woven from 520GSM ballistic-grade bamboo cellulose fiber canvas with vulcanized FSC natural gum rubber outsoles and washable cork footbeds.\n\n🌱 **CO₂ Impact:** Bamboo textile production produces **70% lower lifecycle carbon** compared to petroleum synthetic meshes, and sheds 0 microplastics during washing or wear.\n\nExplore them here: [#inventory-bamboo-shoes]",
      recommendedSkuIds: ["bamboo-shoes"],
    };
  }

  if (query.includes("tissue") || query.includes("paper") || query.includes("wipe") || query.includes("box")) {
    return {
      text: "The **Bamboo Tissues** ($28) set includes a heavy architectural solid bamboo refill box plus 6 packs of 3-ply unbleached virgin bamboo facial tissues.\n\n🌱 **Forest Impact:** Bamboo regenerates in months without clear-cutting trees, saving **1 ton of timber forest per 65 boxes**, with 0% chlorine bleaching.\n\nDiscover them here: [#inventory-bamboo-tissues]",
      recommendedSkuIds: ["bamboo-tissues"],
    };
  }

  if (query.includes("co2") || query.includes("carbon") || query.includes("sustainable") || query.includes("impact")) {
    return {
      text: "Moso bamboo is nature's heavyweight champion! It sequesters **4x more CO₂ than timber forests** and grows up to 91 cm per day without chemical fertilizers.\n\nTop CO₂ savers from Sticks:\n1. **Bamboo Water Bottle** ($48) — saves 82.8 kg CO₂ [#inventory-bamboo-water-bottle]\n2. **Bamboo Shoes** ($145) — 70% lower carbon than synthetic trainers [#inventory-bamboo-shoes]\n3. **Bamboo Toothbrush (4-Pack)** ($18) — saves 1.2 kg plastic waste [#inventory-bamboo-toothbrush]\n4. **Bamboo Tissues** ($28) — saves 1 ton timber per 65 boxes [#inventory-bamboo-tissues]",
      recommendedSkuIds: ["bamboo-water-bottle", "bamboo-shoes", "bamboo-toothbrush"],
    };
  }

  if (query.includes("kun") || query.includes("bamboo-kun") || query.includes("bacteria") || query.includes("mold")) {
    return {
      text: "**Bamboo-Kun** is a natural bio-agent synthesized by living bamboo stalks. It naturally repels 99.8% of bacteria and fungal growth without synthetic biocides, keeping our toothbrushes, bottles, and shoes naturally fresh and odor-resistant!",
      recommendedSkuIds: ["bamboo-toothbrush", "bamboo-shoes"],
    };
  }

  return {
    text: "Sticky here! Sticks engineers heavyweight, zero-plastic sustainable essentials from wild-harvested Moso bamboo. I can help you with specifications, pricing, and certified CO₂ savings for:\n\n• **Bamboo Water Bottle** ($48) [#inventory-bamboo-water-bottle]\n• **Bamboo Toothbrushes** ($18, Pack of 4) [#inventory-bamboo-toothbrush]\n• **Bamboo Shoes** ($145) [#inventory-bamboo-shoes]\n• **Bamboo Tissues** ($28) [#inventory-bamboo-tissues]\n\nWhat are you curious about today?",
    recommendedSkuIds: ["bamboo-water-bottle", "bamboo-toothbrush"],
  };
}

export const StickyChatbot: React.FC<StickyChatbotProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  initialQuery,
  onNavigateToSku,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    // Restore multi-turn conversation memory from localStorage
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return [
      {
        id: "msg-welcome",
        role: "model",
        text: "👋 Hey there! I'm **Sticky**, your Sticks Bamboo Product Discovery Assistant.\n\nI can help you explore our zero-plastic water bottles, compostable toothbrushes, woven sneakers, and tissue monoliths—along with their real CO₂ savings.\n\nWhat can I help you find today?",
        timestamp: Date.now(),
        recommendedSkuIds: ["bamboo-water-bottle", "bamboo-shoes"],
      },
    ];
  });

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [addedItem, setAddedItem] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync memory to localStorage whenever messages change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore storage quota issues
    }
  }, [messages]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isLoading]);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  // Handle initialQuery if passed (e.g. from speech bubble nudge)
  useEffect(() => {
    if (isOpen && initialQuery) {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery, isOpen]);

  const handleClearMemory = () => {
    const welcome: ChatMessage = {
      id: "msg-welcome-fresh",
      role: "model",
      text: "🌿 Conversation memory cleared! Sticky is ready with a clean slate. What sustainable product would you like to explore?",
      timestamp: Date.now(),
      recommendedSkuIds: ["bamboo-water-bottle"],
    };
    setMessages([welcome]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const handleSendMessage = async (userText: string) => {
    const trimmed = userText.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: trimmed,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // Prepare multi-turn history for Gemini API
      const historyPayload = messages.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: historyPayload,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const replyText = data.reply || "I am here to help!";

      // Extract recommended SKU IDs based on content or URL mentions
      const matchedSkus = PRODUCTS.filter(
        (p) =>
          replyText.toLowerCase().includes(p.id) ||
          replyText.toLowerCase().includes(p.name.toLowerCase()) ||
          replyText.includes(`#inventory-${p.id}`)
      ).map((p) => p.id);

      const botMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: "model",
        text: replyText,
        timestamp: Date.now(),
        recommendedSkuIds: matchedSkus.length > 0 ? matchedSkus : undefined,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.warn("Backend chat unavailable, using local knowledge base:", err);
      // Fallback response ensures uninterrupted user experience
      const fallback = getKnowledgeResponse(trimmed);
      const botMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: "model",
        text: fallback.text,
        timestamp: Date.now(),
        recommendedSkuIds: fallback.recommendedSkuIds,
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAdd = (product: Product) => {
    const defaultSize =
      product.sizes.find((s) => s.available)?.label || product.sizes[0].label;
    onAddToCart(product, defaultSize);
    setAddedItem(product.id);
    setTimeout(() => setAddedItem(null), 1800);
  };

  // Helper to parse markdown links like [#inventory-bamboo-water-bottle] or [Product Name](#inventory-...)
  const renderMessageText = (text: string) => {
    // Replace markdown links and format paragraphs
    const parts = text.split(/(#inventory-[a-z-]+|\[#[^\]]+\]|\*\*[^*]+\*\*)/g);

    return parts.map((part, index) => {
      // Match hashtag anchor link
      const matchUrl = part.match(/#inventory-([a-z-]+)/);
      if (matchUrl) {
        const skuId = matchUrl[1];
        const matchedProduct = PRODUCTS.find((p) => p.id === skuId);
        return (
          <button
            key={index}
            onClick={() => onNavigateToSku(skuId)}
            className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[#dc2626] hover:underline bg-[#f2f2f2] px-1.5 py-0.5 border border-[#0a0a0a]/30 rounded-xs mx-0.5 cursor-pointer"
          >
            <span>{matchedProduct ? matchedProduct.name : `VIEW SKU`}</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        );
      }

      // Match bold markdown **text**
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="font-bold text-[#0a0a0a]">
            {part.slice(2, -2)}
          </strong>
        );
      }

      return <span key={index}>{part}</span>;
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-50 flex items-end justify-end pointer-events-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="pointer-events-auto w-full h-full sm:h-auto sm:w-[420px] md:w-[460px] bg-[#f2f2f2] text-[#0a0a0a] border-2 border-[#0a0a0a] shadow-[8px_8px_0px_#0a0a0a] flex flex-col sm:max-h-[640px] overflow-hidden"
      >
        {/* Header with Sticky Character Avatar & Memory Indicator */}
        <div className="p-4 bg-[#0a0a0a] text-white flex items-center justify-between border-b-2 border-[#0a0a0a] shrink-0">
          <div className="flex items-center gap-3">
            {/* Animated Mini Sticky Avatar */}
            <div className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-white shrink-0">
              <img
                src="/src/assets/images/sticky_bamboo_mascot_1791954595445.jpg"
                alt="Sticky Mascot"
                className="w-full h-full object-cover scale-110"
              />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#16a34a] border border-white rounded-full" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-anton text-lg tracking-tight uppercase leading-none text-white">
                  STICKY
                </h3>
                <span className="bg-[#dc2626] text-white text-[9px] font-mono px-1.5 py-0.2 rounded-xs uppercase font-bold">
                  GEMINI 3.8
                </span>
              </div>
              <span className="text-[10px] font-mono tracking-wider text-white/70 block mt-0.5">
                BAMBOO DISCOVERY & CO₂ GUIDE
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Memory Clear Button */}
            <button
              onClick={handleClearMemory}
              title="Reset conversation memory"
              className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-xs transition-colors"
              aria-label="Clear chat memory"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-xs transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Memory Active Bar */}
        <div className="bg-[#e5e5e5] border-b border-[#0a0a0a]/20 px-4 py-1.5 flex items-center justify-between text-[10px] font-mono shrink-0">
          <div className="flex items-center gap-1.5 text-[#0a0a0a]/80">
            <span className="w-2 h-2 rounded-full bg-[#16a34a]" />
            <span>SESSION MEMORY ACTIVE · CONTEXT PRESERVED</span>
          </div>
          <span className="text-[#0a0a0a]/50">STICKS AI</span>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f2f2f2]">
          {messages.map((msg) => {
            const isUser = msg.role === "user";
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
              >
                <div className="flex items-center gap-1.5 mb-1 px-1">
                  <span className="text-[9px] font-mono uppercase text-[#0a0a0a]/50">
                    {isUser ? "YOU" : "STICKY"}
                  </span>
                  <span className="text-[9px] font-mono text-[#0a0a0a]/40">
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                <div
                  className={`max-w-[88%] p-3.5 border-2 text-xs font-mono leading-relaxed shadow-[3px_3px_0px_#0a0a0a] ${
                    isUser
                      ? "bg-[#0a0a0a] text-white border-[#0a0a0a]"
                      : "bg-white text-[#0a0a0a] border-[#0a0a0a]"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{renderMessageText(msg.text)}</div>
                </div>

                {/* Embedded Actionable Product Cards when Sticky recommends SKUs */}
                {!isUser && msg.recommendedSkuIds && msg.recommendedSkuIds.length > 0 && (
                  <div className="mt-2.5 w-full max-w-[88%] space-y-2">
                    {msg.recommendedSkuIds.map((skuId) => {
                      const prod = PRODUCTS.find((p) => p.id === skuId);
                      if (!prod) return null;

                      return (
                        <div
                          key={prod.id}
                          className="bg-white border-2 border-[#0a0a0a] p-2.5 flex items-center justify-between gap-3 shadow-[2px_2px_0px_#0a0a0a]"
                        >
                          <div
                            onClick={() => onNavigateToSku(prod.id)}
                            className="flex items-center gap-2.5 min-w-0 cursor-pointer group"
                          >
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="w-10 h-10 object-cover border border-[#0a0a0a]/30 shrink-0"
                            />
                            <div className="min-w-0">
                              <div className="font-anton text-xs tracking-tight truncate group-hover:text-[#dc2626] transition-colors">
                                {prod.name}
                              </div>
                              <div className="text-[10px] font-mono text-[#0a0a0a]/70">
                                ${prod.price}.00 · {prod.badge}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={() => handleQuickAdd(prod)}
                              className={`px-2.5 py-1 text-[10px] font-mono uppercase font-bold border border-[#0a0a0a] transition-all cursor-pointer ${
                                addedItem === prod.id
                                  ? "bg-[#16a34a] text-white"
                                  : "bg-[#0a0a0a] text-white hover:bg-[#dc2626]"
                              }`}
                            >
                              {addedItem === prod.id ? (
                                <span className="flex items-center gap-1">
                                  <Check className="w-3 h-3" /> ADDED
                                </span>
                              ) : (
                                "+ CART"
                              )}
                            </button>

                            <button
                              onClick={() => onNavigateToSku(prod.id)}
                              className="p-1 border border-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-white transition-colors"
                              title="Jump to Product"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex items-center gap-2 p-3 bg-white border border-[#0a0a0a] max-w-[140px] shadow-[2px_2px_0px_#0a0a0a]">
              <Sparkles className="w-3.5 h-3.5 text-[#dc2626] animate-spin" />
              <span className="font-mono text-xs font-bold text-[#0a0a0a] animate-pulse">
                Sticky thinking...
              </span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="p-2.5 bg-white border-t border-[#0a0a0a]/15 flex gap-2 overflow-x-auto no-scrollbar shrink-0">
          {STARTER_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="shrink-0 px-2.5 py-1 text-[10px] font-mono text-[#0a0a0a] bg-[#f2f2f2] hover:bg-[#0a0a0a] hover:text-white border border-[#0a0a0a]/30 transition-colors whitespace-nowrap cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(input);
          }}
          className="p-3 bg-white border-t-2 border-[#0a0a0a] flex items-center gap-2 shrink-0"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Sticky about bamboo products & CO₂..."
            className="flex-1 px-3 py-2.5 bg-[#f2f2f2] border border-[#0a0a0a] text-xs font-mono text-[#0a0a0a] placeholder:text-[#0a0a0a]/40 focus:outline-hidden focus:border-[#dc2626]"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2.5 bg-[#0a0a0a] text-white hover:bg-[#dc2626] disabled:opacity-30 disabled:hover:bg-[#0a0a0a] border border-[#0a0a0a] transition-colors cursor-pointer"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default StickyChatbot;
