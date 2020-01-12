import React from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";

function RedirectDiv(props) {
  const { history, redirectPath, children, componentProps } = props;
  const onClick = () => {
    history.push(redirectPath);
  };
  return (
    <div onClick={onClick} role="presentation" {...componentProps}>
      {children}
    </div>
  );
}

RedirectDiv.propTypes = {
  history: PropTypes.object.isRequired,
  redirectPath: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  componentProps: PropTypes.object,
};

RedirectDiv.defaultProps = {
  componentProps: {},
};
export default withRouter(RedirectDiv);
