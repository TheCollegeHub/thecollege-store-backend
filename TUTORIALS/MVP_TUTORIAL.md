## MVP PHASE (Minimum Viable Product)

In the backend world, you will eventually interact with different technologies.  
For now, in this initial phase, all you need to know is that the database used in this project is a non-relational one called **MongoDB**.

Ready to set up your environment?

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

**Note:** If you see an error, WELCOME, you're facing your first bug. Feel free to use your quality control investigation skills to find out where the problem is =). But don't worry, for now, you can ignore this error and move on to the next step.

## 🛒 First Steps in The College Store

You’re all set to explore The College Store (and maybe find some bugs 😄).

To begin, create your account:

- Click Login
- Go to `Create an account? Click here`
- Fill in all required information
- Click Continue
- Welcome Page should be displayed for you! 

If everything worked, your account will be created and you’ll be automatically logged in

**Enjoy exploring this simples ecosystem!**
