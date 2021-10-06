import express from 'express';
import Post from '../schemas/Post.js';

const router = express.Router();

const getHomePosts = async (req, res) => {
  const popularPosts = await Post.find({}).sort('-views').limit(2);
  const recentPosts = await Post.find({}).sort('-date');

  res.send({ popularList: popularPosts, recentList: recentPosts });
};

const postCreatePost = async (req, res, next) => {
  const { title, description, userName, userPwd } = req.body;
  console.log(req.body);
  const thumbnailUrl = req.file ? 'image/' + req.file.filename : 'image/zero-w-logo_mini.png';
  const views = 0;
  const date = new Date();
  // db create
  try {
    await Post.create({
      title, description, userName, userPwd, date, views
    });
    return res.send({ message: '게시글을 생성하였습니다' });
  } catch (error) {
    return res.status(400).send({ message: error });
  }
};

const getReadPost = async (req, res) => {
  const { id } = req.params;

  const thisPost = await Post.findById(id);
  await thisPost.updateOne({ $inc: { views: 1 } });
  return res.send({ post: thisPost });
};

const getUpdatePost = async (req, res) => {
  const { id } = req.params;

  const thisPost = await Post.findById(id);
  res.send({ post: thisPost });
};

const patchUpdatePost = async (req, res) => {
  const { id } = req.params;
  const { title, userName, userPwd, description, newThumbnail } = req.body;

  const thisPost = await Post.findById(id);
  if (thisPost.userPwd !== userPwd) {
    return res.status(406).send({ message: '비밀번호가 틀렸습니다!' });
  }
  try {
    await thisPost.updateOne({
      $set: {
        title, userName, userPwd, description
      }
    });
    return res.send({ message: '게시글을 수정하였습니다' });
  } catch (error) {
    return res.status(400).send({ message: error });
  }
};

const deletePost = async (req, res) => {
  const { userPwd } = req.body;
  const { id } = req.params;
  // db delete
  const thisPost = await Post.findById(id);
  if (thisPost.userPwd !== userPwd) {
    return res.status(406).send({ message: '비밀번호가 틀렸습니다!' });
  }
  try {
    await thisPost.deleteOne();
    return res.send({ message: '게시글을 삭제하였습니다' });
  } catch (error) {
    return res.status(400).send({ message: error });
  }
};

router.get('/', getHomePosts);

router.post('/create-post', postCreatePost);
router.get('/read-post/:id', getReadPost);
router
  .get('/update-post/:id', getUpdatePost)
  .patch('/update-post/:id', patchUpdatePost);
router.delete('/delete-post/:id', deletePost);

export default router;
