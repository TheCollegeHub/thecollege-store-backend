// ============================================================
// ROLLBACK: Revert Gender and Category Separation
// ============================================================
// Copy and paste this entire script into MongoDB Compass MongoShell
// Make sure you are connected to the 'thecollegestore' database
// ⚠️ WARNING: This reverts the migration!
// ============================================================

// Step 1: Revert - move gender back to category field
// This restores the original data structure (before the separation)
db.products.updateMany(
  {},
  [
    {
      $set: {
        category: "$gender"  // Restore original gender values to category
      }
    },
    {
      $unset: "gender"  // Remove the gender field
    }
  ]
);

// Step 2: Verify rollback
db.products.find({}).limit(3);
