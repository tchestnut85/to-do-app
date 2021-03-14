const { Todo, User } = require('../models');

// TODO - refactor code to use async/await

module.exports = {
    // GET all Todos
    getTodos(req, res) {
        Todo.find({})
            .populate({
                path: 'users',
                select: '-__v'
            })
            .select('-__v')
            .sort({ createdAt: 'desc' })
            .then(todoData => res.json(todoData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // POST - create a ToDo
    createTodo({ body, token }, res) {
        Todo.create(body)
            // TODO - add in User functionality
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { todos: _id } },
                    { new: true }
                );
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

    // DELETE - delete a todo
};