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

### **1️⃣ MVP — Minimum Viable Product (Backend + Frontend)**
**Branch:** `main`  
This branch contains the version of the ecosystem, that include only the `frontend` (initial features but it has a complete flow to make an order) and `backend core service`

👉 Follow the step-by-step guide here:  
**[MVP_TUTORIAL.md](./MVP_TUTORIAL.md.md)**

---

### **2️⃣ Next Feature — (EXAMPLE: Coupons, Auth, Caching, etc.)**
**Branch:** `feature/<name>`  
Each feature branch introduces a new part of the system.  
Examples (adjust based on your real branches):

- `feature/coupons`
- `feature/recommendations`
- `feature/cart`
- `feature/redis-cache`
- `feature/grpc-products`
- `feature/kafka-stock`

Each branch includes:
- What was added  
- Why it matters  
- How to run it  
- API changes  
- Things to test (QA perspective)

👉 Tutorial for each feature:  
**[FEATURES_OVERVIEW.md](./FEATURES_OVERVIEW.md)**

---

### **3️⃣ Full Ecosystem — Complete Version**
**Branch:** `main`  
This is the final and complete system, integrating:

- Backend + Frontend  
- MongoDB  
- Redis (Cache)  
- Kafka (Stock updates)  
- gRPC service  
- Notifications  
- CronJobs  
- Feature toggles  
- Vault secrets  
- Full E2E experience

👉 Follow the complete tutorial here:  
**[FULL_SYSTEM_TUTORIAL.md](./FULL_SYSTEM_TUTORIAL.md)**

---

## 🔄 How to Switch Between Branches

To navigate through the ecosystem evolution:

```bash
git fetch --all
git checkout <branch-name>
