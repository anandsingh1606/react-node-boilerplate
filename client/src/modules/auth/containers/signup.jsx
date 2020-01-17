import React, { useRef } from "react";
import MobileSignupSendOtp from "../components/mobile-send-otp";
import MobileVerifyOtp from "../components/mobile-verify-otp";
import { getApiPayload } from "Utils/common";
import { signupMobileSendOtp, signupMobileVerifyOtp } from "../store/auth.action";
import useRedux from "Hooks/use-redux";
import useForm from "Hooks/use-form";
import constants from "../store/auth.constants";
import { mobileVerifyOtp, mobileSignupSendOtp } from "../auth.model";
import useMobileOtp from "../auth.hooks";

const Signup = () => {
  // Redux handling
  const {
    SIGNUP: {
      MOBILE: { SEND_OTP, VERIFY_OTP },
    },
  } = constants;

  const mapState = (state) => ({
    token: state.auth.token,
    signupMobileSendOtpError: state.common.apiErrors[SEND_OTP.KEY],
    signupMobileSendOtpStart: state.common.apiRequests[SEND_OTP.KEY],
    signupMobileVerifyOtpStart: state.common.apiRequests[VERIFY_OTP.KEY],
  });

  const {
    mappedState: {
      signupMobileSendOtpError, signupMobileSendOtpStart, token, signupMobileVerifyOtpStart
    },
    dispatch,
  } = useRedux(mapState);

  // view handling
  const {
    viewType, direction, inProgress, setView
  } = useMobileOtp({
    sendStart: signupMobileSendOtpStart,
    sendError: signupMobileSendOtpError,
    verifyStart: signupMobileVerifyOtpStart,
    token,
  });

  // form handling
  const mobileSendOtpRef = useRef(null);
  const mobileVerifyOtpRef = useRef(null);
  const mobileSendOtpState = useForm(mobileSignupSendOtp, mobileSendOtpRef);
  const mobileVerifyOtpState = useForm(mobileVerifyOtp, mobileVerifyOtpRef);


  const handleSignupMobileSubmit = () => {
    const formData = getApiPayload(mobileSendOtpState.controls);
    dispatch(signupMobileSendOtp(formData));
  };

  const handleSignupOtpSubmit = () => {
    const formData = getApiPayload({ ...mobileVerifyOtpState.controls, ...mobileSendOtpState.controls });
    dispatch(signupMobileVerifyOtp(formData));
  };

  const handleOtpBack = () => {
    setView({ viewType: "MOBILE_FORM", direction: "right" });
  };

  if (viewType === "MOBILE_FORM") {
    return (
      <MobileSignupSendOtp
        handleSubmit={handleSignupMobileSubmit}
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
        handleSubmit={handleSignupOtpSubmit}
        inProgress={inProgress}
        handleBack={handleOtpBack}
        direction={direction}
        controls={mobileVerifyOtpState.controls}
        view={mobileSendOtpState.view}
        updateControl={mobileVerifyOtpState.updateControl}
        isFormValid={mobileVerifyOtpState.isFormValid}
        formRef={mobileVerifyOtpRef}
      />
    );
  }
  return null;
};

export default Signup;
