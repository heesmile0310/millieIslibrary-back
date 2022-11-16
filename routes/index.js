const express = require('express');

const userRouter = require('./user.router');
// const otherRouter = require('./other');

const router = express.Router();

router.use('/user', userRouter);
// router.use(otherRouter);

module.exports = router;
