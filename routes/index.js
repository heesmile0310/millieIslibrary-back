const express = require('express');

const router = express.Router();

const userRouter = require('./user.router');
const reviewRouter = require('./review.router');
const bookRouter = require('./book.router');
const mw = require('../middlewares/middleware');

router.use('/user', userRouter);
router.use('/review', reviewRouter);
router.use('/books', bookRouter);

router.use(mw.errorHandler);
module.exports = router;
