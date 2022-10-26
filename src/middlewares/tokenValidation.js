const { validateToken: jwtValidation } = require('../utils/jwt.util');

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    const message = 'Token not found';
    return res.status(401).json({ message });
  }

  try {
    jwtValidation(authorization);
    next();
  } catch (error) {
    const { message } = error;
    return res.status(401).json({ message });
  }
};

module.exports = validateToken;
