/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import ProfileModel from '../models/ProfileModel';

class ProfileController {
  async index(req: Request, res: Response) {
    try {
      const Profile = await ProfileModel.findByPk(req.params.id);
      if (!Profile)
        return res.status(400).json({ error: ['This Profile does not exist'] });

      return res.json(Profile);
    } catch (e: any) {
      res.status(400).json({
        error: e.errors.map((err: any) => err.message),
      });
    }
  }

  async store(req: Request, res: Response) {
    try {
      const Profile = await ProfileModel.create(req.body);
      const { uprofileid, bio, name } = Profile;
      return res.json({ uprofileid, bio, name });
    } catch (e: any) {
      res.status(400).json({
        error: e.errors.map((err: any) => err.message),
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const ProfileId = await ProfileModel.findByPk(req.params.id);

      if (!ProfileId)
        return res.status(400).json({
          error: ['This user does not exist'],
        });

      const newuser = await ProfileId.update(req.body);
      const { bio, name } = newuser;

      return res.json({ bio, name });
    } catch (e: any) {
      res.status(400).json({
        error: e.errors.map((err: any) => err.message),
      });
    }
  }
}

export default new ProfileController();
