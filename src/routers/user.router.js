const express = require('express');
const { createUser, getUsers } = require('../controllers/user.controller');
const validateToken = require('../middlewares/tokenValidation');

const router = express.Router();

router.get('/', validateToken, getUsers);
router.post('/', createUser);

module.exports = router;
