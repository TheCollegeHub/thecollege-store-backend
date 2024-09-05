import express from "express";
import { getAllCategoriesByParentId } from "../controllers/category-controller";
const router = express.Router();

router.get('/v1/categories', getAllCategoriesByParentId);

export default router;

