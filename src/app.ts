// third party
import express from 'express';

// project imports
import { router } from './routes/index';

export const app: express.Application = express();

app.use(express.json());
app.use('/api/v1', router);
