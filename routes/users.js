const express = require('express');
const { getUsers, getUserById, createUser, updateProfileUser, updateAvatarUser } = require('../controllers/users');

const usersRoutes = express.Router();

usersRoutes.get('/', getUsers);
usersRoutes.get('/:userId', getUserById);
usersRoutes.post('/', express.json(), createUser);
usersRoutes.patch('/me', express.json(), updateProfileUser)
usersRoutes.patch('/me/avatar', express.json(), updateAvatarUser)

exports.usersRoutes = usersRoutes;
