const moviesRouter = require('express').Router();
const { getMovies, postMovie, deleteMovie } = require('../controllers/movies');
const { validateMovieId, validateMovieInfo } = require('../middlewares/validator');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', validateMovieInfo, postMovie);
moviesRouter.delete('/:movieId', validateMovieId, deleteMovie);

module.exports = moviesRouter;
