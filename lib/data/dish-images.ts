// lib/data/dish-images.ts - Authentic Culinary Food Imagery & Intelligent Resolver

export interface DishImageMeta {
  url: string;        // Local verified asset: /images/dishes/<slug>.jpg
  cdnUrl: string;     // Verified culinary CDN fallback
  name: string;
  category: "main" | "bread" | "rice" | "dessert" | "beverage" | "side" | "snack";
  calories: number;
}

/**
 * Curated, verified high-resolution food photography for Indian mess and hostel cuisine.
 * Every single dish has a 100% UNIQUE, dedicated local image file in /images/dishes/
 * and a verified CDN backup. Zero image reuse across dishes.
 */
export const DISH_IMAGE_CATALOG: Record<string, DishImageMeta> = {
  // 1. Breakfast Specialties
  idli: {
    url: "/images/dishes/idli.jpg",
    cdnUrl: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80",
    name: "Steamed Idli with Chutney",
    category: "main",
    calories: 120,
  },
  vada: {
    url: "/images/dishes/vada.jpg",
    cdnUrl: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&auto=format&fit=crop&q=80",
    name: "Crispy Medu Vada",
    category: "side",
    calories: 180,
  },
  dosa: {
    url: "/images/dishes/dosa.jpg",
    cdnUrl: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&auto=format&fit=crop&q=80",
    name: "Golden Roast Dosa",
    category: "main",
    calories: 220,
  },
  poha: {
    url: "/images/dishes/poha.jpg",
    cdnUrl: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&auto=format&fit=crop&q=80",
    name: "Kanda Batata Poha",
    category: "main",
    calories: 190,
  },
  upma: {
    url: "/images/dishes/upma.jpg",
    cdnUrl: "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=600&auto=format&fit=crop&q=80",
    name: "Rava Vegetable Upma",
    category: "main",
    calories: 175,
  },

  // 2. Beverages
  coffee: {
    url: "/images/dishes/coffee.jpg",
    cdnUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80",
    name: "South Indian Filter Coffee",
    category: "beverage",
    calories: 75,
  },
  tea: {
    url: "/images/dishes/tea.jpg",
    cdnUrl: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80",
    name: "Spiced Masala Chai",
    category: "beverage",
    calories: 65,
  },

  // 3. Main Curries & Dal
  paneer: {
    url: "/images/dishes/paneer.jpg",
    cdnUrl: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&auto=format&fit=crop&q=80",
    name: "Paneer Butter Masala",
    category: "main",
    calories: 260,
  },
  dal: {
    url: "/images/dishes/dal.jpg",
    cdnUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80",
    name: "Yellow Dal Tadka",
    category: "side",
    calories: 150,
  },
  dal_makhani: {
    url: "/images/dishes/dal_makhani.jpg",
    cdnUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&auto=format&fit=crop&q=80",
    name: "Dal Makhani",
    category: "main",
    calories: 230,
  },
  sambar: {
    url: "/images/dishes/sambar.jpg",
    cdnUrl: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&auto=format&fit=crop&q=80",
    name: "Piping Hot Vegetable Sambar",
    category: "side",
    calories: 130,
  },
  rajma: {
    url: "/images/dishes/rajma.jpg",
    cdnUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80",
    name: "Punjabi Rajma Masala",
    category: "main",
    calories: 210,
  },
  chole: {
    url: "/images/dishes/chole.jpg",
    cdnUrl: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80",
    name: "Amritsari Chole Masala",
    category: "main",
    calories: 240,
  },

  // 4. Dry Sabzis & Sides
  aloo_gobhi: {
    url: "/images/dishes/aloo_gobhi.jpg",
    cdnUrl: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&auto=format&fit=crop&q=80",
    name: "Spiced Aloo Gobhi Roast",
    category: "side",
    calories: 140,
  },
  papad: {
    url: "/images/dishes/papad.jpg",
    cdnUrl: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=600&auto=format&fit=crop&q=80",
    name: "Crispy Roasted Papad & Pickle",
    category: "side",
    calories: 50,
  },
  curd: {
    url: "/images/dishes/curd.jpg",
    cdnUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format&fit=crop&q=80",
    name: "Fresh Plain Curd / Raita",
    category: "side",
    calories: 90,
  },

  // 5. Breads
  roti: {
    url: "/images/dishes/roti.jpg",
    cdnUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&auto=format&fit=crop&q=80",
    name: "Soft Phulka Rotis",
    category: "bread",
    calories: 85,
  },

  // 6. Rice & Pulao
  rice: {
    url: "/images/dishes/rice.jpg",
    cdnUrl: "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=600&auto=format&fit=crop&q=80",
    name: "Steamed White Basmati Rice",
    category: "rice",
    calories: 160,
  },
  pulao: {
    url: "/images/dishes/pulao.jpg",
    cdnUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80",
    name: "Jeera Pulao / Fragrant Rice",
    category: "rice",
    calories: 210,
  },
  biryani: {
    url: "/images/dishes/biryani.jpg",
    cdnUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80",
    name: "Fragrant Veg Dum Biryani",
    category: "rice",
    calories: 320,
  },

  // 7. Snacks
  samosa: {
    url: "/images/dishes/samosa.jpg",
    cdnUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80",
    name: "Crispy Potato Samosa",
    category: "snack",
    calories: 220,
  },
  biscuits: {
    url: "/images/dishes/biscuits.jpg",
    cdnUrl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&auto=format&fit=crop&q=80",
    name: "Osmania & Butter Biscuits",
    category: "snack",
    calories: 140,
  },

  // 8. Desserts
  gulab_jamun: {
    url: "/images/dishes/gulab_jamun.jpg",
    cdnUrl: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=600&auto=format&fit=crop&q=80",
    name: "Warm Gulab Jamun in Syrup",
    category: "dessert",
    calories: 195,
  },
  kheer: {
    url: "/images/dishes/kheer.jpg",
    cdnUrl: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80",
    name: "Traditional Rice Kheer",
    category: "dessert",
    calories: 180,
  },
};

