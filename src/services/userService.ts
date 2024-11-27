import { User, CreateUserDto } from '../models/User';

// In-memory store (would be replaced with actual database)
let users: User[] = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
];

export const getUsers = async (): Promise<User[]> => {
  return users;
};

export const getUser = async (id: number): Promise<User | undefined> => {
  return users.find((user) => user.id === id);
};

export const createUser = async (userData: CreateUserDto): Promise<User> => {
  const newUser: User = {
    id: users.length + 1,
    ...userData,
  };
  users = [...users, newUser];
  return newUser;
};
