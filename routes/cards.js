import express from "express";
import { createUserCard, getAllCardsByUserId } from "../controllers/card-controller";
const router = express.Router();

router.post('/user/:userId/cards', createUserCard);
router.get('/user/:userId/cards', getAllCardsByUserId);

export default router;

