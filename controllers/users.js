const User = require('../models/user');

exports.getUsers = async (req, res) => {
  try{
  const users = await User.find({});

  res.send(users)
  } catch (err) {
      res.status(500).send('На сервере произошла ошибка');
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (user) {
      res.send(user);
    } else {
        res.status(404).send('Пользователь по указанному _id не найден');
    }
  } catch (err) {
      res.status(500).send('На сервере произошла ошибка');
    }
};

exports.createUser = async (req, res) => {
  try {
    const {name, about, avatar} = req.body

    res.send(await User.create({name, about, avatar}));
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send('Переданы некорректные данные при создании пользователя');
    } else {
      res.status(500).send('На сервере произошла ошибка');
    }
  }
}

exports.updateProfileUser = async (req, res) => {
  try {
    const {name, about} = req.body
    const owner = req.user._id
    const user = await User.findByIdAndUpdate(owner, {name, about}, {new: true})

    if (owner) {
      res.send(user);
    } else {
      res.status(404).send('Пользователь с указанным _id не найден');
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send('Переданы некорректные данные при обновлении профиля');
    } else {
      res.status(500).send('На сервере произошла ошибка');
    }
  }
}

exports.updateAvatarUser = async (req, res) => {
  try {
    const {avatar} = req.body
    const owner = req.user._id
    const user = await User.findByIdAndUpdate(owner, {avatar}, {new: true})

    if (owner) {
      res.send(user);
    } else {
      res.status(404).send('Пользователь с указанным _id не найден');
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send('Переданы некорректные данные при обновлении аватара');
    } else {
      res.status(500).send('На сервере произошла ошибка');
    }
  }
}
