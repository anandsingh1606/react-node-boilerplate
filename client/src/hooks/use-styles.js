import { makeStyles } from "@material-ui/styles";
import { styles as commonStyles } from "../styles";

export const useStyles = (styles) => {
  console.log("styles", styles);
  return makeStyles((theme) => {
    return { ...commonStyles(theme), ...styles(theme) };
  })();
};

export default useStyles;
