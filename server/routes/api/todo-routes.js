const router = require('express').Router();

const { getTodos, createTodo } = require('../../controllers/todo-controller');

router.route('/')
    // Get all todos route
    .get(getTodos)
    // Crete a todo route
    .post(createTodo);

module.exports = router;