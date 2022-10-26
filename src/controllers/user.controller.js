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

const getUsers = async (_req, res) => {
  const data = await userService.getUsers();
  res.status(200).json(data);
};

module.exports = { createUser, getUsers };
