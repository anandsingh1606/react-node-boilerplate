import React from "react";
import PropTypes from "prop-types";
import {
  Avatar, LinearProgress, Grid, Slide, IconButton
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import Paper from "@material-ui/core/Paper";
import Text from "CommonComponents/text";
import { makeStyles } from "@material-ui/core/styles";
import { ValidatorForm } from "react-form-validator-core";

import styles from "../../auth.css";
import InputField from "../../../../components/common/input-field";
import { fields } from "../../auth.model";

const MobileVerifyOtp = (props) => {
  const classes = makeStyles(styles)();
  const {
    handleSubmit, inProgress, direction = "left", controls, isFormValid, formRef, updateControl, handleBack
  } = props;

  return (
    <Slide direction={direction} in timeout={direction ? 100 : 0}>
      <main className={classes.main}>
        <CssBaseline />
        <Grid className={classes.authCard}>
          <LinearProgress className={classes.progressCss} style={!inProgress ? { visibility: "hidden" } : { visibility: "visible" }} />
          <Paper className={classes.paper}>
            <IconButton onClick={handleBack} className={classes.paperNavIcon}>
              <KeyboardBackspaceIcon />
            </IconButton>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Text component="h1" variant="h5">
              verifyMobile
            </Text>
            <ValidatorForm onSubmit={() => false} className={classes.form} instantValidate ref={formRef}>
              <FormControl margin="normal" fullWidth>
                <InputField {...controls[fields.OTP]} handleChange={updateControl} />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={!isFormValid}
                onClick={handleSubmit}>
                <Text>verifyMobile</Text>
              </Button>
            </ValidatorForm>
          </Paper>
        </Grid>
      </main>
    </Slide>
  );
};

MobileVerifyOtp.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  inProgress: PropTypes.bool.isRequired,
  direction: PropTypes.string.isRequired,
  controls: PropTypes.object.isRequired,
  isFormValid: PropTypes.bool.isRequired,
  formRef: PropTypes.object.isRequired,
  updateControl: PropTypes.func.isRequired,
  view: PropTypes.object.isRequired,
};

export default MobileVerifyOtp;
