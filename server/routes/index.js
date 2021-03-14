const router = require('express').Router();
const apiRoutes = require('./api/index');
const path = require('path');

router.use('/api', apiRoutes);

// serve up react front-end in production
router.use((req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

module.exports = router;