import { Router } from 'express'
import passport from 'passport'
import { loginController, createUser, verifiedToken, getAllUsers, getTodosByUser, getTodoById, createTodo, updateTodo, deleteTodo } from './user.controller'

const router = Router()

router.post('/login', loginController)

router.get('/getAllUsers', passport.authenticate('jwt', {session: false}), getAllUsers)
router.get('/:userId/todos', passport.authenticate('jwt', {session: false}), getTodosByUser)
router.get('/:userId/todos/:id', passport.authenticate('jwt', {session: false}), getTodoById)
router.put('/:userId/todos/:id', passport.authenticate('jwt', {session: false}), updateTodo)
router.delete('/:userId/todos/:id', passport.authenticate('jwt', {session: false}), deleteTodo)
router.post('/:userId/todos/create', passport.authenticate('jwt', {session: false}), createTodo)
router.post('/create', passport.authenticate('jwt', {session: false}), createUser)
router.post('/verifyToken', passport.authenticate('jwt', {session: false}), verifiedToken)

export default router
