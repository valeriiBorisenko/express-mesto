const express = require('express');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

const { cardsRoutes } = require('./cards');
const { usersRoutes } = require('./users');
const { joiAuth, joiLogin } = require('../middlewares/joi');
const NotFoundError = require('../errors/not-found-err');

const routes = express.Router();

routes.post('/sigin', express.json(), joiAuth, login);

routes.post('/signup', express.json(), joiLogin, createUser);

routes.use(auth);

routes.use('/cards', cardsRoutes);
routes.use('/users', usersRoutes);

routes.get('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

exports.routes = routes;
