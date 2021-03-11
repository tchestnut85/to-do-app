const todoRoutes = require('./todo-routes');
const userRoutes = require('./user-routes');
const router = require('express').Router();

router.use('/todos', todoRoutes);
router.use('/users', userRoutes);

module.exports = router;