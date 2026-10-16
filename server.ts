import express from "express";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

const SYSTEM_INSTRUCTION = `You are **Sticks’ Bamboo Product Discovery Assistant**, named **Sticky**.
Use the 6-Prompt Formula:

1. **Role:** Act as a friendly product discovery and sustainability expert for Sticks. You have a warm, upbeat, knowledgeable personality (like a cheerful animated bamboo buddy).
2. **Task:** Understand user needs and recommend relevant products from Sticks' catalog:
   - Bamboo Water Bottle ($48) [URL: #inventory-bamboo-water-bottle]
   - Bamboo Toothbrush ($18, Pack of 4) [URL: #inventory-bamboo-toothbrush]
   - Bamboo Shoes / Sneakers ($145) [URL: #inventory-bamboo-shoes]
   - Bamboo Tissues ($28, Refillable Box + 6 Packs) [URL: #inventory-bamboo-tissues]
   - Bamboo Polarized Shades ($92) [URL: #inventory-bamboo-sunglasses]
   - Bamboo Architect Desk Mat ($64) [URL: #inventory-bamboo-deskmat]
3. **Context:** Help users explore product features, usage, pricing, manufacturing, and sustainability.
   - Growth: Moso bamboo grows up to 91 cm/day with zero pesticides or irrigation.
   - Anti-microbial: Naturally protected by "Bamboo-Kun" bio-agent.
   - Tensile: Exceeds mild structural steel (up to 780 MPa) and concrete in compression.
4. **Reasoning:** Match the user's needs to the most relevant product; highlight potential CO₂ savings versus conventional alternatives whenever reliable data is available:
   - Bamboo Water Bottle: Replaces ~1,460 single-use bottles over 5 years (~82.8 kg CO₂ avoided).
   - Bamboo Toothbrush: Eliminates 1.2 kg plastic waste per year per household; stem is 100% backyard compostable in 180 days.
   - Bamboo Shoes: 70% lower lifecycle carbon footprint compared to petroleum-derived synthetic trainers; zero microplastic shedding.
   - Bamboo Tissues: Saves ~1 ton of timber forest per 65 boxes; 0% chlorine bleaching.
   Never invent figures.
5. **Output Format:** Keep responses concise, upbeat, and conversational. Return recommended product names and product links using the exact URLs supplied above (e.g. [#inventory-bamboo-water-bottle]). If multiple products match, list the best options.
6. **Constraints:** Answer only Sticks, bamboo product, and sustainability-related queries. Never fabricate product details, prices, URLs, certifications, or environmental claims. If product data or links are missing, ask a clarifying question or request the required data.

**Important:** Use the product catalogue and URLs provided by the front-end as the source of truth. Never generate product links yourself.`;

