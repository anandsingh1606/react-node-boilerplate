import { apiGet, apiPost } from "./api";

export const requestDispatch = ({ ACTION, moduleName }) => {
  return {
    type: `${ACTION}Request`,
    reduxAutoHandlerType: "request",
    actionKey: ACTION,
    moduleName,
  };
};

export const errorDispatch = ({ ACTION, error, moduleName }) => {
  return {
    type: `${ACTION}Error`,
    reduxAutoHandlerType: "error",
    error: error,
    actionKey: ACTION,
    moduleName
  };
};

export const successDispatch = ({ ACTION, data, moduleName }) => {
  return {
    reduxAutoHandlerType: "success",
    type: `${ACTION}Success`,
    data: data,
    actionKey: ACTION,
    moduleName
  };
};

export const apiGetDispatch = (dispatch, params) => {
  const {
    actionType: ACTION,
    requestDispatchEnable = true,
    errorDispatchEnable = true,
    successDispatchEnable = true,
    url,
    config,
    moduleName
  } = params;

  if (requestDispatchEnable) {
    dispatch(requestDispatch({ ACTION, moduleName }));
  }
  return apiGet(url, config).then((response) => {
    if (response.error && errorDispatchEnable) {
      dispatch(errorDispatch({ ACTION, error: response.error, moduleName }));
      return response;
    }
    if (successDispatchEnable) {
      dispatch(successDispatch({ ACTION, data: response.data.data, moduleName }));
      return response;
    }
    return response;
  });
};

export const apiPostDispatch = (dispatch, params) => {
  const {
    actionType: ACTION,
    requestDispatchEnable = true,
    errorDispatchEnable = true,
    successDispatchEnable = true,
    url,
    data,
    config,
    moduleName
  } = params;

  if (requestDispatchEnable) {
    dispatch(requestDispatch({ ACTION, moduleName }));
  }
  return apiPost(url, data, config).then((response) => {
    if (response.error && errorDispatchEnable) {
      dispatch(errorDispatch({ ACTION, error: response.error, moduleName }));
      return response;
    }
    if (successDispatchEnable) {
      dispatch(successDispatch({ ACTION, data: response.data.data, moduleName }));
      return response;
    }
    return response;
  });
};

export const apiReducer = (state, action, module) => {
  const {
    actionKey, errorActionKey, moduleName: actionModule, reduxAutoHandlerType
  } = action;
  if (!actionKey || !actionModule || actionModule !== module || !reduxAutoHandlerType) {
    return state;
  }

  switch (reduxAutoHandlerType) {
    case "request":
      return {
        ...state,
        [`${actionKey}Start`]: true,
        [errorActionKey || `${actionKey}Error`]: null,
        [actionKey]: null,
      };
    case "success":
      return {
        ...state,
        [`${actionKey}Start`]: false,
        [errorActionKey || `${actionKey}Error`]: null,
        [actionKey]: action.data,
      };
    case "error":
      return { ...state, [`${actionKey}Start`]: false, [errorActionKey || `${actionKey}Error`]: action.data };
    default:
      return state;
  }
};
