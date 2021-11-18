const router = require('express').Router();
const { getCurrentUser, updateUserInfo } = require('../controllers/users');
const { validateUresInfo } = require('../middlewares/validator');

router.get('users/me', getCurrentUser);
router.patch('users/me', validateUresInfo, updateUserInfo);

module.exports = router;
