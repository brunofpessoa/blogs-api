const express = require('express');
const { createPost, getPosts } = require('../controllers/post.controller');
const validateToken = require('../middlewares/tokenValidation');

const router = express.Router();

router.get('/', validateToken, getPosts);
router.post('/', validateToken, createPost);

module.exports = router;
