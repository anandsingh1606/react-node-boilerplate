import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

function RedirectDiv(props) {
  const {
    redirectPath, children, componentProps
  } = props;
  const history = useHistory();
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
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  componentProps: PropTypes.object,
};

RedirectDiv.defaultProps = {
  componentProps: {},
};
export default RedirectDiv;
