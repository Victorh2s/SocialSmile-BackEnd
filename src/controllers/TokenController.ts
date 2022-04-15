import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import UserModel from '../models/UserModel';
import * as dotenv from 'dotenv';
dotenv.config();

class TokenController {
  async store(req: Request, res: Response) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        errors: ['Invalid credentials'],
      });
    }

    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        errors: ['User does not exist'],
      });
    }

    if (!(await user.passwordIsValid(password))) {
      return res.status(401).json({
        errors: ['invalid password'],
      });
    }

    const { id } = user;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET as string, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({ token, user: { name: user.username, id, email } });
  }
}

export default new TokenController();
