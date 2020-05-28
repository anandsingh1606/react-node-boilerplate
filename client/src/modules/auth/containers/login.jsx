import React, { useRef } from "react";
import MobileSendOtp from "../components/mobile-send-otp";
import MobileVerifyOtp from "../components/mobile-verify-otp";
import { getApiPayload } from "Utils/common";
import { loginMobileSendOtp, loginMobileVerifyOtp } from "../store/auth.action";
import useRedux from "Hooks/use-redux";
import useForm from "Hooks/use-form";
// import { actions } from "../store/auth.constants";
import { mobileVerifyOtp, mobileLoginSendOtp } from "../auth.model";
import useMobileOtp from "../auth.hooks";

const Login = () => {
  const mapState = (state) => ({
    token: state.auth.token,
    mobileSendOtpError: state.auth.loginMobileSendOtpError,
    mobileSendOtpStart: state.auth.loginMobileSendOtpStart,
    mobileVerifyOtpStart: state.auth.loginMobileVerifyOtpStart,
  });

  const {
    mappedState: {
      mobileSendOtpError, mobileSendOtpStart, token, mobileVerifyOtpStart
    },
    dispatch,
  } = useRedux(mapState);

  // view handling
  const {
    viewType, direction, inProgress, setView
  } = useMobileOtp({
    sendStart: mobileSendOtpStart,
    sendError: mobileSendOtpError,
    verifyStart: mobileVerifyOtpStart,
    token,
  });

  // form handling
  const mobileSendOtpRef = useRef(null);
  const mobileVerifyOtpRef = useRef(null);
  const mobileSendOtpState = useForm(mobileLoginSendOtp, mobileSendOtpRef);
  const mobileVerifyOtpState = useForm(mobileVerifyOtp, mobileVerifyOtpRef);

  const handleLoginMobileSubmit = () => {
    const formData = getApiPayload(mobileSendOtpState.controls);
    dispatch(loginMobileSendOtp(formData));
  };

  const handleLoginOtpSubmit = () => {
    const formData = getApiPayload({ ...mobileVerifyOtpState.controls, ...mobileSendOtpState.controls });
    dispatch(loginMobileVerifyOtp(formData));
  };

  const handleOtpBack = () => {
    setView({ viewType: "MOBILE_FORM", direction: "right" });
  };

  if (viewType === "MOBILE_FORM") {
    return (
      <MobileSendOtp
        handleSubmit={handleLoginMobileSubmit}
        inProgress={inProgress}
        direction={direction}
        controls={mobileSendOtpState.controls}
        view={mobileSendOtpState.view}
        updateControl={mobileSendOtpState.updateControl}
        isFormValid={mobileSendOtpState.isFormValid}
        formRef={mobileSendOtpRef}
      />
    );
  }

  if (viewType === "OTP_FORM") {
    return (
      <MobileVerifyOtp
        handleSubmit={handleLoginOtpSubmit}
        inProgress={inProgress}
        handleBack={handleOtpBack}
        direction={direction}
        controls={mobileVerifyOtpState.controls}
        view={mobileVerifyOtpState.view}
        updateControl={mobileVerifyOtpState.updateControl}
        isFormValid={mobileVerifyOtpState.isFormValid}
        formRef={mobileVerifyOtpRef}
      />
    );
  }
  return null;
};

export default Login;
