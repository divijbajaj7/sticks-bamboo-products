export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge: string;
  dimensions: string;
  weight: string;
  material: string;
  sizes: { label: string; available: boolean }[];
  description: string;
  specs: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: "bamboo-water-bottle",
    name: "BAMBOO WATER BOTTLE",
    sku: "STK-WB-001",
    category: "VESSELS",
    price: 48,
    originalPrice: 58,
    image: "/src/assets/images/sku_bamboo_bottle_1791950927542.jpg",
    badge: "COLD-PRESSED MOSO",
    dimensions: "260mm × 74mm",
    weight: "340g",
    material: "100% Solid Moso Bamboo + 18/8 Double-Wall Steel Core",
    sizes: [
      { label: "500ML", available: true },
      { label: "750ML", available: true },
      { label: "1000ML", available: false },
    ],
    description: "Architectural cylindrical flask crafted from wild-harvested raw bamboo with dual-vacuum copper-lined thermal retention. Keeps cold 24h, hot 12h.",
    specs: ["Zero petroleum coatings", "Laser-etched metric markings", "Food-grade 304 interior", "24h ice retention"]
  },
  {
    id: "bamboo-toothbrush",
    name: "BAMBOO TOOTHBRUSH",
    sku: "STK-TB-002",
    category: "HYGIENE",
    price: 18,
    originalPrice: 24,
    image: "/src/assets/images/sku_bamboo_toothbrush_1791950928569.jpg",
    badge: "BINCHOTAN CHARCOAL",
    dimensions: "190mm × 14mm",
    weight: "22g (Pack of 4)",
    material: "Hand-turned Raw Bamboo + Japanese Oak Charcoal Filaments",
    sizes: [
      { label: "PACK OF 2", available: true },
      { label: "PACK OF 4", available: true },
      { label: "ANNUAL BOX", available: false },
    ],
    description: "Ergonomically contoured solid bamboo stem with zero plastic bristles. Infused with binchotan charcoal for natural antimicrobial oral care.",
    specs: ["100% Backyard compostable stem", "Castor oil bristle base", "Zero BPA & phthalates", "Naturally antimicrobial"]
  },
  {
    id: "bamboo-shoes",
    name: "BAMBOO SNEAKERS",
    sku: "STK-SN-003",
    category: "FOOTWEAR",
    price: 145,
    originalPrice: 165,
    image: "/src/assets/images/sku_bamboo_sneakers_1791950928672.jpg",
    badge: "520GSM WOVEN FIBER",
    dimensions: "Men / Women Unisex",
    weight: "285g / shoe",
    material: "Heavyweight Woven Bamboo Fiber Canvas + FSC Natural Gum Sole",
    sizes: [
      { label: "US 8", available: true },
      { label: "US 9", available: true },
      { label: "US 10", available: true },
      { label: "US 11", available: false },
      { label: "US 12", available: false },
    ],
    description: "Heavyweight tactile low-top sneaker constructed from ballistic-grade spun bamboo cellulose fiber with vulcanized wild Amazonian gum rubber outsoles.",
    specs: ["Thermo-regulating weave", "Zero microplastic shedding", "Washable cork footbed", "Reinforced heel spine"]
  },
  {
    id: "bamboo-tissues",
    name: "BAMBOO TISSUES",
    sku: "STK-TS-004",
    category: "PAPER GOODS",
    price: 28,
    originalPrice: 34,
    image: "/src/assets/images/sku_bamboo_tissues_1791950929053.jpg",
    badge: "UNBLEACHED PULP",
    dimensions: "220mm × 120mm × 90mm",
    weight: "1.2kg (6-Pack Refill)",
    material: "Solid Bamboo Hardwood Container + 100% Unbleached Bamboo Pulp",
    sizes: [
      { label: "BOX + 3 PACKS", available: true },
      { label: "BOX + 6 PACKS", available: true },
      { label: "REFILL ONLY (12)", available: false },
    ],
    description: "Architectural refillable bamboo box with 3-ply unbleached virgin bamboo facial tissues. Zero deforestation, zero chlorine bleaching.",
    specs: ["No chlorine or dyes", "Hypoallergenic 3-ply strength", "Saves 1 ton timber per 65 boxes", "Dust & lint free"]
  },
  {
    id: "bamboo-sunglasses",
    name: "BAMBOO POLARIZED SHADES",
    sku: "STK-SG-005",
    category: "OPTICS",
    price: 92,
    originalPrice: 110,
    image: "/src/assets/images/sku_bamboo_glasses_1791951185193.jpg",
    badge: "7-PLY CROSS LAMINATED",
    dimensions: "142mm × 48mm × 145mm",
    weight: "28g",
    material: "Layered Carbonized Bamboo + TAC Polarized Lenses UV400",
    sizes: [
      { label: "STANDARD 50MM", available: true },
      { label: "WIDE 54MM", available: false },
    ],
    description: "Geometric architectural sunglasses cut from 7 cross-laminated layers of dense bamboo. Ultra-lightweight with anti-glare polarized UV400 lenses.",
    specs: ["Spring-loaded titanium hinges", "Water-resistant organic wax coat", "Includes solid bamboo case", "Buoyant in water"]
  },
  {
    id: "bamboo-deskmat",
    name: "BAMBOO ARCHITECT DESK MAT",
    sku: "STK-DM-006",
    category: "WORKSPACE",
    price: 64,
    originalPrice: 78,
    image: "/src/assets/images/sku_bamboo_deskmat_1791951185787.jpg",
    badge: "BEVELED MONOLITH",
    dimensions: "800mm × 400mm × 8mm",
    weight: "1.4kg",
    material: "Compressed Horizontal Bamboo Grain + High-Grip Natural Cork Base",
    sizes: [
      { label: "COMPACT 60×30", available: true },
      { label: "STUDIO 80×40", available: true },
      { label: "EXECUTIVE 100×50", available: false },
    ],
    description: "Solid continuous grain workspace surface offering precise optical mouse glide and natural grounding warmth for minimal desktop setups.",
    specs: ["Precision beveled edges", "Non-slip Portugal cork backing", "Antistatic natural surface", "Oil-sealed matte finish"]
  }
];

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  quote: string;
  product: string;
  tag: string;
  rotation: string;
}

