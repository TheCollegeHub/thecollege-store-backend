// ============================================================
// MIGRATION: Product Category & Gender Separation
// ============================================================
// Copy and paste this entire script into MongoDB Compass MongoShell
// Make sure you are connected to the 'thecollegestore' database
// ============================================================

// Step 1: Determine category based on product name/type
// Shoes: Tenis, Tênis, Sapato, Chinelo, Sneaker
db.products.updateMany(
  { name: { $regex: /tenis|tênis|chinelo|sapato|sneaker|havaianas|rider/i } },
  [{ $set: { gender: "$category", category: ObjectId("66c112a01679da194f73670f") } }]  // Shoes
);

// Clothes: Camiseta, Camisota, Jaqueta, Blusa, Moletom, Bermuda, Shorts, Calça, Legging, Top
db.products.updateMany(
  { name: { $regex: /camiseta|camisota|jaqueta|blusa|moletom|bermuda|shorts|calça|legging|top|cardigan/i } },
  [{ $set: { gender: "$category", category: ObjectId("66c112a01679da194f73670e") } }]  // Clothes
);

// Sports/Accessories: Relógio, Watch, Bracelet, Mochila, Bag
db.products.updateMany(
  { name: { $regex: /relógio|watch|bracelet|mochila|bag|bolsa|chapéu|boné|hat/i } },
  [{ $set: { gender: "$category", category: ObjectId("66c112a01679da194f73670d") } }]  // Sports
);

// Step 2: For any products without a category yet (fallback), assign to Clothes
db.products.updateMany(
  { category: { $type: "string" } },
  [{ $set: { gender: "$category", category: ObjectId("66c112a01679da194f73670e") } }]  // Default: Clothes
);

// Step 3: Verify migration - check sample products
db.products.find({}).limit(5);
