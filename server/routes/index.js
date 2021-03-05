const router = require('express').Router();
const apiRoutes = require('./api/index');

router.use('/api', apiRoutes);

router.use((req, res) => res.status(404).send('<h2>Sorry, there was a 404 error!</h2>'));

module.exports = router;