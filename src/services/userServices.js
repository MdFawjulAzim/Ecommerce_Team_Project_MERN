import UserModel from "../models/UserModel.js";
import bcryptjs from "bcryptjs";
import EmailSend from "../utils/EmailHelper.js";
import {
  DecodeRefreshToken,
  EncodeAccessToken,
  EncodeRefreshToken,
} from "../utils/TokenHelper.js";
import cloudinaryFileUpload from "../utils/CloudUploadFile.js";
import GenerateOTP from "./../utils/GenerateOTP.js";
import uploadCloudinary from "../utils/CloudUpload.js";
import AddressModel from "../models/AddressModel.js";
import mongoose from "mongoose";

export const registrationService = async (req) => {
  try {
    const { name, email, password, avatar } = req.body;

    if (!name || !email || !password) {
      return {
        status: 400,
        success: false,
        error: true,
        message: "All fields are required",
      };
    }

    const userExists = await UserModel.findOne({ email });

    if (userExists) {
      return {
        status: 400,
        success: false,
        error: true,
        message: "Email already exists",
      };
    }

    const salt = await bcryptjs.genSalt(10);
    const hashpassword = await bcryptjs.hash(password, salt);

    let verify_otp_random = GenerateOTP(); // Generates a 6-digit random number
    let forgot_password_otp_random = GenerateOTP(); // Generates a 6-digit random number

    const payload = {
      name,
      email,
      password: hashpassword,
      avatar,
      verify_otp: verify_otp_random,
      forgot_password_otp: forgot_password_otp_random,
    };
    const data = await UserModel.create(payload);

    // Send email verification link
    let EmailTo = email;
    let EmailText = `Your Verification Code is ${data.verify_otp}`;
    let EmailSubject = "Task Manager Verification Code";
    let sendemail = await EmailSend(EmailTo, EmailText, EmailSubject);
    return {
      status: 201,
      success: true,
      error: false,
      message: sendemail
        ? "User registered successfully & Verification Code Sent successfully"
        : "User registered successfully",
    };
  } catch (err) {
    return {
      status: 500,
      success: false,
      error: true,
      message: err.message || "Something went wrong",
    };
  }
};

export const sendEmailVerifyOTPService = async (req) => {
  try {
    const { email } = req.params;
    let verify_otp_random = GenerateOTP(); // Generates a 6-digit random number
    let user = await UserModel.findOneAndUpdate(
      { email },
      { verify_otp: verify_otp_random },
      { new: true }
    );
    if (!user) {
      return {
        status: 404,
        success: false,
        error: true,
        message: "User not found",
      };
    }
    // Send email verification link
    let EmailTo = email;
    let EmailText = `Your Verification Code is ${user.verify_otp}`;
    let EmailSubject = "Task Manager Verification Code";
    let sendemail = await EmailSend(EmailTo, EmailText, EmailSubject);
    return {
      status: 200,
      success: true,
      error: false,
      message: sendemail
        ? "6 Digit Verification Code sent successfully"
        : "Failed to send Verification Code",
    };
  } catch (err) {
    return {
      status: 500,
      success: false,
      error: true,
      message: err.message || "Something went wrong",
    };
  }
};

export const verifyOTPService = async (req) => {
  try {
    const { email, otp } = req.params;
    let user = await UserModel.findOne({ email: email });
    if (!user) {
      return {
        status: 404,
        success: false,
        error: true,
        message: "User not found",
      };
    }
    let otpCheck = await UserModel.findOne({ verify_otp: otp });
    if (!otpCheck) {
      return {
        status: 400,
        success: false,
        error: true,
        message: "Incorrect OTP",
      };
    }
    let verify_otp_random = GenerateOTP(); // Generates a 6-digit random number
    let updateUser = await UserModel.findOneAndUpdate(
      { email },
      { verify_otp: verify_otp_random, verify_email: true },
      { new: true }
    );
    return {
      status: 200,
      success: true,
      error: false,
      message: "OTP verified successfully",
    };
  } catch (err) {
    return {
      status: 500,
      success: false,
      error: true,
      message: err.message || "Something went wrong",
    };
  }
};

export const loginUserService = async (req) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return {
        status: 400,
        success: false,
        error: true,
        message: "All fields are required",
      };
    }

    let User = await UserModel.findOne({ email: email });
    if (!User) {
      return {
        status: 404,
        success: false,
        error: true,
        message: "User not found",
      };
    }
    if (User.verify_email !== true) {
      return {
        status: 403,
        success: false,
        error: true,
        message: "Email Not Verified, Please Verify Your Email First",
      };
    }
    if (User.status !== "ACTIVE") {
      return {
        status: 403,
        success: false,
        error: true,
        message: "User Account Is Not Active , Contact Admin",
      };
    }
    let matchPassword = await bcryptjs.compare(password, User.password);

    if (!matchPassword) {
      return {
        status: 401,
        success: false,
        error: true,
        message: "Invalid Password",
      };
    }

    const refreshToken = await EncodeRefreshToken(User._id);
    const accessToken = EncodeAccessToken(email, User._id);

    if (!accessToken || !refreshToken) {
      return {
        status: 500,
        success: false,
        error: true,
        message: "Failed to generate authentication tokens",
      };
    }

    return {
      status: 200,
      success: true,
      error: false,
      message: "User logged in successfully",
      token: {
        accessToken,
        refreshToken,
      },
    };
  } catch (err) {
    return {
      status: 500,
      success: false,
      error: true,
      message: err.message || "Something went wrong",
    };
  }
};