export const REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    author: "Elena Rostova",
    role: "Architectural Lead",
    company: "Studio Bauwerk, Berlin",
    avatar: "ER",
    rating: 5,
    quote: "The water bottle has zero plastic taste. It feels like an architectural artifact on my drafting table. Dense, heavy, completely uncompromising.",
    product: "STK-WB-001 Water Bottle",
    tag: "VERIFIED PATRON",
    rotation: "-rotate-1"
  },
  {
    id: "rev-2",
    author: "Marcus Vance",
    role: "Materials Director",
    company: "Cyclic Lab, Stockholm",
    avatar: "MV",
    rating: 5,
    quote: "Bamboo fiber shoes with real vulcanized FSC gum soles are notoriously hard to execute. STICKS nailed the tensile durability without synthetic glue.",
    product: "STK-SN-003 Sneakers",
    tag: "TECHNICAL AUDIT",
    rotation: "rotate-2"
  },
  {
    id: "rev-3",
    author: "Dr. Kenji Sato",
    role: "Biopolymer Chemist",
    company: "Tokyo Tech Institute",
    avatar: "KS",
    rating: 5,
    quote: "No petroleum binder resins detected in spectral testing. Just raw steam-pressed bamboo cellulose. This is honest brutalist engineering.",
    product: "STK-DM-006 Desk Mat",
    tag: "MATERIAL CERTIFIED",
    rotation: "rotate-1"
  },
  {
    id: "rev-4",
    author: "Chloe Dubois",
    role: "Interior Stylist",
    company: "Atelier Nord, Paris",
    avatar: "CD",
    rating: 5,
    quote: "The tissue dispenser replaces ugly supermarket packaging with solid geometric timber. It anchors our reception desk perfectly.",
    product: "STK-TS-004 Tissues",
    tag: "VERIFIED BUYER",
    rotation: "-rotate-2"
  },
  {
    id: "rev-5",
    author: "Julian Chen",
    role: "Design Critic",
    company: "Discourse Monograph",
    avatar: "JC",
    rating: 5,
    quote: "STICKS rejects the greenwashed floral tropes of sustainable design. It gives bamboo the brutalist weight and dignity it deserves.",
    product: "Full STICKS Matrix",
    tag: "EDITORIAL REVIEW",
    rotation: "rotate-1"
  },
  {
    id: "rev-6",
    author: "Søren Lindqvist",
    role: "Industrial Designer",
    company: "Kobenhavn Designwerk",
    avatar: "SL",
    rating: 5,
    quote: "The toothbrushes hold up to daily pressure without splintering. The charcoal bristle tension is superior to any synthetic brush I've tested.",
    product: "STK-TB-002 Toothbrush",
    tag: "VERIFIED PATRON",
    rotation: "-rotate-1"
  }
];
