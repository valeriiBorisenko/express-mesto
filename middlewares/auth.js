const jwt = require('jsonwebtoken');
const BadRequestError = require('../errors/badRequest-err');
const NotValidIdError = require('../errors/not-validId-err');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.userToken;
  if (!token) {
    throw new BadRequestError('Необходима авторизация');
  }
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new NotValidIdError('Нет доступа'));
  }

  req.user = payload;

  next();
};
