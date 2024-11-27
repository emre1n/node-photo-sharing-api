import { Request, Response } from 'express';
import * as userService from '../services/userService';
import { CreateUserDto } from '../models/User';

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUser(parseInt(req.params.id));
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const userData: CreateUserDto = req.body;
    const newUser = await userService.createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
};
