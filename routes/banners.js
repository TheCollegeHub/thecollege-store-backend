import express from "express";
import { getAllBanners } from "../controllers/banner-controller";
const router = express.Router();

router.get('/v1/banners', getAllBanners);

export default router;

