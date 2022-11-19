const express = require('express');
const router = express.Router();
const { asyncWrap } = require('../utils/myutil');
const mw = require('../middlewares/middleware');

const bookDetailController = require('../controllers/book-detail.controller');

router.get('/:id', bookDetailController.findDetailByBookId);
router.get(
  '/:id/check-list',
  asyncWrap(mw.authMiddleware),
  bookDetailController.checkFavoriteAndBookshelf
);

module.exports = router;
