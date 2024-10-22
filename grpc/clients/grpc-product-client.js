import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

const PROTO_PATH = __dirname + '/../protos/stock.proto';
const productServiceUri = process.env.productServiceURL || 'localhost:50052';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});

const stockProto = grpc.loadPackageDefinition(packageDefinition).stock;
const client = new stockProto.StockService(productServiceUri, grpc.credentials.createInsecure());

export async function checkProductStock(productIds) {
  return new Promise((resolve, reject) => {
    client.CheckStock({ productIds }, (err, response) => {
      if (err) {
        console.error('Erro no gRPC:', err);
        return reject(err);
      }
      resolve(response);
    });
  });
}