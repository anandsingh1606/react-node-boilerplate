import React, {
  useEffect, useState, Suspense,
} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Switch, Route, useHistory } from "react-router-dom";
import useRedux from "Hooks/use-redux";
import Snackbar from "Components/snackbar";
import Header from "Components/header";
import Footer from "Components/footer";
import { redirect } from "Store/common.action";
import ParticlesBg from "particles-bg";
import "Css/theme.css";
import { styles } from "./styles";
import Text from "./test";

const Auth = React.lazy(() => import("Modules/auth/auth.main"));
const Home = React.lazy(() => import("Modules/home/home.main"));

const App = () => {
  const history = useHistory();
  const mapState = (state) => ({
    // apiErrors: state.common.apiErrors,
    redirectUrl: state.common.redirectUrl,
    locale: state.common.locale,
  });
  const {
    mappedState: { redirectUrl },
    dispatch,
  } = useRedux(mapState);
  const [showError, setShowError] = useState(null);

  // const apiErrorsKeys = Object.keys(apiErrors);
  // useEffect(() => {
  //   if (apiErrorsKeys.length) {
  //     setShowError(apiErrors[apiErrorsKeys[0]].errorMessage);
  //   } else {
  //     setShowError(null);
  //   }
  // }, [apiErrorsKeys.length]);

  // handle global redirect
  useEffect(() => {
    if (redirectUrl) {
      history.push(redirectUrl);
      dispatch(redirect(null));
    }
  }, [redirectUrl]);

  const handleSnackbarClose = () => {
    setShowError(null);
  };

  const classes = makeStyles(styles)();
  return (
    <>
      <ParticlesBg type="circle" bg />
      <main className={classes.wrapper}>
        {showError && <Snackbar message={showError} handleClose={handleSnackbarClose} variant="error" />}
        <Header className={classes.header} />
        <div className={classes.container}>
          <Suspense fallback={<div style={{ display: "none" }}>Loading...</div>}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/auth" component={Auth} />
              <Route path="/test" component={Text} />
            </Switch>
          </Suspense>
        </div>
        <Footer className={classes.footer} />
      </main>
    </>
  );
};

export default App;
