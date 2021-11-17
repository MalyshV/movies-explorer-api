const Movie = require('../models/movie');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.status(200).send(movies))
    .catch((err) => {
      next(err);
    });
};

const postMovie = (req, res, next) => {
  const {
    country,
    director,
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
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        // throw new NotFoundError('Переданы некорректные данные при создании фильма');
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .then((movie) => {
      // проверка на принадлежность фильма данному юзеру
      if (movie) {
        if (movie.owner._id.toString() !== req.user._id) {
          // throw new NotAllowedError('Вы можете удалять только свои фильмы');
        }
        Movie.findByIdAndDelete(movieId)
          .then((data) => {
            res.send(data);
          });
      } else {
        // throw new NotFoundError('Фильм с указанным _id не найден');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        // next(new BadRequestError('Переданы некорректные данные при удалении фильма'));
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
