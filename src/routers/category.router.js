const express = require('express');
const { createCategory } = require('../controllers/category.controller');
const validateToken = require('../middlewares/tokenValidation');

const router = express.Router();

router.post('/', validateToken, createCategory);

module.exports = router;
