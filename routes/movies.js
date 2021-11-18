const router = require('express').Router();
const { getMovies, postMovie, deleteMovie } = require('../controllers/movies');
const { validateMovieId, validateMovieInfo } = require('../middlewares/validator');

router.get('/movies', getMovies);
router.post('/movies', validateMovieInfo, postMovie);
router.delete('/movies/movieId', validateMovieId, deleteMovie);

module.exports = router;

/* const Movie = require('../models/movie');

router.get('/movies', (req, res) => {
  Movie.find({})
    .then(movies => res.send({ data: movies }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}); */
