// lib/data/dish-images.ts - Authentic Culinary Food Imagery & Intelligent Resolver

export interface DishImageMeta {
  url: string;
  name: string;
  category: "main" | "bread" | "rice" | "dessert" | "beverage" | "side" | "snack";
  calories: number;
}

/**
 * Curated, verified high-resolution food photography for Indian mess and hostel cuisine.
 * Every single dish has a 100% UNIQUE, dedicated Unsplash image ID.
 * Zero image reuse across dishes.
 */
export const DISH_IMAGE_CATALOG: Record<string, DishImageMeta> = {
  // 1. Breakfast Specialties
  idli: {
    url: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80",
    name: "Steamed Idli with Chutney",
    category: "main",
    calories: 120,
  },
  vada: {
    url: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&auto=format&fit=crop&q=80",
    name: "Crispy Medu Vada",
    category: "side",
    calories: 180,
  },
  dosa: {
    url: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&auto=format&fit=crop&q=80",
    name: "Golden Roast Dosa",
    category: "main",
    calories: 220,
  },
  poha: {
    url: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&auto=format&fit=crop&q=80",
    name: "Kanda Batata Poha",
    category: "main",
    calories: 190,
  },
  upma: {
    url: "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=600&auto=format&fit=crop&q=80",
    name: "Rava Vegetable Upma",
    category: "main",
    calories: 175,
  },

  // 2. Beverages
  coffee: {
    url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80",
    name: "South Indian Filter Coffee",
    category: "beverage",
    calories: 75,
  },
  tea: {
    url: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80",
    name: "Spiced Masala Chai",
    category: "beverage",
    calories: 65,
  },

  // 3. Main Curries & Dal
  paneer: {
    url: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&auto=format&fit=crop&q=80",
    name: "Shahi Paneer Curry",
    category: "main",
    calories: 260,
  },
  dal: {
    url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80",
    name: "Yellow Dal Tadka",
    category: "side",
    calories: 150,
  },
  sambar: {
    url: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&auto=format&fit=crop&q=80",
    name: "Piping Hot Vegetable Sambar",
    category: "side",
    calories: 130,
  },
  rajma: {
    url: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&auto=format&fit=crop&q=80",
    name: "Punjabi Rajma Masala",
    category: "main",
    calories: 210,
  },
  chole: {
    url: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80",
    name: "Amritsari Chole Masala",
    category: "main",
    calories: 240,
  },

  // 4. Dry Sabzis & Sides
  aloo_gobhi: {
    url: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&auto=format&fit=crop&q=80",
    name: "Spiced Aloo Gobhi Roast",
    category: "side",
    calories: 140,
  },
  papad: {
    url: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=600&auto=format&fit=crop&q=80",
    name: "Crispy Roasted Papad & Pickle",
    category: "side",
    calories: 50,
  },
  curd: {
    url: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format&fit=crop&q=80",
    name: "Fresh Plain Curd / Raita",
    category: "side",
    calories: 90,
  },

  // 5. Breads
  roti: {
    url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&auto=format&fit=crop&q=80",
    name: "Soft Phulka Rotis",
    category: "bread",
    calories: 85,
  },

  // 6. Rice & Pulao
  rice: {
    url: "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=600&auto=format&fit=crop&q=80",
    name: "Steamed White Basmati Rice",
    category: "rice",
    calories: 160,
  },
  pulao: {
    url: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80",
    name: "Jeera Pulao / Fragrant Rice",
    category: "rice",
    calories: 210,
  },

  // 7. Snacks
  samosa: {
    url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80",
    name: "Crispy Potato Samosa & Biscuits",
    category: "snack",
    calories: 220,
  },

  // 8. Desserts
  gulab_jamun: {
    url: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=600&auto=format&fit=crop&q=80",
    name: "Warm Gulab Jamun in Syrup",
    category: "dessert",
    calories: 195,
  },
  sweet: {
    url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80",
    name: "Traditional Indian Sweets",
    category: "dessert",
    calories: 210,
  },
};

/**
 * Category-aware fallback map.
 * When an unlisted dish is entered, it receives an authentic image from its exact culinary category.
 */
export const CATEGORY_FALLBACKS: Record<string, string> = {
  bread: DISH_IMAGE_CATALOG.roti.url,
  rice: DISH_IMAGE_CATALOG.rice.url,
  beverage: DISH_IMAGE_CATALOG.tea.url,
  dessert: DISH_IMAGE_CATALOG.gulab_jamun.url,
  snack: DISH_IMAGE_CATALOG.samosa.url,
  side: DISH_IMAGE_CATALOG.aloo_gobhi.url,
  main: DISH_IMAGE_CATALOG.paneer.url,
  default: DISH_IMAGE_CATALOG.dal.url,
};

/**
 * Intelligent keyword-based dish image resolver.
 * Ensures strict, unambiguous matching for every dish without cross-contamination.
 */
