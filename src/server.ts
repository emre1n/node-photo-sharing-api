import express, { Express } from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import { requestLogger } from './middleware/requestLogger';
import logger from './config/logger';
import { initializeDatabase } from './config/database';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;
const apiPrefix = process.env.API_PREFIX || '/api';

app.use(express.json());
app.use(requestLogger);

// Routes
app.use(apiPrefix, routes);

// Initialize database and start server
initializeDatabase()
  .then(() => {
    app.listen(port, () => {
      logger.info(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    logger.error('Failed to initialize database:', error);
    process.exit(1);
  });
