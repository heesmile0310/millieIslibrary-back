const express = require('express');

const router = express.Router();

const userRouter = require('./user.router');
const reviewRouter = require('./review.router');
const categoryRouter = require('./categorypage.router');

router.use('/user', userRouter);
router.use('/review', reviewRouter);
router.use('/category', categoryRouter);

module.exports = router;
