/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import HomeController from '../controllers/HomeController';

const router = new (Router as any)();
//SEM O MIDDLEWARE
router.get('/', HomeController.show);

export default router;