export const forgotPasswordOTPSendService = async (req) => {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return {
        status: 404,
        success: false,
        error: true,
        message: "User not found",
      };
    }

    const forgot_password_otp_random = GenerateOTP();
    const expireTime = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1 hour time

    const update = await UserModel.findOneAndUpdate(
      { email: email },
      {
        forgot_password_otp: forgot_password_otp_random,
        forgot_password_expiry: expireTime,
      },
      { new: true }
    );

    // Send email verification link
    let EmailTo = email;
    let EmailText = `Your Verification Code is ${update.forgot_password_otp}`;
    let EmailSubject = "Task Manager Verification Code";
    let sendemail = await EmailSend(EmailTo, EmailText, EmailSubject);

    return {
      status: 200,
      success: true,
      error: false,
      message: "Forgot Password OTP sent successfully",
    };
  } catch (err) {
    return {
      status: 500,
      success: false,
      error: true,
      message: err.message || "Something went wrong",
    };
  }
};

export const forgotPasswordOTPVerifyService = async (req) => {
  try {
    const email = req.params.email;
    const otp = req.params.otp;

    if (!email || !otp) {
      return {
        status: 400,
        success: false,
        error: true,
        message: "All fields are required",
      };
    }

    const user = await UserModel.findOne({
      email: email,
      forgot_password_otp: otp,
    });
    if (!user) {
      return {
        status: 404,
        success: false,
        error: true,
        message: "User not found",
      };
    }

    const currentTime = new Date().toISOString();

    if (user.forgot_password_expiry < currentTime) {
      return {
        status: 403,
        success: false,
        error: true,
        message: "OTP Expired",
      };
    }
    if (user.forgot_password_otp !== otp) {
      return {
        status: 403,
        success: false,
        error: true,
        message: "Incorrect OTP",
      };
    }

    const forgot_password_otp_random = GenerateOTP();

    const updateUser = await UserModel.findOneAndUpdate(
      { email: email },
      {
        forgot_password_otp: forgot_password_otp_random,
        forgot_password_expiry: "",
      },
      { new: true }
    );
    return {
      status: 200,
      success: true,
      error: false,
      message: "OTP verified successfully",
    };
  } catch (err) {
    return {
      status: 500,
      success: false,
      error: true,
      message: err.message || "Something went wrong",
    };
  }
};

export const resetPasswordService = async (req) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;
    if (!email || !newPassword || !confirmPassword) {
      return {
        status: 400,
        success: false,
        error: true,
        message: "All fields are required",
      };
    }
    const user = await UserModel.findOne({ email });

    if (!user) {
      return {
        status: 404,
        success: false,
        error: true,
        message: "Email is not available",
      };
    }

    if (newPassword !== confirmPassword) {
      return {
        status: 400,
        success: false,
        error: true,
        message: "Passwords do not match",
      };
    }
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(newPassword, salt);
    const update = await UserModel.findOneAndUpdate(user._id, {
      password: hashPassword,
    });
    return {
      status: 200,
      success: true,
      error: false,
      message: "Password Update successfully",
    };
  } catch (err) {
    return {
      status: 500,
      success: false,
      error: true,
      message: err.message || "Something went wrong",
    };
  }
};
export const uploadMulterAvatarService = async (req) => {
  try {
    const userId = req.headers.user_id; // Auth Middleware
    const avatar = req.file; // multer Middleware
    if (!avatar) {
      return {
        status: 400,
        success: false,
        error: true,
        message: "No avatar provided",
      };
    }

    const fileName = avatar.filename;

    const updateUser = await UserModel.findByIdAndUpdate(userId, {
      avatar: fileName,
    });
    return {
      status: 200,
      success: true,
      error: false,
      message: "User Avatar uploaded successfully",
    };
  } catch (err) {
    return {
      status: 500,
      success: false,
      error: true,
      message: err.message || "Something went wrong",
    };
  }
};

export const randomFileUploadService = async (req, res) => {
  try {
    if (!req.file) {
      return {
        status: 400,
        success: false,
        error: true,
        message: "No file provided",
      };
    }
    const url = req.file.destination + req.file.filename;
    return {
      status: 200,
      success: true,
      error: false,
      message: "File uploaded successfully",
      data: {
        url: url,
        filename: req.file.originalname,
      },
    };
  } catch (err) {
    return {
      status: 500,
      success: false,
      error: true,
      message: err.message || "Something went wrong",
    };
  }
};

