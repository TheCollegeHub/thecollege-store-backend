import express from "express";
import { addToCart, deleteCart, getCart, removeFromCart } from "../controllers/cart-controller";
const router = express.Router();

router.post('/addtocart', addToCart);
router.post('/removefromcart', removeFromCart);
router.delete('/:userId/cart', deleteCart);
router.post('/getcart', getCart);


export default router;

