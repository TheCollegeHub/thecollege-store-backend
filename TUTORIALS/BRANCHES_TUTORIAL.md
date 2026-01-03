# 🌿 Branches Tutorial  
### A Guided Journey Through Each Stage of The College Store Ecosystem

This document will guide you through the **incremental ecosystem** of The College Store by using specific branches that represent different stages of the system.  

Instead of jumping directly into the full and complete ecosystem, you can explore the platform **step by step**, understanding each feature in isolation or as part of a growing flow — always maintaining an **end-to-end experience**.

Each branch represents a point in the product's evolution.  
As you advance, you will see how the system becomes more robust, more complex, and closer to the final architecture.

---

## 🧭 How This Works

You can think of this as a **learning path** where each branch introduces new concepts, features, or architectural decisions.

- Want only a **minimal environment** to understand the basics? Start at the MVP.
- Want to see how caching, queues, gRPC, and more are gradually introduced? Follow the next branches.
- Want the final and complete ecosystem? Follow the final tutorial in the main README.

Every step has its own documentation and instructions, which you will find linked below.

---

## 🌱 Available Branches & Tutorials

Below is the ordered list of branches you can explore, each one adding new layers to the project.

### MVP — Minimum Viable Product (Backend + Frontend)
**Branch:** `main`  
This branch contains the version of the ecosystem, that include only the `frontend` (initial features but it has a complete flow to make an order) and `backend core service`

👉 Follow the step-by-step guide here:  
**[MVP_TUTORIAL.md](./MVP_TUTORIAL.md)**

___

### BUG FIXES AND WEBHOOK STATUS ORDER (Backend + Frontend)
**FrontEnd Branch:** `feature/US-bugFixes`  
**Backend Core Branch:** `feature/US-webhook-status-order`  
These branch contains the implementation of some bugs fixes and improvement in the order collection to create order status to track it better, it includes only the `frontend` and `backend core service`

👉 Follow the step-by-step guide here:  
**[BUG_FIXES_AND_WEBHOOK.md](./BUG_FIXES_AND_WEBHOOK.md)**

---

### RELATED PRODUCTS & CATEGORY REFACTORING (Backend + Frontend)
**FrontEnd and Backend Core Branch:** `feature/US-relatedProducts`  
This branch contains a major refactoring of the product category and gender structure to provide better related products recommendations. It separates product types from demographic attributes with a new Category model, refactored product schema, and improved related products endpoint.

Key improvements:
- Product `category` changed from string to ObjectId reference
- New `gender` field for demographic targeting
- New `GET /api/relatedproducts/:productId` endpoint for automatic related product detection
- Database migration to handle the structural changes
- Better data model scalability

👉 Follow the step-by-step guide here:  
**[RELATED_PRODUCTS_REFACTOR.md](./RELATED_PRODUCTS_REFACTOR.md)**

Coming soon, the next tutorial branches ...
Feel free to explore other branches if you want!
