/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import PictureController from '../controllers/PictureController';
import LoginUser from '../middleware/LoginUser';

const router = new (Router as any)();

router.get('/', PictureController.show);
router.get('/:id', PictureController.index);
router.post('/', LoginUser, PictureController.store);
router.delete('/:id', LoginUser, PictureController.delete);

export default router;
