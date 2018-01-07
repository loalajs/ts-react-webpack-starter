import * as path from 'path';
import * as express from 'express';
import * as morgan from 'morgan';
import { env } from './config/env';

const {
  APP_HOST,
  APP_PORT,
} = env;

/** Define the CONSTANTS */
const CLIENT_ROOT_PATH = path.join(__dirname , '..', 'client', 'app');
const app = express();

/** Serve static contents  */
app.use(express.static(CLIENT_ROOT_PATH));

/** Logging */
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

/** Root Route */
app.get('/', (req, res) => {
  res.sendFile(path.resolve(CLIENT_ROOT_PATH, 'index.html'));
});

app.listen(APP_PORT, () => {
  console.log(`Server running at host: ${APP_HOST} on port: ${APP_PORT}; cwd: ${process.cwd()}`);
});
