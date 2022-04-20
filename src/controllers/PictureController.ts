/* eslint-disable @typescript-eslint/no-explicit-any */
import multer from 'multer';
import { Request, Response } from 'express';
import PictureModel from '../models/PictureModel';
import { uploadAvatar } from '../config/multerConfig';

const upload = multer(uploadAvatar.getConfig).single('imageprofile');

class PictureController {
  async index(req: Request, res: Response) {
    try {
      const Picture = await PictureModel.findByPk(req.params.id);
      if (!Picture)
        return res.status(400).json({ error: ['This Picture does not exist'] });

      return res.json(Picture);
    } catch (e: any) {
      res.status(400).json({
        error: e.errors.map((err: any) => err.message),
      });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const Pictures = await PictureModel.findAll();
      return res.json(Pictures);
    } catch (e: any) {
      res.status(400).json({
        error: e.errors.map((err: any) => err.message),
      });
    }
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
          const { upictureid, url } = req.body;
          const pictures = await PictureModel.create({
            originalname,
            filename,
            upictureid,
            url,
          });
          return res.json(pictures);
        }
      } catch (e: any) {
        return res.status(400).json('Não é um tipo de arquivo válido');
      }
    });
  }

  async delete(req: Request, res: Response) {
    try {
      const pictureId = await PictureModel.findByPk(req.params.id);
      if (!pictureId)
        return res.status(400).json({
          error: ['This user does not exist'],
        });
      pictureId.destroy();
      return res.json('This user did deleted with success');
    } catch (e: any) {
      res.status(400).json({
        error: e.errors.map((err: any) => err.message),
      });
    }
  }
}

export default new PictureController();
