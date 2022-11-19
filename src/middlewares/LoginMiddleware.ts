import { Request, Response, NextFunction } from 'express';

import { authApp } from '../apps/AuthApp';
import { UserModel } from '../models/UserModel';

export async function checkLoginData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;

  const user = await UserModel.find({ email });
  const [userPayload] = user;

  console.debug('[checkUserCredentials] >> Checking if user exists');
  console.debug(user);

  if (user.length === 0) {
    return res.status(404).json({ error: 'email-not-exists', status: 404 });
  }

  const isPassValid = await authApp.isPasswordValid(
    password,
    userPayload.password
  );

  if (!isPassValid) {
    return res.status(404).json({ error: 'password-is-wrong', status: 404 });
  }

  return next();
}