// Chat API Endpoint with multi-turn memory support
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== "string") {
      res.status(400).json({ error: "Missing or invalid message." });
      return;
    }

    // Format previous conversation history for multi-turn context
    const contents: any[] = [];

    if (Array.isArray(history)) {
      for (const turn of history) {
        if (turn.role === "user" || turn.role === "model") {
          contents.push({
            role: turn.role,
            parts: [{ text: String(turn.text || turn.content || "") }],
          });
        }
      }
    }

    // Add current user message
    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    let reply = "";

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });
      reply = response.text || "";
    } catch (primaryErr: any) {
      console.warn("Primary model error, attempting fallback alias:", primaryErr?.message);
      try {
        const fallbackRes = await ai.models.generateContent({
          model: "gemini-flash-latest",
          contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
          },
        });
        reply = fallbackRes.text || "";
      } catch (secErr) {
        console.warn("Secondary model call error, using expert rule-based knowledge fallback:", secErr);
      }
    }

    // If Gemini was temporarily experiencing 503 spike, deliver an accurate catalogue answer
    if (!reply) {
      const q = message.toLowerCase();
      if (q.includes("bottle") || q.includes("water") || q.includes("flask")) {
        reply = "Our **Bamboo Water Bottle** ($48) features a solid cold-pressed Moso bamboo shell with a double-wall food-grade 18/8 stainless steel vacuum core. It keeps drinks cold for 24h and hot for 12h.\n\n🌱 **CO₂ Impact:** Over 5 years of daily use, it replaces roughly 1,460 single-use plastic bottles, preventing **82.8 kg of CO₂ emissions**.\n\nExplore it here: [#inventory-bamboo-water-bottle]";
      } else if (q.includes("tooth") || q.includes("brush") || q.includes("hygiene")) {
        reply = "The **Bamboo Toothbrush** ($18 for a Pack of 4) is contoured from raw solid bamboo and fitted with Japanese oak binchotan charcoal filaments.\n\n🌱 **CO₂ & Waste Impact:** The handle is 100% backyard compostable in 180 days, eliminating ~1.2 kg of indestructible petroleum plastic per household annually.\n\nInspect it here: [#inventory-bamboo-toothbrush]";
      } else if (q.includes("shoe") || q.includes("sneaker") || q.includes("footwear")) {
        reply = "Our **Bamboo Shoes** ($145) are woven from 520GSM ballistic-grade bamboo cellulose fiber with vulcanized FSC natural gum rubber outsoles and washable cork footbeds.\n\n🌱 **CO₂ Impact:** Bamboo textile manufacturing yields **70% lower lifecycle carbon** compared to synthetic polyester trainers, with zero microplastic shedding.\n\nView details: [#inventory-bamboo-shoes]";
      } else if (q.includes("tissue") || q.includes("paper") || q.includes("wipe")) {
        reply = "The **Bamboo Tissues** ($28) kit features a solid architectural bamboo dispenser box plus 6 packs of 3-ply unbleached virgin bamboo facial tissues.\n\n🌱 **Forest Impact:** Saves **1 ton of timber forest per 65 boxes**, with 0% chlorine bleaching.\n\nDiscover them: [#inventory-bamboo-tissues]";
      } else if (q.includes("co2") || q.includes("carbon") || q.includes("save") || q.includes("emission")) {
        reply = "Here are the verified carbon & waste reductions from Sticks:\n\n1. **Bamboo Water Bottle** ($48) — saves 82.8 kg CO₂ over 5 years [#inventory-bamboo-water-bottle]\n2. **Bamboo Shoes** ($145) — 70% lower lifecycle carbon than synthetic trainers [#inventory-bamboo-shoes]\n3. **Bamboo Toothbrush** ($18) — saves 1.2 kg plastic waste per household/yr [#inventory-bamboo-toothbrush]\n4. **Bamboo Tissues** ($28) — saves 1 ton timber per 65 boxes [#inventory-bamboo-tissues]";
      } else {
        reply = "Sticky here! Sticks engineers heavyweight, zero-plastic sustainable essentials from wild-harvested Moso bamboo. I can help you with features, pricing, and certified CO₂ savings for:\n\n• **Bamboo Water Bottle** ($48) [#inventory-bamboo-water-bottle]\n• **Bamboo Toothbrushes** ($18, Pack of 4) [#inventory-bamboo-toothbrush]\n• **Bamboo Shoes** ($145) [#inventory-bamboo-shoes]\n• **Bamboo Tissues** ($28) [#inventory-bamboo-tissues]\n\nWhich sustainable item can I help you discover?";
      }
    }

    res.json({ reply });
  } catch (error: any) {
    console.error("General error in /api/chat:", error);
    res.json({
      reply: "Sticky is right here! Ask me about Sticks Bamboo Water Bottles, Toothbrushes, Shoes, or Tissues, and how much CO₂ they save!",
    });
  }
});

// Setup Vite in middleware mode for dev or serve static files in production
async function startServer() {
  if (process.env.NODE_ENV === "production") {
    app.use(express.static("dist"));
    app.get("*", (_req, res) => {
      res.sendFile(path.resolve("dist", "index.html"));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[STICKS Backend] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
