const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const port = process.env.PORT || 4000;
const mongo_url = process.env.MONGO_URL || "mongodb://localhost:27017/" 
app.use(express.json());
app.use(cors());

// Database Connection With MongoDB
mongoose.connect(`${mongo_url}/thecollegestore?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true

    })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err)
);

//Image Storage Engine 
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})
const upload = multer({ storage: storage })
app.post("/upload", upload.single('product'), (req, res) => {
  res.json({
    success: 1,
    image_url: `/images/${req.file.filename}`
  })
})


// Route for Images folder
app.use('/images', express.static('upload/images'));


// MiddleWare to fetch user from token
const fetchuser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
};


// Schema for creating user model
const Users = mongoose.model("Users", {
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  cartData: { type: Object },
  date: { type: Date, default: Date.now() },
});


// Schema for creating Product
const Product = mongoose.model("Product", {
  id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  new_price: { type: Number },
  old_price: { type: Number },
  date: { type: Date, default: Date.now },
  avilable: { type: Boolean, default: true },
});

// Schema for Discount
const discountSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  percentage: { type: Number, required: true }
});

const Discount = mongoose.model('Discount', discountSchema);



// ROOT API Route For Testing
app.get("/", (req, res) => {
  res.send("Root");
});


// Create an endpoint at ip/login for login the user and giving auth-token
app.post('/login', async (req, res) => {
  console.log("Login");
  let success = false;
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id
        }
      }
      success = true;
      id = user.id;
      console.log(user.id);
      const token = jwt.sign(data, 'secret_ecom');
      res.json({ success, token , id});
    }
    else {
      return res.status(400).json({ success: success, errors: "please try with correct email/password" })
    }
  }
  else {
    return res.status(400).json({ success: success, errors: "please try with correct email/password" })
  }
})


//Create an endpoint at ip/auth for regestring the user & sending auth-token
app.post('/signup', async (req, res) => {
  console.log("Sign Up");
  let success = false;
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({ success: success, errors: "existing user found with this email" });
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });
  await user.save();
  const data = {
    user: {
      id: user.id
    }
  }
  
  const id = user.id
  const token = jwt.sign(data, 'secret_ecom');
  success = true;
  res.json({ success, token, id })
})


app.get('/api/user/:userId/', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await Users.findOne({ _id: userId});

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ data: user });

  } catch (error) {
    console.error('Error when get user information:', error);
    return res.status(500).json({ error: 'Internal Error to proccess the request' });
  }
});


// endpoint for getting all products data
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("All Products");
  res.send(products);
});


// endpoint for getting latest products data
app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});
  let arr = products.slice(0).slice(-8);
  console.log("New Collections");
  res.send(arr);
});


// endpoint for getting women products data
app.get("/popularinwomen", async (req, res) => {
  let products = await Product.find({ category: "women" });
  let arr = products.splice(0, 4);
  console.log("Popular In Women");
  res.send(arr);
});

// endpoint for getting women products data
app.post("/relatedproducts", async (req, res) => {
  console.log("Related Products");
  const {category} = req.body;
  const products = await Product.find({ category });
  const arr = products.slice(0, 4);
  res.send(arr);
});


// Create an endpoint for saving the product in cart
app.post('/addtocart', fetchuser, async (req, res) => {
  console.log("Add Cart");
  let userData = await Users.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
  res.send("Added")
})

// Create an endpoint for removing the product in cart
app.post('/removefromcart', fetchuser, async (req, res) => {
  console.log("Remove Cart");
  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] != 0) {
    userData.cartData[req.body.itemId] -= 1;
  }
  await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
  res.send("Removed");
})

app.delete('/api/:userId/cart', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await Users.findOne({ _id: userId});

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    for (const key in user.cartData) {
      if (user.cartData[key] > 0) {
        user.cartData[key] = 0;
      }
    }

    await Users.findOneAndUpdate({ _id: userId }, { cartData: user.cartData });

    return res.status(204).end();;

  } catch (error) {
    console.error('Error when clean user cart:', error);
    return res.status(500).json({ error: 'Internal Error to proccess the request' });
  }
});


// Create an endpoint for getting cartdata of user
app.post('/getcart', fetchuser, async (req, res) => {
  console.log("Get Cart");
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);

})


// Create an endpoint for adding products using admin panel
app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  }
  else { id = 1; }
  const product = new Product({
    id: id,
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  await product.save();
  console.log("Saved");
  res.json({ success: true, name: req.body.name })
});


// Create an endpoint for removing products using admin panel
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({ success: true, name: req.body.name })
});

app.post('/applydiscount', async (req, res) => {
  const { code } = req.body;
  try {
    const discount = await Discount.findOne({ code });
    if (discount) {
      res.status(200).json({ discountPercentage: discount.percentage });
    } else {
      res.status(404).json({ message: 'Invalid discount code' });
    }
  } catch (error) {
    console.error('Error applying discount:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Schema para endereços dos usuários
const Address = mongoose.model("Address", {
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
});

// Endpoint para adicionar um novo endereço para o usuário
app.post('/api/user/:userId/addresses', async (req, res) => {
  const { userId } = req.params;
  const { street, city, state, zip } = req.body;

  try {
    const address = new Address({
      userId: userId,
      street: street,
      city: city,
      state: state,
      zip: zip,
    });

    await address.save();

    res.status(201).json({ success: true, address });
  } catch (error) {
    console.error('Error creating address:', error);
    res.status(500).json({ success: false, error: 'Failed to create address' });
  }
});

// Endpoint para obter endereços de um usuário pelo user_id
app.get('/api/user/:userId/addresses', async (req, res) => {
  const { userId } = req.params;

  try {
    const addresses = await Address.find({ userId: userId });

    if (!addresses) {
      return res.status(404).json({ success: false, error: 'Addresses not found for this user' });
    }

    res.status(200).json({ success: true, addresses });
  } catch (error) {
    console.error('Error fetching addresses:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch addresses' });
  }
});

// Schema for creating Card
const CardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  cardNumber: { type: String, required: true },
  expiryDate: { type: String, required: true },
  cvv: { type: String, required: true },
  date: { type: Date, default: Date.now() },
});

const Card = mongoose.model('Card', CardSchema);

// Endpoint to create a new card for a user
app.post('/api/user/:userId/cards', fetchuser, async (req, res) => {
  const { userId } = req.params;

  const { cardNumber, expiryDate, cvv } = req.body;

  const newCard = new Card({
    userId,
    cardNumber,
    expiryDate,
    cvv,
  });

  try {
    const savedCard = await newCard.save();
    res.json({ success: true, card: savedCard });
  } catch (error) {
    console.error('Error saving card:', error);
    res.status(500).json({ success: false, errors: 'Internal server error' });
  }
});

// Endpoint to get all cards of a user
app.get('/api/user/:userId/cards', fetchuser, async (req, res) => {
  const { userId } = req.params;

  try {
    const cards = await Card.find({ userId });
    res.json(cards);
  } catch (error) {
    console.error('Error fetching cards:', error);
    res.status(500).json({ success: false, errors: 'Internal server error' });
  }
});

// Schema for creating Order
const Order = mongoose.model("Order", {
  orderNumber: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  cartItems: { type: Array, required: true },
  totalAmount: { type: Number, required: true },
  discount: { type: Number, required: true },
  finalAmount: { type: Number, required: true },
  address: { type: Object, required: true },
  paymentMethod: { type: Object, required: true },
  date: { type: Date, default: Date.now },
});

const generateOrderNumber = () => {
  return `ORD-${Date.now()}`;
};

app.post('/api/user/:userId/orders', async (req, res) => {
  try {
    const { userId } = req.params;
    const { cartItems, totalAmount, discount, finalAmount, address, paymentMethod } = req.body;

    const orderNumber = generateOrderNumber();

    const order = new Order({
      orderNumber,
      userId,
      cartItems,
      totalAmount,
      discount,
      finalAmount,
      address,
      paymentMethod,
    });

    await order.save();
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.get('/api/user/:userId/orders', fetchuser, async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ userId });
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ success: false, errors: 'Internal server error' });
  }
});


app.get('/api/orders/:orderId', async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findOne({ _id: orderId});
    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ success: false, errors: 'Internal server error' });
  }
});




// Starting Express Server
app.listen(port, (error) => {
  if (!error) console.log("Server Running on port " + port);
  else console.log("Error : ", error);
});
