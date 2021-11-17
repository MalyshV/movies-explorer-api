const { celebrate, Joi } = require('celebrate');
const validateURL = require('../middlewares/validator');

const saveMovieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().custom(validateURL).required(),
    trailer: Joi.string().custom(validateURL).required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().custom(validateURL).required(),
    movieId: Joi.string().length(24).hex(),
  }),
});

module.exports = { saveMovieValidator };
