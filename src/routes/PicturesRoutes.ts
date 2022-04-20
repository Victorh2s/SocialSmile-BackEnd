/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import PictureController from '../controllers/PictureController';

const router = new (Router as any)();

router.get('/', PictureController.show);
router.get('/:id', PictureController.index);
router.post('/', PictureController.store);
router.delete('/:id', PictureController.delete);

export default router;
