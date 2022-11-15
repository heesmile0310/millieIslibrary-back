const userDao = require('../models/user.dao');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken'); // 토큰 발급
const jwtSecret = process.env.JWT_SECRET;

const signUp = async (email, password, nickname) => {
  if (!email.includes('@') || !email.includes('.')) {
    const error = new Error('Email-Invalid');
    error.status = 400;
    throw error;
  }

  if (password.length < 10) {
    //비밀번호가 10자리 이상만 가능 아니면 error 날림
    const error = new Error('Password-Invalid');
    error.status = 400;
    throw error;
  }

  const salt = bcrypt.genSaltSync();

  const hashedPw = bcrypt.hashSync(password, salt);

  await userDao.signUp(email, hashedPw, nickname);
};

const login = async (email, password) => {
  if (!email.includes('@') || !email.includes('.')) {
    const error = new Error('Email-Invalid');
    error.status = 400;
    throw error;
  }
  if (password.length < 10) {
    const error = new Error('Password-Invalid');
    error.status = 400;
    throw error;
  }

  const userInfo = await userDao.loginUser(email);
  if (!userInfo) {
    const error = new Error("User doesn't exist");
    error.statusCode = 404;
    throw error;
  }

  const isSame = bcrypt.compareSync(password, userInfo.password);
  if (!isSame) {
    const error = new Error('Your password is incorrect');
    error.statusCode = 400;
    throw error;
  }

  const token = jwt.sign({ id: userInfo.id }, jwtSecret);
  return token;
};

const changeUserInfo = async (password, nickname, token) => {
  if (password.length < 10) {
    //비밀번호가 10자리 이상만 가능 아니면 error 날림
    const error = new Error('Password-Invalid');
    error.status = 400;
    throw error;
  }

  const user = jwt.verify(token, jwtSecret);
  const user_id = user.id;

  await userDao.changeUserInfo(password, nickname, user_id);
};

const withdrawUser = async token => {
  const user = jwt.verify(token, jwtSecret);
  const user_id = user.id;

  await userDao.withdrawUser(user_id);
};

module.exports = { signUp, login, changeUserInfo, withdrawUser };
