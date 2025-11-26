import express from "express";
import { 
  createOrder, 
  createOrderV2, 
  getOrderById, 
  getOrderByUserId, 
  getOrdersV2ByUserId,
  updateOrderStatus
} from "../controllers/order-controller.js";
const router = express.Router();

router.post('/user/:userId/orders', createOrder);
router.get('/user/:userId/orders', getOrderByUserId);
router.get('/orders/:orderId', getOrderById);

router.get('/v2/orders', getOrdersV2ByUserId);
router.post('/v2/orders', createOrderV2);
router.patch('/webhooks/orders/:orderNumber/status', updateOrderStatus);


export default router;

