const categoryService = require('../services/category.service');

const createCategory = async (req, res, next) => {
  try {
    const { name } = categoryService.validateBody(req.body);

    const data = await categoryService.createCategory(name);

    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

const getCategories = async (_req, res) => {
  const data = await categoryService.getCategories();

  res.status(200).json(data);
};

module.exports = { createCategory, getCategories };
