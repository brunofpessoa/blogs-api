const express = require('express');
const { createCategory, getCategories } = require('../controllers/category.controller');
const validateToken = require('../middlewares/tokenValidation');

const router = express.Router();

router.get('/', validateToken, getCategories);
router.post('/', validateToken, createCategory);

module.exports = router;
