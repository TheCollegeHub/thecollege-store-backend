import express from "express";
import { getImage } from "../controllers/image-controller";
const router = express.Router();

router.get('/v1/images', getImage);

export default router;

