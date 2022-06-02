/* eslint-disable @typescript-eslint/no-explicit-any */
import multer from 'multer';
import { uploadAvatar } from '../config/multerConfig';
import { Request, Response } from 'express';
import PostsModel from '../models/PostModel';

const upload = multer(uploadAvatar.getConfig).single('imageprofile');

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
    return upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json({
          error: [error.code],
        });
      }
      try {
        if (req.file) {
          const { originalname, filename } = req.file;
          const { upostsid, url, title, description } = req.body;
          const pictures = await PostsModel.create({
            originalname,
            filename,
            upostsid,
            url,
            title,
            description,
          });
          return res.json(pictures);
        }
      } catch (e: any) {
        return res.status(400).json('Not a valid file type');
      }
    });
  }

  async update(req: Request, res: Response) {
    try {
      const PostsId = await PostsModel.findByPk(req.params.id);

      if (!PostsId)
        return res.status(400).json({
          error: ['This user does not exist'],
        });

      const attpost = await PostsId.update(req.body);
      const { upostsid, title, description } = attpost;

      return res.json({ upostsid, title, description });
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
