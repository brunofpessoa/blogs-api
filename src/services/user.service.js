const Joi = require('joi');

const jwtUtil = require('../utils/jwt.util');
const { User } = require('../models');

const validateBody = (params) => {
  const schema = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    image: Joi.string(),
  });

  const { error, value } = schema.validate(params);

  if (error) {
    error.status = 400;
    throw error;
  }

  return value;
};

const createUser = async ({ displayName, email, password, image }) =>
  User.create({ displayName, email, password, image });

const validateUser = async (value) => {
  const { email } = value;
  const user = await User.findOne({ where: { email } });

  if (user) {
    const err = new Error('User already registered');
    err.status = 409;
    throw err;
  }

  const newUser = await createUser(value);

  const { password: _, ...userWithoutPassword } = newUser.dataValues;

  const token = jwtUtil.createToken(userWithoutPassword);

  return token;
};

const getUsers = async () => User.findAll({
  attributes: { exclude: ['password'] },
});

const getUserById = async (id) => {
  const data = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  });

  if (!data) {
    const error = Error('User does not exist');
    error.status = 404;
    throw error;
  }

  return data;
};

module.exports = {
  validateBody,
  validateUser,
  getUsers,
  getUserById,
};
