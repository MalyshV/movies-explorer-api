const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const escape = require('escape-html');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { /* celebrate, Joi, */ errors } = require('celebrate');

const { limiter } = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { handleError } = require('./middlewares/error');
// const { registerValidator } = require('./validation/registerValidator');
// const { loginValidator } = require('./validation/loginValidator');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
});

const options = {
  origin: [
    'http://localhost:3000',
    // 'https://express.mesto.nomoredomains.icu',
    // 'http://express.mesto.nomoredomains.icu',
    // 'https://YOUR.github.io',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

// app.use('/', require('./routes/movies'));

app.use('*', cors(options));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(requestLogger);
app.use(limiter);

// routes

app.use(errorLogger);
app.use(errors());
app.use(handleError);

escape('<script>alert("hacked")</script>');

app.listen(PORT, () => {
  console.log(`App listen ${PORT}`);
});

/*
app.post('/signup', registerValidator, registerUser);

app.post('/signin', loginValidator, login);

app.post('/', logOut);
*/
