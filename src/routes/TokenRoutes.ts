/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import TokenController from '../controllers/TokenController';

const router = new (Router as any)();
//SEM O MIDDLEWARE
router.post('/', TokenController.store);

export default router;
