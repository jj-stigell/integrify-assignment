// third party
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from 'sequelize';

// project imports
import { sequelize } from '../database';
import User from './user';

/**
 * TODO sequelize model
 * - Id: Unique identifier. Optional because auto incremented by database.
 * - Name: Name of the todo item
 * - Description (optional): Description of the todo item
 * - User id: Id of the user who owns this todo item
 * - Created timestamp: When the item is created. Optional, sequelize will generate automatically.
 * - Updated timestamp: When the item is last updated.  Optional, sequelize will generate/update automatically.
 * - Status: An enum of either: 'NOTSTARTED', 'ONGOING', 'COMPLETED'
 */
export default class Todo extends Model<InferAttributes<Todo>, InferCreationAttributes<Todo>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: CreationOptional<string>;
  declare userId: ForeignKey<User['id']>;
  declare status: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Todo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: new DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: new DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('NOTSTARTED', 'ONGOING', 'COMPLETED'),
      allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    sequelize,
    tableName: 'todo'
  }
);
