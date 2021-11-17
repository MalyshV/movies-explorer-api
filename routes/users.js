const router = require('express').Router();
const { getCurrentUser, updateUserInfo } = require('../controllers/users');

router.get('users/me', getCurrentUser); // возвращает инфо юзера (email и имя)
router.patch('users/me', updateUserInfo); // обновляет эти данные

module.exports = router;
