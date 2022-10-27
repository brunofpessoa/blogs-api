const Joi = require('joi');

const { BlogPost, Category, PostCategory } = require('../models');
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

module.exports = {
  validateBody,
  createPost,
};