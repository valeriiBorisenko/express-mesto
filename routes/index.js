const express = require('express');

const { cardsRoutes } = require('./cards');
const { usersRoutes } = require('./users');

const routes = express.Router();

routes.use('/cards', cardsRoutes);
routes.use('/users', usersRoutes);

routes.get('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

exports.routes = routes;
