/* eslint-disable no-param-reassign */
import { modelResponseHandler } from "Utils/response-handler";


const get = (modelObj, where, other = {}) => {
  const { res, transaction, ...otherOptions } = other;
  return modelResponseHandler(
    modelObj
      .findAll({
        where,
        attributes: ["id"],
        limit: 1,
        transaction,
        ...otherOptions,
      })
      .then((result) => {
        if (result.length) {
          if (otherOptions.limit) {
            return result;
          }
          return result[0];
        }
        return null;
      }),
    res,
    transaction
  );
};
// eslint-disable-next-line import/prefer-default-export
export const withCommonOperation = (modelObj) => {
  modelObj.get = (where, other = {}) => {
    return get(modelObj, where, other);
  };

  modelObj.getActive = (where, other = {}) => {
    return get(modelObj, { ...where, active: true }, other);
  };

  modelObj.add = (row, other = {}) => {
    const { res, transaction } = other;
    return modelResponseHandler(modelObj.create(row, { transaction }), res, transaction);
  };

  modelObj.set = (data, where, other = {}) => {
    const { res, transaction } = other;
    return modelResponseHandler(modelObj.update(data, { where, transaction }), res, transaction);
  };

  return modelObj;
};
