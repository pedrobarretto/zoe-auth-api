import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

import { Token } from '../interfaces/Auth';
import { Roles } from '../interfaces/Roles';
import { ONE_HOUR } from '../interfaces/Time';

class AuthApp {
  async hashPassword(password: string) {
    const hashedPassword = await bcrypt.hash(password, 12);
    return hashedPassword;
  }

  async isPasswordValid(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    const isValid = await bcrypt.compare(password, hashedPassword);

    if (isValid) return true;

    return false;
  }

  generateToken(id: string, role: Roles, email: string): Token {
    const token = jsonwebtoken.sign(
      {
        id,
        role,
        email,
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: ONE_HOUR,
      }
    );

    return { token };
  }
}

const authApp = new AuthApp();
export { authApp };
