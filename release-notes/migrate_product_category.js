// ============================================================
// MIGRATION: Product Category & Gender Separation
// ============================================================
// Copy and paste this entire script into MongoDB Compass MongoShell
// Make sure you are connected to the 'thecollegestore' database
// ============================================================

// Step 1 & 2: Determine category based on product name/type - All in one bulk operation
db.products.bulkWrite([
  {
    updateMany: {
      filter: { name: { $regex: /tenis|tênis|chinelo|sapato|sneaker|havaianas|rider/i } },
      update: [{ $set: { gender: "$category", category: ObjectId("66c112a01679da194f73670f") } }],
      upsert: false
    }
  },
  {
    updateMany: {
      filter: { name: { $regex: /camiseta|camisota|jaqueta|blusa|moletom|bermuda|shorts|calça|legging|top|cardigan/i } },
      update: [{ $set: { gender: "$category", category: ObjectId("66c112a01679da194f73670e") } }],
      upsert: false
    }
  },
  {
    updateMany: {
      filter: { name: { $regex: /relógio|watch|bracelet|mochila|bag|bolsa|chapéu|boné|hat/i } },
      update: [{ $set: { gender: "$category", category: ObjectId("66c112a01679da194f73670d") } }],
      upsert: false
    }
  },
  {
    updateMany: {
      filter: { category: { $type: "string" } },
      update: [{ $set: { gender: "$category", category: ObjectId("66c112a01679da194f73670e") } }],
      upsert: false
    }
  }
]);

// Step 3: Verify migration - check sample products
db.products.find({}).limit(5);
