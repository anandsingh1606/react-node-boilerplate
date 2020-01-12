import { useState } from "react";
import { updateObj } from "Utils/common";

const useModel = (model) => {
  const [state, setState] = useState(model);

  const updateControl = (key, data) => {
    const updatedState = updateObj(state, {
      controls: { [key]: { $merge: { ...data } } },
    });
    setState(updatedState);
  };

  const updateView = (data) => {
    const updatedState = updateObj(state, {
      view: updateObj(state.view,  { $merge: { ...data }}),
    });
    setState(updatedState);
  };

  return { state, updateControl, updateView };
};

export default useModel;
