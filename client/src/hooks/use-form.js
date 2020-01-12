import { cloneDeep } from "lodash";
import useFormValidationCheck from "Hooks/use-form-validation";
import useModel from "Hooks/use-model";

const useForm = (model, formRef) => {
  const {
    updateControl,
    updateView,
    state: { controls,view },
  } = useModel(() => cloneDeep(model));
  const [isFormValid] = useFormValidationCheck(false, controls, formRef.current);
  return {updateControl,updateView, controls, view, isFormValid }
};

export default useForm;
