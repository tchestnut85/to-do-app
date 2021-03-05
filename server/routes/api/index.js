const todoRoutes = require('./todo-routes');
const router = require('express').Router();

router.use('/todos', todoRoutes);

module.exports = router;