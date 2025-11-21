# The College WebSore — Official Setup Guide

This is the **official README** for installing, configuring, and running the entire The College WebStore. Follow this guide carefully to ensure all services, dependencies, and infrastructure components run correctly.

***But if you don't want the complete system, but rather a small ecosystem (maintaining end-to-end flow) and know the branches feature that exist to use. Please, follow this [BRANCHES_TOTURIAL](./BRANCHES_TUTORIAL.md)***

---

## 📦 1. Requirements

Make sure you have the following tools installed:

* **Git**: https://git-scm.com/install/
* **Node.js**: https://nodejs.org/
* **Docker + Docker Desktop**: https://www.docker.com/products/docker-desktop/
* **MongoDB Compass**: https://www.mongodb.com/try/download/compass
* **Redis Client**: https://redis.io/docs/latest/operate/redisinsight/install/
* **Kafka Client**: https://www.kafkatool.com/

---

## 📁 2. Clone All Repositories

Clone every repository required for the system.

- FrontEnd: https://github.com/TheCollegeHub/thecollege-store-frontend
- Backend Core: https://github.com/TheCollegeHub/thecollege-store-backend
- API Gateway: https://github.com/TheCollegeHub/thecollege-ms-apigateway
- Product Service: https://github.com/TheCollegeHub/thecollege-ms-product
- Recommendation Service: https://github.com/TheCollegeHub/thecollege-ms-recommendation
- Notification Service: https://github.com/TheCollegeHub/thecollege-ms-notification
- Packages: https://github.com/TheCollegeHub/thecollege-ms-packages
- CronJob: https://github.com/TheCollegeHub/thecollege-ms-cronjobs
_____

After cloning, switch to the correct branch for each project:

| Service                | Branch    |
| ---------------------- | --------- |
| Frontend               | `release` |
| Backend Core Service   | `release` |
| Product Service        | `release` |
| Recommendation Service | `main`    |
| API Gateway            | `main`    |

Then, inside each project:

```bash
npm install
```

---

## 🔐 3. Setting Up the Private Package (Required for Notification Service)

The Notification Service depends on a private npm package. Follow the steps below.

### 3.1 Clone the Packages Repository

Clone the repository where the private packages are stored.

### 3.2 Create an Azure DevOps Account

1. Create a **free Azure DevOps** account.
2. Create an **Organization**.
3. Create a **Project** with:

   * Version Control: Git
   * Work Item Process: Agile
4. Go to **Artifacts** and create a Feed named:

   * `thecollege-packages`
5. Choose **Connect to Feed → npm**.
6. Follow the system-specific setup steps shown by Azure.
7. Add the generated `.npmrc` to the **root** of your local project.

### 3.3 Publish the Private Package

Inside the `vault-secrets` folder:

```bash
npm install
npm run build
npm publish
```

After publishing, the package will appear inside your Azure DevOps feed.

---

## 📫 4. Configuring the Notification Service

Once the package is published:

### 4.1 Check the Version Inside package.json

Ensure the version under:

```
@thecollege/vault-secrets: "^1.0.7"
```

matches the version you published.

### 4.2 Add .npmrc to Notification Service

Create a `.npmrc` file in the Notification Service root **using the same credentials** you used for the packages repository.

If this is missing, you'll see errors such as:

```
Unable to authenticate, your authentication token seems to be invalid.
```

### 4.3 Install Dependencies

Before installing, remove `node_modules` and `package-lock.json` if they exist:

```bash
rm -rf node_modules package-lock.json
```

Then:

```bash
npm install
```

### 4.4 Environment Variables

The Notification Service requires the following environment variables:

* `VAULT_CLIENT_ID`
* `VAULT_CLIENT_SECRET`
* `VAULT_AUTH_URL`
* `VAULT_URL`

### 4.5 Configure Infisical (Secrets Manager)

1. Create an **Infisical** account.
2. Create a **Project**.
3. Add a new Secret:

   * Key: `EMAIL_CLIENT_KEY`

### 4.6 Create a Brevo Account

1. Create an account on **Brevo**.
2. Generate an **API TOKEN**.
3. Save the token inside the `EMAIL_CLIENT_KEY` you created in Infisical.

