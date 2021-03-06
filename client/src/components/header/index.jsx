import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useLocation } from "react-router-dom";
import { isUserLoggedIn, getLocaleText } from "Utils/common";

// core components
import headerStyle from "./header.css";
import RedirectButton from "CommonComponents/redirect-button";
import RedirectDiv from "CommonComponents/redirect-div";
import HeaderUserMenu from "Components/header-user-menu";

function Header() {
  const classes = makeStyles(headerStyle)();
  const location = useLocation();
  let buttonText = getLocaleText("login");
  let redirectPath = "/auth/login";
  if (location.pathname === "/auth/login") {
    buttonText = getLocaleText("createAccount");
    redirectPath = "create-account";
  }

  return (
    <AppBar position="static" color="default" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
          <RedirectDiv redirectPath="/" componentProps={{ className: classes.companyName }}>
            Company name
          </RedirectDiv>
        </Typography>
        {isUserLoggedIn() ? (
          <HeaderUserMenu />
        ) : (
          <RedirectButton componentProps={{ color: "primary", variant: "outlined" }} redirectPath={redirectPath}>
            {buttonText}
          </RedirectButton>
        )}
      </Toolbar>
    </AppBar>
  );
}

Header.defaultProp = {};

export default Header;
