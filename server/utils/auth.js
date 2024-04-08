// import { jwtDecode, InvalidTokenError } from 'jwt-decode';
// import jwt from "jsonwebtoken";
const jwt = require("jsonwebtoken")

const secret = "mysecretsdontmess";
const expiration = "9h";

exports.authMiddleware = function (req, res, next) {
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  if (!token) {
    return res.status(400).json({ message: 'You have no token!' });
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
    next();
  } catch {
    console.log('Invalid token');
    return res.status(400).json({ message: 'invalid token!' });
  }
};

exports.signToken = function ({ username, email, _id }) {
  const payload = { username, email, _id };

  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};
