const { celebrate, Joi } = require('celebrate');

const deleteMovieValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
});

module.exports = { deleteMovieValidator };
