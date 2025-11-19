import { Router } from 'express';
const router = Router();

// Importa as rotas individuais
import userRoutes from './users';
import cartRoutes from './cart';
import orderRoutes from "./orders"
import addressRoutes from "./address"
import cardsRoutes from "./cards"
import discountRoutes from "./discount"
import categoryRoutes from "./categories"
import bannerRoutes from "./banners"
import imageRoutes from "./images"
import recommendationRoutes from "./recommendation"

router.use(userRoutes);
router.use(cartRoutes);
router.use(orderRoutes);
router.use(addressRoutes);
router.use(cardsRoutes);
router.use(discountRoutes);
router.use(categoryRoutes);
router.use(bannerRoutes);
router.use(imageRoutes);
router.use(recommendationRoutes);

export default router;