/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import ProfileModel from '../models/ProfileModel';

class UserController {
  async index(req: Request, res: Response) {
    const user = await ProfileModel.findAll();
    return res.json(user);
  }

  async store(req: Request, res: Response) {
    try {
      const profile = await ProfileModel.create(req.body);
      const { uprofileid, bio, name } = profile;
      return res.json({ uprofileid, bio, name });
    } catch (e: any) {
      res.status(400).json({
        error: e.errors.map((err: any) => err.message),
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const profileId = await ProfileModel.findByPk(req.params.id);

      if (!profileId)
        return res.status(400).json({
          error: ['This user does not exist'],
        });

      const newuser = await profileId.update(req.body);
      const { bio, name } = newuser;

      return res.json({ bio, name });
    } catch (e: any) {
      res.status(400).json({
        error: e.errors.map((err: any) => err.message),
      });
    }
  }
}

export default new UserController();
