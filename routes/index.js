const express = require('express');
const router = express.Router();

const userRouter = require('./user.router');
// const otherRouter = require('./other');

router.use(userRouter);
// router.use(otherRouter);

module.exports = router;
