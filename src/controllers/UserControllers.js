import { registrationService, sendEmailVerifyOTP, verifyOTPService } from "../services/userServices.js";

export const registration = async (req, res) => {
  let result = await registrationService(req);
  return res.status(result.status).json({
    success: result.success,
    error: result.error,
    message: result.message,
  });
};

//Email verification code Send
export const sendemailverifyotp = async (req, res) => {
  let result = await sendEmailVerifyOTP(req);
  return res.status(result.status).json({
    success: result.success,
    error: result.error,
    message: result.message,
  });
}

//Email Verification
export const verificationOTP = async (req, res) => {
  let result = await verifyOTPService(req);
  return res.status(result.status).json({
    success: result.success,
    error: result.error,
    message: result.message,
  });
}
