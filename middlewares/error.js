// переназвать в centralizedErrorHandler ? но тогда название функции не с глагола..

const handleError = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'Произошла ошибка'
      : message,
  });
  next();
};

module.exports = { handleError }