# Release Notes - Product Category & Gender Separation

## Overview
This release separates the Product model's data structure:
- **Old structure**: Single `category` field storing gender values (men, women, kid)
- **New structure**: 
  - `category`: ObjectId reference to Category collection (proper product types)
  - `gender`: String field for demographic targeting (men, women, kid)

This provides better data organization and enables filtering by both actual product categories AND demographic preferences.

## Files in This Directory

### 1. `migrate_product_category.js`
**Forward Migration** - Converts category strings to ObjectId references

#### How to Run:
```bash
# Open MongoDB Shell
mongosh

# Switch to database
use thecollegestore

# Paste the entire contents of this file and press Enter
```

#### What it does:
- Maps existing category string names (men, women, kid, etc.) to Category ObjectIds
- Updates all products with the corresponding category ObjectId
- Provides verification output

#### Expected Output:
```
// All products now have:
{ 
  _id: ObjectId(...),
  id: 1,
  name: "Product Name",
  category: ObjectId("66c112a01679da194f73670e"),  // Clothes category
  gender: "men",  // or "women" or "kid"
  ...
}
```

---

### 2. `rollback_product_category.js`
**Rollback Migration** - Reverts category ObjectIds back to string names

#### How to Run:
```bash
# Open MongoDB Shell
mongosh

# Switch to database
use thecollegestore

# Paste the entire contents of this file and press Enter
```

#### When to Use:
- If you need to revert the migration
- Only run if the forward migration caused issues

#### Warning:
- This will revert all products back to string categories
- You must also revert the Product model schema in your application code

---

## Application Code Changes

The following files were also updated to support this migration:

1. **models/product.js**
   - Changed `category` field from `String` to `Schema.Types.ObjectId` with reference to 'Category'

2. **controllers/product-controller.js**
   - Added `.populate('category')` to all Product queries
   - Updated endpoints to work with category ObjectIds
   - Added validation and error handling

3. **migrations/products_category_reference_migration.js**
   - Node.js migration runner (used by `npm run migrations`)

---

## Category ID Reference

| Category Name | ObjectId |
|---|---|
| Electronics | 66c112a01679da194f73670b |
| Furniture | 66c112a01679da194f73670c |
| Sports | 66c112a01679da194f73670d |
| Clothes | 66c112a01679da194f73670e |
| Shoes | 66c112a01679da194f73670f |
| Smartphones | 66c12058133f145677b3a808 |
| Sport Shoes | 66c120d0133f145677b3a80b |
| T-Shirts | 66c121aa133f145677b3a813 |

---

## Migration Steps

### Step 1: Update Application Code
The model and controllers have already been updated. Make sure you have the latest code.

### Step 2: Run Migration

**Using MongoDB Shell**
```bash
mongosh
use thecollegestore
# Paste contents of migrate_product_category.js
```

### Step 3: Verify
```bash
# In MongoDB Shell
use thecollegestore
db.products.findOne()
# Should show category as ObjectId instead of string
```

### Step 4: Restart Application
```bash
npm start
```

---

## API Endpoint Changes

### Before:
```json
POST /relatedproducts
{
  "category": "women"
}
```

### After:
```json
POST /relatedproducts
{
  "category": "66c121aa133f145677b3a813"
}
```

---

## Troubleshooting

### Migration didn't run?
- Check MongoDB connection
- Verify database name is `thecollegestore`
- Ensure categories already exist in the database

### Products still showing string categories?
- Migration may not have completed
- Check MongoDB Shell output for errors
- Try running the migration again

### Need to rollback?
1. Run `rollback_product_category.js` in MongoDB Shell
2. Revert the Product model schema back to `type: String`
3. Restart the application

---

## Support
For questions about this migration, refer to the migration files or check the project documentation.
