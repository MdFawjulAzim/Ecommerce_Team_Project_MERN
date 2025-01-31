import dotenv from "dotenv";
dotenv.config();

export const MONGODB_CONNECTION = process.env.MONGODB_URL;

//ACCESS TOKEN
export const JWT_SECRET_ACCESS_TOKEN = process.env.SECRET_KEY_ACCESS_TOKEN;
export const JWT_EXPIRATION_TIME_ACCESS_TOKEN = process.env.JWT_EXPIRATION_TIME_ACCESS_TOKEN;

//REFRESH TOKEN
export const JWT_SECRET_REFRESH_TOKEN = process.env.SECRET_KEY_REFRESH_TOKEN;
export const JWT_EXPIRATION_TIME_REFRESH_TOKEN = process.env.JWT_EXPIRATION_TIME_REFRESH_TOKEN;

//if you use your own email
export const EMAIL_HOST = process.env.EMAIL_HOST;
export const EMAIL_PORT = process.env.EMAIL_PORT;
export const EMAIL_USER = process.env.EMAIL_USER;
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
export const MAIL_ENCRYPTION = process.env.MAIL_ENCRYPTION;

//  Cloudinary file 
export const CLOUDINARY_CLOUD_NAME =process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY =process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET_KEY =process.env.CLOUDINARY_API_SECRET_KEY;

export const Max_JSON_SIZE = process.env.Max_JSON_SIZE;
export const URL_ENCODER = process.env.URL_ENCODER;

export const REQUEST_LIMIT_TIME = process.env.REQUEST_LIMIT_TIME;
export const REQUEST_LIMIT_NUMBER = process.env.REQUEST_LIMIT_NUMBER;

export const WEB_CACHE = process.env.WEB_CACHE;
export const PORT = process.env.PORT || 4000;
