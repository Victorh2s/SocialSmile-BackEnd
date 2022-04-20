/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import UserController from '../controllers/UserController';
import LoginUser from '../middleware/LoginUser';

const router = new (Router as any)();

router.get('/', UserController.show);
router.get('/:id', UserController.index);
router.post('/', UserController.store);
router.put('/:id', LoginUser, UserController.update);
router.delete('/:id', LoginUser, UserController.delete);

export default router;
