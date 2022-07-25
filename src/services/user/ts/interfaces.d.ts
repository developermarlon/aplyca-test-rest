import { Visibility, Weather } from './enums'

export interface UserEntry {
  id: number
  photo?: string
  name: string
  username: string
  email: string
  password: string
  address: object
  phone: string
  website: string
  company: object
  createdAt: Date
}

export interface UserLogged extends UserEntry {
  token: string
  loggedAt: Date
}

export interface UserCreated extends Omit<User, 'photo'> {
  createdAt: string | null;
}

export interface FormCreateUser extends Omit<User, 'photo' | 'id'> {
  password: string;
}

export interface TodoEntry {
  userId: number
  id: number
  title: string
  completed: boolean
}

export type FormCreateTodo = Pick<TodoEntry, 'title', 'userId'>