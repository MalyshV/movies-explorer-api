const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const NotAllowedError = require('../errors/not-allowed-err');
const BadRequestError = require('../errors/bad-request-err');
const {
  OK_STATUS,
  movieDataErrorMessage,
  movieOwnerErrorMessage,
  movieDeleteErrorMessage,
  movieIdErrorMessage,
} = require('../utils/constants');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.status(OK_STATUS).send(movies))
    .catch((err) => {
      next(err);
    });
};

const postMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.status(OK_STATUS).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new NotFoundError(movieDataErrorMessage));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .then((movie) => {
      if (movie) {
        if (movie.owner._id.toString() !== req.user._id) {
          throw new NotAllowedError(movieOwnerErrorMessage);
        }
        Movie.findByIdAndDelete(movieId)
          .then((data) => {
            res.send(data);
          });
      } else {
        throw new NotFoundError(movieIdErrorMessage);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(movieDeleteErrorMessage));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  postMovie,
  deleteMovie,
};
