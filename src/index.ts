// project imports
import { connectToDatabase } from './database/index';
import config from './configs/config';
import { app } from './app';

app.listen(config.port, async () => {
  try {
    await connectToDatabase();
  } catch (error) {
    console.log(error);
  }
  console.log(`server running on port ${config.port}`);
});
