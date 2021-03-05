const router = require('express').Router();

const { getTodos, createTodo } = require('../../controllers/index');

// To-Do routes to get all ToDo and create a ToDo
router.route('/').get(getTodos).post(createTodo);

module.exports = router;