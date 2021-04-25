const express = require('express');
const { getCards, createCard, deleteCard, likeCard, dislikeCard } = require('../controllers/cards');

const cardsRoutes = express.Router();

cardsRoutes.get('/', getCards);
cardsRoutes.post('/', express.json(), createCard);
cardsRoutes.delete('/:cardId', deleteCard);
cardsRoutes.put('/:cardId/likes', likeCard);
cardsRoutes.delete('/:cardId/likes', dislikeCard);

exports.cardsRoutes = cardsRoutes;
