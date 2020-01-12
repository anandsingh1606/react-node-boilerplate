import { Router } from "express";
import {
  signupSendOtpController,
  signupVerifyOtpController,
  loginSendOtpController,
  loginWithOtpController,
} from "./auth.controller";
import {
  signupSendOtpValidation,
  signupWithOtpValidation,
  loginSendOtpValidation,
  loginWithOtpValidation,
} from "./auth.validation";
import validationHandler from "Middleware/validation-handler";

const router = Router();

router.post(
  "/signup-send-otp",
  signupSendOtpValidation,
  validationHandler,
  signupSendOtpController
);


router.post(
  "/signup-verify-otp",
  signupWithOtpValidation,
  validationHandler,
  signupVerifyOtpController
);


router.post(
  "/login-send-otp",
  loginSendOtpValidation,
  validationHandler,
  loginSendOtpController
);

router.post(
  "/login-verify-otp",
  loginWithOtpValidation,
  validationHandler,
  loginWithOtpController
);


export default router;
