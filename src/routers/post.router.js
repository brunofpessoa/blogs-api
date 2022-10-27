const express = require('express');
const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
} = require('../controllers/post.controller');
const validateToken = require('../middlewares/tokenValidation');

const router = express.Router();

router.get('/:id', validateToken, getPostById);
router.get('/', validateToken, getPosts);
router.post('/', validateToken, createPost);
router.put('/:id', validateToken, updatePost);

module.exports = router;
