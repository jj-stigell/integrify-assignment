// third party
import { Request } from 'express';

export interface RequestIncludeUser extends Request {
  user: number
}

export interface User {
  id: number,
  email: string,
  password: string,
  createdAt: Date,
  updatedAt: Date
}

export interface Todo {
  id: number,
  name: string,
  description: string | undefined,
  userId: number,
  status: string,
  createdAt: Date,
  updatedAt: Date
}

export interface Body {
  email: string | undefined,
  password: string | undefined
  newPassword: string | undefined
}
