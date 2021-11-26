const jwt = require('jsonwebtoken');
const NotExistError = require('../errors/not-exist-err');
const { authErrorMessage } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new NotExistError(authErrorMessage);
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
  } catch (err) {
    next(new NotExistError(authErrorMessage));
  }

  req.user = payload;
  next();
};
