import { useState, useEffect } from "react";

const useFormValidationCheck = (state, fieldState, formRef) => {
  const [isFormValid, setFormValidFlag] = useState(state);
  const checkValidation = () => {
    if (formRef && formRef.isFormValid) {
      formRef.isFormValid().then(value => {
        setFormValidFlag(value);
        return value ? Promise.resolve(true) : Promise.resolve(false);
      });
    }
    return Promise.resolve(false);
  };

  useEffect(() => {
    checkValidation();
  }, [fieldState]);

  return [isFormValid, checkValidation];
};

export default useFormValidationCheck;
