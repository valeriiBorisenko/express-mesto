const express = require('express');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

const { cardsRoutes } = require('./cards');
const { usersRoutes } = require('./users');
const { joiAuth } = require('../middlewares/joi');

const routes = express.Router();

routes.post('/sigin', express.json(), joiAuth, login);

routes.post('/signup', express.json(), joiAuth, createUser);

routes.use(auth);

routes.use('/cards', cardsRoutes);
routes.use('/users', usersRoutes);

routes.get('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

exports.routes = routes;
