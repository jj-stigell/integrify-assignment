// third party
import { QueryInterface, DataTypes, Transaction } from 'sequelize';

/**
 * Migration for initializing the database with tables user and todo.
 * Also creates index for user_id in the todo table and index for email
 * in the table user. Migration down drops tables and sdeletes created enum type from db.
 */
export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    const transaction: Transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('user', {
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
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE
      }, { transaction });
      await queryInterface.createTable('todo', {
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
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'user',
            key: 'id'
          },
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE'
        },
        status: {
          type: DataTypes.ENUM('NOTSTARTED', 'ONGOING', 'COMPLETED'),
          allowNull: false
        },
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE
      }, { transaction });
      await queryInterface.addIndex('todo', ['user_id'], {
        unique: false,
        transaction
      });
      await queryInterface.addIndex('user', ['email'], {
        unique: false,
        transaction
      });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log(error);
    }
  },
  down: async (queryInterface: QueryInterface): Promise<void> => {
    const transaction: Transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable('todo', { transaction });
      await queryInterface.dropTable('user', { transaction });
      await queryInterface.sequelize.query('DROP TYPE IF EXISTS enum_todo_status;', { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log(error);
    }
  }
};
