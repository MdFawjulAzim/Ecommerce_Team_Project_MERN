import UserModel from "../models/UserModel.js";
import {
  CreateProfileService,
  forgotPasswordOTPSendService,
  forgotPasswordOTPVerifyService,
  loginUserService,
  randomFileUploadService,
  ReadProfileService,
  registrationService,
  resetPasswordService,
  sendEmailVerifyOTPService,
  UpdateProfileService,
  updateRefreshTokenService,
  uploadCloudinaryAvatarService,
  uploadCloudinaryService,
  uploadMulterAvatarService,
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
export const sendEmailVerifyOTP = async (req, res) => {
  let result = await sendEmailVerifyOTPService(req);
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

    res.cookie("refreshtoken", result.token.refreshToken, cookieOptions);
    res.cookie("accesstoken", result.token.accessToken, cookieOptions);

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
    const userId = req.headers.user_id; // Auth Middleware
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

// User forgot Password
export const forgotPasswordOTPSend = async (req, res) => {
  let result = await forgotPasswordOTPSendService(req);
  return res.status(result.status).json({
    success: result.success,
    error: result.error,
    message: result.message,
  });
};

// User forgot Password verify Otp
export const forgotPasswordOTPVerify = async (req, res) => {
  let result = await forgotPasswordOTPVerifyService(req);
  return res.status(result.status).json({
    success: result.success,
    error: result.error,
    message: result.message,
  });
};

// User reset Password verify Otp
export const resetPassword = async (req, res) => {
  let result = await resetPasswordService(req);
  return res.status(result.status).json({
    success: result.success,
    error: result.error,
    message: result.message,
  });
};

// Use Multer File Upload Controller
export const uploadMulterAvatar = async (req, res) => {
  let result = await uploadMulterAvatarService(req);
  return res.status(result.status).json({
    success: result.success,
    error: result.error,
    message: result.message,
  });
};
// Use Multer Random File Upload Controller
export const randomFileUploadController = async (req, res) => {
  let result = await randomFileUploadService(req);
  return res.status(result.status).json({
    success: result.success,
    error: result.error,
    message: result.message,
    data: result.data,
  });
};
// Use Cloudinary File Upload Controller
export const uploadCloudinaryAvatar = async (req, res) => {
  let result = await uploadCloudinaryAvatarService(req);
  return res.status(result.status).json({
    success: result.success,
    error: result.error,
    message: result.message,
  });
};

// Use Cloudinary Random File Upload Controller
export const uploadCloudinary = async (req, res) => {
  let result = await uploadCloudinaryService(req);
  return res.status(result.status).json({
    success: result.success,
    error: result.error,
    message: result.message,
    data: result.data,
  });
};

//expire Refresh Token Create
export const updateRefreshToken = async (req, res) => {
  let result = await updateRefreshTokenService(req);
  if (result.status === 200) {
    let cookieOptions = {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 5), // 1 days
      httpOnly: true,
    };

    res.cookie("refreshtoken", result.token.refreshToken, cookieOptions);

    return res.status(result.status).json({
      success: result.success,
      error: result.error,
      message: result.message,
      refreshtoken: result.token,
    });
  } else {
    return res.status(result.status).json({
      success: result.success,
      error: result.error,
      message: result.message,
    });
  }
};

// Use Create Profile
export const CreateProfile = async (req, res) => {
  let result = await CreateProfileService(req);
  return res.status(result.status).json({
    success: result.success,
    error: result.error,
    message: result.message,
  });
};

// Use Update Profile
export const UpdateProfile = async (req, res) => {
  let result = await UpdateProfileService(req);
  return res.status(result.status).json({
    success: result.success,
    error: result.error,
    message: result.message,
    data: result.data,
  });
};

// Use Read Profile
export const ReadProfile = async (req, res) => {
  let result = await ReadProfileService(req);
  return res.status(result.status).json({
    success: result.success,
    error: result.error,
    message: result.message,
    data: result.data,
  });
};
