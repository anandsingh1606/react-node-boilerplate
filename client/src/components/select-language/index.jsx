import React from "react";
import { Select, MenuItem } from "@material-ui/core";
import useRedux from "Hooks/use-redux";
import { setLocale } from "Store/common.action";
import { localeList } from "Constants";

const SelectLanguage = () => {
  const mapState = (state) => ({
    locale: state.common.locale,
  });
  const {
    mappedState: { locale },
    dispatch,
  } = useRedux(mapState);


  const handleValueChange = (e) => {
    dispatch(setLocale(e.target.value));
  };


  return (
    <Select
      value={locale}
      disableUnderline
      onChange={handleValueChange}>
      {localeList.map((localeItem) => (
        <MenuItem key={localeItem.key} value={localeItem.key}>
          {localeItem.name}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectLanguage;
