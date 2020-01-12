import { useEffect, useRef, useState } from "react";
import { useHistory } from 'react-router-dom'

const useMobileOtp = (params) => {
  const { sendError, sendStart, token, verifyStart } = params;
  
  // view handing
  const [{ viewType, direction }, setView] = useState({ viewType: "MOBILE_FORM", direction: null });
  const [inProgress, setProgress] = useState(false);

  // history project
  let history = useHistory()


  // effects
  const firstUpdate = useRef(true);
  useEffect(() => {
    // to prevent first render
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    if (sendStart === true) {
      setProgress(true);
    }
    if (sendStart === false) {
      setProgress(false);
      if (!sendError) {
        setView({ viewType: "OTP_FORM", direction: "left" });
      }
    }
  }, [sendStart, sendError]);

  useEffect(() => {
    if (verifyStart === true) {
      setProgress(true);
    }

    if (verifyStart === false) {
      setProgress(false);
      if (token) {
        localStorage.setItem("USER_TOKEN", token);
        history.push("/");
      }
    }
  }, [token, verifyStart]);

  return { viewType, direction, inProgress, setView, setProgress };
};

export default useMobileOtp;
