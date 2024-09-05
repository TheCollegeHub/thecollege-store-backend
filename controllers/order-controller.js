import {Order, OrderV2} from "../models/order"

export const generateOrderNumber = () => {
    return `ORD-${Date.now()}`;
};

export async function createOrder(req, res) {
// app.post('/api/user/:userId/orders', async (req, res) => {
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
  };
  
  export async function getOrderByUserId(req, res) {
//   app.get('/api/user/:userId/orders', fetchuser, async (req, res) => {
    const { userId } = req.params;
  
    try {
      const orders = await Order.find({ userId });
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ success: false, errors: 'Internal server error' });
    }
  };
  
  
  export async function getOrderById(req, res) {
//   app.get('/api/orders/:orderId', async (req, res) => {
    const { orderId } = req.params;
  
    try {
      const order = await Order.findOne({ _id: orderId});
      res.status(200).json(order);
    } catch (error) {
      console.error('Error fetching order:', error);
      res.status(500).json({ success: false, errors: 'Internal server error' });
    }
  };


  export async function getOrdersV2ByUserId(req, res) {
//   app.get('/api/v2/orders', async (req, res) => {
    const userId = req.query.userId;
    if (!userId) return res.status(400).json({ message: 'User ID is required' });
  
    try {
      const orders = await OrderV2.find({ userId });
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  export async function createOrderV2(req, res) {
//   app.post('/api/v2/orders', async (req, res) => {
    const orderData = req.body;
  
    try {
      const newOrder = new OrderV2(orderData);
      await newOrder.save();
      res.status(201).json(newOrder);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  