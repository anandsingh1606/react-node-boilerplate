import React from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

function RedirectButton(props) {
  const { redirectPath, children, componentProps } = props;
  const history = useHistory();
  const onClick = () => {
    history.push(redirectPath);
  };
  return (
    <Button onClick={onClick} {...componentProps}>
      {children}
    </Button>
  );
}

RedirectButton.propTypes = {
  redirectPath: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  componentProps: PropTypes.object,
};

RedirectButton.defaultProps = {
  componentProps: {},
};
export default RedirectButton;
