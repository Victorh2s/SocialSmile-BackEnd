/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import ProfileController from '../controllers/ProfileController';

const router = new (Router as any)();
//APENAS O INDEX DEVE FICA SEM MIDDLEWARE
router.post('/', ProfileController.store);
router.get('/:id', ProfileController.index);
router.put('/:id', ProfileController.update);

export default router;
