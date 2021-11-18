const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');

// и остальные запросы + защита авторизацией + проверки + дописать пути

router.use('/users', usersRouter); // здесь функции для юзеров
router.use('/movies', moviesRouter); // сюда приходят функции для фильмов

module.exports = router;

// функции ниже перенесла из app, надо с ними разобраться..

/*
app.post('/signup', validateRegisterData, registerUser);
app.post('/signin', validateLoginData, login);
app.post('/', logOut);
*/