import axiosModule from "axios";
import { getCurrentLocale, getLocaleText } from "Utils/common";

export const axios = axiosModule.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 5000,
});

axios.interceptors.request.use((config) => {
  const updatedConfig = { ...config };
  updatedConfig.headers["User-Locale"] = getCurrentLocale();
  return updatedConfig;
});

export const apiErrorParser = (error = {}) => {
  return {
    errorCode: error.errorCode || "CLIENT_ERROR",
    errorMessage: error.errorMessage || getLocaleText("somethingWentWrongMessage"),
    errorTitle: "",
    errorDetails: error,
  };
};

const dataParsing = (api) => {
  return api
    .then((res) => {
      const { data } = res;
      // ANCHOR : To handle all server error in a common place and format
      if (!data.success) {
        return {
          error: apiErrorParser(data.error),
          data: data,
          serverError: true,
        };
      }
      return {
        data,
      };
    })
    .catch((error) => {
      let errorMessage = getLocaleText("somethingWentWrongMessage");
      if (!error.request || !error.request.status) {
        errorMessage = getLocaleText("serverDownMessage");
      }
      return {
        error: apiErrorParser({ ...error, errorMessage }),
      };
    });
};

export const apiGet = (url, data, config) => {
  return dataParsing(axios.get(url, config));
};

export const apiPost = (url, data, config) => {
  return dataParsing(axios.post(url, data, config));
};

export const apiPatch = (url, data, config) => {
  return dataParsing(axios.patch(url, data, config));
};

export const apiDelete = (url, data, config) => {
  return dataParsing(axios.delete(url, data, config));
};
