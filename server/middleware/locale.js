import { getLocaleText } from "Utils/common";

const addLocale = (req, res, next) => {
  const locale = req.header("User-Locale") || "en";
  res.getLocaleText = getLocaleText(locale);
  next();
};


export default addLocale;
