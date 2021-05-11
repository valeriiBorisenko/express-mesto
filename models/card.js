const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validation: {
      validator: (value) => validator.isURL(value, {
        protocols: ['http', 'https'], require_tld: true, require_protocol: true, require_host: true, require_port: false, require_valid_protocol: true, allow_underscores: false, host_whitelist: false, host_blacklist: false, allow_trailing_dot: false, allow_protocol_relative_urls: false, disallow_auth: false, validate_length: true,
      }),
      message: 'Ссылка не подходит',
    },
  },
  owner: {
    type: String,
    required: true,
  },
  likes: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
