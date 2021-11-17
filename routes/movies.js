const router = require('express').Router();
const { getMovies, postMovie, deleteMovie } = require('../controllers/movies');
const { deleteMovieValidator } = require('../validation/deleteMovieValidator');
const { saveMovieValidator } = require('../validation/saveMovieValidator');

router.get('/movies', getMovies); // возвращает сохраненные юзером фильмы
router.post('/movies', saveMovieValidator, postMovie); // создает фильм с переданными полями, кроме owner
router.delete('/movies/movieId', deleteMovieValidator, deleteMovie); // удаляет сохраненный фильм по id

module.exports = router;

/* const Movie = require('../models/movie');

router.get('/movies', (req, res) => {
  Movie.find({})
    .then(movies => res.send({ data: movies }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}); */
