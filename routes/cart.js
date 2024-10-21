import express from "express";
import { addToCart, deleteCart, getCart, removeFromCart } from "../controllers/cart-controller";
import { fetchuser } from "../controllers/auth-controller"; 
const router = express.Router();

router.post('/addtocart', fetchuser, addToCart);
router.post('/removefromcart', fetchuser, removeFromCart);
router.delete('/:userId/cart', deleteCart);
router.post('/getcart', fetchuser, getCart);


export default router;

