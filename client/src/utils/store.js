import { apiGet, apiPost } from "./api";

export const requestDispatch = ({ ACTION }) => {
  return {
    type: ACTION.REQUEST,
    actionKey: ACTION.KEY,
  };
};

export const errorDispatch = ({ ACTION, error }) => {
  return {
    type: ACTION.ERROR,
    error: error,
    actionKey: ACTION.KEY,
  };
};

export const successDispatch = ({ ACTION, data }) => {
  return {
    type: ACTION.SUCCESS,
    data: data,
    actionKey: ACTION.KEY,
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
  } = params;

  if (requestDispatchEnable) {
    dispatch(requestDispatch({ ACTION }));
  }
  return apiGet(url, config).then((response) => {
    if (response.error && errorDispatchEnable) {
      dispatch(errorDispatch({ ACTION, error: response.error }));
      return response;
    }
    if (successDispatchEnable) {
      dispatch(successDispatch({ ACTION, data: response.data }));
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
  } = params;

  if (requestDispatchEnable) {
    dispatch(requestDispatch({ ACTION }));
  }
  return apiPost(url, data, config).then((response) => {
    if (response.error && errorDispatchEnable) {
      dispatch(errorDispatch({ ACTION, error: response.error }));
      return response;
    }
    if (successDispatchEnable) {
      dispatch(successDispatch({ ACTION, data: response.data }));
      return response;
    }
    return response;
  });
};
