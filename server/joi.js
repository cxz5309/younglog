import joi from 'joi';
/* eslint-disable import/prefer-default-export */
export const userPostSchema = joi.object({
  userName: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .error((errors) => {
      errors.forEach((err) => {
        err.message = '아이디 형식이 일치하지 않습니다.';
      });
      return errors;
    }),
  password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{4,30}$'))
    .error((errors) => {
      errors.forEach((err) => {
        err.message = '패스워드 형식이 일치하지 않습니다.';
      });
      return errors;
    }),
  confirmPassword: joi.ref('password'),
});