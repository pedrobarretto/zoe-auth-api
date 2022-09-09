import { Request, Response, NextFunction } from 'express';

import { UserModel } from '../models/UserModel';

export async function checkUserCredentials(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email } = req.body;

  const user = await UserModel.find({ email });
  console.debug('[checkUserCredentials] >> Checking if user exists');
  console.debug(user);

  if (user.length !== 0) {
    return res.status(404).json({ error: 'email-already-exists', status: 404 });
  }

  return next();
}
