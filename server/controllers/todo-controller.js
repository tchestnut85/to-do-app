const { Todo } = require('../models');

const todoController = {
    // GET all Todos
    getTodos(req, res) {
        Todo.find({})
            .select('-__v')
            .sort({ createdAt: 'desc' })
            .then(todoData => res.json(todoData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // POST - create a ToDo
    createTodo({ body }, res) {
        Todo.create(body)
            // TODO - add in User functionality
            .then(todoData => {
                if (!todoData) {
                    res.status(400).json({ message: 'No ToDo found.' });
                    return;
                }
                res.json({ message: 'Your ToDo was added to the list!', todoData });
            })
            .catch(err => res.status(400).json(err));
    }

};

module.exports = todoController;