import UserModel from '../models/UserModel';
import { Request, Response } from 'express';

class HomeController {
  async show(req: Request, res: Response) {
    try {
      const getuser = req.body;
      const { username } = getuser;
      const user = await UserModel.findAll({
        where: {
          username: username,
        },
      });
      return res.json(user);
    } catch (e: any) {
      res.status(400).json({
        error: e.errors.map((err: any) => err.message),
      });
    }
  }
}

export default new HomeController();
