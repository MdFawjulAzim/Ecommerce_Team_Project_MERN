import jwt from "jsonwebtoken";

import UserModel from "./../models/UserModel.js";
import {
  JWT_SECRET_ACCESS_TOKEN,
  JWT_EXPIRATION_TIME_ACCESS_TOKEN,
  JWT_SECRET_REFRESH_TOKEN,
  JWT_EXPIRATION_TIME_REFRESH_TOKEN,
} from "../config/config.js";

// Encode Access Token
export const EncodeAccessToken = (email, user_id) => {
  const KEY = JWT_SECRET_ACCESS_TOKEN;
  const EXPIRE = { expiresIn: JWT_EXPIRATION_TIME_ACCESS_TOKEN };
  const PAYLOAD = { email: email, user_id: user_id };
  const token = jwt.sign(PAYLOAD, KEY, EXPIRE);
  return token;
};

// Decode Access Token
export const DecodeAccessToken = (token) => {
  try {
    const KEY = JWT_SECRET_ACCESS_TOKEN;
    return jwt.verify(token, KEY);
  } catch (e) {
    console.error("Invalid or expired token:", e.message);
    return null;
  }
};

// Encode Refresh Token
export const EncodeRefreshToken = async (userID) => {
  const KEY = JWT_SECRET_REFRESH_TOKEN;
  const EXPIRE = { expiresIn: JWT_EXPIRATION_TIME_REFRESH_TOKEN };
  const PAYLOAD = { id: userID };
  const token = jwt.sign(PAYLOAD, KEY, EXPIRE);

  const updateRefreshTokenUser = await UserModel.findOneAndUpdate(
    { _id: userID },
    { $set: { refresh_token: token } },
    { new: true }
  );
  return token;
};

// Decode Refresh Token
export const DecodeRefreshToken = (token) => {
  try {
    const KEY = JWT_SECRET_REFRESH_TOKEN;
    return jwt.verify(token, KEY);
  } catch (e) {
    console.error("Invalid or expired refresh token:", e.message);
    return null;
  }
};
