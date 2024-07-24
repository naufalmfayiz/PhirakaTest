function errorHandler(err, req, res, next) {
  let status = err.status;
  let message = err.message;

  switch (err.name) {
    case "InvalidToken":
    case "JsonWebTokenError":
      status = 401;
      message = "Unauthenticated";
      break;
    case "Forbidden":
      status = 403;
      message = "You are not authorized";
      break;
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = err.errors.map((err) => err.message);
      break;
    case "ReCaptchaFailed":
      status = 400;
      message = "ReCaptcha failed";
      break;
    case "FileRequired":
      status = 400;
      message = "File is required";
      break;
    case "NotFound":
      status = 404;
      message = "Data not found.";
      break;
    case "InvalidInput":
      status = 400;
      message = "Email/Password is required";
      break;
    case "InvalidUser":
      status = 401;
      message = "Invalid Email/Password";
      break;

    default:
      status = 500;
      message = "Internal Server Error";
      break;
  }

  return res.status(status).json({ message });
}

module.exports = errorHandler;
