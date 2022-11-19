const express = require('express');
const router = express.Router();
const { asyncWrap } = require('../utils/myutil');
const mw = require('../middlewares/middleware');

const bookshelfController = require('../controllers/bookshelf.controller');

router.post('', asyncWrap(mw.authMiddleware), bookshelfController.addBookshelf);
router.delete(
  '',
  asyncWrap(mw.authMiddleware),
  bookshelfController.removeBookshelf
);

module.exports = router;
