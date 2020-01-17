import { log } from "Utils/common";

const dataSanitizer = (req, res, next) => {
  if (typeof req.body === "object") {
    Object.keys(req.body).forEach((key) => {
      const itemValue = req.body[key];
      if (typeof itemValue === "string") {
        req.body[key] = itemValue.trim();
      } else {
        log(["Sanitize value is not string", key, req.body[key]]);
      }
    });
  } else {
    log("No data available to sanitize");
    log(req.body, "form-body", "dir");
  }
  next();
};

export default dataSanitizer;
