const router = require('express').Router();
module.exports = {
  getCurrentUser,
  updateUserInfo,
};

router.get('users/me', getCurrentUser); // возвращает инфо юзера (email и имя)
router.patch('users/me', updateUserInfo); // обновляет эти данные

module.exports = router;