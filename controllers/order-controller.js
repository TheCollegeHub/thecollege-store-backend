import { Order, OrderV2 } from "../models/order"
import { checkProductStock } from "../grpc/clients/grpc-product-client"
import { connectProducer, sendMessage } from "../queue/producers/kafka-producer"
import { processOrderMessage } from "../services/process-order-details"

connectProducer()

export const generateOrderNumber = () => {
    return `ORD-${Date.now()}`;
};

export async function createOrder(req, res) {
    try {
      const { userId } = req.params;
      const { cartItems, totalAmount, discount, finalAmount, address, paymentMethod } = req.body;
  
    const validCartItemIds = Object.entries(cartItems)
      .filter(([index, quantity]) => quantity > 0)
      .map(([index]) => parseInt(index, 10));

    const stockResponse = await checkProductStock(validCartItemIds);
    
    if (stockResponse.productsOutOfStock && stockResponse.productsOutOfStock.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'PRODUCTS_WITHOUT_STOCK',
        unavailableProducts: stockResponse.productsOutOfStock,
      });
    }

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

      Object.entries(cartItems)
        .filter(([id, quantity]) => quantity > 0) 
        .map(([id, quantity]) => ({
          orderNumber: order.orderNumber,
          productId: parseInt(id, 10), 
          quantity,
        })).forEach(async productMessage => {
          await sendMessage('update-stock', productMessage);
        });

      const orderMesssage = await processOrderMessage(order.orderNumber);
      await sendMessage('send-notification', orderMesssage);

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
  