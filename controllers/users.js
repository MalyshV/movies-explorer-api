const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const NotExistError = require('../errors/not-exist-err');
const AlreadyExistError = require('../errors/already-exist-err');
const BadRequestError = require('../errors/bad-request-err');
const {
  OK_STATUS,
  repeatEmailErrorMessage,
  serverErrorMessage,
  // regErrorMessage,
  loginErrorMessage,
  updateUserErrorMessage,
  notFoundByIdErrorMessage,
  wrongIdErrorMessage,
} = require('../utils/constants');

const registerUser = (req, res, next) => {
  const { email, password, name } = req.body;

  User.findOne({ email })
    .then((data) => {
      if (data) {
        throw new AlreadyExistError(repeatEmailErrorMessage);
      }
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          throw new Error(serverErrorMessage);
        }
        User.create({ email, password: hash, name })
          .then((user) => {
            res.send({
              id: user._id,
              email: user.email,
            });
          })
          .catch(next);
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные при создании профиля');
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredantials(email, password)
    .then((user) => {
      const { NODE_ENV, JWT_SECRET } = process.env;
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key', { expiresIn: '7d' });
      res.send({ token });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });
      return (
        res.cookie('jwt', token, {
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        })
          .status(OK_STATUS).send({ token })
      );
    })
    .catch(() => {
      next(new NotExistError(loginErrorMessage));
    });
};

const logOut = (req, res) => {
  res.clearCookie('jwt', {
    secure: true,
    sameSite: 'none',
  }).send({ message: 'Выход осуществлен' });
};

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  return User.findById(userId)
    .then((user) => {
      if (user) {
        res.send(user);
      }
      throw new NotFoundError(notFoundByIdErrorMessage);
    })
    .catch((err) => {
      if (err.name === 'Cast Error') {
        next(new BadRequestError(wrongIdErrorMessage));
      }
      next(err);
    });
};

const updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (user) {
        return res.status(OK_STATUS).send(user);
      }
      throw new NotFoundError(notFoundByIdErrorMessage);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(BadRequestError(updateUserErrorMessage));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCurrentUser,
  updateUserInfo,
  login,
  logOut,
  registerUser,
};
