import express from "express";
const userRouter = express.Router();
import * as UserController from "../controllers/UserControllers.js"; // Assuming you have the right methods in your controllers
import AuthMiddleware from "../middlewares/AuthVerification.js"; // Assuming you have your auth middleware

// User Registration
userRouter.post("/registration", UserController.registration);


export default userRouter;
