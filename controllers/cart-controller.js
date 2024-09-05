import { Users } from "../models/user";


// Create an endpoint for saving the product in cart
export async function addToCart(req, res) {
// app.post('/addtocart', fetchuser, async (req, res) => {
    console.log("Add Cart");
    let userData = await Users.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Added")
}
  
  // Create an endpoint for removing the product in cart
  export async function removeFromCart(req, res) {
//   app.post('/removefromcart', fetchuser, async (req, res) => {
    console.log("Remove Cart");
    let userData = await Users.findOne({ _id: req.user.id });
    if (userData.cartData[req.body.itemId] != 0) {
      userData.cartData[req.body.itemId] -= 1;
    }
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Removed");
  }
  
  export async function deleteCart(req, res) {
//   app.delete('/api/:userId/cart', async (req, res) => {
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
  };
  
  
  // Create an endpoint for getting cartdata of user
export async function getCart(req, res) {
//   app.post('/getcart', fetchuser, async (req, res) => {
    console.log("Get Cart");
    let userData = await Users.findOne({ _id: req.user.id });
    res.json(userData.cartData);
  
};