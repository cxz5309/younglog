import express from 'express';
import postRouter from './post.js';
import userRouter from './user.js';

const router = express.Router();

router.use('/api', postRouter);
router.use('/api', userRouter);

export default router;
