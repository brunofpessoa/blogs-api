const postService = require('../services/post.service');

const createPost = async (req, res, next) => {
  try {
    const { authorization: token } = req.headers;
    const value = await postService.validateBody(req.body);

    const post = await postService.createPost(value, token);

    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

const getPosts = async (_req, res) => {
  const data = await postService.getPosts();
  res.status(200).json(data);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const data = await postService.getPostByPk(id);
  if (!data) {
    return res.status(404).json({ message: 'Post does not exist' });
  }
  res.status(200).json(data);
};

module.exports = { createPost, getPosts, getPostById };
