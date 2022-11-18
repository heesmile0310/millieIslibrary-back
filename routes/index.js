const express = require('express');

const router = express.Router();

const userRouter = require('./user.router');
const reviewRouter = require('./review.router');
const bookRouter = require('./book.router');
const mw = require('../middlewares/middleware');
const bookDetaliRouter = require('./book-detail.router');
const favoriteRouter = require('./favorite.router');
const bookshelfRouter = require('./bookshelf.router');

router.use('/user', userRouter);
router.use('/review', reviewRouter);
router.use('/books', bookRouter);
router.use('/book-detail', bookDetaliRouter);
router.use('/favorite', favoriteRouter);
router.use('/bookshelf', bookshelfRouter);

router.use(mw.errorHandler);
module.exports = router;
