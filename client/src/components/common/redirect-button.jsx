import React from "react";
import { Button } from "@material-ui/core";
import { withRouter } from "react-router";
import PropTypes from "prop-types";

function RedirectButton(props) {
  const {
    history, redirectPath, children, componentProps
  } = props;
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
  history: PropTypes.object.isRequired,
  redirectPath: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  componentProps: PropTypes.object,
};

RedirectButton.defaultProps = {
  componentProps: {},
};
export default withRouter(RedirectButton);
