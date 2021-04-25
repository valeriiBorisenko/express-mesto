const User = require('../models/user');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.send(users);
  } catch (err) {
    res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).orFail(new Error('CastError'));

    res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(404).send({ message: 'Пользователь с указанным _id не найден' });
    } else {
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    }
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;

    res.send(await User.create({ name, about, avatar }));
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя' });
    } else {
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    }
  }
};

exports.updateProfileUser = async (req, res) => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true }).orFail(new Error('CastError'));

    res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля' });
    } else if (err.name === 'CastError') {
      res.status(404).send({ message: 'Пользователь с указанным _id не найден' });
    } else {
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    }
  }
};

exports.updateAvatarUser = async (req, res) => {
  try {
    const { avatar } = req.body;
    const owner = req.user._id;
    const user = await User.findByIdAndUpdate(owner, { avatar }, { new: true, runValidators: true }).orFail(new Error('CastError'));

    res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Переданы некорректные данные при обновлении аватара' });
    } else if (err.name === 'CastError') {
      res.status(404).send({ message: 'Пользователь с указанным _id не найден' });
    } else {
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    }
  }
};
