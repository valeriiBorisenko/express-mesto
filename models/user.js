const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validation: {
      validator: (value) => validator.isURL(value, {
        protocols: ['http', 'https'], require_tld: true, require_protocol: true, require_host: true, require_port: false, require_valid_protocol: true, allow_underscores: false, allow_trailing_dot: false, allow_protocol_relative_urls: false, disallow_auth: false, validate_length: true,
      }),
      message: 'Ссылка не подходит',
    },
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Необходимо указать почту'],
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Неправильные email или пароль',
    },
  },
  password: {
    type: String,
    required: [true, 'Необходимо указать пароль'],
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
