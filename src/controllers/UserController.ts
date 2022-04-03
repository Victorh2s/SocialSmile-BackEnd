import { Request, Response } from 'express';

class UserController {
  async index(req: Request, res: Response) {}

  async store(req: Request, res: Response) {}

  async update(req: Request, res: Response) {}

  async delete(req: Request, res: Response) {}
}

export default new UserController();
