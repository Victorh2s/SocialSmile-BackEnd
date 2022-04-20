/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import PostsController from '../controllers/PostsController ';

const router = new (Router as any)();

router.get('/', PostsController.show);
router.post('/', PostsController.store);
router.get('/:id', PostsController.index);
router.put('/:id', PostsController.update);
router.delete('/:id', PostsController.delete);

export default router;
