const Joi = require('joi');

const { BlogPost, User, Category, PostCategory } = require('../models');
const { decodeJwt } = require('../utils/jwt.util');

const validateCategories = async (categoryIds) => {
  const { count } = await Category.findAndCountAll({
    where: { id: categoryIds },
  });

  if (count !== categoryIds.length) {
    const error = Error('one or more "categoryIds" not found');
    error.status = 400;
    throw error;
  }
};

const validateBody = async (params) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().required(),
  });

  const { error, value } = schema.validate(params);

  if (error) {
    error.message = 'Some required fields are missing';
    error.status = 400;
    throw error;
  }

  await validateCategories(value.categoryIds);

  return value;
};

const createPost = async (value, token) => {
  const { data: { id: userId } } = decodeJwt(token);

  const post = await BlogPost.create({ ...value, userId });

  const { id: postId } = post;
  const postCategories = value.categoryIds.map((categoryId) => ({ postId, categoryId }));
  await PostCategory.bulkCreate(postCategories);

  return post;
};

const getPosts = async () => BlogPost.findAll({
  include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
});

const getPostByPk = async (postId) => BlogPost.findByPk(postId, {
  include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
});

const validatePostUpdateBody = (params) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
  });

  const { error } = schema.validate(params);

  if (error) {
    error.message = 'Some required fields are missing';
    error.status = 400;
    throw error;
  }
};

const validateUpdatePostOwner = async (postId, token) => {
  const { data: { id: userId } } = decodeJwt(token);

  const { user: { id: postOwnerId } } = await getPostByPk(postId);

  if (postOwnerId !== Number(userId)) {
    const error = Error('Unauthorized user');
    error.status = 401;
    throw error;
  }
};

const updatePost = async (id, token, value) => {
  validatePostUpdateBody(value);
  await validateUpdatePostOwner(id, token);

  const { title, content } = value;
  const [qtdUpdated] = await BlogPost.update(
    { title, content },
    { where: { id } },
  );

  if (qtdUpdated > 0) {
    const updatedPost = await getPostByPk(id);
    return updatedPost;
  }

  return undefined;
};

module.exports = {
  validateBody,
  createPost,
  getPosts,
  getPostByPk,
  updatePost,
};