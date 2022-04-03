/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import HomeController from '../controllers/HomeController';

const router = new (Router as any)();

router.get('/', HomeController.index);

export default router;
