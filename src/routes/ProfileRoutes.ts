/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import ProfileController from '../controllers/ProfileController';

const router = new (Router as any)();

router.get('/', ProfileController.index);
router.post('/', ProfileController.store);
router.put('/:id', ProfileController.update);

export default router;
