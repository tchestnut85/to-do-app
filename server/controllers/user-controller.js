const { User } = require('../models');
const { signToken } = require('../utils/auth');

module.exports = {

    async createUser({ body }, res) {
        // create a user, sign the token and send it back
        const user = await User.create(body);

        if (!user) {
            return res.status(400).json({ message: 'Something went wrong.' });
        }
        const token = signToken(user);
        res.json({ token, user });
    },

    async loginUser({ body }, res) {
        // login the user, sign the token and send it back
        const user = await User.findOne({
            name: body.name
        });

        if (!user) {
            return res.status(400).json({ message: `We couldn't find this user.` });
        }

        const correctPw = await user.isCorrectPassword(body.password);

        if (!correctPw) {
            return res.status(400).json({ message: 'Incorrect password.' });
        }

        const token = signToken(user);
        res.json({ token, user });
    },

    // get a single user by either their ID or name
    async getSingleUser({ user = null, params }, res) {
        const foundUser = await User.findOne({
            $or: [
                {
                    _id: user ? user._id : params.id
                },
                {
                    name: params.name
                }
            ]
        });

        if (!foundUser) {
            return res.status(400).json({ message: `Couldn't find this user.` });
        }

        res.json(foundUser);
    }
};