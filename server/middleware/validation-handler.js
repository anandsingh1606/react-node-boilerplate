const { validationResult } = require("express-validator/check");

const validationHandler = (req, res, next) => {
  const errors = validationResult(req).array({ onlyFirstError: true });
  if (errors.length) {
    res
      .status(200)
      .json({
        error: {
          errorMessage: req.getLocale("invalidDataErrorMessage"),
          errorTitle: "Invalid data",
          errorCode: "SERVER_ERROR",
          errorDetails: {},
        },
      });
  } else {
    next();
  }
};

export default validationHandler;
