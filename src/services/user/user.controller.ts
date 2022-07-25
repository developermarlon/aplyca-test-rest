import { Request, Response, NextFunction } from 'express'
import { NonSensitiveInfoUserLogged } from "./ts/types";
import { FormCreateTodo } from "./ts/interfaces";
import User from '../../models/user.model'
import Todo from '../../models/todo.model'
import passport from 'passport'

const user = new User();
const todo = new Todo();

export const createTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params, body } = req;
    const todos = todo.createTodo({userId: Number(params.userId), title: body.title} as FormCreateTodo);
    
    return res.status(200).json(todos);
  }catch(e: any) {
    console.log(e)
    return res.status(400).json({ message: e.message })
  }
}

export const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params, body } = req;
    const todos = todo.updateTodo(Number(params.userId), body.id, body.title);
    
    return res.status(200).json(todos);
  }catch(e: any) {
    console.log(e)
    return res.status(400).json({ message: e.message })
  }
}

export const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params } = req;
    const todos = todo.deleteTodo(Number(params.userId), Number(params.id));
    
    return res.status(200).json(todos);
  }catch(e: any) {
    console.log(e)
    return res.status(400).json({ message: e.message })
  }
}

export const getTodosByUser = (req: Request, res: Response, next: NextFunction): Response => {
  try {
    const { params } = req;
    const todos = todo.getTodosByUser(Number(params.userId));
    
    return res.status(200).json(todos);
  }catch(e: any) {
    console.log(e)
    return res.status(400).json({ message: e.message })
  }
}

export const getTodoById = (req: Request, res: Response, next: NextFunction): Response => {
  try {
    const { params } = req;
    const todoFounded = todo.getTodoById(Number(params.id));
    return res.status(200).json(todoFounded);
  }catch(e: any) {
    console.log(e)
    return res.status(400).json({ message: e.message })
  }
}

export const createUser = (req: Request, res: Response, next: NextFunction): Response => {
  try {
    const { body } = req;
    const userCreated = user.createUser(body);
    return res.status(200).json({data: userCreated, message: `User ${body.name} created successfully`});
  }catch(e: any) {
    console.log(e)
    return res.status(400).json({ message: e.message })
  }
}

export const getAllUsers = (req: Request, res: Response, next: NextFunction): Response => {
  try {
    const results: NonSensitiveInfoUserLogged[] = user.getAllUsers().map(item => {
      return {id: item.id, name: item.name, username: item.username, email: item.email, phone: item.phone, website: item.website, address: item.address, company: item.company, createdAt: item.createdAt}
    })
    return res.status(200).json({data: results})
  }catch(e: any) {
    console.log(e)
    return res.status(400).json({ message: e.message })
  }
}

export const loginController = (req: Request, res: Response, next: NextFunction): Response => {
  try {
    return passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err || !user) {
          return res.status(400).json({
              message: err.message
          });
      }
      return req.login(user, { session: false }, async (err) => {
          if (err) {
              return res.status(400).send(err);
          }
          return res.status(200).json({data: user});
      })
  })(req, res, next)
  } catch (e: any) {
    return res.status(400).json({ message: e.message })
  }
}

export const verifiedToken = async (req: Request, res: Response) => {
  return res.status(200).json({ message: 'Verified token' })
}
