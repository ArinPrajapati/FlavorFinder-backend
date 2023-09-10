const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 400;
  switch (statusCode) {
    case constants.NOT_FOUND:
      res.json({
        title: "it's not found ",
        message: err.message,
        stactTrace: err.stack,
      });
      break;
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation failed!!",
        message: err.message,
        stactTrace: err.stack,
      });
      break;
    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden!!!! ",
        message: err.message,
        stactTrace: err.stack,
      });
      break;
    case constants.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        message: err.message,
        stactTrace: err.stack,
      });
      break;
    case constants.SERVER_ERROR:
      res.json({
        title: "Sever Error",
        message: err.message,
        stactTrace: err.stack,
      });
      break;
    default:
      console.log("No Error , On The Server Side!");
      break;
  }
};

module.exports = errorHandler;