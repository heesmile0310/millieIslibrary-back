const express = require('express');
const router = express.Router();

const {
  signUp,
  login,
  changeUserInfo,
  withdrawUser,
} = require('../controllers/user.controller');

router.post('/signup', signUp);
router.post('/login', login);
router.patch('/changeinfo', changeUserInfo);
router.delete('/withdraw', withdrawUser);

module.exports = router;
