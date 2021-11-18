// файл для адреса Mongo-сервера и JWT в режиме разработки
// возможно его следует перенести в middlewares?

const config = {
  db_adress: 'mongodb://localhost:27017/moviesdb',
  // jwt: ...,
  // port: ...,
};

module.exports = config;
