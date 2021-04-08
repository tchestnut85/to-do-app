const { Todo, User } = require('../models');

// TODO - refactor code to use async/await

module.exports = {
	// GET all Todos
	getTodos(req, res) {
		Todo.find({})
			.populate({
				path: 'users',
				select: '-__v',
			})
			.select('-__v')
			.sort({ createdAt: 'desc' })
			.then(todoData => res.json(todoData))
			.catch(err => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	// GET a single Todo item
	async getSingleTodo({ params }, res) {
		const foundTodo = await Todo.findOne({ _id: params.id });

		if (!foundTodo) {
			return res.status(404).json({ message: 'Item not found.' });
		}
		return res.json(foundTodo);
	},

	// POST - create a ToDo
	createTodo({ body, token }, res) {
		Todo.create(body)
			.then(({ _id }) => {
				return User.findOneAndUpdate({ _id: body.userId }, { $push: { todos: _id } }, { new: true });
			})
			.then(todoData => {
				if (!todoData) {
					res.status(400).json({ message: 'No To-Do found.' });
					return;
				}
				res.json({ message: 'Your To-Do was added to the list!', todoData });
			})
			.catch(err => res.status(400).json(err));
	},

	// PUT - edit/update/mark complete a todo
	async updateTodo({ body, params, token }, res) {
		const updatedTodo = await Todo.findOneAndUpdate({ _id: params.id }, body, {
			new: true,
			runValidators: true,
		}).select('-__v');
		if (!updatedTodo) {
			return res.status(404).json({ message: "Couldn't find that todo item." });
		}
		res.json({ message: 'The to-do item was updated.', updatedTodo });
	},

	// DELETE - delete a todo
	async deleteTodo({ params }, res) {
		console.log(params);
		const deletedTodo = await Todo.findOneAndDelete({ _id: params.id }).select('__v');

		if (!deletedTodo) {
			return res.status(404).json({ message: 'Could not find that todo item.' });
		}
		return res.json(deletedTodo);
	},
};
