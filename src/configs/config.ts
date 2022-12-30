import * as dotenv from 'dotenv';
dotenv.config();

const username: string = String(process.env.POSTGRES_USER);
const password: string = String(process.env.POSTGRES_PASSWORD);
const database: string = String(process.env.POSTGRES_DATABASE);
const host: string = String(process.env.POSTGRES_HOST_URL);
const JWTSECRET: string =  String(process.env.JWTSECRET);
const parsedPort: number = Number(process.env.PORT);
const port: number = isNaN(parsedPort) ? 3000 : parsedPort;

export = {
  port: port,
  username: username,
  password: password,
  database: database,
  host: host,
  dialect: 'postgres',
  migrationStorageTableName: 'migrations',
  saltRounds: 10,
  jwtSecret: JWTSECRET,
  jwtExpiryTime: 2419200,
  statusEnum: ['NOTSTARTED', 'ONGOING', 'COMPLETED']
};
