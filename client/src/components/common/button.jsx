import React from "react";
import Button from "@material-ui/core/Button";
import useStyles from "Hooks/use-styles";
import styles from "./styles";
import clsx from "clsx";

const CustomButton = (props) => {
  const {
    children, size, variant, ...restProps
  } = props;
  const classes = useStyles(styles);
  return (
    <Button className={clsx(classes[size], classes[variant])} {...restProps}>
      {children}
    </Button>
  );
};

export default CustomButton;
