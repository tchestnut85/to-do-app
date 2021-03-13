const { Schema, model } = require('mongoose');
const { format } = require('date-fns');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        todos: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Todo'
            }
        ],
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtDate => format(createdAtDate, 'MMM do yyyy')
        },
        id: false
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

// middleware to create a new or update a password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// validate and compare the incoming passwird wuth the hashed one
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// When querying a user, get the total number of to-do items they have
userSchema.virtual('todoCount').get(function () {
    return this.todos.length;
});

const User = model('User', userSchema);

module.exports = User;

