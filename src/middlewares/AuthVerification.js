import { DecodeAccessToken } from "../utils/TokenHelper.js";

export default async (req, res, next) => {
  const token =
    req.cookies.accesstoken || req?.headers?.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "Unauthenticated. Access Token is required.",
    });
  }

  try {
    const decodedAccess = await DecodeAccessToken(token);
    if (!decodedAccess) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid or expired token.",
      });
    }

    req.headers.email = decodedAccess.email;
    req.headers.user_id = decodedAccess.user_id;
    next();
  } catch (error) {
    console.error("Error decoding token:", error.message);
    return res.status(401).json({
      status: "fail",
      message: "Invalid or expired token.",
    });
  }
};
