const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');

// может проверки убрать в отдельный файл?

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправльный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    // default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
});

module.exports = mongoose.model('user', userSchema);

/*userSchema.statics.findUserByCredantials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};*/

// перенести выше, если это мне понадобится