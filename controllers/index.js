const router = require('express').Router();
const apiRoutes = require('./api');
const pageroutes = require('./pageroutes');

router.use('/', pageroutes);
router.use('/api', apiRoutes);

module.exports = router;
