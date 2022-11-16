const express = require('express');

const router = express.Router();

const userRouter = require('./user.router');
const reviewRouter = require('./review.router');

router.use('/user', userRouter);
router.use('/review', reviewRouter);

module.exports = router;
