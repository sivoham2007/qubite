// tests/dish-images-verification.test.ts
// Verifies that every single dish name across the website maps to its authentic image.

import { resolveDishImage, getDishKeyByName, DISH_IMAGE_CATALOG, CATEGORY_FALLBACKS } from "../lib/data/dish-images";
import * as fs from "fs";
import * as path from "path";

const testCases = [
  // Breakfast
  { query: "Idli with Coconut & Tomato Chutney", expectedSlug: "idli", description: "Steamed fluffy idlis" },
  { query: "Crispy Medu Vada", expectedSlug: "vada", description: "Golden crispy medu vada" },
  { query: "Golden Roast Dosa", expectedSlug: "dosa", description: "Crisp golden dosa" },
  { query: "Kanda Batata Poha", expectedSlug: "poha", description: "Yellow flattened rice poha" },
  { query: "Rava Vegetable Upma", expectedSlug: "upma", description: "Warm vegetable semolina upma" },
  { query: "South Indian Filter Coffee", expectedSlug: "coffee", description: "Frothy filter coffee in tumbler" },

  // Beverages
  { query: "Spiced Masala Chai", expectedSlug: "tea", description: "Hot spiced masala tea" },
  { query: "Masala Chai", expectedSlug: "tea", description: "Masala chai in glass" },

  // Mains & Curries
  { query: "Paneer Butter Masala", expectedSlug: "paneer", description: "Rich orange cottage cheese curry" },
  { query: "Shahi Paneer", expectedSlug: "paneer", description: "Creamy paneer" },
  { query: "Yellow Dal Tadka", expectedSlug: "dal", description: "Golden yellow dal with cumin tempering" },
  { query: "Dal Makhani with Butter", expectedSlug: "dal_makhani", description: "Rich slow-cooked black dal" },
  { query: "Vegetable Sambar", expectedSlug: "sambar", description: "Piping hot lentil vegetable sambar" },
  { query: "Punjabi Rajma Masala", expectedSlug: "rajma", description: "Kidney beans in spiced onion-tomato gravy" },
  { query: "Amritsari Chole Masala", expectedSlug: "chole", description: "Amritsari spiced chickpeas" },

  // Sides & Breads
  { query: "Aloo Gobhi Roast", expectedSlug: "aloo_gobhi", description: "Spiced cauliflower and potato dry sabzi" },
  { query: "Crispy Papad & Pickle", expectedSlug: "papad", description: "Roasted papad and mango pickle" },
  { query: "Fresh Plain Curd / Raita", expectedSlug: "curd", description: "Thick white curd and boondi raita" },
  { query: "Soft Phulka Rotis", expectedSlug: "roti", description: "Soft puffed whole wheat rotis" },
  { query: "Fresh Tawa Phulka Rotis", expectedSlug: "roti", description: "Fresh flame puffed chapatis" },

  // Rice & Pulao
  { query: "Steamed White Basmati Rice", expectedSlug: "rice", description: "Long-grain steamed white rice" },
  { query: "Steamed Rice with Sambar", expectedSlug: "rice", description: "Steamed rice" },
  { query: "Jeera Pulao", expectedSlug: "pulao", description: "Fragrant cumin tempered rice" },
  { query: "Fragrant Veg Dum Biryani", expectedSlug: "biryani", description: "Aromatic layered vegetable dum biryani" },

  // Snacks & Desserts
  { query: "Crispy Potato Samosa", expectedSlug: "samosa", description: "Golden pyramid stuffed samosas" },
  { query: "Osmania Biscuits & Samosa", expectedSlug: "samosa", description: "Evening snack pairing" },
  { query: "Osmania & Butter Biscuits", expectedSlug: "biscuits", description: "Crispy tea biscuits" },
  { query: "Warm Gulab Jamun in Syrup", expectedSlug: "gulab_jamun", description: "Rose scented sweet milk dumplings" },
  { query: "Traditional Rice Kheer", expectedSlug: "kheer", description: "Cardamom flavored rice pudding" },
];

console.log("\n=======================================================");
console.log("DISH IMAGERY ACCURACY & FILE INTEGRITY VERIFICATION");
console.log("=======================================================\n");

let passed = 0;
let failed = 0;

// 1. Verify all 24 local files exist in public/images/dishes/
console.log("Checking physical files in public/images/dishes/:");
const publicDishesDir = path.join(process.cwd(), "public", "images", "dishes");
const existingFiles = fs.readdirSync(publicDishesDir);
console.log(`Found ${existingFiles.length} files in ${publicDishesDir}\n`);

for (const [key, meta] of Object.entries(DISH_IMAGE_CATALOG)) {
  const filename = `${key}.jpg`;
  const filePath = path.join(publicDishesDir, filename);
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    console.log(`  ✅ [${key}] File exists: public/images/dishes/${filename} (${(stats.size / 1024).toFixed(1)} KB)`);
  } else {
    console.error(`  ❌ [${key}] MISSING FILE: public/images/dishes/${filename}`);
    failed++;
  }
}

// 2. Test keyword mapping for all test cases
console.log("\nTesting keyword resolution for all dishes:");
for (const tc of testCases) {
  const resolved = resolveDishImage(tc.query);
  const expectedUrl = `/images/dishes/${tc.expectedSlug}.jpg`;

  if (resolved === expectedUrl) {
    console.log(`  ✅ "${tc.query}" ➔ ${resolved} (Matches ${tc.description})`);
    passed++;
  } else {
    console.error(`  ❌ "${tc.query}" ➔ ${resolved} (Expected: ${expectedUrl})`);
    failed++;
  }
}

// 3. Test legacy mismatched URL override
console.log("\nTesting legacy mismatched URL override:");
const alooWithSamosaUrl = resolveDishImage("Aloo Gobhi Roast", "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600");
if (alooWithSamosaUrl === "/images/dishes/aloo_gobhi.jpg") {
  console.log("  ✅ Legacy Samosa photo for Aloo Gobhi successfully overridden to /images/dishes/aloo_gobhi.jpg");
  passed++;
} else {
  console.error("  ❌ Legacy URL override failed for Aloo Gobhi:", alooWithSamosaUrl);
  failed++;
}

console.log("\n=======================================================");
console.log(`VERIFICATION SUMMARY: ${passed} PASSED, ${failed} FAILED`);
console.log("=======================================================\n");

if (failed > 0) {
  process.exit(1);
}