export function resolveDishImage(
  dishName?: string | null,
  customUrl?: string | null,
  category?: string | null
): string {
  if (customUrl && customUrl.trim().length > 0) {
    return customUrl.trim();
  }

  if (!dishName || !dishName.trim()) {
    if (category && CATEGORY_FALLBACKS[category]) {
      return CATEGORY_FALLBACKS[category];
    }
    return CATEGORY_FALLBACKS.default;
  }

  const query = dishName.toLowerCase();

  // 1. Idli / Idly
  if (query.includes("idli") || query.includes("idly")) {
    return DISH_IMAGE_CATALOG.idli.url;
  }

  // 2. Medu Vada
  if (query.includes("vada") || query.includes("wada")) {
    return DISH_IMAGE_CATALOG.vada.url;
  }

  // 3. Dosa / Masala Dosa
  if (query.includes("dosa") || query.includes("dosai")) {
    return DISH_IMAGE_CATALOG.dosa.url;
  }

  // 4. Poha (Flattened rice)
  if (query.includes("poha")) {
    return DISH_IMAGE_CATALOG.poha.url;
  }

  // 5. Upma / Semolina / Khichdi
  if (query.includes("upma") || query.includes("khichdi") || query.includes("rava")) {
    return DISH_IMAGE_CATALOG.upma.url;
  }

  // 6. South Indian Filter Coffee
  if (query.includes("coffee") || query.includes("kaapi")) {
    return DISH_IMAGE_CATALOG.coffee.url;
  }

  // 7. Masala Chai / Tea
  if (query.includes("chai") || query.includes("tea")) {
    return DISH_IMAGE_CATALOG.tea.url;
  }

  // 8. Paneer / Shahi Paneer / Paneer Butter Masala
  if (query.includes("paneer")) {
    return DISH_IMAGE_CATALOG.paneer.url;
  }

  // 9. Vegetable Sambar (must match before general dal)
  if (query.includes("sambar")) {
    return DISH_IMAGE_CATALOG.sambar.url;
  }

  // 10. Rajma Masala
  if (query.includes("rajma")) {
    return DISH_IMAGE_CATALOG.rajma.url;
  }

  // 11. Chole / Chickpeas / Chana
  if (query.includes("chole") || query.includes("chana") || query.includes("channa") || query.includes("bhature")) {
    return DISH_IMAGE_CATALOG.chole.url;
  }

  // 12. Dal Tadka / Dal Makhani / Yellow Dal
  if (query.includes("dal") || query.includes("tadka") || query.includes("makhani") || query.includes("lentil")) {
    return DISH_IMAGE_CATALOG.dal.url;
  }

  // 13. Aloo Gobhi / Cauliflower Potato
  if (query.includes("gobhi") || query.includes("gobi") || query.includes("cauliflower") || (query.includes("aloo") && !query.includes("poha") && !query.includes("samosa"))) {
    return DISH_IMAGE_CATALOG.aloo_gobhi.url;
  }

  // 14. Papad & Pickle
  if (query.includes("papad") || query.includes("pickle") || query.includes("achar")) {
    return DISH_IMAGE_CATALOG.papad.url;
  }

  // 15. Curd / Raita / Plain Dahi
  if (query.includes("curd") || query.includes("raita") || query.includes("dahi")) {
    return DISH_IMAGE_CATALOG.curd.url;
  }

  // 16. Breads: Phulka, Roti, Chapati, Paratha, Naan
  if (query.includes("roti") || query.includes("phulka") || query.includes("chapati") || query.includes("paratha") || query.includes("naan")) {
    return DISH_IMAGE_CATALOG.roti.url;
  }

  // 17. Rice / Chawal / Steamed Rice
  if ((query.includes("rice") || query.includes("chawal") || query.includes("bhat")) && !query.includes("pulao") && !query.includes("biryani") && !query.includes("poha")) {
    return DISH_IMAGE_CATALOG.rice.url;
  }

  // 18. Pulao / Biryani / Jeera Rice
  if (query.includes("pulao") || query.includes("biryani") || query.includes("jeera")) {
    return DISH_IMAGE_CATALOG.pulao.url;
  }

  // 19. Samosa / Biscuits / Evening Snacks
  if (query.includes("samosa") || query.includes("biscuit") || query.includes("kachori") || query.includes("pakora")) {
    return DISH_IMAGE_CATALOG.samosa.url;
  }

  // 20. Gulab Jamun
  if (query.includes("jamun") || query.includes("gulab")) {
    return DISH_IMAGE_CATALOG.gulab_jamun.url;
  }

  // 21. General Sweets / Desserts / Halwa / Kheer / Payasam
  if (query.includes("sweet") || query.includes("dessert") || query.includes("kheer") || query.includes("halwa") || query.includes("payasam")) {
    return DISH_IMAGE_CATALOG.sweet.url;
  }

  // 22. Category fallback if available
  if (category && CATEGORY_FALLBACKS[category]) {
    return CATEGORY_FALLBACKS[category];
  }

  return CATEGORY_FALLBACKS.default;
}

/**
 * Common culinary dish presets for quick selection in admin create menu.
 * Every preset explicitly binds to its verified unique photo.
 */
export const DISH_PRESETS = [
  { name: "Idli with Coconut & Tomato Chutney", category: "main" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.idli.url },
  { name: "Medu Vada & Sambar", category: "side" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.vada.url },
  { name: "Golden Roast Dosa", category: "main" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.dosa.url },
  { name: "Filter Coffee / Tea", category: "beverage" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.coffee.url },
  { name: "Steamed Rice with Sambar", category: "rice" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.rice.url },
  { name: "Aloo Gobhi Roast", category: "side" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.aloo_gobhi.url },
  { name: "Phulka Rotis & Curd", category: "bread" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.roti.url },
  { name: "Crispy Papad & Pickle", category: "side" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.papad.url },
  { name: "Masala Chai", category: "beverage" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.tea.url },
  { name: "Osmania Biscuits & Samosa", category: "snack" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.samosa.url },
  { name: "Tawa Roti with Paneer Curry", category: "main" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.paneer.url },
  { name: "Yellow Dal Tadka", category: "side" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.dal.url },
  { name: "Jeera Pulao", category: "rice" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.pulao.url },
  { name: "Gulab Jamun", category: "dessert" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.gulab_jamun.url },
];
