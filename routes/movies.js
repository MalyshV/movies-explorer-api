const router = require('express').Router();
const { getMovies, postMovie, deleteMovie } = require('../controllers/movies');

router.get('/movies', getMovies); // возвращает сохраненные юзером фильмы
router.post('/movies', postMovie); // создает фильм с переданными полями, кроме owner
router.delete('/movies/movieId', deleteMovie); // удаляет сохраненный фильм по id

module.exports = router;