import EmailSend from "../utils/EmailHelper.js";
import { EncodeAccessToken, EncodeRefreshToken } from "../utils/TokenHelper.js";

export const create = async (request, response) => {
  try {
    const { email, user_id } = request.body;

    const accessToken = EncodeAccessToken(email, user_id);

    // const refreshToken = await EncodeRefreshToken(user_id);

    return response.status(200).json({
      success: true,
      message: "Tokens generated successfully!",
      data: {
        accessToken,
        // refreshToken,
      },
    });
  } catch (error) {
    console.error("Error in generating token:", error);
    return response.status(500).json({
      error: error.message,
    });
  }
};

export const refresh = async (request, response) => {
  try {
    return response.status(200).json({
      success: true,
      message: "Tokens generated successfully!",
    });
  } catch (error) {
    console.error("Error in generating token:", error);
    return response.status(500).json({
      error: error.message,
    });
  }
};

export const EmailVerify = async (req, res) => {
  try {
    let email = req.params.email;  // or req.body.email if it's in the body
    console.log("Email to verify:", email);

    // Generate verification code
    let code = Math.floor(100000 + Math.random() * 900000);
    console.log("Verification Code:", code);

    // Prepare email
    let EmailTo = email;
    let EmailText = "Your Code is " + code;
    let EmailSubject = "Task Manager Verification Code";

    // Send email
    await EmailSend(EmailTo, EmailText, EmailSubject);

    return res.status(200).json({
      status: "success",
      message: "User Email Verify Successfully",
    });
  } catch (err) {
    console.error("Error in EmailVerify:", err);  // Add logging here
    return res.status(500).json({
      status: "fail",
      message: err.toString(),
    });
  }
};

