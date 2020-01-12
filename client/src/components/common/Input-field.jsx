import React from "react";
import PropTypes from "prop-types";
import { ValidatorComponent } from "react-form-validator-core";
import { TextField, InputAdornment } from "@material-ui/core";
import Text from "./text";
import { getLocaleText } from "Utils/common";

class InputField extends ValidatorComponent {
  handleValueChange = (e) => {
    const { handleChange, name } = this.props;
    handleChange(name, { value: e.target.value });
  };

  getHelperText = () => {
    if (this.state.isValid) {
      return <Text>{this.props.helperText}</Text>;
    }
    const { defaultMessage, msg } = this.getErrorMessage();
    let localeText = getLocaleText(defaultMessage);
    if (!msg) {
      return localeText;
    }

    if (typeof msg === "object") {
      Object.entries(msg).forEach((entry) => {
        const key = entry[0];
        const value = entry[1];
        localeText = localeText.replace(`{{${key}}}`, getLocaleText(value));
      });
      return localeText;
    }

    return getLocaleText(msg);
  };

  render() {
    const {
      errorMessages,
      validators,
      requiredError,
      validatorListener,
      withRequiredValidator,
      handleChange,
      prefix,
      label,
      ...rest
    } = this.props;

    const otherProps = {};
    if (prefix) {
      otherProps.InputProps = {
        startAdornment: <InputAdornment position="start">{prefix}</InputAdornment>,
      };
    }

    return (
      <>
        <TextField
          onChange={this.handleValueChange}
          variant="outlined"
          label={<Text>{label}</Text>}
          helperText={this.getHelperText()}
          error={!this.state.isValid}
          ref={(r) => {
            this.input = r;
          }}
          {...otherProps}
          {...rest}
        />
      </>
    );
  }
}

InputField.propTypes = {
  errorMessages: PropTypes.array,
  validators: PropTypes.array,
  withRequiredValidator: PropTypes.bool,
  handleChange: PropTypes.func,
  prefix: PropTypes.any,
};

export default InputField;
