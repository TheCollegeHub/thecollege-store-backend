import express from "express";
import { applyDiscount } from "../controllers/discount-controller";
const router = express.Router();

router.post('/applydiscount', applyDiscount);

export default router;

