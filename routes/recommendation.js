import express from 'express';
import { fetchRecommendations } from '../controllers/recommendation-controller';

const router = express.Router();

router.get('/recommendations/:userId', fetchRecommendations);

export default router;
