const userService = require('../services/user.service');

const createUser = async (req, res, next) => {
  try {
    const value = userService.validateBody(req.body);

    const token = await userService.validateUser(value);

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = { createUser };
