const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');
const { validateRegisterData, validateLoginData } = require('../middlewares/validator');
const { registerUser, login, logOut } = require('../controllers/users');
const NotFoundError = require('../errors/not-found-err');
const { pageNotFoundErrorMessage } = require('../utils/constants');

router.post('/signup', validateRegisterData, registerUser);
router.post('/signin', validateLoginData, login);
router.post('/', logOut);

router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);

router.use('*', () => {
  throw new NotFoundError(pageNotFoundErrorMessage);
});

module.exports = { router };
