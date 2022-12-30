// project imports
import { Todo } from '../models';

/**
 * Create a new todo.
 * @param {string} name 
 * @param {string} description (optional) Description of the todo item.
 * @param {string} status An enum representing the status of the todo, either: 'NOTSTARTED', 'ONGOING', 'COMPLETED'.
 * @param {number} userId Users unique id number.
 * @returns {Todo} Newly created todo object from database.
 * @throws {Error} If error occurs during the query.
 */
const createTodo = async (name: string, description: string | undefined, status: string, userId: number): Promise<Todo> => {
  try {
    return await Todo.create({
      name: name,
      description: description ?? 'no description',
      status: status.toUpperCase(),
      userId: userId
    });
  } catch (error: unknown) {
    console.log(error);
    throw new Error('error creating a new todo');
  }
};

/**
 * Find all todos, if status is given, return only todos which have matching status
 * @param {string | undefined} status An enum representing the status of the todo, either: 'NOTSTARTED', 'ONGOING', 'COMPLETED'.
 * @returns {Promise<Array<Todo> | null} Array of todos found from the database.
 * @throws {Error} If error occurs during the query.
 */
const findAllTodos = async (status: string | undefined): Promise<Array<Todo> | null> => {
  try {
    if (!status) return await Todo.findAll();
    return await Todo.findAll({
      where: {
        status: status
      }
    });
  } catch (error: unknown) {
    console.log(error);
    throw new Error('error finding todos');
  }
};

/**
 * Find todo from the database based on its id (PK)
 * @param {number} todoId Todos unique id number.
 * @returns {Todo | null} Todo found from the database.
 * @throws {Error} If error occurs during the query.
 */
const findTodoById = async (todoId: number): Promise<Todo | null> => {
  try {
    return await Todo.findByPk(todoId);
  } catch (error: unknown) {
    console.log(error);
    throw new Error('error finding todo by user id');
  }
};

/**
* Update Todo in the database based on its id (PK)
* @param {number} todoId Todos unique id number.
* @param {string} name 
* @param {string} description (optional) Description of the todo item.
* @param {string} status An enum representing the status of the todo, either: 'NOTSTARTED', 'ONGOING', 'COMPLETED'.
* @returns {Todo} Updated todo.
* @throws {Error} If error occurs during the query.
*/
const updateTodo = async (todoId: number, name: string, description: string | undefined, status: string): Promise<Todo> => {
  try {
    const todo: Todo | null = await findTodoById(todoId);
    if (!todo) throw new Error();
    await todo?.update({
      name: name ? name : todo.name,
      description: description ? description : todo.description,
      status: status ? status.toUpperCase() : todo.status
    });
    await todo?.save();
    return todo;
  } catch (error: unknown) {
    console.log(error);
    throw new Error('error updating todo');
  }
};

/**
* Delete Todo in the database based on its id (PK)
* @param {number} todoId Todos unique id number.
* @throws {Error} If error occurs during the query.
*/
const deleteTodo = async (todoId: number): Promise<void> => {
  try {
    await Todo.destroy({
      where: {
        id: todoId
      },
      force: true
    });
  } catch (error: unknown) {
    console.log(error);
    throw new Error('error updating todo');
  }
};

export {
  createTodo,
  findAllTodos,
  findTodoById,
  updateTodo,
  deleteTodo
};
