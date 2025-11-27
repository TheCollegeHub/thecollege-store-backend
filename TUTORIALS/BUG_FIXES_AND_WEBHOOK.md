## BUG FIXES

Once we have our product running in production, bug fixes or even some improvements to features that we saw we launched without applying a business rule that wasn't previously mapped may arise!
So this tutorial aims to focus on two specific branches that carry fixes, improvements, and implementations that help improve The College Store.

#### What we will find in `feature/US-webhook-status-order` for Backend Core?

Implementation of these changes: [Webhook Status Order](./DOCS/WEBHOOK_STATUS_ORDER.md)

#### What we will find in `feature/US-bugFixes` for Frontend?

Implementation of these changes:
- Card Validation at Checkout 
- Email format validation at Create Account      
- Logic to apply WELCOME coupon at Checkout
- Logic for Shipping Free
- The order status on the Order Details page is no longer static but reflects the status generated during the purchase and modified by the Order Status Webhook.
___
All changes in the branches used the `main` (our MVP product) branch as the source.

Remebering some points about set up your environment:

---

## 🔧 Dependencies

Before anything else, make sure you have the following tools installed on your machine:

- **Git** – https://git-scm.com/book/en/v2/Getting-Started-Installing-Git  
- **Node / NPM** – https://nodejs.org/en/download  
- **Docker** – https://docs.docker.com/desktop/  
- **MongoDB Compass** – https://www.mongodb.com/docs/compass/current/install/  
- **Postman** – https://www.postman.com/downloads/

Next, create a folder to store all repositories used in **The College Store**, for example:  
`TheCollegeStoreRepos`  
Open a terminal inside this newly created folder.

---

## 🖥️ Backend Setup

Clone the backend repository:

```bash
git clone https://github.com/TheCollegeHub/thecollege-store-backend.git
```
Navigate into the project folder and install the dependencies:
```
cd thecollege-store-backend
git checkout feature/US-webhook-status-order
npm install
```
With all dependencies installed, you now need to set up the environment so that the database can be populated with initial data (products, discounts, etc.).

This setup will run a script that creates the MongoDB container and executes migrations.

Run the following command from the project root:
```
docker-compose up -d
```
Once this process completes, your backend environment will be ready.

Start the backend service:
```
npm start
```
You should see an output similar to:
```
Server Running on port 4000
All done! MongoDB Connected
```
To verify the backend is working, send a GET request using Postman:
```
http://localhost:4000/api/allproducts
```
Or use this cURL command in your terminal:
```
curl --location 'http://localhost:4000/api/allproducts'
```
If everything is correct, you will receive a list of products, confirming that your backend is running at:
```
http://localhost:4000
```

**Note:** If you already setup the `MVP` previous and did some orders, you need now run a migration to populate a new field in `orders` collection in mongoDb.

Now, all orders must have the `status` and `updatedDate`.
Just copy and paste in the mongoShell the code you find in `release-notes/orders/add-status-to-orders.js`.
After that, all orders already created will have the new fields and in this branch all NEW ORDERS created already will have these fields too.


You are now ready to set up the frontend.
___

## 🎨 Frontend Setup

Open a new terminal tab.

Clone the frontend repository:
```
git clone https://github.com/TheCollegeHub/thecollege-store-frontend.git
```
Navigate into the project folder and install dependencies:
```
cd thecollege-store-frontend
git checkout feature/US-bugFixes
npm install
```
Then start the frontend server:
```
npm start
```
This will automatically open your browser at:
```
http://localhost:3000/
```
Your frontend is now running locally.

**Enjoy exploring the new changes in the ecosystem!**
