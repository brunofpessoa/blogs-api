const express = require('express');
const { createPost, getPosts, getPostById } = require('../controllers/post.controller');
const validateToken = require('../middlewares/tokenValidation');

const router = express.Router();

router.get('/:id', validateToken, getPostById);
router.get('/', validateToken, getPosts);
router.post('/', validateToken, createPost);

module.exports = router;
