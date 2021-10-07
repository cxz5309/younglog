import express from 'express';
import jwt from 'jsonwebtoken';
import joi from 'joi';
import User from '../schemas/User.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

const userPostSchema = joi.object({
  userName: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .error((errors) => {
      errors.forEach((err) => {
        err.message = `아이디 형식이 일치하지 않습니다.`;
      });
      return errors;
    }),
  password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{4,30}$'))
    .error((errors) => {
      errors.forEach((err) => {
        err.message = `패스워드 형식이 일치하지 않습니다.`;
      });
      return errors;
    }),
  confirmPassword: joi.ref('password'),
});

const getMe = async (req, res, next) => {
  const { user } = res.locals;
  res.send({ user: { userName: user.userName } });
  next();
};

export const join = async (req, res) => {
  try {
    const { userName, password, confirmPassword } =
      await userPostSchema.validateAsync(req.body)
        .catch((error) => {
          throw error.details[0].message;
        });
    const date = new Date();

    const existId = await User.findOne({ userName });
    if (existId) {
      return res.status(400).send({ message: '중복된 닉네임입니다.' });
    }

    const sameNamePwd = userName === password;
    if (sameNamePwd) {
      return res.status(400).send({ message: '아이디와 비밀번호가 달라야 합니다. ' });
    }

    const user = new User({ userName, password, date });
    await user.save();

    return res.status(201).send({ message: '정상적으로 회원가입하였습니다!' });
  } catch (error) {
    return res.status(400).send({ message: error });
  }
};

const login = async (req, res) => {
  const { userName, password } = req.body;
  const user = await User.findOne({ userName, password });
  if (!user) {
    res.status(401).send({
      message: '잘못된 아이디 또는 패스워드입니다',
    });
    return;
  }
  const token = jwt.sign({ user: user.userName }, 'young');
  res.send({ token });
};


router.get('/me', authMiddleware, getMe);
router.post('/join', join);
router.post('/login', login);

export default router;
