import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#283593" },
    secondary: { main: "#f44336" },
  },
  status: {
    danger: "orange",
  },
});

export default theme;

export const styles = {
  wrapper: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    height: "45px",
  },
  container: { flex: 1, position: "relative", color: "#fafafa" },
  footer: {
    height: "32px",
  },
};
