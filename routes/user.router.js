const express = require('express');
const router = express.Router();

const { authMiddleware } = require('../middlewares/middleware');

const {
  signUp,
  login,
  updateInfo,
  withdrawUser,
  getMe,
} = require('../controllers/user.controller');

router.post('/signup', signUp);
router.post('/login', login);
router.patch('/changeinfo', authMiddleware, updateInfo);
router.delete('/withdraw', authMiddleware, withdrawUser);
router.post('/info', authMiddleware, getMe);

module.exports = router;
