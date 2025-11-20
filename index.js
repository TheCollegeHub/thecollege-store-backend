import express, { json, static as static_ } from "express";
import { connect } from "mongoose";
import cors from "cors";
import { serve, setup } from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import routes from './routes/routes';
import { registerWithConsul } from "./services/consul-service.js";

const port = process.env.CORE_SERVICE_PORT || 5001;
const mongo_url = process.env.MONGO_URL || "mongodb://localhost:27017" 
const app = express();


const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'The College Store API',
      version: '1.0.0',
      description: '',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ['./routes/*.js'], 
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);



app.use(json());
app.use(cors());
app.use('/api-docs', serve, setup(swaggerDocs));
app.use('/api', routes);
app.use('/api/images', static_('upload/images'));

connect(`${mongo_url}/thecollegestore?authSource=admin`)
    .then(() => console.log('All done! MongoDB Connected'))
    .catch(err => console.log(err)
);

app.get("/", (req, res) => {
  res.send("Server Running on port " + port);
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});



async function start() {
  app.listen(port, async (error) => {
    if (!error){
        console.log("Server Running on port " + port);
        await registerWithConsul();
    }
    else console.log("Error : ", error);
  });
}

start();