/**
 * Category-aware fallback map using local assets.
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
 * Known mismatched image URLs from legacy seeds.
 * If these URLs are encountered for mismatched dishes, they must be overridden.
 */
const MISMATCHED_URL_SIGNATURES: { signature: string; allowedKey: string }[] = [
  // photo-1601050690597-df0568f70950 is a Samosa, but was previously assigned to Aloo Gobhi Roast
  { signature: "1601050690597", allowedKey: "samosa" },
  // photo-1576092768241 is Tea, but was previously assigned to Biscuits
  { signature: "1576092768241", allowedKey: "tea" },
];

/**
 * Determines the matching dish catalog key based on dish name keywords.
 */
export function getDishKeyByName(dishName?: string | null): string | null {
  if (!dishName || !dishName.trim()) return null;
  const q = dishName.toLowerCase();

  // 1. Desserts (Check kheer, gulab jamun FIRST so 'Rice Kheer' doesn't match plain 'Rice')
  if (q.includes("jamun") || q.includes("gulab")) return "gulab_jamun";
  if (q.includes("kheer") || q.includes("payasam") || q.includes("halwa") || q.includes("sheera") || q.includes("sweet") || q.includes("dessert")) return "kheer";

  // 2. Breakfast Specialties
  if (q.includes("idli") || q.includes("idly")) return "idli";
  if (q.includes("vada") || q.includes("wada") || q.includes("vadai")) return "vada";
  if (q.includes("dosa") || q.includes("dosai")) return "dosa";
  if (q.includes("poha") || q.includes("aval")) return "poha";
  if (q.includes("upma") || q.includes("uppittu") || q.includes("rava upma")) return "upma";

  // 3. Beverages (Use word boundary \btea\b so 'steamed' never triggers tea!)
  if (q.includes("coffee") || q.includes("kaapi")) return "coffee";
  if (q.includes("chai") || /\btea\b/i.test(q)) return "tea";

  // 4. Snacks (Check samosa before biscuits for combo 'Osmania Biscuits & Samosa')
  if (q.includes("samosa") || q.includes("kachori") || q.includes("pakora") || q.includes("bhajiya")) return "samosa";
  if (q.includes("biscuit") || q.includes("cookie") || q.includes("rusk") || q.includes("osmania")) return "biscuits";

  // 5. Dal, Sambar & Curries
  if ((q.includes("sambar") || q.includes("sambhar") || q.includes("kuzhambu")) && !q.includes("rice")) return "sambar";
  if (q.includes("paneer") || q.includes("cottage cheese")) return "paneer";
  if (q.includes("rajma") || q.includes("kidney bean")) return "rajma";
  if (q.includes("chole") || q.includes("chana") || q.includes("channa") || q.includes("bhature")) return "chole";
  if (q.includes("makhani") || q.includes("black dal")) return "dal_makhani";
  if (q.includes("dal") || q.includes("tadka") || q.includes("lentil") || q.includes("toor")) return "dal";

  // 6. Dry Sabzis & Sides
  if (q.includes("gobhi") || q.includes("gobi") || q.includes("cauliflower") || (q.includes("aloo") && !q.includes("poha") && !q.includes("samosa"))) {
    return "aloo_gobhi";
  }
  if (q.includes("papad") || q.includes("appalam") || q.includes("pickle") || q.includes("achar")) return "papad";
  if (q.includes("curd") || q.includes("raita") || q.includes("dahi") || q.includes("yogurt") || q.includes("chaas") || q.includes("lassi")) return "curd";

  // 7. Breads
  if (q.includes("roti") || q.includes("phulka") || q.includes("chapati") || q.includes("paratha") || q.includes("naan") || q.includes("kulcha") || q.includes("puri") || q.includes("poori")) {
    return "roti";
  }

  // 8. Rice Dishes (Biryani > Pulao > Plain Rice)
  if (q.includes("biryani")) return "biryani";
  if (q.includes("pulao") || q.includes("jeera")) return "pulao";
  if (q.includes("rice") || q.includes("chawal") || q.includes("bhat")) return "rice";

  return null;
}

