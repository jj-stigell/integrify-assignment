// third party
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

// project imports
import { sequelize } from '../database';

/**
 * USER sequelize model
 * - Id: Unique identifier. Optional because auto incremented by database.
 * - Email: Email address
 * - Password: Hash of the password
 * - Created timestamp: When the user is created. Optional, sequelize will generate automatically.
 * - Updated timestamp: When the user is last updated. Optional, sequelize will generate/update automatically.
 */
export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare email: string;
  declare password: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: new DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: new DataTypes.CHAR(60),
      allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    sequelize,
    tableName: 'user'
  }
);
