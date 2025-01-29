import express from "express";
const userRouter = express.Router();
import * as UserController from "../controllers/UserControllers.js"; // Assuming you have the right methods in your controllers
import AuthMiddleware from "../middlewares/AuthVerification.js"; // Assuming you have your auth middleware

// User Registration
userRouter.post("/registration", UserController.registration);
// Verification Code Send
userRouter.get("/send-verify-otp/:email", UserController.sendemailverifyotp);

// Verification Email Code
userRouter.get("/verify-otp/:email/:otp", UserController.verificationOTP);


export default userRouter;
