import express from "express";
const router = express.Router();
import * as Controller from "../controllers/controllers.js"; // Assuming you have the right methods in your controllers
import AuthMiddleware from "../middlewares/AuthVerification.js"; // Assuming you have your auth middleware

// User Registration
router.post("/registration", Controller.create);

// User Login with Auth Verification Middleware (typically POST request)
router.post("/login", AuthMiddleware, Controller.refresh);
router.post("/emailverify/:email", AuthMiddleware, Controller.EmailVerify);

export default router;
