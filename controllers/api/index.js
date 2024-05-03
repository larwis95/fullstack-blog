const router = require('express').Router();

const userRoute = require('./user');
const postRoute = require('./post');
const commentRoute = require('./comment');

router.use('/api', userRoute);
router.use('/api', postRoute);
router.use('/api', commentRoute);