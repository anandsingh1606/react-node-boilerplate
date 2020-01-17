import React from "react";
import PropTypes from "prop-types";
import { getLocaleText } from "Utils/common";
import Typography from "@material-ui/core/Typography";

const Text = (props) => {
  const { localeKey, children, ...otherProps } = props;
  return (
    <Typography {...otherProps}>
      {getLocaleText(children || localeKey)}
    </Typography>
  );
};

Text.defaultProps = {
  localeKey: "",
  children: "",
};

Text.propTypes = {
  localeKey: PropTypes.string,
  children: PropTypes.node,
};

export default Text;
