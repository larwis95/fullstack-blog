const router = require('express').Router();

const userRoute = require('./user');
const postRoute = require('./post');
const commentRoute = require('./comment');

router.use('/user', userRoute);
router.use('/post', postRoute);
router.use('/comment', commentRoute);

module.exports = router;