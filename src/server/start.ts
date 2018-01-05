import * as path from 'path';
import * as express from 'express';

/** Define ENV */
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

/** Define the CONSTANTS */
const CLIENT_PATH = path.join(__dirname , '..', 'client');
const app = express();

/** Serve static contents  */
app.use(express.static(CLIENT_PATH));

/** Root Route */
app.get('/', (req, res) => {
  res.sendFile(path.resolve(CLIENT_PATH, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at host: ${HOST} on port: ${PORT}`);
});
