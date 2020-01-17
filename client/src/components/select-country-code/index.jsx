import React from "react";
import PropTypes from "prop-types";
import { Select, MenuItem } from "@material-ui/core";
import { getCountries, getCountryCallingCode } from "react-phone-number-input/input";
import en from "react-phone-number-input/locale/en.json";

const SelectCountryCode = ({ value, handleChange, name }) => {
  const handleValueChange = (e) => {
    handleChange(name, { value: e.target.value });
  };

  return (
    <Select
      value={value}
      disableUnderline
      onChange={handleValueChange}
      renderValue={(value) => {
        return `+${getCountryCallingCode(value)}`;
      }}>
      {getCountries().map((country, i) => (
        <MenuItem key={i} value={country}>
          {en[country]}
          {" "}
+
          {getCountryCallingCode(country)}
        </MenuItem>
      ))}
    </Select>
  );
};


SelectCountryCode.propTypes = {
  value: PropTypes.string,
  handleChange: PropTypes.func,
  name: PropTypes.string,
};

export default SelectCountryCode;
