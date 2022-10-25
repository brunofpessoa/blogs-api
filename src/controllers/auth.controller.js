const authService = require('../services/auth.service');

const login = async (req, res, next) => {
  try {
    const { email, password } = authService.validateBody(req.body);

    const token = await authService.validateLogin({ email, password });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
