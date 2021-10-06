import jwt from 'jsonwebtoken';
import User from '../schemas/User.js';

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);
  const [tokenType, tokenValue] = authorization.split(' ');

  if (tokenType !== 'Bearer') {
    return res.status(401).send({
      error: '로그인 토큰에 문제가 생겼습니다.'
    });
  }

  if (tokenValue === null) {
    return res.status(401).send({ message: '로그인이 필요합니다' });
  }

  try {
    const { user } = jwt.verify(tokenValue, 'young');
    await User.findOne({ id: user }) // id 에서 user차저
      .then((user) => {
        res.locals.user = user;
        next();
      });
  } catch (error) {
    return res.status(401).send({ message: '로그인이 필요합니다' });
  }
};

export default authMiddleware;
