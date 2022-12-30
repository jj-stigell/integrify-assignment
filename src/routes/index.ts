/* eslint-disable @typescript-eslint/ban-ts-comment */
// third party
import { Router } from 'express';

// project imports
import { todoController, userController } from '../controllers';
import authenticate from '../middlewares/authenticate';

export const router: Router = Router();

// user related endpoints
router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);
// @ts-ignore
router.put('/changepassword', authenticate, userController.changePassword);

// todo related endpoints
// @ts-ignore
router.get('/todos', authenticate, todoController.getTodos);
// @ts-ignore
router.post('/todos', authenticate, todoController.createTodo);
// @ts-ignore
router.put('/todos/:id', authenticate, todoController.updateTodo);
// @ts-ignore
router.delete('/todos/:id', authenticate, todoController.deleteTodo);
