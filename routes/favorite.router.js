const express = require('express');
const router = express.Router();
const { asyncWrap } = require('../utils/myutil');
const mw = require('../middlewares/middleware');

const favoriteController = require('../controllers/favorite.controller');

router.post('', asyncWrap(mw.authMiddleware), favoriteController.addFavorite);
router.delete(
  '',
  asyncWrap(mw.authMiddleware),
  favoriteController.removeFavorite
);

module.exports = router;
