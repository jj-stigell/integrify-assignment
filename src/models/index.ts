// project imports
import Todo from './todo';
import User from './user';

/**
 * Sequelize associations for users and todos. 
 * One user can create multiple todo items and 
 * one todo item can only belong to a single user.
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
