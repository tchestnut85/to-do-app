const router = require('express').Router();

const { createUser, loginUser, getSingleUser } = require('../../controllers/user-controller');

const { authMiddleware } = require('../../utils/auth');

// setup authMiddleware whereever a token is needed for user verification

router.route('/').post(createUser);

router.route('/login').post(loginUser);

router.route('/me').get(authMiddleware, getSingleUser);

module.exports = router;