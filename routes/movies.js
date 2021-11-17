const router = require('express').Router();
const { getMovies, postMovie, deleteMovie } = require('../controllers/movies');

const Movie = require('../models/movie');

router.get('/movies', getMovies); // возвращает сохраненные юзером фильмы
router.post('/movies', postMovie); // создает фильм с переданными полями, кроме owner
router.delete('/movies/movieId', deleteMovie); // удаляет сохраненный фильм по id

router.get('/movies', (req, res) => {
  Movie.find({})
    .then(movies => res.send({ data: movies }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
});

module.exports = router;