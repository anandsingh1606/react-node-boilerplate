import React from "react";
import PropTypes from "prop-types";
import {
  Avatar, LinearProgress, Grid, Slide
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Text from "CommonComponents/text";
import { makeStyles } from "@material-ui/core/styles";
import { ValidatorForm } from "react-form-validator-core";
import { fields } from "../../auth.model";

import styles from "../../auth.css";
import InputField from "../../../../components/common/input-field";

import SelectCountryCode from "Components/select-country-code";

function MobileSendOtp(props) {
  const classes = makeStyles(styles)();
  const {
    handleSubmit, inProgress, direction = "left", controls, isFormValid, formRef, updateControl, view
  } = props;

  return (
    <Slide direction={direction} in timeout={direction ? 100 : 0}>
      <main className={classes.main}>
        <CssBaseline />
        <Grid className={classes.authCard}>
          <LinearProgress className={classes.progressCss} style={!inProgress ? { visibility: "hidden" } : { visibility: "visible" }} />
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Text component="h1" variant="h5">
              {view.title}
            </Text>
            <ValidatorForm onSubmit={() => false} className={classes.form} instantValidate ref={formRef}>
              {controls[fields.DISPLAY_NAME] && (
                <FormControl margin="normal" fullWidth>
                  <InputField {...controls[fields.DISPLAY_NAME]} handleChange={updateControl} />
                </FormControl>
              )}

              <FormControl margin="normal" fullWidth>
                <InputField
                  {...controls[fields.MOBILE_NUMBER]}
                  prefix={<SelectCountryCode {...controls[fields.COUNTRY_CODE]} handleChange={updateControl} />}
                  handleChange={updateControl}
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={!isFormValid}
                onClick={handleSubmit}>
                <Text>sendOtp</Text>
              </Button>
            </ValidatorForm>
          </Paper>
        </Grid>
      </main>
    </Slide>
  );
}

MobileSendOtp.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  inProgress: PropTypes.bool.isRequired,
  direction: PropTypes.string.isRequired,
  controls: PropTypes.object.isRequired,
  isFormValid: PropTypes.bool.isRequired,
  formRef: PropTypes.object.isRequired,
  updateControl: PropTypes.func.isRequired,
  view: PropTypes.object.isRequired,
};

export default MobileSendOtp;
