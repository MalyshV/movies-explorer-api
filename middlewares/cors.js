const cors = require('cors');

const options = {
  origin: [
    'http://localhost:3000',
    // 'https://express.mesto.nomoredomains.icu',
    // 'http://express.mesto.nomoredomains.icu',
    // 'https://YOUR.github.io',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

const corsOptions = cors(options);

module.exports = { corsOptions };
