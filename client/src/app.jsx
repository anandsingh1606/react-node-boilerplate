import React, { useEffect, useState, Suspense } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Switch, Route, useHistory } from "react-router-dom";
const Auth = React.lazy(() => import("Modules/auth/auth.main"));
const Home = React.lazy(() => import("Modules/home/home.main"));
import useRedux from "Hooks/use-redux";
import Snackbar from "Components/snackbar";
import Header from "Components/header";
import Footer from "Components/footer";
import { redirect } from "Store/common.action";
import Lottie from "CommonComponents/lottie";
import * as loginSingup from "Animations/login-signup.json";
import "Css/theme.css";
import { styles } from "./styles";

const App = () => {
  const history = useHistory();
  const mapState = (state) => ({
    apiErrors: state.common.apiErrors,
    redirectUrl: state.common.redirectUrl,
    locale: state.common.locale,
  });

  const {
    mappedState: { apiErrors, redirectUrl, locale },
    dispatch,
  } = useRedux(mapState);
  const [showError, setShowError] = useState(null);

  const apiErrorsKeys = Object.keys(apiErrors);
  useEffect(() => {
    if (apiErrorsKeys.length) {
      setShowError(apiErrors[apiErrorsKeys[0]].errorMessage);
    } else {
      setShowError(null);
    }
  }, [apiErrorsKeys.length]);

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
      <Lottie animationData={loginSingup} background="rgb(6, 72, 127)" />
      <main className={classes.wrapper}>
        {showError && <Snackbar message={showError} handleClose={handleSnackbarClose} variant="error" />}
        <Header className={classes.header} />
        <div className={classes.container}>
          <Suspense fallback={<div style={{ display: "none" }}>Loading...</div>}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/auth" component={Auth} />
            </Switch>
          </Suspense>
        </div>
        <Footer className={classes.footer} />
      </main>
 </>
  );
};

export default App;
