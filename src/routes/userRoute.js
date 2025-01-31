import express from "express";
const userRouter = express.Router();
import * as UserController from "../controllers/UserControllers.js"; // Assuming you have the right methods in your controllers
import AuthMiddleware from "../middlewares/AuthVerification.js"; // Assuming you have your auth middleware
import upload from "../middlewares/FileUploadMulter.js";

// User Registration
userRouter.post("/registration", UserController.registration);
// Verification Code Send
userRouter.get("/send-verify-otp/:email", UserController.sendemailverifyotp);

// Verification Email Code
userRouter.get("/verify-otp/:email/:otp", UserController.verificationOTP);
//user Login with token cookie
userRouter.post("/login", UserController.loginUser);
//user Logout Cookie deleted
userRouter.get("/logout", AuthMiddleware, UserController.logoutUser);
// Upload a Avatar (PHOTO MULTER Upload)
userRouter.post('/upload-multer-avatar',AuthMiddleware,upload("avatar").single("avatar"),UserController.uploadMulterAvatar);


export default userRouter;
