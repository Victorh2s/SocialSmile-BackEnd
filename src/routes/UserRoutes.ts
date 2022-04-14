/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = new (Router as any)();
//TODOS AQUI DEVEM TER O MIDDLEWARRE
router.get('/', UserController.show);
router.get('/:id', UserController.index);
router.post('/', UserController.store);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);

export default router;
