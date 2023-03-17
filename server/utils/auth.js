const jwt = require('jsonwebtoken');

// TODO: Put this secret in a .env file and use the dotenv package.
const secret = 'mysecretssshhhhhhh';
const expiration = '2h';

module.exports = {
  authMiddleware: function ({ req }) {
    console.log("AUTH MIDDLEWARE 1")
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      console.log("AUTH MIDDLEWARE 2 - no token")

      return req;
    }
    console.log("AUTH MIDDLEWARE 3")

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    console.log("AUTH MIDDLEWARE 4")

    return req;
  },
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
