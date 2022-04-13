import UserModel from '../models/UserModel';
import { Request, Response } from 'express';

class HomeController {
  async show(req: Request, res: Response) {
    const getuser = req.body;
    const { username } = getuser;
    const user = await UserModel.findAll({
      where: {
        username: username,
      },
    });
    return res.json(user);
  }
}

export default new HomeController();
