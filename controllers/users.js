const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const AlreadyExistError = require('../errors/already-exist-err');
const BadRequestError = require('../errors/bad-request-err');

const registerUser = (req, res, next) => {
  const { email, password, name } = req.body;

  User.findOne({ email })
    .then((data) => {
      if (data) {
        throw new AlreadyExistError('Данный e-mail уже зарегистрирован');
      }
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          throw new Error('Ошибка сервера');
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
        next(new BadRequestError('Переданы некорректные данные при создании профиля'));
      } else {
        next(err);
      }
    });
};

// const getCurrentUser = (req, res, next) => {};

const updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (user) {
        return res.status(200).send(user);
      }
      throw new NotFoundError('Пользователь с указанным _id не найден');
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(BadRequestError('Переданы некорректные данные при обновлении данных'));
      } else {
        next(err);
      }
    });
};

// const login

// const logOut

module.exports = {
  // getCurrentUser,
  updateUserInfo,
  // login,
  // logOut,
  registerUser,
};
