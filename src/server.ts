import express, { Express } from 'express';
import dotenv from 'dotenv';
import routes from './routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Routes
app.use('/api', routes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
