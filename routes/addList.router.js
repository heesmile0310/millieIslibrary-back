const express = require('express');
const router = express.Router();
const { asyncWrap } = require('../utils/myutil');
const mw = require('../middlewares/middleware');

const addListController = require('../controllers/addList.controller');

router.post(
  '/bookshelf',
  asyncWrap(mw.authMiddleware),
  addListController.addBookshelf
);
router.delete(
  '/bookshelf',
  asyncWrap(mw.authMiddleware),
  addListController.removeBookshelf
);

router.post(
  '/favorite',
  asyncWrap(mw.authMiddleware),
  addListController.addFavorite
);
router.delete(
  '/favorite',
  asyncWrap(mw.authMiddleware),
  addListController.removeFavorite
);

module.exports = router;
