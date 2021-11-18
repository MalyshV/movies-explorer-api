const usersRouter = require('express').Router();
const { /* getCurrentUser, */ updateUserInfo } = require('../controllers/users');
const { validateUresInfo } = require('../middlewares/validator');

// usersRouter.get('/me', getCurrentUser);
usersRouter.patch('/me', validateUresInfo, updateUserInfo);

module.exports = usersRouter;
