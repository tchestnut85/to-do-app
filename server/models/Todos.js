const { Schema, model } = require('mongoose');
const { format } = require('date-fns');

const todoSchema = new Schema(
    {
        description: {
            type: String,
            required: true,
            trim: true
        },
        priority: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            required: true
        },
        createdAt: {
            type: Date,
            default: format(Date.now, 'MMM do yyyy')
        }
    }
);

const Todo = model('Todo', todoSchema);

module.exports = Todo;