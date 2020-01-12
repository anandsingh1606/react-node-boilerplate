import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SelectLanguage from "Components/select-language";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./footer.css";

const Footer = () => {
  const classes = makeStyles(styles)();
  return (
    <AppBar position="static" color="default" className={classes.footer}>
      <Toolbar className={classes.toolbar}>
        <SelectLanguage />
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