export const uploadCloudinaryAvatarService = async (req) => {
  try {
    const userId = req.headers.user_id; // Auth Middleware
    const avatar = req.file; // CloudinaryMulter Middleware

    const file = avatar.fieldname;

    if (!avatar) {
      return {
        status: 400,
        success: false,
        error: true,
        message: "No avatar provided",
      };
    }
    const upload = await cloudinaryFileUpload(avatar, file);

    const updateUser = await UserModel.findByIdAndUpdate(userId, {
      avatar: upload.url,
    });
    return {
      status: 200,
      success: true,
      error: false,
      message: "User Avatar uploaded successfully",
    };
  } catch (err) {
    return {
      status: 500,
      success: false,
      error: true,
      message: err.message || "Something went wrong",
    };
  }
};

export const uploadCloudinaryService = async (req) => {
  try {
    if (!req.file) {
      return {
        status: 400,
        success: false,
        error: true,
        message: "No file provided",
      };
    }
    const upload = await uploadCloudinary(req.file);

    return {
      status: 200,
      success: true,
      error: false,
      message: "Image uploaded successfully",
      data: {
        secure_url: upload.secure_url,
        url: upload.url,
        filename: req.file.originalname,
      },
    };
  } catch (err) {
    return {
      status: 500,
      success: false,
      error: true,
      message: err.message || "Something went wrong",
    };
  }
};

export const updateRefreshTokenService = async (req) => {
  try {
    const refreshToken =
      req.cookies.refreshtoken || req?.headers?.authorization?.split(" ")[1]; /// [ Bearer token]

    if (!refreshToken) {
      return {
        status: 401,
        success: false,
        error: true,
        message: "No refresh token provided",
      };
    }

    const verifyToken = DecodeRefreshToken(refreshToken);

    if (!verifyToken) {
      return {
        status: 401,
        success: false,
        error: true,
        message: "Invalid refresh token",
      };
    }

    const userId = verifyToken._id;
    const refreshTokens = await EncodeRefreshToken(userId);

    return {
      status: 200,
      success: true,
      error: false,
      message: "Refresh Token Updated Successfully",
      token: refreshTokens,
    };
  } catch (err) {
    return {
      status: 500,
      success: false,
      error: true,
      message: err.message || "Something went wrong",
    };
  }
};

export const CreateProfileService = async (req) => {
  try {
    const userId = req.headers.user_id; // Auth Middleware
    const reqBody = req.body;
    reqBody.userID = userId;
    await AddressModel.updateOne(
      { userID: userId },
      { $set: reqBody },
      { upsert: true }
    );
    return {
      status: 200,
      success: true,
      error: false,
      message: "Profile created successfully",
    };
  } catch (err) {
    return {
      status: 500,
      success: false,
      error: true,
      message: err.message || "Something went wrong",
    };
  }
};

export const UpdateProfileService = async (req) => {
  try {
    const userId = req.headers.user_id; // Auth Middleware
    const { name, email, avatar } = req.body;

    // User Exist Check
    const userExists = await UserModel.findById(userId);
    if (!userExists) {
      return {
        status: 404,
        success: false,
        error: true,
        message: "User not found",
      };
    }

    // Prepare Update Payload
    const updateFields = {};
    if (email) updateFields.email = email;
    if (name) updateFields.name = name;
    if (avatar) updateFields.avatar = avatar;

    // Update User Profile
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      updateFields,
      { new: true }
    );

    return {
      status: 200,
      success: true,
      error: false,
      message: "Profile updated successfully",
      data: updatedUser,
    };
  } catch (err) {
    return {
      status: 500,
      success: false,
      error: true,
      message: err.message || "Something went wrong",
    };
  }
};

export const ReadProfileService = async (req) => {
  try {
    const userId = req.headers.user_id; // Auth Middleware

    // User Data Fetch (Exclude Sensitive Fields)
    const user = await UserModel.findById(userId).select(
      "-password -verify_otp -verify_email -forgot_password_otp -refresh_token -role -status -forgot_password_expiry"
    );

    // Profile (Address) Data Fetch
    const profile = await AddressModel.findOne({
      userID: new mongoose.Types.ObjectId(userId),
    });

    if (!user) {
      return {
        status: 404,
        success: false,
        error: true,
        message: "User not found",
      };
    }

    return {
      status: 200,
      success: true,
      error: false,
      message: "Profile read successfully",
      data: {
        user,
        profile: profile || {}, // Jodi profile na thake, empty object return korbe
      },
    };
  } catch (err) {
    return {
      status: 500,
      success: false,
      error: true,
      message: err.message || "Something went wrong",
    };
  }
};