The private package will automatically pull this secret securely.

Infisical Documentation to know the `VAULT_URL` after you create your project: https://infisical.com/docs/api-reference/endpoints/secrets/read 

For `VAUL_AUTH_URL` you need to use the universal Auth: https://infisical.com/docs/api-reference/endpoints/universal-auth/login

And in this documentation you can find how create and get your Client Secret and Client Id to set the `VAULT_CLIENT_ID` and `VAULD_CLIENT_SECRET`: https://infisical.com/docs/documentation/platform/identities/universal-auth

---

## 🐳 5. Start Infrastructure Services

After installing dependencies in all services, start with the Core Service.

Inside the **Backend Core Service** folder:

```bash
docker compose up -d
```

This will start:

* MongoDB
* Kafka
* Redis
* Consul
* Migration will run here to populate database

Verify all containers are running in Docker Desktop.

---

## 🚀 6. Start All Services

Run each service in the following order:


### Product Service

```bash
npm start
```

### Recommendation Service

```bash
npm start
```

### Notification Service

```bash
npm start
```

### Core Service

```bash
npm start
```

### API Gateway

```bash
npm start
```

### Frontend

```bash
npm start
```

---

## 🔧 Product Service — Running the Stock Migration

You must run a migration that adds the new `stock` field to all existing products.

### 📂 Migration Location
The migration script is located at `Backend Core Service` in `release-notes/migrations/add-stock-field.js`


### ▶️ How to Execute
1. Open **MongoDB Compass** (or any MongoDB client of your choice).
2. Access your database.
3. Open the **Mongo Shell** inside Compass.
4. Open the file `add-stock-field.js`.
5. Copy all its contents.
6. Paste into the Mongo Shell and execute.

### ⚠️ Important Notice
If you are using a Mongo client **other than MongoDB Compass**, the execution syntax may differ.  
Refer to the documentation of your client to ensure the script is executed correctly.

---

## ⏱️ Cron Job — Product Stock Monitoring

The system includes an **optional Cron Job** that monitors product stock levels and sends notifications using LogSnag.

### 📁 How to Use
1. Clone the Cron Job project repository.
2. Install dependencies:

```bash
cd product-stock 
npm install
```
### Required Environment Variables

Before starting the Cron Job, export the following variables:
```
export LOGSNAG_API_KEY=
export LOGSNAG_PROJECT_NAME=
```
### Obtaining LOGSNAG_API_KEY

- Access LogSnag:
https://app.logsnag.com/

- Go to Settings → API:
https://app.logsnag.com/dashboard/settings/api

- Generate a new API Token.

- Assign this token to the variable `LOGSNAG_API_KEY.`

### Setting LOGSNAG_PROJECT_NAME

- Create a project in LogSnag.

- Use the exact project name as the value for `LOGSNAG_PROJECT_NAME`.

### Updating Email
 - Go to `product-stock` folder
 - Open the file `config.yml`
 - Put your email do recieve the alerts too, replace in `email: 'email@gmail.com'`

### ▶️ Start the Cron Job
```
npm start
```

After this, you can see alerts in LogSnag and a complete information in your email about products without stock. You can change the job schedule in `config.yml` in `cron: '*/30 * * * *'`

## 🔍 7. Validate Installation

### MongoDB

Open **Mongo Compass** and verify the database:

```
thecollegestore
```

### Consul (Service Discovery)

Open in your browser:

```
http://localhost:8500
```

### Backend Core

Open in your browser:

```
http://localhost:5001/health

You should see
{"status":"healthy"}
```

### Product Service

Open in your browser:

```
http://localhost:5002/health

You should see
{"status":"healthy"}
```

### Api Gateway

Open in your browser:

```
http://localhost:7001/health

You should see
{"status":"healthy","timestamp":"2025-11-21T23:12:33.919Z","uptime":23339.807621666}
```

### FrontEnd

Open in your browser:

```
http://localhost:3000/

You should see The College WebStore
```
---

## 🏁 8. Final Notes

Your full system should now be online.

If something fails, review:

* Correct branches
* `.npmrc` credentials
* Environment variables
* Docker containers

This concludes the official setup guide for The College WebStore.
