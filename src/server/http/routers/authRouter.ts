import * as express from 'express';
const authRouter: express.Router = express.Router();

/** Signup Account */
authRouter.post('/register', (req, res) => {
  /** Test */
  req.body = {
    username: 'jameslo',
    password: 'james',
  };
  return res.json(req.body);
});
/** Login Account */
authRouter.post('/login', (req, res) => {
  /** Test */
  req.body = {
    username: 'jameslo',
    password: 'james',
  };
  return res.json(req.body);
});

export default authRouter;
