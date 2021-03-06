const router = require('express').Router();

const { getTodos, createTodo } = require('../../controllers/todo-controller.js');

// To-Do routes to get all ToDos and to create a ToDo
router.route('/').get(getTodos).post(createTodo);

module.exports = router;