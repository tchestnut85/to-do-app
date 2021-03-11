const jwt = require('jsonwebtoken');

const secret = 'dovahkiin';
const expiration = '2h';

module.exports = {
    // Use parameters for signing/creating the jwt. these can change based on what is used to login
    signToken: function ({ name, _id }) {
        const payload = { name, _id };

        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },

    authMiddleware: function ({ req }) {
        // allows token to be sent via req.body, req,query or headers
        let token = req.body.token || req.query.token || req.headers.authorization;

        // Seperate 'Bearer' from 'token'
        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }

        // If no token, return request object as is
        if (!token) {
            return req;
        }

        try {
            // deconde and attach user data to request object
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log('Invalid token!');
        }

        // return the request object
        return req;
    }
};