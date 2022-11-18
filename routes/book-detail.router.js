const express = require('express');
const router = express.Router();

const bookDetailController = require('../controllers/book-detail.controller');

router.get('/:id', bookDetailController.findDetailByBookId);
router.post(
  '/:id/check-favorite',
  bookDetailController.checkFavoriteAndBookshelf
);

module.exports = router;
