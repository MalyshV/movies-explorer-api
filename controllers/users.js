const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const NotExistError = require('../errors/not-exist-err');
const AlreadyExistError = require('../errors/already-exist-err');
const BadRequestError = require('../errors/bad-request-err');

// регистрация
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

// залогиниться
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
          .status(200).send({ token })
      );
    })
    .catch(() => {
      next(new NotExistError('Проверьте логин и пароль'));
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
      throw new NotFoundError('Пользователь по указанному _id не найден');
    })
    .catch((err) => {
      if (err.name === 'Cast Error') {
        next(new BadRequestError('Переданы некорректные данные _id'));
      }
      next(err);
    });
};

// изменить данные
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

module.exports = {
  getCurrentUser,
  updateUserInfo,
  login,
  logOut,
  registerUser,
};
