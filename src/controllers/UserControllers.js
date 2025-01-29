import UserModel from "../models/UserModel.js";
import {
  loginUserService,
  registrationService,
  sendEmailVerifyOTP,
  verifyOTPService,
} from "../services/userServices.js";

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
};

//Email Verification
export const verificationOTP = async (req, res) => {
  let result = await verifyOTPService(req);
  return res.status(result.status).json({
    success: result.success,
    error: result.error,
    message: result.message,
  });
};

//User Login
export const loginUser = async (req, res) => {
  let result = await loginUserService(req);

  if (result.status === 200) {
    let cookieOptions = {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 5), // 1 days
      httpOnly: true,
    };
    res.cookie("accesstoken", result.token.accessToken, cookieOptions);
    res.cookie("refreshtoken", result.token.refreshToken, cookieOptions);
    return res.status(result.status).json({
      success: result.success,
      error: result.error,
      message: result.message,
      accesstoken: result.token.accessToken,
      refreshtoken: result.token.accessToken,
    });
  } else {
    return res.status(result.status).json({
      success: result.success,
      error: result.error,
      message: result.message,
    });
  }
};

//User Logout
export const logoutUser = async (req, res) => {
  try {
    const userId = req.headers.user_id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "User ID is missing in the request.",
      });
    }

    let cookieOptions = {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 5), // 1 days
      httpOnly: true,
    };

    res.clearCookie("accesstoken", cookieOptions);
    res.clearCookie("refreshtoken", cookieOptions);

    await UserModel.findByIdAndUpdate(userId, {
      refresh_token: null,
    });
    return res.status(200).json({
      success: true,
      error: false,
      message: "User logged out successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: true,
      message: "Internal Server Error" + " " + err.toString(),
    });
  }
};
