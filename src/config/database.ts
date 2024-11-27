import { Pool } from 'pg';
import logger from './logger';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
});

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const initializeDatabase = async (retries = 5) => {
  for (let i = 0; i < retries; i++) {
    try {
      const client = await pool.connect();
      logger.info('Successfully connected to the database');
      client.release();
      return pool;
    } catch (error) {
      logger.error(
        `Failed to connect to database (attempt ${i + 1}/${retries}):`,
        error
      );
      if (i === retries - 1) throw error;
      await delay(5000); // Wait 5 seconds before retrying
    }
  }
};

export default pool;
