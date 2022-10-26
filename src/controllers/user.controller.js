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

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await userService.getUserById(id);
    res.status(200).json(data);
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
};

module.exports = { createUser, getUsers, getUserById };
