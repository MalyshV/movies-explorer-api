const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const escape = require('escape-html');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const { limiter } = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { handleError } = require('./middlewares/error');
const { corsOptions } = require('./middlewares/cors');
const { router } = require('./routes/index');
const config = require('./utils/config');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect(config.db_adress, {
  useNewUrlParser: true,
});

app.use('*', corsOptions);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(requestLogger);
app.use(limiter);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(handleError);

escape('<script>alert("hacked")</script>');

app.listen(PORT, () => {
  console.log(`App listen ${PORT}`);
});
