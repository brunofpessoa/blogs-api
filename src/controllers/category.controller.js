const categoryService = require('../services/category.service');

const createCategory = async (req, res, next) => {
  try {
    const { name } = categoryService.validateBody(req.body);

    const data = await categoryService.createCategory(name);

    console.log(data);

    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = { createCategory };
