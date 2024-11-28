import { User, CreateUserDto, UpdateUserDto } from '../models/User';
import pool from '../config/database';
import logger from '../config/logger';

// In-memory store for development (replace with database queries later)
const users: User[] = [];

export const getUsers = async (): Promise<User[]> => {
  try {
    const result = await pool.query(
      'SELECT * FROM users ORDER BY created_at DESC'
    );
    return result.rows;
  } catch (error) {
    logger.error('Error fetching users:', error);
    throw error;
  }
};

export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0] || null;
  } catch (error) {
    logger.error('Error fetching user by id:', error);
    throw error;
  }
};

export const createUser = async (userData: CreateUserDto): Promise<User> => {
  try {
    const { email, username, password_hash } = userData;
    const result = await pool.query(
      `INSERT INTO users (email, username, password_hash) 
       VALUES ($1, $2, $3) 
       RETURNING *`,
      [email, username, password_hash]
    );
    return result.rows[0];
  } catch (error) {
    logger.error('Error creating user:', error);
    throw error;
  }
};

export const updateUser = async (
  id: string,
  userData: UpdateUserDto
): Promise<User | null> => {
  try {
    const setClause = Object.keys(userData)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(', ');

    const values = [id, ...Object.values(userData)];
    const query = `
      UPDATE users 
      SET ${setClause}, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $1 
      RETURNING *
    `;

    const result = await pool.query(query, values);
    return result.rows[0] || null;
  } catch (error) {
    logger.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (id: string): Promise<boolean> => {
  try {
    const result = await pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING id',
      [id]
    );
    return result.rowCount! > 0;
  } catch (error) {
    logger.error('Error deleting user:', error);
    throw error;
  }
};
