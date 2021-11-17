const router = require('express').Router();
const { getCurrentUser, updateUserInfo } = require('../controllers/users');
const { updateUserInfoValidator } = require('../validation/updateUserInfoValidator');

router.get('users/me', getCurrentUser); // возвращает инфо юзера (email и имя)
router.patch('users/me', updateUserInfoValidator, updateUserInfo); // обновляет эти данные

module.exports = router;
