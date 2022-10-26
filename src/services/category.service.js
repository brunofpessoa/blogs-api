const Joi = require('joi');

const { Category } = require('../models');

const validateBody = (params) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });

  const { error, value } = schema.validate(params);

  if (error) {
    error.status = 400;
    throw error;
  }

  return value;
};

const createCategory = async (name) =>
  Category.create({ name });

const getCategories = async () => Category.findAll();

module.exports = { validateBody, createCategory, getCategories };