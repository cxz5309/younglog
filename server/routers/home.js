import express from 'express';
import postRouter from './post.js';
import userRouter from './user.js';
import commentRouter from './comment.js';

const router = express.Router();

router.use('/api', postRouter);
router.use('/api', userRouter);
router.use('/api', commentRouter);

export default router;
