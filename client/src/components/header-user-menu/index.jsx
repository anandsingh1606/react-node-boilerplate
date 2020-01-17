import React from "react";
import { Menu, MenuItem, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import Text from "CommonComponents/text";
import { logout } from "Modules/auth/store/auth.action";
import { redirect } from "Store/common.action";
import useRedux from "Hooks/use-redux";

const HeaderUserMenu = () => {
  const { dispatch } = useRedux();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("USER_TOKEN");
    handleClose();
    dispatch(logout());
    dispatch(redirect("/auth/login"));
  };

  return (
    <>
      <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <MenuIcon />
      </IconButton>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleLogout}><Text>logout</Text></MenuItem>
      </Menu>
    </>
  );
};

export default HeaderUserMenu;
