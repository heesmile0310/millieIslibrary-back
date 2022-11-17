const express = require('express');

const router = express.Router();

const userRouter = require('./user.router');
const reviewRouter = require('./review.router');
<<<<<<< HEAD
const bookRouter = require('./book.router');
const mw = require('../middlewares/middleware');

router.use('/user', userRouter);
router.use('/review', reviewRouter);
router.use('/books', bookRouter);
=======
const bookDetailRouter = require('./book-detail.router');

router.use('/user', userRouter);
router.use('/review', reviewRouter);
router.use('/book-detail', bookDetailRouter);
>>>>>>> ee99c89 (Add: 북 상세 API)

router.use(mw.errorHandler);
module.exports = router;
