import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { Provider as ReduxProvider } from "react-redux";
import { MuiThemeProvider } from "@material-ui/core/styles";
import reduxStore from "Store/app.store";

import App from "app";
import theme from "./styles";

render(
  <ReduxProvider store={reduxStore}>
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </BrowserRouter>
  </ReduxProvider>,
  document.getElementById("index")
);
