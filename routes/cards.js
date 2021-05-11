const express = require('express');

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { joiToken, joiCardData } = require('../middlewares/joi');

const cardsRoutes = express.Router();

cardsRoutes.get('/', getCards);
cardsRoutes.post('/', express.json(), joiCardData, createCard);
cardsRoutes.delete('/:cardId', joiToken, deleteCard);
cardsRoutes.put('/:cardId/likes', joiToken, likeCard);
cardsRoutes.delete('/:cardId/likes', joiToken, dislikeCard);

exports.cardsRoutes = cardsRoutes;
