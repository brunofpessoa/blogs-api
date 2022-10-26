const loginService = require('../services/login.service');

const login = async (req, res, next) => {
  try {
    const { email, password } = loginService.validateBody(req.body);

    const token = await loginService.validateLogin({ email, password });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
