/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import PostsController from '../controllers/PostsController ';
import LoginUser from '../middleware/LoginUser';

const router = new (Router as any)();

router.get('/', PostsController.show);
router.post('/', LoginUser, PostsController.store);
router.get('/:id', PostsController.index);
router.put('/:id', LoginUser, PostsController.update);
router.delete('/:id', LoginUser, PostsController.delete);

export default router;
