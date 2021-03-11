const { Schema, model } = require('mongoose');
const { format } = require('date-fns');

const todoSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
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
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtDate => format(createdAtDate, 'MMM do yyyy')
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const Todo = model('Todo', todoSchema);

module.exports = Todo;