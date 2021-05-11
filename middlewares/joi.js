const { celebrate, Joi } = require('celebrate');

exports.joiToken = celebrate({
  query: Joi.object().keys({
    token: Joi.string().token(),
  }),
});

exports.joiProfileUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

exports.joiAvatarUser = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri(),
  }),
});

exports.joiCardData = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri(),
  }),
});

exports.joiAuth = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
