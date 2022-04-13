/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response } from 'express';
import PostsModel from '../models/PostModel';

class PostsController {
  async index(req: Request, res: Response) {
    try {
      const Post = await PostsModel.findByPk(req.params.id);
      if (!Post)
        return res.status(400).json({ error: ['This Post does not exist'] });

      return res.json(Post);
    } catch (e: any) {
      res.status(400).json({
        error: e.errors.map((err: any) => err.message),
      });
    }
  }

  async show(req: Request, res: Response) {
    const Posts = await PostsModel.findAll();
    return res.json(Posts);
  }

  async store(req: Request, res: Response) {
    try {
      const { upostsid, title, description } = req.body;
      const pictures = await PostsModel.create({
        upostsid,
        title,
        description,
      });
      return res.json(pictures);
    } catch (e: any) {
      return res.status(400).json('Não é um tipo de arquivo válido');
    }
  }

  async update(req: Request, res: Response) {
    try {
      const PostsId = await PostsModel.findByPk(req.params.id);

      if (!PostsId)
        return res.status(400).json({
          error: ['This user does not exist'],
        });

      const newposts = await PostsId.update(req.body);
      const { title, description } = newposts;

      return res.json({ title, description });
    } catch (e: any) {
      res.status(400).json({
        error: e.errors.map((err: any) => err.message),
      });
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const PostsId = await PostsModel.findByPk(req.params.id);

      if (!PostsId)
        return res.status(400).json({
          error: ['This user does not exist'],
        });
      PostsId.destroy();
      return res.json('This user did deleted with success');
    } catch (e: any) {
      res.status(400).json({
        error: e.errors.map((err: any) => err.message),
      });
    }
  }
}

export default new PostsController();
