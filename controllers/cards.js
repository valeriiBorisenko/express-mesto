const Card = require('../models/card');

exports.getCards = async (req, res) => {
  try{
    const cards = await Card.find({});

    res.send(cards);
  } catch (err) {
    res.status(500).send('На сервере произошла ошибка');
  }
};

exports.createCard = async (req, res) => {
  try {
    const {name, link} = req.body
    const owner = req.user._id

    res.send(
      await Card.create({name, link, owner})),
      await Card.populate(['owner', 'likes'])
    } catch (err) {
      if (err.name === 'ValidationError'){
        res.status(400).send('Переданы некорректные данные при создании карточки');
      } else {
        res.status(500).send('На сервере произошла ошибка')
      }
  }
};

exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndRemove(req.params.cardId);

    res.send(await card.delete());
    console.log('Card delete')
  } catch (err) {
        res.status(404).send('Карточка с указанным _id не найдена');
  }
}

module.exports.likeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(req.params.cardId, {$addToSet: { likes: req.user._id }}, { new: true })

    if(card){
      res.send(card)
    } else {
      res.status(400).send('Переданы некорректные данные для постановки лайка.')
    }
  } catch (err) {
      res.status(500).send('На сервере произошла ошибка');
    }
}

exports.dislikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(req.params.cardId, {$pull: { likes: req.user._id }}, { new: true })

    if(card){
      res.send(card)
    } else {
      res.status(400).send('Переданы некорректные данные для снятия лайка.')
    }
  } catch (err) {
      res.status(500).send('На сервере произошла ошибка');
    }
}