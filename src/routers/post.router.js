const express = require('express');
const { createPost } = require('../controllers/post.controller');
const validateToken = require('../middlewares/tokenValidation');

const router = express.Router();

router.post('/', validateToken, createPost);

module.exports = router;
