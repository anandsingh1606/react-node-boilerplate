import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import WarningIcon from "@material-ui/icons/Warning";
import { makeStyles } from '@material-ui/core/styles';

import styles from "./styles";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const CustomSnackbar = (props) => {
  const {
    open = true,
    origin = {
      vertical: "top",
      horizontal: "center",
    },
    hideDuration = 6000,
    action = [],
    message = "",
    variant = "info",
    handleClose,
  } = props;
  const Icon = variantIcon[variant];
  const classes = makeStyles(styles)();
  return (
    <div>
      <Snackbar
        anchorOrigin={origin}
        open={open}
        autoHideDuration={hideDuration}
        onClose={handleClose}
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        message={<span id="message-id">Note archived</span>}
        action={[
          <IconButton key="close" aria-label="close" color="inherit" className={classes.close} onClick={handleClose}>
            <CloseIcon />
          </IconButton>,
          ...action,
        ]}>
        <SnackbarContent
          className={clsx(classes[variant])}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={classes.message}>
              <Icon className={clsx(classes.icon, classes.iconVariant)} />
              {message}
            </span>
          }
          action={[
            <IconButton key="close" aria-label="close" color="inherit" className={classes.close} onClick={handleClose}>
              <CloseIcon />
            </IconButton>,
            ...action,
          ]}
        />
      </Snackbar>
    </div>
  );
};

CustomSnackbar.propTypes = {
  message: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};
export default CustomSnackbar;
