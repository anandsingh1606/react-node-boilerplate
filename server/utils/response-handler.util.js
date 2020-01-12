import { errorCodes } from "Constants";
export const modelResponseHandler = (promise, res, transaction) => {
  return new Promise((resolve) => {
    promise
      .then((result) => {
        if (res) resolve(result);
        else resolve({result});
      })
      .catch((e) => {
        console.log("Database error:", e);
        if(transaction){
          transaction.rollback();
        }
        if (res) {
          return apiResponseHandler(res).error({ errorCode: errorCodes.DATABASE_ERROR });
        }
        resolve({error:e});
      });
  });
};

export const apiResponseHandler = (res) => ({
  success: (data = {}) => {
    res.json({ success: true, data: data });
  },
  error: (error = {}) => {
    const { errorCode = errorCodes.SERVER_ERROR, errorMessage = "", errorTitle = "", errorDetails = {} } = error;
    res.json({
      success: false,
      error: {
        errorCode,
        errorMessage,
        errorTitle,
        errorDetails,
      },
    });
  },
});
