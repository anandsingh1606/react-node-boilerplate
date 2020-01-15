import { getLocaleText } from "Utils/common.util";

const addLocale = (req, res, next) => {
  const locale = req.header("User-Locale") || "en";
  res.getLocaleText = getLocaleText(locale);
  next();
};


export default addLocale;
