import express from 'express';
import Comment from '../schemas/Comment.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/comments/:postId', async (req, res) => {
  const { postId } = req.params;
  console.log('postId: ');
  console.log(postId);
  const comments = await Comment.find({ postId }).sort('-date');
  console.log(comments);
  res.send({ comments });
});

router.get('/comments', async (req, res, next) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ postId }).sort('-date');
    res.json({ comments }); // array format?
  } catch (err) {
    console.error(err);

    next(err);
  }
});

router.post('/create-comment/:postId', authMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;
    const { contents } = req.body;
    const { user } = res.locals;
    const writer = user.userName;
    const date = new Date();

    console.log(postId);
    console.log(contents);
    console.log(user);
    console.log(writer);
    await Comment.create({
      postId, contents, writer, date,
    });
    res.send({ message: '댓글이 작성되었습니다.' });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: '댓글 작성에 실패했습니다' });
  }
});

router.delete('/delete-comments/:commentId', authMiddleware, async (req, res) => {
  const { user } = res.locals;
  const writer = user.userName;
  const { commentId } = req.params;

  console.log(user);
  console.log(writer);
  console.log(commentId);
  try {
    const isExist = await Comment.find({ commentId, writer });
    if (isExist) {
      await Comment.deleteOne({ commentId });
      res.send({ message: '댓글이 삭제되었습니다.' });
    }
  } catch (error) {
    res.status(400).send({ message: '댓글 삭제에 실패했습니다' });
  }
});

router.patch('/edit-comments/:commentId', authMiddleware, async (req, res) => {
  const { commentId } = req.params;
  const { user } = res.locals;
  const { contents } = req.body;
  const writer = user.userName;

  const isExist = await Comment.find({ commentId, writer });

  console.log(writer);
  console.log(commentId);
  console.log(contents);
  if (isExist) {
    await Comment.updateOne(
      { commentId, writer },
      { $set: { contents } },
    );
    res.send({ message: '댓글을 수정했습니다' });
    return;
  }
  res.state(400).send({ message: '댓글 수정에 실패했습니다' });
});

router.get('/getcommentid');

export default router;
