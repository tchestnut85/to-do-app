const router = require('express').Router();

const {
    getAllUsers,
    updateUser,
    deleteUser,
    createUser,
    loginUser,
    getSingleUser
} = require('../../controllers/user-controller');

const { authMiddleware } = require('../../utils/auth');

// setup authMiddleware whereever a token is needed for user verification

router.route('/')
    // Get all users route
    .get(getAllUsers)
    // Create a new user route
    .post(createUser);

// Route to login a user
router.route('/login').post(loginUser);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/:id').get(getSingleUser)
    // Update a user route
    .put(updateUser)
    // Delete a user route
    .delete(deleteUser);

module.exports = router;