const router = require('express').Router();

const { getTodos, createTodo } = require('../../controllers/todo-controller');
const { authMiddleware } = require('../../utils/auth');

router.route('/')
    // Get all todos route
    .get(getTodos)
    // Crete a todo route
    .post(createTodo, authMiddleware);

module.exports = router;