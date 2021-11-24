const OK_STATUS = 200;
const notFoundErrorMessage = 'Запрашиваемый ресурс не найден';
const movieDataErrorMessage = 'Переданы некорректные данные при создании фильма';
const notAllowedErrorMessage = 'Вы можете удалять только свои фильмы';
const movieIdErrorMessage = 'Фильм с указанным _id не найден';
const movieDeleteErrorMessage = 'Переданы некорректные данные при удалении фильма';
const authErrorMessage = 'Ошибка авторизации';
const urlErrorMessage = 'Неправильный формат ссылки';
const repeatEmailErrorMessage = 'Данный e-mail уже зарегистрирован';
const serverErrorMessage = 'Ошибка сервера';
const regErrorMessage = 'Переданы некорректные данные при создании профиля';
const loginErrorMessage = 'Проверьте логин и пароль';
const updateUserErrorMessage = 'Переданы некорректные данные при обновлении данных';
const notFoundByIdErrorMessage = 'Пользователь по указанному _id не найден';
const wrongIdErrorMessage = 'Переданы некорректные данные _id';

module.exports = {
  OK_STATUS,
  notFoundErrorMessage,
  movieDataErrorMessage,
  notAllowedErrorMessage,
  movieDeleteErrorMessage,
  movieIdErrorMessage,
  authErrorMessage,
  regErrorMessage,
  urlErrorMessage,
  repeatEmailErrorMessage,
  serverErrorMessage,
  loginErrorMessage,
  updateUserErrorMessage,
  notFoundByIdErrorMessage,
  wrongIdErrorMessage,
};
