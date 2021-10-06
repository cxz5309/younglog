import express from 'express';
import jwt from 'jsonwebtoken';
import joi from 'joi';
import User from '../schemas/User.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

const userPostSchema = joi.object({
  id: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  password: joi.string().min(4),
  confirmPassword: joi.ref('password')
});

router.get('/me', authMiddleware, async (req, res, next) => {
  const { user } = res.locals;
  res.send({ user: { id: user.id } });
  next();
});

router.post('/join', async (req, res) => {
  try {
    const { id, password, confirmPassword } =
      await userPostSchema.validateAsync(req.body)
        .catch((error) => {
          throw error.details[0].message;
        });
    const date = new Date();

    const existId = await User.findOne({ id });
    if (existId) {
      return res.status(400).send({ message: '이미 존재하는 아이디입니다' });
    }

    const user = new User({ id, password, date });
    await user.save();

    return res.status(201).send({ message: '정상적으로 회원가입하였습니다!' });
  } catch (error) {
    return res.status(400).send({ message: error });
  }
});

router.post('/login', async (req, res) => {
  const { id, password } = req.body;
  console.log(req.body);
  const user = await User.findOne({ id, password });
  if (!user) {
    res.status(401).send({
      message: '잘못된 아이디 또는 패스워드입니다'
    });
    return;
  }

  const token = jwt.sign({ user: user.id }, 'young');
  res.send({ token });
});

export default router;
