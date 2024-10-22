import * as grpc from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import { createClient } from 'redis';

const recommendationServiceUri = process.env.GRPCRecommendationServiceURL || 'localhost:50051';
const redisURL = process.env.REDIS_URL || 'localhost:6379';

const PROTO_PATH = __dirname + '/../protos/recommendation.proto';
const packageDefinition = loadSync(PROTO_PATH, {});
const recommendationProto = grpc.loadPackageDefinition(packageDefinition).recommendation;

const redisClient = createClient({
    url: `redis://${redisURL}`
});

redisClient.connect()
    .then(() => console.log('Redis client connected'))
    .catch(err => console.error('Redis connection error:', err));

const client = new recommendationProto.RecommendationService(recommendationServiceUri, grpc.credentials.createInsecure());

export async function getRecommendations(userId) {
    try {
        const cachedResponse = await redisClient.get(userId);

        if (cachedResponse) {
            console.log('Cache found');
            return JSON.parse(cachedResponse);
        }

        console.log('Without cache. Calling gRPC service');

        return new Promise((resolve, reject) => {
            client.GetRecommendations({ userId }, async (error, response) => {
                if (error) {
                    console.error('Error calling gRPC service:', error);
                    return reject(error);
                }

                if (response && response.recommendedProductIds) {
                    const cacheData = {
                        recommendedProductIds: response.recommendedProductIds
                    };
                    await redisClient.set(userId, JSON.stringify(cacheData), {
                        EX: 60 // Cache for 60 seconds
                    });
                    resolve(cacheData);
                } else {
                    console.error('Unexpected gRPC response format:', response);
                    reject(new Error('Unexpected response format from gRPC service'));
                }
            });
        });
    } catch (err) {
        console.error('Error in getRecommendations:', err);
        throw new Error('Failed to get recommendations');
    }
}
