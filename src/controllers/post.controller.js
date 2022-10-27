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

module.exports = { createPost, getPosts };
