import UserModel from "../models/UserModel.js";
import bcryptjs from "bcryptjs";
import EmailSend from "../utils/EmailHelper.js";
import { EncodeAccessToken, EncodeRefreshToken } from "../utils/TokenHelper.js";

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

    let verify_otp_random = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit random number
    let forgot_password_otp_random = Math.floor(
      100000 + Math.random() * 900000
    ); // Generates a 6-digit random number

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

export const sendEmailVerifyOTP = async (req) => {
  try {
    const { email } = req.params;
    let verify_otp_random = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit random number
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
    let verify_otp_random = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit random number
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
