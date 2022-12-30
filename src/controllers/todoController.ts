// third party
import { Response } from 'express';

// project imports
import { Todo, RequestIncludeUser } from '../interfaces';
import { todoService } from '../services';
import config from '../configs/config';

/**
 * Get all todos from database, filter by staus if provided in the query params.
 * @param {RequestIncludeUser} req The request object, which includes the user id in the request context.
 * @param {Response} res The response object.
 * @returns A promise that resolves to the response object.
 */
export const getTodos = async (req: RequestIncludeUser, res: Response): Promise<Response> => {
  let status: any = req.query.status;

  if (status && typeof status === 'string') {
    status = status.toUpperCase();
    if (!config.statusEnum.includes(status)) return res.status(400).send({
      error: `incorrect status value, must be one of ${config.statusEnum}`
    });
  }

  try {
    const todos: Array<Todo> | null = await todoService.findAllTodos(status);

    if (!todos || todos.length === 0) return res.status(404).send({
      error: 'no todos found'
    });

    return res.status(200).send(todos);
  } catch(error: any) {
    return res.status(500).send({
      error: error.message
    });
  }
};

/**
 * Create a new todo.
 * @param {RequestIncludeUser} req The request object, which includes the user id in the request context.
 * @param {Response} res The response object.
 * @returns A promise that resolves to the response object.
 */
export const createTodo = async (req: RequestIncludeUser, res: Response): Promise<Response> => {
  const { name, description, status }: Todo = req.body;
  const userId: number = req.user;

  if (!name || !status) return res.status(400).send({
    error: 'name or status missing'
  });

  if (!config.statusEnum.includes(status.toUpperCase())) return res.status(400).send({
    error: `incorrect status value, must be one of ${config.statusEnum}`
  });

  try {
    const newTodo: Todo = await todoService.createTodo(name, description, status, userId);
    return res.status(200).send(newTodo);
  } catch(error: any) {
    return res.status(500).send({
      error: error.message
    });
  }
};

/**
 * Update existing todo
 * @param {RequestIncludeUser} req The request object, which includes the user id in the request context.
 * @param {Response} res The response object.
 * @returns A promise that resolves to the response object.
 */
export const updateTodo = async (req: RequestIncludeUser, res: Response): Promise<Response> => {
  const { name, description, status }: Todo = req.body;
  const id: number = Number(req.params.id);
  const userId: number = req.user;

  if (!id) return res.status(400).send({
    error: 'todo id missing'
  });

  if (status && !config.statusEnum.includes(status.toUpperCase())) return res.status(400).send({
    error: `incorrect status value, must be one of ${config.statusEnum}`
  });

  try {
    const todo: Todo | null = await todoService.findTodoById(id);

    if (!todo) return res.status(404).send({
      error: `todo with an id ${id} not found`
    });

    if (todo.userId !== userId) return res.status(401).send({
      error: `you are not the owner of todo id ${id}`
    });

    const updatedTodo: Todo = await todoService.updateTodo(id, name, description, status);
    return res.status(200).send(updatedTodo);
  } catch(error: any) {
    return res.status(500).send({
      error: error.message
    });
  }
};

/**
 * Delete existing todo
 * @param {RequestIncludeUser} req The request object, which includes the user id in the request context.
 * @param {Response} res The response object.
 * @returns A promise that resolves to the response object.
 */
export const deleteTodo = async (req: RequestIncludeUser, res: Response): Promise<Response> => {
  const id: number = Number(req.params.id);
  const userId: number = req.user;

  if (!id) return res.status(400).send({
    error: 'todo id missing'
  });

  try {
    const todo: Todo | null = await todoService.findTodoById(id);

    if (!todo) return res.status(404).send({
      error: `todo with an id ${id} not found`
    });

    if (todo.userId !== userId) return res.status(401).send({
      error: `you are not the owner of todo id ${id}`
    });

    await todoService.deleteTodo(id);
    return res.status(200).send();
  } catch(error: any) {
    return res.status(500).send({
      error: error.message
    });
  }
};
