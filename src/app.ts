import cors from 'cors';
import express, { Response, Request } from 'express';
import session from 'express-session';

import { userApp } from './apps/UserApp';
import { ONE_HOUR } from './interfaces/Time';
import { checkUserCredentials } from './middlewares/UserMiddleware';
import { connect } from './mongo';

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.AXIOS_BASE_URL,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: ONE_HOUR },
  })
);

app.post(
  '/register',
  checkUserCredentials,
  async (req: Request, res: Response) => {
    const { name, lastName, email, password } = req.body;
    const user = await userApp.register({ name, lastName, email, password });
    req.session.userId = user.id;
    req.session.save();
    return res.status(201).json(user);
  }
);

app.post('/auth/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { isPasswordValid, userId, token } = await userApp.login({
    email,
    password,
  });
  if (isPasswordValid) {
    req.session.userId = userId;
    req.session.save();
  }
  return res.status(200).json({ userId, token });
});

app.post('/auth/logout', async (req: Request, res: Response) => {
  req.session.userId = null;
  req.session.destroy((err) => {
    console.debug(err);
  });
  return res.sendStatus(200);
});

app.get('/secret', (req: Request, res: Response) => {
  if (req.session.userId) {
    return res.send(`Logado com sucesso! Seu id: ${req.session.userId}`);
  }

  return res.sendStatus(403);
});

connect();

app.listen(process.env.PORT, () => {
  console.log('**********************************************');
  console.log(`************Auth API - Porta: ${process.env.PORT}************`);
  console.log('**********************************************');
});
