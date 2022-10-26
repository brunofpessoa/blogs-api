const express = require('express');
const loginRouter = require('./login.router');
const userRouter = require('./user.router');

const router = express.Router();

router.use('/login', loginRouter);
router.use('/user', userRouter);

module.exports = router;
