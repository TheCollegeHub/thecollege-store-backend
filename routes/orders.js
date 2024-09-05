import express from "express";
import { createOrder, createOrderV2, getOrderById, getOrderByUserId, getOrdersV2ByUserId } from "../controllers/order-controller";
const router = express.Router();

router.post('/user/:userId/orders', createOrder);
router.get('/user/:userId/orders', getOrderByUserId);
router.get('/orders/:orderId', getOrderById);
router.get('/v2/orders', getOrdersV2ByUserId);
router.post('/v2/orders', createOrderV2);




export default router;

