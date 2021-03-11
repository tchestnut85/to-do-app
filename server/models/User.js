const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
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
        ]
    },
    {
        toJSON: {
            virtuals: true
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
    return brcrypt.compare(password, this.password);
};

// When querying a user, get the total number of to-do items they have
userSchema.virtual('todoCount').get(function () {
    return this.todos.length;
});

const User = model('User', userSchema);

module.exports = User;

