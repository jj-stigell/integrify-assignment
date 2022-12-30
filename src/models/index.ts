// project imports
import Todo from './todo';
import User from './user';

/**
 * Sequelize associations for users and todos. 
 * One user can create multiple todo items and 
 * one todo item can only belong to a single user.
 * 
 * If user is deleted or updated this cascades to todos owned by the user.
 */
User.hasMany(Todo, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

Todo.belongsTo(User, {
  targetKey: 'id',
  foreignKey: 'userId'
});

export {
  Todo,
  User
};
