import { Request, Response } from 'express';
import * as userService from '../services/userService';
import { CreateUserDto } from '../models/User';
import logger from '../config/logger';

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userService.getUsers();
    logger.info('Users retrieved successfully');
    res.json(users);
  } catch (error) {
    logger.error('Error fetching users', { error });
    res.status(500).json({ message: 'Error fetching users' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await userService.getUserById(id);
    if (!user) {
      logger.error('User not found', { id });
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    logger.error('Error fetching user', { error });
    res.status(500).json({ message: 'Error fetching user' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const userData: CreateUserDto = req.body;
    const newUser = await userService.createUser(userData);
    logger.info('User created successfully', { user: newUser });
    res.status(201).json(newUser);
  } catch (error) {
    logger.error('Error creating user', { error });
    res.status(500).json({ message: 'Error creating user' });
  }
};
