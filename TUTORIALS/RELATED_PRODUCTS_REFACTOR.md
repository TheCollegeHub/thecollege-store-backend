# Related Products & Category Refactoring

## Overview

This tutorial guides you through the **feature/US-relatedProducts** branch, which implements a major refactoring of the product category and gender structure to provide better related products recommendations.

### What Changed?

**Previously:**
- Product `category` field was a string containing gender values (men, women, kid)
- Related products were fetched using a POST endpoint with manual category tracking
- No separation between product type and demographic attributes

**Now:**
- Product `category` field is an ObjectId reference to proper product categories (Shoes, Clothes, Sports)
- A new `gender` field handles demographic targeting (men, women, kid)
- New `GET /api/relatedproducts/:productId` endpoint automatically detects category
- Better data model separation of concerns

___

## What We Will Find in `feature/US-relatedProducts` for Backend

Implementation of these changes:

- **Category Model**: New collection for product categories with metadata
- **Product Model Updates**: Category field changed to ObjectId reference, gender field added
- **Database Migration**: Moves existing data from string categories to proper structure
- **Updated Endpoints**: All product endpoints return new category structure
- **New Related Products Endpoint**: `GET /api/relatedproducts/:productId` for simplified related product fetching

All changes in this branch use the `main` branch as the source.

___

## 🔧 Dependencies

Before starting, make sure you have the following tools installed:

- **Git** – https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
- **Node / NPM** – https://nodejs.org/en/download
- **Docker** – https://docs.docker.com/desktop/
- **MongoDB Compass** – https://www.mongodb.com/docs/compass/current/install/
- **Postman** – https://www.postman.com/downloads/

Create a folder to store all repositories, for example: `TheCollegeStoreRepos`

Open a terminal inside this folder.

___

## 🖥️ Backend Setup

### Clone the Repository

```bash
git clone https://github.com/TheCollegeHub/thecollege-store-backend.git
cd thecollege-store-backend
```

### Checkout the Feature Branch

```bash
git checkout feature/US-relatedProducts
```

### Install Dependencies

```bash
npm install
```

### Set Up Docker & Database

**Important:** The `docker-compose up -d` command runs only the default migrations from the `main` branch, not the branch-specific migration for this feature.

#### Step 1: Start Docker and Default Migrations

```bash
docker-compose up -d
```

This will:
1. Create a MongoDB container
2. Run default migrations (categories, products, etc.)

Wait for the container to be ready:
```bash
docker logs <mongodb_container_name>
```

#### Step 2: Run the Branch-Specific Migration

The migration files are located in the `release-notes/` directory. **Please read the [release-notes/README.md](../release-notes/README.md) file for detailed instructions** on how to run the migration.

The migration files available are:

- **`migrate_product_category.js`** - Forward migration to apply category and gender refactoring
- **`rollback_product_category.js`** - Rollback migration (if needed)

**Quick Migration Steps:**

1. Open the [release-notes/README.md](../release-notes/README.md) file for complete instructions

**This migration will:**
1. Create the updated Category collection structure
2. Map existing products from string categories to ObjectId references
3. Add the new `gender` field to all products
4. Populate all category references correctly
5. Verify data integrity

### Start the Backend Service

```bash
npm start
```

You should see:

```
Server Running on port 4000
All done! MongoDB Connected
```

### Verify the Setup

Test with Postman or curl to check the new structure:

**Get all products:**
```bash
curl --location 'http://localhost:4000/api/allproducts'
```

**Response will now include:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "id": 1,
  "name": "Tenis Adidas Galaxy 6",
  "category": {
    "_id": "66c112a01679da194f73670f",
    "name": "Shoes",
    "image": "/api/v1/images?type=categories&name=shoes",
    "isFeatured": false
  },
  "gender": "men",
  "new_price": 150,
  ...
}
```

**Notice:**
- `category` is now an **object with `_id` and `name`**
- New `gender` field is present
- Category contains metadata

___

## Testing the New Features

### 1. Test Related Products - New Endpoint

**Get related products using the new GET endpoint:**

```bash
curl --location 'http://localhost:4000/api/relatedproducts/507f1f77bcf86cd799439011?limit=4'
```

**Response structure:**
```json
{
  "product": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Tenis Adidas Galaxy 6",
    "category": {
      "_id": "66c112a01679da194f73670f",
      "name": "Shoes",
      ...
    },
    "gender": "men",
    ...
  },
  "relatedProducts": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Nike Running Shoes",
      "category": { "_id": "66c112a01679da194f73670f", "name": "Shoes" },
      "gender": "men",
      ...
    },
    ...
  ],
  "count": 4
}
```

### 2. Test Category Filtering

**Filter by gender (new field):**

```bash
curl --location 'http://localhost:4000/api/popularinwomen'
```

**Response:**
- Returns women products with new category structure
- Category now shows actual product type (Shoes, Clothes, etc.)
- Not just "women" anymore

### 3. Backward Compatibility - Old Endpoint

**Old POST endpoint still works:**

```bash
curl --location --request POST 'http://localhost:4000/api/relatedproducts' \
  --header 'Content-Type: application/json' \
  --data '{
    "category": "66c112a01679da194f73670f"
  }'
```

Existing clients are not broken during transition period.

___

## Database Structure

### Category Collection

```json
{
  "_id": ObjectId("66c112a01679da194f73670f"),
  "name": "Shoes",
  "image": "/api/v1/images?type=categories&name=shoes",
  "isFeatured": false,
  "createdAt": ISODate("2024-01-01"),
  "updatedAt": ISODate("2024-01-01")
}
```

### Product Collection (Updated)

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "id": 1,
  "name": "Tenis Adidas Galaxy 6",
  "category": ObjectId("66c112a01679da194f73670f"),  // ← Changed from string
  "gender": "men",                                     // ← New field
  "new_price": 150,
  "old_price": 200,
  "isFeatured": false,
  "createdAt": ISODate("2024-01-01"),
  "updatedAt": ISODate("2024-01-01")
}
```

___


## Frontend Setup

The frontend also needs to be updated to work with the new product category and gender structure.

### Clone the Frontend Repository

```bash
git clone https://github.com/TheCollegeHub/thecollege-store-frontend.git
cd thecollege-store-frontend
```

### Checkout the Feature Branch

**Frontend Branch:** `feature/US-relatedProducts`

This branch contains all necessary updates to support the backend changes:

```bash
git checkout feature/US-relatedProducts
```

### Install Dependencies

```bash
npm install
```

### Start the Frontend Server

```bash
npm start
```

This will automatically open your browser at:

```
http://localhost:3000/
```

Your frontend is now running with support for the new category and gender structure.

**Enjoy the improved related products feature!**
