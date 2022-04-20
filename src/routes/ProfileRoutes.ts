/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import ProfileController from '../controllers/ProfileController';
import LoginUser from '../middleware/LoginUser';

const router = new (Router as any)();

router.post('/', LoginUser, ProfileController.store);
router.get('/:id', ProfileController.index);
router.put('/:id', LoginUser, ProfileController.update);

export default router;
