const router = require('express').Router();

const { getTodos, getSingleTodo, createTodo, updateTodo } = require('../../controllers/todo-controller');
const { authMiddleware } = require('../../utils/auth');

router
	.route('/')
	// Get all todos route
	.get(getTodos)
	// Crete a todo route
	.post(createTodo, authMiddleware);

router
	.route('/:id')
	// route to get one to-do update a todo item
	.get(getSingleTodo, authMiddleware)
	// route to update a todo item
	.put(updateTodo, authMiddleware);

module.exports = router;
