// third party
import { Sequelize } from 'sequelize';

// project imports
import config from '../configs/config';

export const sequelize: Sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'postgres',
  define: {
    timestamps: true,
    underscored: true,
    freezeTableName: true
  },
  logging: () => console.log
});

export const connectToDatabase = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('database connected');
  } catch (error) {
    throw new Error(`database connecting failed, ${error}`);
  }
};
