import { getRecommendations } from '../grpc/clients/grpc-recommendation-client';

export const fetchRecommendations = async (req, res) => {
  const userId = req.params.userId;
  try {
    const recommendations = await getRecommendations(userId);
    res.json(recommendations);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).send('Error fetching recommendations');
  }
};
