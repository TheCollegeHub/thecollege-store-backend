import {Order, OrderV2 } from "../models/order.js";
import { validateStatusTransition, getAllowedTransitions, STATUS_DESCRIPTIONS } from "../services/order-status-validator.js";

export const generateOrderNumber = () => {
    return `ORD-${Date.now()}`;
};

export async function createOrder(req, res) {
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
    const orderData = req.body;
  
    try {
      const newOrder = new OrderV2(orderData);
      await newOrder.save();
      res.status(201).json(newOrder);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };


export async function updateOrderStatus(req, res) {
  try {
    const { orderNumber } = req.params;
    const { newStatus, reason } = req.body;

    // Validate input
    if (!newStatus) {
      return res.status(400).json({ 
        error: 'New status is required' 
      });
    }

    // Find the order by orderNumber
    const order = await Order.findOne({ orderNumber });
    if (!order) {
      return res.status(400).json({ 
        error: 'Order not found' 
      });
    }

    const currentStatus = order.status;

    // Validate status transition
    const validation = validateStatusTransition(currentStatus, newStatus);
    if (!validation.valid) {
      return res.status(400).json({ 
        error: validation.message,
        currentStatus,
        attemptedStatus: newStatus,
        allowedTransitions: getAllowedTransitions(currentStatus)
      });
    }

    // Update order status
    order.status = newStatus;
    order.updatedDate = new Date();
    await order.save();

    res.status(200).json({ 
      orderId: order._id,
      orderNumber: order.orderNumber,
      previousStatus: currentStatus,
      newStatus,
      statusDescription: STATUS_DESCRIPTIONS[newStatus]
    });

  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(400).json({ 
      error: 'Internal Server Error',
      message: error.message 
    });
  }
}