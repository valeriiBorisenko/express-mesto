const Card = require('../models/card');

exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({});

    res.send(cards);
  } catch (err) {
    res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};

exports.createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const owner = req.user._id;

    res.send(
      await Card.create({ name, link, owner }),
    );
    await Card.populate(['owner', 'likes']);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Переданы некорректные данные при создании карточки' });
    } else {
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    }
  }
};

exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndRemove(req.params.cardId).orFail(new Error('NotValidId'));

    res.send(await card.delete());
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Переданы некорректные данные для удаления карточки' });
    } else if (err.message === 'NotValidId') {
      res.status(404).send({ message: 'Карточка с указанным _id не найдена' });
    } else {
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    }
  }
};

exports.likeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true }).orFail(new Error('NotValidId'));

    res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Переданы некорректные данные для постановки лайка' });
    } else if (err.message === 'NotValidId') {
      res.status(404).send({ message: 'Карточка с указанным _id не найдена' });
    } else {
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    }
  }
};

exports.dislikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true }).orFail(new Error('NotValidId'));

    res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Переданы некорректные данные для снятия лайка' });
    } else if (err.message === 'NotValidId') {
      res.status(404).send({ message: 'Карточка с указанным _id не найдена' });
    } else {
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    }
  }
};
