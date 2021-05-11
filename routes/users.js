const express = require('express');

const {
  getUsers, getUserById, updateProfileUser, updateAvatarUser, getUser,
} = require('../controllers/users');
const { joiToken, joiProfileUser, joiAvatarUser } = require('../middlewares/joi');

const usersRoutes = express.Router();

usersRoutes.get('/', getUsers);
usersRoutes.get('/me', joiToken, getUser);
usersRoutes.patch('/me', express.json(), joiProfileUser, updateProfileUser);
usersRoutes.patch('/me/avatar', express.json(), joiAvatarUser, updateAvatarUser);
usersRoutes.get('/:userId', getUserById);

exports.usersRoutes = usersRoutes;
