import express from "express";
const userRouter = express.Router();
import * as UserController from "../controllers/UserControllers.js"; // Assuming you have the right methods in your controllers
import AuthMiddleware from "../middlewares/AuthVerification.js"; // Assuming you have your auth middleware
import upload from "../middlewares/FileUploadMulter.js";
import cloudUpload from "../middlewares/CloudMulter.js";
import uploads from "../middlewares/RandomfileUpload.js";

// User Registration
userRouter.post("/registration", UserController.registration);
//user Login with token cookie
userRouter.post("/login", UserController.loginUser);
//user Logout Cookie deleted
userRouter.get("/logout", AuthMiddleware, UserController.logoutUser);


// Verification Code Send
userRouter.get("/send-verify-otp/:email", UserController.sendEmailVerifyOTP);
// Verification Email Code
userRouter.get("/verify-otp/:email/:otp", UserController.verificationOTP);


//user Refresh Token Generated Refresh token
userRouter.get("/refresh-token", AuthMiddleware, UserController.updateRefreshToken);


//user forgot password
userRouter.post("/forgot-password",UserController.forgotPasswordOTPSend);
//user forgot OTP Verify
userRouter.get("/verify-forgot-password-otp/:email/:otp", UserController.forgotPasswordOTPVerify);
//Reset password
userRouter.post('/reset-password',UserController.resetPassword);


//User Create Profile
userRouter.post('/create-profile',AuthMiddleware,UserController.CreateProfile);
//User Update Profile
userRouter.post('/update-profile',AuthMiddleware,UserController.UpdateProfile);
//User Read Profile
userRouter.get('/read-profile',AuthMiddleware,UserController.ReadProfile);


// Upload a Avatar (PHOTO MULTER Upload)
userRouter.post(
  "/upload-multer-avatar",
  AuthMiddleware,
  upload("avatar").single("avatar"),
  UserController.uploadMulterAvatar
);

// Upload a Avatar (PHOTO Cloudinary Upload)
userRouter.post(
  "/upload-cloudinary-avatar",
  AuthMiddleware,
  cloudUpload.single("avatar"),
  UserController.uploadCloudinaryAvatar
);

// File upload endpoint
userRouter.post("/upload", uploads.single("file"),UserController.randomFileUploadController);

export default userRouter;
