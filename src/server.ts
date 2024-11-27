import express, { Express } from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import { requestLogger } from './middleware/requestLogger';
import logger from './config/logger';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;
const apiPrefix = process.env.API_PREFIX || '/api';

app.use(express.json());
app.use(requestLogger);

// Routes
app.use(apiPrefix, routes);

app.listen(port, () => {
  logger.info(`⚡️[server]: Server is running at http://localhost:${port}`);
});
