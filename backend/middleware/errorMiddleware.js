const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const response = {
    message: err.message,
  };

  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  res.status(status).json(response);
};

const invalidPathHandler = (req, res, next) => {
  res.status(404).send("Invalid path");
};

module.exports = { errorHandler, invalidPathHandler };
