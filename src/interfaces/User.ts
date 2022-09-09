import { Roles } from './Roles';

export interface User {
  name: string;
  lastName: string;
  email: string;
}

export interface InternUser extends User {
  password: string;
}

export interface IUserModel extends InternUser {
  role: Roles;
  id: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface PassWithId {
  isPasswordValid: boolean;
  userId: string;
  token: string;
}
