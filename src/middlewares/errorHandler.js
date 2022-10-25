const errorHandler = (err, req, res, _next) => {
  const status = err.status || 500;
  const message = err.message || 'Something failed!';

  return res.status(status).json({ message });
};

module.exports = errorHandler;
