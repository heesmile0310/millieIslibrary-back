const express = require('express');
const router = express.Router();

const {
  signUp,
  login,
  changeUserInfo,
  withdrawUser,
  getMe,
} = require('../controllers/user.controller');

router.post('/signup', signUp);
router.post('/login', login);
router.patch('/changeinfo', changeUserInfo);
router.delete('/withdraw', withdrawUser);
router.post('/info', getMe);

module.exports = router;
