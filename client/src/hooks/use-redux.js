import { shallowEqual, useSelector, useDispatch } from "react-redux";


const useRedux = (mapState = () => {}) => {
  const mappedState = useSelector(mapState, shallowEqual);
  return { dispatch: useDispatch(), mappedState };
};
export default useRedux;
