const express = require('express');
const { createUser, getUsers, getUserById } = require('../controllers/user.controller');
const validateToken = require('../middlewares/tokenValidation');

const router = express.Router();

router.get('/:id', validateToken, getUserById);
router.get('/', validateToken, getUsers);
router.post('/', createUser);

module.exports = router;
