/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import UserModel from '../models/UserModel';

class UserController {
  async index(req: Request, res: Response) {
    const user = await UserModel.findAll();
    return res.json(user);
  }

  async store(req: Request, res: Response) {
    try {
      const newuser = await UserModel.create(req.body);
      const { username, email, password } = newuser;
      return res.json({ username, email, password });
    } catch (e: any) {
      res.status(400).json({
        error: e.errors.map((err: any) => err.message),
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const userId = await UserModel.findByPk(req.params.id);

      if (!userId)
        return res.status(400).json({
          error: ['This user does not exist'],
        });

      const newuser = await userId.update(req.body);
      const { username, email, password } = newuser;

      return res.json({ username, email, password });
    } catch (e: any) {
      res.status(400).json({
        error: e.errors.map((err: any) => err.message),
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const userId = await UserModel.findByPk(req.params.id);

      if (!userId)
        return res.status(400).json({
          error: ['This user does not exist'],
        });

      userId.destroy();
      return res.json('This user did deleted with success');
    } catch (e: any) {
      res.status(400).json({
        error: e.errors.map((err: any) => err.message),
      });
    }
  }
}

export default new UserController();
