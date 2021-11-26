const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { urlErrorMessage } = require('../utils/constants');

const validateURL = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new Error(urlErrorMessage);
  }
  return value;
};

const validateUresInfo = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validateRegisterData = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validateLoginData = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.number().required(),
  }),
});

const validateMovieInfo = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().custom(validateURL).required(),
    trailer: Joi.string().custom(validateURL).required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().custom(validateURL).required(),
    movieId: Joi.number().required(),
  }),
});

module.exports = {
  validateURL,
  validateUresInfo,
  validateLoginData,
  validateRegisterData,
  validateMovieId,
  validateMovieInfo,
};
