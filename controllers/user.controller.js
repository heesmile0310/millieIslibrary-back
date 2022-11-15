const userService = require('../services/user.service');

const signUp = async (req, res) => {
  try {
    const { email, password, nickname } = req.body;
    console.log(email);
    const REQUIRED_KEYS = {
      email,
      password,
      nickname,
    };

    Object.keys(REQUIRED_KEYS).map(key => {
      if (!REQUIRED_KEYS[key]) {
        throw new Error(`KEY_ERROR: ${key}`);
      }
    });
    await userService.signUp(email, password, nickname);

    res.status(201).json({ message: `${email} signup success` });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const REQUIRED_KEYS = {
      email,
      password,
    };

    Object.keys(REQUIRED_KEYS).map(key => {
      if (!REQUIRED_KEYS[key]) {
        throw new Error(`KEY_ERROR: ${key}`);
      }
    });
    const token = await userService.login(email, password);
    res.status(200).json({ message: 'login success', token: token });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

const changeUserInfo = async (req, res) => {
  try {
    const { password, nickname } = req.body;
    const { token } = req.headers;
    //나중에 oauth적용시 비밀번호는 Null 값이라 service단에서 Oauth로그인시 비밀번호 변경이 불가능하게 설정해야함
    await userService.changeUserInfo(password, nickname, token);
    res.status(200).json({ message: 'userinfo change sucess' });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

const withdrawUser = async (req, res) => {
  try {
    const { token } = req.headers;
    await userService.withdrawUser(token);
    res.status(200).json({ message: 'User withdraw success' });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = { signUp, login, changeUserInfo, withdrawUser };