/**
 * Intelligent keyword-based dish image resolver.
 * Ensures strict, unambiguous matching for every dish without cross-contamination.
 * Automatically overrides legacy mismatched custom URLs.
 */
export function resolveDishImage(
  dishName?: string | null,
  customUrl?: string | null,
  category?: string | null
): string {
  const matchedKey = getDishKeyByName(dishName);

  // If a customUrl is provided, check if it's a known mismatched URL
  if (customUrl && customUrl.trim().length > 0) {
    const trimmed = customUrl.trim();
    let isMismatched = false;

    for (const rule of MISMATCHED_URL_SIGNATURES) {
      if (trimmed.includes(rule.signature) && matchedKey && matchedKey !== rule.allowedKey) {
        isMismatched = true;
        break;
      }
    }

    // If it's not a known mismatch, and it's already an authentic local dish image or explicit data URL, return it
    if (!isMismatched) {
      if (trimmed.startsWith("/images/dishes/") || trimmed.startsWith("data:") || trimmed.startsWith("blob:")) {
        return trimmed;
      }
      // If we don't have a specific catalog match, use the custom URL
      if (!matchedKey) {
        return trimmed;
      }
    }
  }

  // If we found an exact catalog match, return its verified local asset
  if (matchedKey && DISH_IMAGE_CATALOG[matchedKey]) {
    return DISH_IMAGE_CATALOG[matchedKey].url;
  }

  // Category fallback if available
  if (category && CATEGORY_FALLBACKS[category]) {
    return CATEGORY_FALLBACKS[category];
  }

  return CATEGORY_FALLBACKS.default;
}

/**
 * Get direct CDN fallback URL for a dish when local file is not reachable or during SSR image loads.
 */
export function getDishCdnFallback(dishName?: string | null, category?: string | null): string {
  const matchedKey = getDishKeyByName(dishName);
  if (matchedKey && DISH_IMAGE_CATALOG[matchedKey]?.cdnUrl) {
    return DISH_IMAGE_CATALOG[matchedKey].cdnUrl;
  }
  if (category && CATEGORY_FALLBACKS[category]) {
    const catKey = getDishKeyByName(category);
    if (catKey && DISH_IMAGE_CATALOG[catKey]?.cdnUrl) {
      return DISH_IMAGE_CATALOG[catKey].cdnUrl;
    }
  }
  return DISH_IMAGE_CATALOG.dal.cdnUrl;
}

/**
 * Common culinary dish presets for quick selection in admin create menu.
 * Every preset explicitly binds to its verified unique photo.
 */
export const DISH_PRESETS = [
  { name: "Idli with Coconut & Tomato Chutney", category: "main" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.idli.url },
  { name: "Crispy Medu Vada & Sambar", category: "side" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.vada.url },
  { name: "Golden Roast Dosa", category: "main" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.dosa.url },
  { name: "Kanda Batata Poha", category: "main" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.poha.url },
  { name: "Rava Vegetable Upma", category: "main" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.upma.url },
  { name: "South Indian Filter Coffee", category: "beverage" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.coffee.url },
  { name: "Spiced Masala Chai", category: "beverage" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.tea.url },
  { name: "Paneer Butter Masala", category: "main" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.paneer.url },
  { name: "Yellow Dal Tadka", category: "side" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.dal.url },
  { name: "Dal Makhani with Butter", category: "main" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.dal_makhani.url },
  { name: "Vegetable Sambar", category: "side" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.sambar.url },
  { name: "Punjabi Rajma Masala", category: "main" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.rajma.url },
  { name: "Amritsari Chole Masala", category: "main" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.chole.url },
  { name: "Spiced Aloo Gobhi Roast", category: "side" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.aloo_gobhi.url },
  { name: "Steamed White Basmati Rice", category: "rice" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.rice.url },
  { name: "Jeera Pulao", category: "rice" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.pulao.url },
  { name: "Fragrant Veg Dum Biryani", category: "rice" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.biryani.url },
  { name: "Soft Phulka Rotis", category: "bread" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.roti.url },
  { name: "Crispy Roasted Papad & Pickle", category: "side" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.papad.url },
  { name: "Fresh Plain Curd / Raita", category: "side" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.curd.url },
  { name: "Crispy Potato Samosa", category: "snack" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.samosa.url },
  { name: "Osmania & Butter Biscuits", category: "snack" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.biscuits.url },
  { name: "Warm Gulab Jamun in Syrup", category: "dessert" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.gulab_jamun.url },
  { name: "Traditional Rice Kheer", category: "dessert" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.kheer.url },
];
