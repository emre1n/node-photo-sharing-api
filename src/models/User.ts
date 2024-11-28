export interface User {
  id: string;
  email: string;
  username: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
}

export type CreateUserDto = Omit<User, 'id' | 'created_at' | 'updated_at'>;
export type UpdateUserDto = Partial<CreateUserDto>;
